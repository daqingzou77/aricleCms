
// 历史文章
const historicalArticles = [{
  key: 1,
  articlename: '《出师表》-诸葛亮',
  description: '臣亮言：先帝创业未半，而中道崩殂；今天下三分，益州疲敝，此诚危急存亡之秋也。',
  articleImgSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583586132223&di=1d02fb82f693ea532c5857d5ccf51316&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F9vo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F42a98226cffc1e17936c63bf4490f603728de969.jpg',
  href: 'https://zhidao.baidu.com/question/381970479.html?fr=iks&word=%C7%B0%B3%F6%CA%A6%B1%ED&ie=gbk',
  favorites: '41392',
  likes: '178322',
  dislikes: '623',
  messages: '23990'
}, {
  key: 2,
  articlename: '《兰亭集序》-王羲之',
  description: '永和九年，岁在癸丑，暮春之初，会于会稽山阴之兰亭，修禊事也。群贤毕至，少长咸集。此地有崇山峻岭，茂林修竹，又有清流激湍，映带左右，引以为流觞曲水，列坐其次。',
  articleImgSrc: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2083057444,649670978&fm=26&gp=0.jpg',
  href: 'https://baike.baidu.com/item/%E5%85%B0%E4%BA%AD%E9%9B%86%E5%BA%8F/199614?fr=aladdin',
  favorites: '38528',
  likes: '14621',
  dislikes: '512',
  messages: '25423'
}, {
  key: 3,
  articlename: '《六国论》-苏洵',
  description: '《六国论》是苏洵史论文代表作品。《六国论》提出并论证了六国灭亡“弊在赂秦”的精辟论点。',
  articleImgSrc: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2121481817,3971830563&fm=26&gp=0.jpg',
  href: 'https://baike.baidu.com/item/%E5%85%AD%E5%9B%BD%E8%AE%BA/203?fr=aladdin',
  favorites: '34212',
  likes: '12032',
  dislikes: '781',
  messages: '19239'
}, {
  key: 4,
  articlename: '《过秦论》-贾谊',
  description: '《过秦论》是贾谊政论散文的代表作，分上中下三篇。全文从各个方面分析秦王朝的过失，故名为《过秦论》。',
  articleImgSrc: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=283905675,2635476445&fm=26&gp=0.jpg',
  href: 'https://baike.baidu.com/item/%E8%BF%87%E7%A7%A6%E8%AE%BA/335641?fr=aladdin',
  favorites: '27128',
  likes: '11261',
  dislikes: '771',
  messages: '11290'
}, {
  key: 5,
  articlename: '《报任安书》-司马迁',
  description: '《报任安书》是汉代史学家、文学家司马迁所著。作者在信中以激愤的心情，陈述了自己的不幸遭遇，抒发了为著作《史记》而不得不含垢忍辱苟且偷生的痛苦心情。',
  articleImgSrc: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1097885451,3446908923&fm=26&gp=0.jpg',
  href: 'https://baike.baidu.com/item/%E6%8A%A5%E4%BB%BB%E5%AE%89%E4%B9%A6/4179955?fr=aladdin',
  favorites: '20258',
  likes: '9831',
  dislikes: '642',
  messages: '12091'
}, {
  key: 6,
  articlename: '《与山巨源绝交书》-嵇康',
  description: '信中拒绝了山涛的荐引，指出人的秉性各有所好，申明他自己赋性疏懒，不堪礼法约束，不可加以勉强。',
  articleImgSrc: 'http://img5.imgtn.bdimg.com/it/u=1574658998,2616562293&fm=26&gp=0.jpg',
  href: 'https://baike.baidu.com/item/%E4%B8%8E%E5%B1%B1%E5%B7%A8%E6%BA%90%E7%BB%9D%E4%BA%A4%E4%B9%A6/10995636?fr=aladdin',
  favorites: '19858',
  likes: '10106',
  dislikes: '728',
  messages: '9201'
}, {
  key: 7,
  articlename: '《滕王阁序》-王勃',
  description: '《滕王阁序》是唐代文学家王勃创作的一篇骈文。文章由洪州的地势、人才写到宴会，写滕王阁的壮丽，眺望的广远，扣紧秋日，景色鲜明。',
  articleImgSrc: 'http://cdnimg103.lizhi.fm/audio_cover/2018/03/04/2656278857321341959_320x320.jpg',
  href: 'https://baike.baidu.com/item/%E6%BB%95%E7%8E%8B%E9%98%81%E5%BA%8F/480325?fr=aladdin',
  favorites: '17210',
  likes: '9231',
  dislikes: '896',
  messages: '10117'
}
];

