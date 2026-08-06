export const timelineRegions = ['中国', '世界']
export const timelinePeriods = ['古代', '近代', '现代']
export const timelineThemes = ['政治', '经济', '文化', '社会', '军事']

// sortYear 只用于排序；不确定到具体年份的事件使用所属世纪或时期的代表值。
export const historyEvents = [
  { id: 'world-civilizations-3500bc', sortYear: -3500, date: '约公元前3500年', title: '早期文明产生', summary: '西亚、北非等地出现城市、文字和早期国家，人类逐渐进入文明时代。', significance: '农业发展和社会分工推动阶级、国家与文字形成，奠定古代文明发展的基础。', region: ['世界'], period: ['古代'], themes: ['政治', '经济', '文化', '社会'], source: '/历史/世界史/07-史前时代至中古时期' },
  { id: 'china-xia-2070bc', sortYear: -2070, date: '约公元前2070年', title: '夏朝建立', summary: '禹建立我国最早的奴隶制国家，世袭制逐渐取代禅让制。', significance: '中国由原始社会迈入早期国家阶段，王位世袭成为重要政治传统。', region: ['中国'], period: ['古代'], themes: ['政治', '社会'], source: '/历史/中国史/01-先秦至秦汉' },
  { id: 'world-greece-2000bc', sortYear: -2000, date: '约公元前2000年', title: '古代希腊人形成', summary: '印欧人与爱琴海地区居民融合，逐渐形成古代希腊人。', significance: '希腊文明后来成为西方哲学、政治和科学传统的重要源头。', region: ['世界'], period: ['古代'], themes: ['文化', '社会'], source: '/历史/专题史/19-文化交流' },
  { id: 'china-shang-1600bc', sortYear: -1600, date: '约公元前1600年', title: '商朝建立', summary: '商朝实行内外服制，形成较系统的国家机构，青铜文化繁荣。', significance: '甲骨文和成熟青铜文明为研究早期中华文明提供了重要依据。', region: ['中国'], period: ['古代'], themes: ['政治', '经济', '文化'], source: '/历史/中国史/01-先秦至秦汉' },
  { id: 'china-zhou-1046bc', sortYear: -1046, date: '公元前1046年', title: '西周建立', summary: '周武王灭商，西周推行分封制、宗法制和礼乐制。', significance: '形成家国一体、等级分明的政治秩序，促进疆域开发和华夏认同。', region: ['中国'], period: ['古代'], themes: ['政治', '文化', '社会'], source: '/历史/中国史/01-先秦至秦汉' },
  { id: 'china-spring-autumn-770bc', sortYear: -770, date: '公元前770年', title: '春秋时期开始', summary: '周平王东迁洛邑，王室衰微，诸侯争霸，旧有政治秩序逐渐瓦解。', significance: '社会转型加速，铁犁牛耕、土地制度变化和思想活跃为战国变法创造条件。', region: ['中国'], period: ['古代'], themes: ['政治', '经济', '军事'], source: '/历史/中国史/01-先秦至秦汉' },
  { id: 'world-persia-550bc', sortYear: -550, date: '公元前6世纪', title: '波斯帝国兴起', summary: '波斯人建立地跨亚非欧三洲的大帝国，实行行省制并发展交通。', significance: '推动西亚、北非及地中海地区的政治联系与文化交流。', region: ['世界'], period: ['古代'], themes: ['政治', '军事', '文化'], source: '/历史/世界史/07-史前时代至中古时期' },
  { id: 'china-confucius-551bc', sortYear: -551, date: '公元前551—前479年', title: '孔子生活的时代', summary: '孔子主张仁、为政以德和有教无类，整理传播文化典籍。', significance: '儒家思想成为中华传统文化的重要组成部分，并深刻影响东亚。', region: ['中国'], period: ['古代'], themes: ['文化', '社会'], source: '/历史/中国史/01-先秦至秦汉' },
  { id: 'world-athens-508bc', sortYear: -508, date: '公元前6世纪末', title: '雅典民主政治确立', summary: '克利斯提尼改革推动雅典民主制度形成，公民大会成为权力机关。', significance: '为后世提供直接民主实践，但公民范围有限，具有明显时代局限。', region: ['世界'], period: ['古代'], themes: ['政治'], source: '/历史/世界史/07-史前时代至中古时期' },
  { id: 'china-warring-states-475bc', sortYear: -475, date: '公元前475年', title: '战国时期开始', summary: '兼并战争加剧，各国推行变法，郡县制和官僚制逐渐发展。', significance: '社会由贵族政治走向君主官僚政治，为秦统一奠定制度基础。', region: ['中国'], period: ['古代'], themes: ['政治', '经济', '军事'], source: '/历史/中国史/01-先秦至秦汉' },
  { id: 'china-shangyang-356bc', sortYear: -356, date: '公元前356年起', title: '商鞅变法', summary: '秦国废井田、奖励耕战、推行县制，以法家思想推进改革。', significance: '打击贵族特权，使秦国富强，为后来统一六国奠定基础。', region: ['中国'], period: ['古代'], themes: ['政治', '经济', '军事'], source: '/历史/专题史/12-政治制度与官员选拔' },
  { id: 'world-alexander-334bc', sortYear: -334, date: '公元前334年起', title: '亚历山大东征', summary: '马其顿军队征服波斯并抵达印度河流域，建立横跨欧亚非的帝国。', significance: '战争造成破坏，也促进希腊文化与东方文化的交流融合。', region: ['世界'], period: ['古代'], themes: ['军事', '文化'], source: '/历史/世界史/07-史前时代至中古时期' },
  { id: 'china-qin-221bc', sortYear: -221, date: '公元前221年', title: '秦统一中国', summary: '秦始皇结束长期割据，建立中央集权国家，推广郡县制和统一措施。', significance: '奠定统一多民族国家和专制主义中央集权制度的基本格局。', region: ['中国'], period: ['古代'], themes: ['政治', '经济', '文化', '军事'], source: '/历史/中国史/01-先秦至秦汉' },
  { id: 'china-han-202bc', sortYear: -202, date: '公元前202年', title: '西汉建立', summary: '刘邦建立汉朝，前期实行休养生息，汉武帝时期加强中央集权。', significance: '统一国家进一步巩固，汉文化和中华民族共同体持续发展。', region: ['中国'], period: ['古代'], themes: ['政治', '经济', '社会'], source: '/历史/中国史/01-先秦至秦汉' },
  { id: 'china-silk-road-138bc', sortYear: -138, date: '公元前138年起', title: '张骞出使西域', summary: '张骞两次出使西域，促进汉朝与中亚各地的联系。', significance: '推动丝绸之路畅通，加强中外经济文化交流。', region: ['中国', '世界'], period: ['古代'], themes: ['政治', '经济', '文化'], source: '/历史/专题史/19-文化交流' },
  { id: 'world-roman-27bc', sortYear: -27, date: '公元前27年', title: '罗马帝国建立', summary: '屋大维确立元首制，罗马由共和国进入帝国时期。', significance: '地中海地区长期处于统一政治框架中，罗马法与文化广泛传播。', region: ['世界'], period: ['古代'], themes: ['政治', '军事', '文化'], source: '/历史/世界史/07-史前时代至中古时期' },
  { id: 'china-east-han-25', sortYear: 25, date: '25年', title: '东汉建立', summary: '刘秀重建汉朝，定都洛阳，史称东汉。', significance: '汉代大一统延续，豪强地主势力发展也加剧后期社会矛盾。', region: ['中国'], period: ['古代'], themes: ['政治', '社会'], source: '/历史/中国史/01-先秦至秦汉' },
  { id: 'world-roman-split-395', sortYear: 395, date: '395年', title: '罗马帝国分裂', summary: '罗马帝国分为东西两部分，西罗马日益衰落。', significance: '欧洲历史逐渐进入中古时期，东西方政治文化发展道路分化。', region: ['世界'], period: ['古代'], themes: ['政治', '军事'], source: '/历史/世界史/07-史前时代至中古时期' },
  { id: 'china-northern-wei-439', sortYear: 439, date: '439年', title: '北魏统一北方', summary: '鲜卑拓跋部建立的北魏结束北方长期分裂局面。', significance: '为孝文帝改革和北方民族交融创造条件。', region: ['中国'], period: ['古代'], themes: ['政治', '军事', '社会'], source: '/历史/中国史/02-魏晋至隋唐' },
  { id: 'world-west-rome-476', sortYear: 476, date: '476年', title: '西罗马帝国灭亡', summary: '日耳曼人废黜西罗马末代皇帝，西欧进入封建社会发展阶段。', significance: '传统上被视为西欧古代史结束和中古史开始的重要标志。', region: ['世界'], period: ['古代'], themes: ['政治', '军事', '社会'], source: '/历史/世界史/07-史前时代至中古时期' },
  { id: 'china-xiaowen-494', sortYear: 494, date: '494年', title: '北魏孝文帝迁都洛阳', summary: '孝文帝推进迁都、改汉姓、易服装和通婚姻等改革。', significance: '促进北方民族交融和经济恢复，为隋唐统一繁荣奠定基础。', region: ['中国'], period: ['古代'], themes: ['政治', '文化', '社会'], source: '/历史/中国史/02-魏晋至隋唐' },
  { id: 'china-sui-581', sortYear: 581, date: '581年', title: '隋朝建立', summary: '杨坚建立隋朝，589年结束长期南北分裂。', significance: '重建统一国家，开创科举、三省六部等制度并开通大运河。', region: ['中国'], period: ['古代'], themes: ['政治', '经济'], source: '/历史/中国史/02-魏晋至隋唐' },
  { id: 'world-islam-622', sortYear: 622, date: '622年', title: '伊斯兰教共同体建立', summary: '穆罕默德迁居麦地那，建立政教合一的穆斯林公社。', significance: '推动阿拉伯半岛统一，并影响此后欧亚非的政治和文化格局。', region: ['世界'], period: ['古代'], themes: ['政治', '文化', '社会'], source: '/历史/世界史/07-史前时代至中古时期' },
  { id: 'china-tang-618', sortYear: 618, date: '618年', title: '唐朝建立', summary: '李渊建立唐朝，随后形成统一强盛、开放包容的帝国。', significance: '制度、经济和文化成就突出，中外交流繁荣，中华文化影响扩大。', region: ['中国'], period: ['古代'], themes: ['政治', '经济', '文化'], source: '/历史/中国史/02-魏晋至隋唐' },
  { id: 'china-anshi-755', sortYear: 755, date: '755—763年', title: '安史之乱', summary: '唐朝地方节度使发动叛乱，战争持续八年。', significance: '唐朝由盛转衰，藩镇割据、财政制度和社会结构发生深刻变化。', region: ['中国'], period: ['古代'], themes: ['政治', '军事', '社会'], source: '/历史/中国史/02-魏晋至隋唐' },
  { id: 'china-song-960', sortYear: 960, date: '960年', title: '北宋建立', summary: '赵匡胤建立宋朝，通过收兵权、派文官等措施加强中央集权。', significance: '结束五代十国分裂局面，文官政治发展，但也形成积贫积弱问题。', region: ['中国'], period: ['古代'], themes: ['政治', '军事'], source: '/历史/中国史/03-宋元到明清' },
  { id: 'world-schism-1054', sortYear: 1054, date: '1054年', title: '基督教东西教会分裂', summary: '基督教正式分裂为天主教和东正教。', significance: '深刻影响欧洲宗教、政治与文化区域格局。', region: ['世界'], period: ['古代'], themes: ['文化', '政治'], source: '/历史/世界史/07-史前时代至中古时期' },
  { id: 'china-wang-an-shi-1069', sortYear: 1069, date: '1069年', title: '王安石变法', summary: '宋神宗任用王安石，从财政、军事和教育等方面推行新法。', significance: '一定程度增强国力，也因利益冲突和措施问题最终失败。', region: ['中国'], period: ['古代'], themes: ['政治', '经济', '军事'], source: '/历史/专题史/12-政治制度与官员选拔' },
  { id: 'world-magna-carta-1215', sortYear: 1215, date: '1215年', title: '《大宪章》签署', summary: '英格兰贵族迫使国王接受限制王权的法律文件。', significance: '成为英国限制王权、发展议会政治和法治传统的重要历史资源。', region: ['世界'], period: ['古代'], themes: ['政治'], source: '/历史/专题史/13-法律教化和基层治理' },
  { id: 'china-yuan-1271', sortYear: 1271, date: '1271年', title: '元朝建立', summary: '忽必烈定国号为元，1279年完成全国统一。', significance: '统一多民族国家进一步发展，行省制度影响后世地方行政。', region: ['中国'], period: ['古代'], themes: ['政治', '军事', '社会'], source: '/历史/中国史/03-宋元到明清' },
  { id: 'china-ming-1368', sortYear: 1368, date: '1368年', title: '明朝建立', summary: '朱元璋建立明朝，废丞相并强化皇权。', significance: '君主专制进一步加强，统一多民族国家继续巩固。', region: ['中国'], period: ['古代'], themes: ['政治'], source: '/历史/中国史/03-宋元到明清' },
  { id: 'world-renaissance-1400', sortYear: 1400, date: '14—17世纪', title: '文艺复兴运动', summary: '欧洲新兴资产阶级借复兴古典文化宣扬人文主义。', significance: '冲击宗教神学束缚，推动思想解放和近代自然科学发展。', region: ['世界'], period: ['近代'], themes: ['文化', '社会'], source: '/历史/世界史/08-工场手工业时期' },
  { id: 'china-zheng-he-1405', sortYear: 1405, date: '1405—1433年', title: '郑和下西洋', summary: '明政府组织七次远洋航行，抵达东南亚、印度洋和东非。', significance: '展示明朝国力，促进中国与亚非国家的友好交往和贸易。', region: ['中国', '世界'], period: ['古代'], themes: ['政治', '经济', '文化'], source: '/历史/专题史/19-文化交流' },
  { id: 'world-new-routes-1492', sortYear: 1492, date: '15世纪末—16世纪初', title: '新航路开辟', summary: '欧洲航海家开辟通往美洲和亚洲的新航路，全球联系迅速加强。', significance: '世界市场开始形成，也带来殖民扩张、奴役和疾病传播。', region: ['世界'], period: ['近代'], themes: ['经济', '军事', '社会'], source: '/历史/世界史/08-工场手工业时期' },
  { id: 'world-reformation-1517', sortYear: 1517, date: '1517年起', title: '宗教改革', summary: '马丁·路德发表主张，欧洲多地掀起反对罗马教廷的改革。', significance: '推动思想解放、民族国家发展和资本主义成长。', region: ['世界'], period: ['近代'], themes: ['文化', '政治', '社会'], source: '/历史/世界史/08-工场手工业时期' },
  { id: 'china-zhang-juzheng-1572', sortYear: 1572, date: '1572年起', title: '张居正改革', summary: '张居正整肃吏治、清丈土地、改革赋税并推行一条鞭法。', significance: '增加财政收入、暂缓统治危机，一条鞭法推动赋役货币化。', region: ['中国'], period: ['古代'], themes: ['政治', '经济'], source: '/历史/专题史/12-政治制度与官员选拔' },
  { id: 'world-english-revolution-1640', sortYear: 1640, date: '1640—1688年', title: '英国资产阶级革命', summary: '英国经历内战、共和国、复辟和光荣革命，议会战胜王权。', significance: '君主立宪制逐步确立，为英国资本主义发展提供政治保障。', region: ['世界'], period: ['近代'], themes: ['政治', '军事'], source: '/历史/世界史/08-工场手工业时期' },
  { id: 'china-qing-1644', sortYear: 1644, date: '1644年', title: '清军入关', summary: '清军进入山海关并迁都北京，逐渐建立全国性统治。', significance: '统一多民族国家版图进一步奠定，君主专制达到高峰。', region: ['中国'], period: ['古代'], themes: ['政治', '军事', '社会'], source: '/历史/中国史/03-宋元到明清' },
  { id: 'world-enlightenment-1680', sortYear: 1680, date: '17—18世纪', title: '启蒙运动', summary: '欧洲思想家倡导理性、自由、平等、法治和人民主权。', significance: '为欧美资产阶级革命和近代政治制度提供思想武器。', region: ['世界'], period: ['近代'], themes: ['文化', '政治'], source: '/历史/世界史/08-工场手工业时期' },
  { id: 'world-american-independence-1776', sortYear: 1776, date: '1776年', title: '美国《独立宣言》发表', summary: '北美殖民地宣布脱离英国，阐述天赋人权和人民主权。', significance: '推动美国独立战争，也影响法国大革命和拉丁美洲独立运动。', region: ['世界'], period: ['近代'], themes: ['政治', '军事', '文化'], source: '/历史/世界史/08-工场手工业时期' },
  { id: 'world-industrial-revolution-1765', sortYear: 1765, date: '18世纪60年代起', title: '第一次工业革命', summary: '英国率先以机器生产取代手工劳动，蒸汽动力广泛应用。', significance: '生产力跃升，工厂制度和工业社会形成，世界市场进一步发展。', region: ['世界'], period: ['近代'], themes: ['经济', '社会'], source: '/历史/世界史/09-工业革命时期' },
  { id: 'world-french-revolution-1789', sortYear: 1789, date: '1789年', title: '法国大革命爆发', summary: '巴黎人民攻占巴士底狱，法国封建专制统治受到根本冲击。', significance: '传播自由平等思想，推动欧洲政治制度和社会结构变革。', region: ['世界'], period: ['近代'], themes: ['政治', '军事', '社会'], source: '/历史/世界史/08-工场手工业时期' },
  { id: 'world-communist-manifesto-1848', sortYear: 1848, date: '1848年', title: '《共产党宣言》发表', summary: '马克思、恩格斯系统阐述科学社会主义基本原理。', significance: '标志马克思主义诞生，国际工人运动获得科学理论指导。', region: ['世界'], period: ['近代'], themes: ['文化', '政治', '社会'], source: '/历史/世界史/09-工业革命时期' },
  { id: 'china-opium-war-1840', sortYear: 1840, date: '1840—1842年', title: '鸦片战争', summary: '英国发动侵华战争，清政府战败并签订《南京条约》。', significance: '中国开始沦为半殖民地半封建社会，中国近代史由此开端。', region: ['中国', '世界'], period: ['近代'], themes: ['政治', '经济', '军事'], source: '/历史/中国史/04-晚清到民国初期' },
  { id: 'china-taiping-1851', sortYear: 1851, date: '1851—1864年', title: '太平天国运动', summary: '洪秀全领导大规模农民战争，提出《天朝田亩制度》和《资政新篇》。', significance: '沉重打击清朝统治，也暴露农民阶级和平均主义方案的局限。', region: ['中国'], period: ['近代'], themes: ['政治', '军事', '社会'], source: '/历史/中国史/04-晚清到民国初期' },
  { id: 'china-self-strengthening-1861', sortYear: 1861, date: '19世纪60—90年代', title: '洋务运动', summary: '洋务派以自强、求富为目标创办近代军民用企业和新式教育。', significance: '开启中国近代化实践，促进民族资本主义产生，但未改变封建制度。', region: ['中国'], period: ['近代'], themes: ['经济', '军事', '文化'], source: '/历史/中国史/04-晚清到民国初期' },
  { id: 'world-second-industrial-1870', sortYear: 1870, date: '19世纪70年代起', title: '第二次工业革命', summary: '电力、内燃机、化学工业和通讯技术快速发展。', significance: '生产社会化和垄断组织发展，世界联系更加紧密，列强竞争加剧。', region: ['世界'], period: ['近代'], themes: ['经济', '社会', '军事'], source: '/历史/世界史/09-工业革命时期' },
  { id: 'china-sino-japanese-1894', sortYear: 1894, date: '1894—1895年', title: '甲午中日战争', summary: '清政府战败并签订《马关条约》，民族危机空前加深。', significance: '列强侵华进入新阶段，也推动救亡图存和制度变革思潮高涨。', region: ['中国', '世界'], period: ['近代'], themes: ['政治', '经济', '军事'], source: '/历史/中国史/04-晚清到民国初期' },
  { id: 'china-hundred-days-1898', sortYear: 1898, date: '1898年', title: '戊戌变法', summary: '维新派推动政治、经济、军事和教育改革，历时百余日失败。', significance: '是资产阶级改良运动，也是一场思想启蒙运动。', region: ['中国'], period: ['近代'], themes: ['政治', '经济', '文化'], source: '/历史/中国史/04-晚清到民国初期' },
  { id: 'china-boxer-1900', sortYear: 1900, date: '1900年', title: '八国联军侵华战争', summary: '列强以镇压义和团为名侵华，清政府次年签订《辛丑条约》。', significance: '中国完全陷入半殖民地半封建社会的深渊。', region: ['中国', '世界'], period: ['近代'], themes: ['政治', '军事'], source: '/历史/中国史/04-晚清到民国初期' },
  { id: 'china-revolution-1911', sortYear: 1911, date: '1911年', title: '辛亥革命', summary: '武昌起义引发各省响应，清王朝统治土崩瓦解。', significance: '结束两千多年君主专制制度，建立共和政体并传播民主共和观念。', region: ['中国'], period: ['近代'], themes: ['政治', '军事', '文化'], source: '/历史/中国史/04-晚清到民国初期' },
  { id: 'world-ww1-1914', sortYear: 1914, date: '1914—1918年', title: '第一次世界大战', summary: '帝国主义集团矛盾激化引发世界大战，欧洲成为主要战场。', significance: '造成巨大灾难，削弱欧洲并改变国际格局，推动民族解放运动。', region: ['世界'], period: ['现代'], themes: ['政治', '经济', '军事', '社会'], source: '/历史/世界史/10-两次世界大战时期' },
  { id: 'china-new-culture-1915', sortYear: 1915, date: '1915年起', title: '新文化运动', summary: '陈独秀等倡导民主与科学、新道德和新文学。', significance: '动摇封建思想统治，促进思想解放并为马克思主义传播创造条件。', region: ['中国'], period: ['近代'], themes: ['文化', '社会', '政治'], source: '/历史/中国史/04-晚清到民国初期' },
  { id: 'world-russian-revolution-1917', sortYear: 1917, date: '1917年', title: '俄国十月革命', summary: '布尔什维克领导武装起义，建立世界上第一个社会主义国家。', significance: '开辟人类历史新纪元，推动国际共产主义和民族解放运动。', region: ['世界'], period: ['现代'], themes: ['政治', '军事', '社会'], source: '/历史/世界史/10-两次世界大战时期' },
  { id: 'china-may-fourth-1919', sortYear: 1919, date: '1919年', title: '五四运动', summary: '巴黎和会外交失败引发青年学生和各阶层参加的爱国运动。', significance: '是彻底反帝反封建的爱国革命运动，成为中国新民主主义革命开端。', region: ['中国'], period: ['近代'], themes: ['政治', '文化', '社会'], source: '/历史/中国史/05-新民主主义革命时期' },
  { id: 'china-cpc-1921', sortYear: 1921, date: '1921年', title: '中国共产党成立', summary: '中共一大召开，确立党的名称、奋斗目标和组织原则。', significance: '中国革命有了坚强领导核心，中国人民谋求解放的斗争有了新方向。', region: ['中国'], period: ['近代'], themes: ['政治', '社会'], source: '/历史/中国史/05-新民主主义革命时期' },
  { id: 'world-depression-1929', sortYear: 1929, date: '1929—1933年', title: '资本主义世界经济危机', summary: '美国金融危机迅速扩展到资本主义世界，生产和就业严重萎缩。', significance: '暴露自由放任政策弊端，促成国家干预加强，也加剧法西斯扩张。', region: ['世界'], period: ['现代'], themes: ['经济', '社会', '政治'], source: '/历史/世界史/10-两次世界大战时期' },
  { id: 'china-long-march-1934', sortYear: 1934, date: '1934—1936年', title: '红军长征', summary: '中央红军战略转移，遵义会议纠正错误并确立新的领导核心。', significance: '实现革命转危为安，保存革命力量，铸就长征精神。', region: ['中国'], period: ['近代'], themes: ['政治', '军事'], source: '/历史/中国史/05-新民主主义革命时期' },
  { id: 'china-war-resistance-1937', sortYear: 1937, date: '1937—1945年', title: '全民族抗日战争', summary: '七七事变后中国开展全民族抗战，正面战场与敌后战场相互配合。', significance: '是近代以来中国抗击外敌入侵第一次取得完全胜利的民族解放斗争。', region: ['中国', '世界'], period: ['近代'], themes: ['政治', '军事', '社会'], source: '/历史/中国史/05-新民主主义革命时期' },
  { id: 'world-ww2-1939', sortYear: 1939, date: '1939—1945年', title: '第二次世界大战', summary: '法西斯国家发动侵略战争，世界反法西斯同盟最终取得胜利。', significance: '重塑国际秩序，联合国成立，殖民体系加速瓦解。', region: ['世界'], period: ['现代'], themes: ['政治', '军事', '社会'], source: '/历史/世界史/10-两次世界大战时期' },
  { id: 'world-un-1945', sortYear: 1945, date: '1945年', title: '联合国成立', summary: '各国在反法西斯战争胜利基础上建立新的全球性国际组织。', significance: '以维护国际和平与安全为首要宗旨，成为战后国际秩序的重要支柱。', region: ['世界'], period: ['现代'], themes: ['政治'], source: '/历史/专题史/14-民族关系与国家关系' },
  { id: 'china-prc-1949', sortYear: 1949, date: '1949年10月1日', title: '中华人民共和国成立', summary: '开国大典在北京举行，新中国诞生。', significance: '结束半殖民地半封建社会历史，中国人民从此站起来。', region: ['中国'], period: ['现代'], themes: ['政治', '社会'], source: '/历史/中国史/06-中华人民共和国时期' },
  { id: 'world-cold-war-1947', sortYear: 1947, date: '1947年起', title: '冷战全面展开', summary: '杜鲁门主义出台，美苏在政治、经济、军事和意识形态领域对抗。', significance: '两极格局逐步形成，深刻影响战后国际关系。', region: ['世界'], period: ['现代'], themes: ['政治', '军事', '经济'], source: '/历史/世界史/11-第二次世界大战后' },
  { id: 'china-land-reform-1950', sortYear: 1950, date: '1950—1952年', title: '土地改革', summary: '新解放区废除封建地主土地所有制，农民获得土地。', significance: '解放农村生产力，巩固人民政权并为工业化创造条件。', region: ['中国'], period: ['现代'], themes: ['经济', '社会', '政治'], source: '/历史/中国史/06-中华人民共和国时期' },
  { id: 'china-first-five-year-1953', sortYear: 1953, date: '1953—1957年', title: '第一个五年计划', summary: '国家集中力量发展重工业，并推进社会主义工业化建设。', significance: '开始改变工业落后面貌，初步建立独立工业体系基础。', region: ['中国'], period: ['现代'], themes: ['经济'], source: '/历史/中国史/06-中华人民共和国时期' },
  { id: 'china-constitution-1954', sortYear: 1954, date: '1954年', title: '第一届全国人大与五四宪法', summary: '第一届全国人大召开，通过《中华人民共和国宪法》。', significance: '人民代表大会制度确立，社会主义民主政治建设取得重要成果。', region: ['中国'], period: ['现代'], themes: ['政治'], source: '/历史/中国史/06-中华人民共和国时期' },
  { id: 'world-bandung-1955', sortYear: 1955, date: '1955年', title: '万隆会议', summary: '亚非国家独立自主召开会议，倡导团结、友谊与合作。', significance: '亚非国家作为新兴政治力量登上国际舞台，推动民族解放运动。', region: ['世界'], period: ['现代'], themes: ['政治', '文化'], source: '/历史/世界史/11-第二次世界大战后' },
  { id: 'china-socialist-system-1956', sortYear: 1956, date: '1956年', title: '社会主义基本制度确立', summary: '农业、手工业和资本主义工商业社会主义改造基本完成。', significance: '生产资料公有制占主导，进入社会主义初级阶段。', region: ['中国'], period: ['现代'], themes: ['经济', '政治', '社会'], source: '/历史/中国史/06-中华人民共和国时期' },
  { id: 'world-european-community-1967', sortYear: 1967, date: '1967年', title: '欧洲共同体成立', summary: '欧洲煤钢共同体等机构合并，西欧一体化进一步发展。', significance: '增强西欧经济政治实力，推动世界多极化趋势。', region: ['世界'], period: ['现代'], themes: ['经济', '政治'], source: '/历史/世界史/11-第二次世界大战后' },
  { id: 'china-un-seat-1971', sortYear: 1971, date: '1971年', title: '中国恢复联合国合法席位', summary: '第26届联合国大会恢复中华人民共和国在联合国的一切合法权利。', significance: '中国国际地位提高，发展中国家力量增强。', region: ['中国', '世界'], period: ['现代'], themes: ['政治'], source: '/历史/中国史/06-中华人民共和国时期' },
  { id: 'china-us-1972', sortYear: 1972, date: '1972年', title: '中美关系开始正常化', summary: '尼克松访华，中美发表《上海公报》。', significance: '结束长期隔绝，对国际格局和中国外交产生深远影响。', region: ['中国', '世界'], period: ['现代'], themes: ['政治'], source: '/历史/中国史/06-中华人民共和国时期' },
  { id: 'china-reform-1978', sortYear: 1978, date: '1978年', title: '改革开放起步', summary: '中共十一届三中全会作出工作中心转移和改革开放的历史性决策。', significance: '开启社会主义现代化建设新时期，深刻改变中国发展进程。', region: ['中国'], period: ['现代'], themes: ['政治', '经济', '社会'], source: '/历史/中国史/06-中华人民共和国时期' },
  { id: 'world-cold-war-end-1991', sortYear: 1991, date: '1991年', title: '苏联解体与两极格局瓦解', summary: '苏联解体，持续数十年的美苏两极对峙结束。', significance: '世界多极化趋势继续发展，国际关系进入深刻调整期。', region: ['世界'], period: ['现代'], themes: ['政治', '经济'], source: '/历史/世界史/11-第二次世界大战后' },
  { id: 'china-hong-kong-1997', sortYear: 1997, date: '1997年7月1日', title: '香港回归祖国', summary: '中国政府恢复对香港行使主权，一国两制由构想变为实践。', significance: '祖国统一大业取得重要进展，也为解决历史遗留问题提供新范例。', region: ['中国'], period: ['现代'], themes: ['政治'], source: '/历史/中国史/06-中华人民共和国时期' },
  { id: 'china-wto-2001', sortYear: 2001, date: '2001年', title: '中国加入世界贸易组织', summary: '中国正式成为世界贸易组织成员，更深程度参与经济全球化。', significance: '推动改革开放和经济发展，也促进世界经济贸易增长。', region: ['中国', '世界'], period: ['现代'], themes: ['经济', '政治'], source: '/历史/中国史/06-中华人民共和国时期' },
  { id: 'china-new-era-2012', sortYear: 2012, date: '2012年起', title: '中国特色社会主义进入新时代', summary: '中共十八大以来，党和国家事业取得历史性成就、发生历史性变革。', significance: '全面深化改革持续推进，中华民族伟大复兴进入新的历史进程。', region: ['中国'], period: ['现代'], themes: ['政治', '经济', '社会'], source: '/历史/中国史/06-中华人民共和国时期' }
]

