"""Import the supplied history revision DOCX files into VitePress Markdown.

The source directory is supplied through HISTORY_DOCX_DIR so Windows paths with
Chinese characters do not need to be embedded in this script.
"""

from __future__ import annotations

import os
import re
import hashlib
import zipfile
from io import BytesIO
from pathlib import Path

from docx import Document
from docx.document import Document as DocumentType
from docx.oxml.ns import qn
from docx.table import Table, _Cell
from docx.text.paragraph import Paragraph
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(os.environ["HISTORY_DOCX_DIR"])
HISTORY = ROOT / "历史"
ASSETS = ROOT / "public" / "history"
DESIRED_ASSETS: set[Path] = set()

TOPICS = {
    1: ("中国史", "先秦至秦汉"),
    2: ("中国史", "魏晋至隋唐"),
    3: ("中国史", "宋元到明清"),
    4: ("中国史", "晚清到民国初期"),
    5: ("中国史", "新民主主义革命时期"),
    6: ("中国史", "中华人民共和国时期"),
    7: ("世界史", "史前时代至中古时期"),
    8: ("世界史", "工场手工业时期"),
    9: ("世界史", "工业革命时期"),
    10: ("世界史", "两次世界大战时期"),
    11: ("世界史", "第二次世界大战后"),
    12: ("专题史", "政治制度与官员选拔"),
    13: ("专题史", "法律教化和基层治理"),
    14: ("专题史", "民族关系与国家关系"),
    15: ("专题史", "货币和赋税制度"),
    16: ("专题史", "社会生产"),
    17: ("专题史", "社会生活"),
    18: ("专题史", "文化及文化的传承与保护"),
    19: ("专题史", "文化交流"),
}


def iter_blocks(parent):
    if isinstance(parent, DocumentType):
        parent_elm = parent.element.body
    elif isinstance(parent, _Cell):
        parent_elm = parent._tc
    else:
        raise TypeError(type(parent))
    for child in parent_elm.iterchildren():
        if child.tag == qn("w:p"):
            yield Paragraph(child, parent)
        elif child.tag == qn("w:tbl"):
            yield Table(child, parent)


def clean(text: str) -> str:
    text = text.replace("\u00a0", " ").replace("\u200b", "")
    text = re.sub(r"[ \t]+", " ", text)
    return text.strip()


def markdown_text(text: str) -> str:
    return clean(text).replace("\\", "\\\\").replace("|", "\\|")


def paragraph_images(
    paragraph: Paragraph,
    doc: DocumentType,
    topic: int,
    ignored_hashes: set[str],
    seen_hashes: set[str],
):
    results = []
    seen = set()
    for blip in paragraph._p.xpath(".//a:blip"):
        rel_id = blip.get(qn("r:embed"))
        if not rel_id or rel_id in seen or rel_id not in doc.part.related_parts:
            continue
        seen.add(rel_id)
        part = doc.part.related_parts[rel_id]
        suffix = Path(str(part.partname)).suffix.lower()
        if suffix not in {".png", ".jpg", ".jpeg", ".gif", ".webp"}:
            continue
        digest = hashlib.sha256(part.blob).hexdigest()
        if digest in ignored_hashes or digest in seen_hashes:
            continue
        try:
            with Image.open(BytesIO(part.blob)) as image:
                width, height = image.size
        except Exception:
            continue
        # Source files use small raster labels as decorative section markers.
        # Their text already exists in the paragraph and adds no web content.
        if (width < 300 and height < 100) or width * height < 5_000:
            continue
        seen_hashes.add(digest)
        topic_dir = ASSETS / f"topic-{topic:02d}"
        topic_dir.mkdir(parents=True, exist_ok=True)
        filename = f"{digest[:12]}{suffix}"
        asset_path = topic_dir / filename
        asset_path.write_bytes(part.blob)
        DESIRED_ASSETS.add(asset_path.resolve())
        results.append(f"![专题{topic:02d}配图](/history/topic-{topic:02d}/{filename})")
    return results


def cell_text(cell: _Cell) -> str:
    chunks = []
    for paragraph in cell.paragraphs:
        value = markdown_text(paragraph.text)
        if value and (not chunks or chunks[-1] != value):
            chunks.append(value)
    return "<br>".join(chunks) or " "