const historicalStorys = [{
  key: 1,
  description: '元宵节的由来',
  detail: '据记载，两千多年前，周勃平定“诸吕之乱”后，汉文帝上台，鉴于平定之日是正月十五日，于是，汉文帝每年这天夜晚，便出宫游玩，和老百姓同乐。在古语中，“夜”又叫“宵”，“正月”又称“元月”，因而汉文帝将正月十五日定为“元宵节”。从此，人们便在元月十五日的晚上，在自家门前张灯结彩，喜气洋洋地欢度元宵节。'
}, {
  key: 2,
  description: '东条英机自杀细节披露：拿手枪朝心脏开枪',
  detail: '东条英机，再熟悉不过的名字。在七名被判处绞刑的甲级战犯中，东条英机的“知名度”应该是最高的。这不但因为他所犯下的滔天罪行，还因为那场没有成功的自杀。很多书上都说东条英机是畏罪自杀。其实，如果仔细研究他自杀的细节，就会发现有诸多不合常理的行为，这些行为说明他并不想死，他的自杀行为完全就是一场闹剧。'
}, {
  key: 3,
  description: '范仲淹断齑划粥 ',
  detail: '北宋著名学者、政治家、军事家范仲淹在童年时期，就酷爱读书。由于家境清贫，上不起学，10岁时住进长山醴泉寺的僧房里发愤苦读，每天煮一小盆稀粥，凝结后，用刀划成四块，早晚各取两块，再切几根咸菜，就着吃下去。这就是后世传为佳话的“断齑划粥”的故事。'
}, {
  key: 4,
  description: '少年包拯学断案',
  detail: '包拯包青天，自幼聪颖，勤学好问，尤喜推理断案，其家父与知县交往密切，包拯从小耳濡目染，学会了不少的断案知识，尤其在焚庙杀僧一案中，包拯根据现场的蛛丝马迹，剥茧抽丝，排查出犯罪嫌疑人后，又假扮阎王，审清事实真相，协助知县缉拿凶手，为民除害。他努力学习律法刑理知识，为长大以后断案如神，为民伸冤，打下了深厚的知识基础。'
}, {
  key: 5,
  description: '司马光警枕励志',
  detail: '司马光是个贪玩贪睡的孩子，为此他没少受先生的责罚和同伴的嘲笑，在先生的谆谆教诲下，他决心改掉贪睡的坏毛病，为了早早起床，他睡觉前喝了满满一肚子水，结果早上没有被憋醒，却尿了床，于是聪明的司马光用园木头作了一个警枕，早上一翻身，头滑落在床板上，自然惊醒，从此他天天早早地起床读书，坚持不懈，终于成为了一个学识渊博的，写出了《资治通鉴》的大文豪。'
}, {
  key: 6,
  description: '纸上谈兵',
  detail: '战国时，战国名将赵奢的儿子赵括饱读兵书，能健谈用兵之道，连父亲也难不倒他，自认为是天下无敌。赵奢认为他是纸上谈兵不知交通。后来赵奢死了，赵括顶替廉颇带兵，蔺相如等人极力反对，赵王坚持，赵括在长平之战中损兵40万。'
}, {
  key: 7,
  description: '孙权赔了夫人又折兵',
  detail: '东汉末年三国争霸时期，孙权想取回荆州，周瑜献计“假招亲扣人质”。诸葛亮识破，安排赵云陪伴前往，先拜会周瑜的岳父乔公，乔公说动吴国太在甘露寺见面，吴国太真的将孙尚香嫁给刘备。孙权与周瑜被人嘲笑“周郎妙计安天下，赔了夫人又折兵”。'
}, {
  key: 8,
  description: '陈平忍辱苦读书',
  detail: '所不容，为了消弭兄嫂的矛盾。面对大嫂一再羞辱，隐忍不发，随着大嫂的变本加厉，终于忍无可忍，出走离家，欲浪迹天涯，被哥哥追回后，又不计前嫌，阻兄休嫂，在当地传为美谈。'
}, {
  key: 9,
  description: '何充反驳王敦',
  detail: '王含作庐江郡郡守的时候，贪污很厉害。王敦袒护他的哥哥，有意在与很多人说话时夸口说：“我的哥哥在庐江郡一定做得很好，庐江郡的人都称赞他。”当时何充担任王敦的文书，也在座，就脸色严肃地说：“我何充就是庐江郡的人，我所听到的与这种说法不同。”王敦一下子没话可说了。在座的其他人都为何充担心，很不安。而何充显得态度平和，神色自如，和平常一样。'
}, {
  key: 10,
  description: '一鸣惊人:',
  detail: '相传楚庄王(另一说为齐威王)临政三年终日作乐,不理朝政。一臣下对庄王说:“听说国中有一只大鸟,三年不飞,三年不鸣,是怎么回事?”庄王说:“此鸟不飞则已,一飞冲天;不鸣则已,一鸣惊人。”然后整顿朝政,富国强兵,短短数年形成大治局面。'
}, {
  key: 11,
  description: '爱国英雄戚继光',
  detail: '戚继光是明朝著名的爱国将领，他出身在将门，受父亲教育影响，从小喜爱军事，并立志做一个正直的文武全才的军人。当时，中国的沿海常常受到倭寇的 侵扰, 戚继光十分痛恨倭寇的暴行，十六岁时，他曾经写下一首诗：“封侯非我愿，但愿海波平。”意思是说，做官并不是他的愿望，他的愿望是祖国海疆的平静。'
}, {
  key: 12,
  description: '破釜沉舟',
  detail: '秦朝末年，秦王派大将章邯带20万大军进攻诸侯国赵国，赵王派人向楚王求援，楚王让宋义挂帅，项羽辅佐率军救援，宋义故意拖延时机，项羽杀了宋义并率军渡过漳水去援赵，他们把锅砸了，把船沉入江底，作生死决战，终于击败秦军。'
}, {
  key: 13,
  description: '三迁之教',
  detail: '战国时期，孟子小时候非常聪明，经常模仿送葬人吹喇叭，孟母担心他荒废学业就把家搬到城里，刚好旁边是一个屠宰场，孟子很快就学会了杀猪宰羊，孟母只好搬家到一个学校附近，从此孟子就开始学习孔子的思想而成为一代思想家。'
}, {
  key: 14,
  description: '牧野之战',
  detail: '公元前1050年，西伯侯姬昌因病去世，其子姬发继位。姬发继位后，继承其父的遗志，任命姜尚为宰相，大力发展周国的军事和经济实力，为能够抗衡商朝做准备。经过充足的准备，姬发于公元前1046年发动了牧野之战。商纣王听闻姬发造反，很是震惊。但当时士兵人数不够，于是商纣王就用奴隶来充数，派他们前去迎战。姬发所率领的军队气势如虹，最终取得牧野之战的胜利。'
}, {
  key: 15,
  description: '淝水之战',
  detail: '公元383年发生的淝水之战，是偏安江左的东晋王朝同北方氏族贵族建立的前秦政权之间进行的一次战略性大决战。战争的结果，是弱小的东晋军队临危不乱，利用前秦统治者苻坚战略决策上的失误和前秦军队战术部署上的不当而大获全胜，成为中国历史上以弱胜强的著名战例之一。'
}, {
  key: 16,
  description: '望梅止渴的故事',
  detail: '一年夏天，曹操率兵去讨伐张绣，天气很热，行军速度很慢。曹操担心贻误战机，就对士兵说：我知道前面有一大片梅林，那里的梅子又大又好吃，我们快点赶路，绕过这个山丘就到梅林了！”士兵们一听，仿佛已经吃到嘴里，精神大振，步伐不由得加快了许多。'
}]

export default {
  historicalArticles,
  historicalStorys
}