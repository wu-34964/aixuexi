const ELEMENT = /^[A-Z][a-z]?/

const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a)
const lcm = (a, b) => Math.abs(a * b) / gcd(a, b)
const frac = (n, d = 1) => {
  if (!d) throw new Error('除数不能为 0')
  if (d < 0) { n = -n; d = -d }
  const g = gcd(Math.abs(n), d) || 1
  return { n: n / g, d: d / g }
}
const add = (a, b) => frac(a.n * b.d + b.n * a.d, a.d * b.d)
const sub = (a, b) => frac(a.n * b.d - b.n * a.d, a.d * b.d)
const mul = (a, b) => frac(a.n * b.n, a.d * b.d)
const div = (a, b) => frac(a.n * b.d, a.d * b.n)

function merge(target, source, multiplier = 1) {
  Object.entries(source).forEach(([key, value]) => {
    target[key] = (target[key] || 0) + value * multiplier
  })
}

function parseNumber(text, state) {
  const start = state.i
  while (/\d/.test(text[state.i] || '')) state.i++
  return start === state.i ? 1 : Number(text.slice(start, state.i))
}

function parseGroup(text, state, closing = '') {
  const result = {}
  while (state.i < text.length) {
    const char = text[state.i]
    if (closing && char === closing) { state.i++; return result }
    if ('(['.includes(char)) {
      state.i++
      const close = char === '(' ? ')' : ']'
      const inner = parseGroup(text, state, close)
      merge(result, inner, parseNumber(text, state))
      continue
    }
    const match = text.slice(state.i).match(ELEMENT)
    if (!match) throw new Error(`无法识别“${char}”`)
    state.i += match[0].length
    result[match[0]] = (result[match[0]] || 0) + parseNumber(text, state)
  }
  if (closing) throw new Error(`缺少右括号 ${closing}`)
  return result
}

function extractCharge(input) {
  if (input === 'e-' || input === 'e−') return { formula: '', charge: -1, electron: true }
  const text = input.replace(/−/g, '-')
  let match = text.match(/\^(\d*)([+-])$/)
  if (match) return { formula: text.slice(0, match.index), charge: (Number(match[1]) || 1) * (match[2] === '+' ? 1 : -1) }
  match = text.match(/([+-])(\d+)$/)
  if (match) return { formula: text.slice(0, match.index), charge: Number(match[2]) * (match[1] === '+' ? 1 : -1) }
  match = text.match(/([+-])$/)
  if (match) return { formula: text.slice(0, -1), charge: match[1] === '+' ? 1 : -1 }
  return { formula: text, charge: 0 }
}

export function parseSpecies(raw) {
  let display = raw.trim().replace(/^\d+\s*/, '')
  if (!display) throw new Error('存在空物质')
  display = display.replace(/\s*(\((?:aq|s|l|g)\))\s*$/i, '')
  const { formula, charge, electron } = extractCharge(display)
  if (electron) return { raw: raw.trim(), formula: 'e-', display, atoms: {}, charge: -1 }
  if (!formula) throw new Error(`“${raw}”缺少化学式`)
  const atoms = {}
  for (const segment of formula.split(/[·.]/)) {
    const m = segment.match(/^(\d+)?(.+)$/)
    const multiplier = m?.[1] ? Number(m[1]) : 1
    const body = m?.[2] || segment
    const state = { i: 0 }
    const parsed = parseGroup(body, state)
    merge(atoms, parsed, multiplier)
  }
  return { raw: raw.trim(), formula, display, atoms, charge }
}