def table_markdown(table: Table):
    rows = [[cell_text(cell) for cell in row.cells] for row in table.rows]
    if not rows:
        return []
    width = max(len(row) for row in rows)
    rows = [row + [" "] * (width - len(row)) for row in rows]
    lines = [
        "| " + " | ".join(rows[0]) + " |",
        "| " + " | ".join(["---"] * width) + " |",
    ]
    lines.extend("| " + " | ".join(row) + " |" for row in rows[1:])
    return lines


def format_paragraph(text: str, first: bool):
    text = clean(text)
    if not text:
        return []
    if first:
        title = re.sub(r"^专题\d+\s*", "", text)
        return [f"# {title}"]
    if text.startswith("（时空观念+"):
        return [f"> 复习框架：{text.strip('（）').replace('+', ' · ')}"]
    if re.match(r"^知识点\s*\d+", text):
        return [f"## {text}"]
    if re.match(r"^(考点速查|考点梳理|易错点拨|重难考点)", text):
        return [f"## {text}"]
    if (re.match(r"^[一二三四五六七八九十]+、", text) or
            (text.startswith("【") and text.endswith("】"))) and len(text) <= 55:
        return [f"### {text.strip('【】')}"]
    if re.match(r"^\d+[、.]\s*[^。；]{1,35}$", text):
        return [f"### {text}"]
    return [text]


def convert(
    source: Path,
    topic: int,
    group: str,
    slug: str,
    ignored_hashes: set[str],
):
    doc = Document(source)
    seen_hashes: set[str] = set()
    output = ["---", f"title: {slug}", "outline: [2, 3]", "---", ""]
    first = True
    for block in iter_blocks(doc):
        if isinstance(block, Paragraph):
            content = format_paragraph(block.text, first)
            if clean(block.text):
                first = False
            images = paragraph_images(block, doc, topic, ignored_hashes, seen_hashes)
            if content or images:
                output.extend(content)
                output.extend(images)
                output.append("")
        else:
            output.extend(table_markdown(block))
            output.append("")
    output.extend([
        "---",
        "",
        "> 本页依据用户提供的《2025年高考历史一轮复习知识清单（全国通用）》整理。",
        "",
    ])
    target_dir = HISTORY / group
    target_dir.mkdir(parents=True, exist_ok=True)
    target = target_dir / f"{topic:02d}-{slug}.md"
    target.write_text("\n".join(output), encoding="utf-8")
    return target


def write_indexes():
    descriptions = {
        "中国史": "按历史时序梳理中华文明起源、统一多民族国家发展、近代救亡与现代中国建设。",
        "世界史": "从早期文明、中古世界到工业革命、世界大战和战后国际格局。",
        "专题史": "跨时空整合制度、治理、经济、社会生活与文化交流等选择性必修主题。",
    }
    for group, description in descriptions.items():
        lines = [f"# {group}", "", description, "", "## 专题目录", ""]
        for number, (item_group, slug) in TOPICS.items():
            if item_group == group:
                lines.append(f"- [专题{number:02d}：{slug}](./{number:02d}-{slug})")
        lines.append("")
        (HISTORY / group / "index.md").write_text("\n".join(lines), encoding="utf-8")


def main():
    sources = {}
    for path in SOURCE.glob("专题*.docx"):
        match = re.match(r"专题(\d+)", path.name)
        if match:
            sources[int(match.group(1))] = path
    missing = sorted(set(TOPICS) - set(sources))
    if missing:
        raise SystemExit(f"Missing source topics: {missing}")
    media_occurrences: dict[str, set[int]] = {}
    for number, source in sources.items():
        with zipfile.ZipFile(source) as archive:
            for name in archive.namelist():
                if not name.startswith("word/media/"):
                    continue
                digest = hashlib.sha256(archive.read(name)).hexdigest()
                media_occurrences.setdefault(digest, set()).add(number)
    # A large promotional QR-code image is repeated in every source document.
    ignored_hashes = {
        digest for digest, topic_numbers in media_occurrences.items()
        if len(topic_numbers) == len(TOPICS)
    }
    for number, (group, slug) in TOPICS.items():
        target = convert(sources[number], number, group, slug, ignored_hashes)
        print(target.relative_to(ROOT))
    write_indexes()
    if ASSETS.exists():
        for asset in ASSETS.rglob("*"):
            if asset.is_file() and asset.resolve() not in DESIRED_ASSETS:
                asset.unlink()


if __name__ == "__main__":
    main()