export function validateHistoryEvents(events = historyEvents) {
  const errors = []
  const ids = new Set()
  const required = ['id', 'sortYear', 'date', 'title', 'summary', 'significance', 'source']

  events.forEach((event, index) => {
    const label = event.id || `第 ${index + 1} 条`
    required.forEach(field => {
      if (event[field] === undefined || event[field] === null || event[field] === '') errors.push(`${label} 缺少 ${field}`)
    })
    if (ids.has(event.id)) errors.push(`${label} 的 id 重复`)
    ids.add(event.id)
    if (!Number.isFinite(event.sortYear)) errors.push(`${label} 的 sortYear 不是有效数字`)
    if (!Array.isArray(event.region) || event.region.some(value => !timelineRegions.includes(value))) errors.push(`${label} 的 region 无效`)
    if (!Array.isArray(event.period) || event.period.some(value => !timelinePeriods.includes(value))) errors.push(`${label} 的 period 无效`)
    if (!Array.isArray(event.themes) || event.themes.some(value => !timelineThemes.includes(value))) errors.push(`${label} 的 themes 无效`)
    if (typeof event.source !== 'string' || !event.source.startsWith('/历史/')) errors.push(`${label} 的 source 必须指向历史资料页`)
  })

  return errors
}

export const historyTimelineDataVersion = '2026-08-06-v1'