// “+”既是分隔符也可能是离子电荷；推荐用空格分隔，常见无空格输入也兼容。
export function splitSide(input) {
  const text = input.trim()
  if (!text) return []
  if (/\s\+\s/.test(text)) return text.split(/\s+\+\s+/).map(s => s.trim()).filter(Boolean)
  return text.split(/\+(?=[A-Z[(e])/).map(s => s.trim()).filter(Boolean)
}

function nullVector(matrix) {
  const rows = matrix.map(row => row.map(value => frac(value)))
  const rowCount = rows.length
  const colCount = rows[0]?.length || 0
  const pivots = []
  let r = 0
  for (let c = 0; c < colCount && r < rowCount; c++) {
    const pivot = rows.findIndex((row, index) => index >= r && row[c].n !== 0)
    if (pivot < 0) continue
    ;[rows[r], rows[pivot]] = [rows[pivot], rows[r]]
    const divisor = rows[r][c]
    rows[r] = rows[r].map(v => div(v, divisor))
    for (let i = 0; i < rowCount; i++) {
      if (i === r || rows[i][c].n === 0) continue
      const factor = rows[i][c]
      rows[i] = rows[i].map((v, j) => sub(v, mul(factor, rows[r][j])))
    }
    pivots.push(c); r++
  }
  const free = [...Array(colCount).keys()].filter(c => !pivots.includes(c))
  if (!free.length) return { error: 'NO_SOLUTION' }
  if (free.length > 1) return { error: 'MULTIPLE_SOLUTIONS' }
  const vector = Array.from({ length: colCount }, () => frac(0))
  vector[free[0]] = frac(1)
  pivots.forEach((p, i) => { vector[p] = mul(frac(-1), rows[i][free[0]]) })
  let denominator = 1
  vector.forEach(v => { denominator = lcm(denominator, v.d) })
  let ints = vector.map(v => v.n * (denominator / v.d))
  if (ints.every(v => v <= 0)) ints = ints.map(v => -v)
  if (ints.some(v => v <= 0)) return { error: 'NO_POSITIVE_SOLUTION' }
  const common = ints.reduce((g, v) => gcd(g, v), 0)
  return { coefficients: ints.map(v => v / common) }
}

export function balanceEquation(leftInput, rightInput) {
  try {
    const leftRaw = splitSide(leftInput)
    const rightRaw = splitSide(rightInput)
    if (!leftRaw.length || !rightRaw.length) return { ok: false, code: 'EMPTY_SIDE', message: '请完整输入反应物和生成物。' }
    const left = leftRaw.map(parseSpecies)
    const right = rightRaw.map(parseSpecies)
    const species = [...left, ...right]
    const elements = [...new Set(species.flatMap(item => Object.keys(item.atoms)))]
    const leftElements = new Set(left.flatMap(item => Object.keys(item.atoms)))
    const rightElements = new Set(right.flatMap(item => Object.keys(item.atoms)))
    const missing = elements.filter(e => !leftElements.has(e) || !rightElements.has(e))
    if (missing.length) return { ok: false, code: 'ELEMENT_MISMATCH', message: `方程式两端的元素不一致：${missing.join('、')}` }
    const hasCharge = species.some(item => item.charge !== 0)
    const keys = hasCharge ? [...elements, '__charge'] : elements
    const matrix = keys.map(key => species.map((item, index) => {
      const value = key === '__charge' ? item.charge : (item.atoms[key] || 0)
      return index < left.length ? value : -value
    }))
    const solved = nullVector(matrix)
    const messages = {
      NO_SOLUTION: '该输入不存在非零配平解。',
      MULTIPLE_SOLUTIONS: '该输入存在多个独立配平方案，请补全反应物或生成物。',
      NO_POSITIVE_SOLUTION: '无法得到全部为正数的化学计量系数，请检查物质是否写对。'
    }
    if (solved.error) return { ok: false, code: solved.error, message: messages[solved.error] }
    const leftCoefficients = solved.coefficients.slice(0, left.length)
    const rightCoefficients = solved.coefficients.slice(left.length)
    const format = (items, coefficients) => items.map((item, i) => `${coefficients[i] === 1 ? '' : coefficients[i]}${item.display}`).join(' + ')
    return {
      ok: true, left, right, coefficients: solved.coefficients,
      formatted: `${format(left, leftCoefficients)} → ${format(right, rightCoefficients)}`
    }
  } catch (error) {
    return { ok: false, code: 'PARSE_ERROR', message: `无法解析化学式：${error.message}` }
  }
}

