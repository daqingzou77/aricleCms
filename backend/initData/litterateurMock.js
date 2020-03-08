// 热门文章
const hotLitterateurs = [{
  key: 1,
  articlename: '《匆匆》-朱自清',
  description: '燕子去了，有再来的时候；杨柳枯了，有再青的时候；桃花谢了，有再开的时候。但是，聪明的，你告诉我，我们的日子为什么一去不复返呢？',
  articleImgSrc: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2789062348,1002085452&fm=26&gp=0.jpg',
  href: 'https://zhidao.baidu.com/question/21816886.html?qbl=relate_question_0&word=%B4%D2%B4%D2',
  favorites: '27812',
  likes: '62712',
  dislikes: '421',
  messages: '62821'
}, {
  key: 2,
  articlename: '《骆驼祥子》-老舍',
  description: '今天买上了新车，就算是生日吧，人的也是车的，好记，而且车既是自己的心血，简直没什么不可以把人与车算在一块的地方。',
  articleImgSrc: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=994103856,3948510057&fm=26&gp=0.jpg',
  href: 'https://www.ppzuowen.com/book/luotuoxiangzi/',
  favorites: '21985',
  likes: '57231',
  dislikes: '328',
  messages: '59411'
}, {
  key: 3,
  articlename: '《荷塘月色》-朱自清',
  description: '层层的叶子中间，零星地点缀着些白花，有袅娜地开着的，有羞涩地打着朵儿的；正如一粒粒的明珠，又如碧天里的星星，又如刚出浴的美人。',
  articleImgSrc: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3956095388,4232370697&fm=26&gp=0.jpg',
  href: 'http://www.ccview.net/htm/xiandai/zzq/zzqsw002.htm',
  favorites: '20743',
  likes: '55602',
  dislikes: '634',
  messages: '58298'
}, {
  key: 4,
  articlename: '《围城》-钱钟书',
  description: '《围城》是钱钟书所著的长篇小说，是中国现代文学史上一部风格独特的讽刺小说。被誉为“新儒林外史”。',
  articleImgSrc: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3064661720,2381465718&fm=26&gp=0.jpg',
  href: 'https://baike.baidu.com/item/%E5%9B%B4%E5%9F%8E/2068378?fr=aladdin',
  favorites: '18235',
  likes: '52198',
  dislikes: '778',
  messages: '52189'
}, {
  key: 5,
  articlename: '《平凡的世杰》-路遥',
  description: '《平凡的世界》是中国作家路遥创作的一部百万字的小说。这是一部全景式地表现中国当代城乡社会生活的长篇小说，全书共三部。1986年12月首次出版。',
  articleImgSrc: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3866858577,1028212750&fm=26&gp=0.jpg',
  href: 'https://baike.baidu.com/item/%E5%B9%B3%E5%87%A1%E7%9A%84%E4%B8%96%E7%95%8C/166?fr=aladdin',
  favorites: '17541',
  likes: '50482',
  dislikes: '560',
  messages: '50673'
}, {
  key: 6,
  articlename: '《呐喊》-鲁迅',
  description: '作品通过写实主义、象征主义、浪漫主义等多种手法，以传神的笔触和“画眼睛”、“写灵魂”的艺术技巧，形象生动地塑造了狂人、孔乙己、阿Q等一批不朽的艺术形象',
  articleImgSrc: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3999102625,2824369170&fm=26&gp=0.jpg',
  href: 'https://baike.baidu.com/item/%E5%91%90%E5%96%8A/2647540',
  favorites: '15772',
  likes: '49123',
  dislikes: '609',
  messages: '45098'
}, {
  key: 7,
  articlename: '《冰心小说集》-冰心',
  description: '《冰心小说集》是1933年上海北新书局出版的图书，作者是冰心。该书收录了冰心大量的优秀小说、散文，旨在提高读者的文化修养。',
  articleImgSrc: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1837052703,199509905&fm=26&gp=0.jpg',
  href: 'https://baike.baidu.com/item/%E5%86%B0%E5%BF%83%E5%B0%8F%E8%AF%B4%E9%9B%86/3230243?fr=aladdin',
  favorites: '13762',
  likes: '42371',
  dislikes: '772',
  messages: '42851'
}];

// 优美句子
const excerpts = [
  {
    key: 1,
    description: '爱你的夜真美，想你的夜真长久，离别的夜真无情。',
    detail: ''
  },
  {
    key: 2,
    description: '聚散离别在泉城，夏日轮回事如风。',
    detail: ''
  },
  {
    key: 3,
    description: '有一种离别，是擦着眼泪，不敢回首。',
    detail: ''
  },
  {
    key: 4,
    description: '杨柳枝，芳菲节，所恨年年赠离别。一朝春尽红颜老，纵使君来岂堪折。',
    detail: ''
  },
  {
    key: 5,
    description: '执意东南的风筝 无法抵达的近 扯线人双手的瘾 难以戒除的远 风衔着离别 谁在十指生茧',
    detail: ''
  },
  {
    key: 6,
    description: '离别就像是硬币的正反面，纸质邂逅方才成立，预期为离别惋惜，不如为邂逅喜悦。',
    detail: ''
  },
  {
    key: 7,
    description: '独登楼，雁声断秋，相思苦，何时休? 送友行，月姣光清，离别愁，无尽头。',
    detail: ''
  },
  {
    key: 8,
    description: '在与身边的人怄气或者没有做到友善后，我总是会懊恼;在与亲人分别时，我总会从心底里产生一种忐忑，害怕此番离别是诀别。',
    detail: ''
  },
  {
    key: 9,
    description: '离别对于爱情，就像风对于火一样：它熄灭了火星，但却能煽起狂焰。',
    detail: ''
  },
  {
    key: 10,
    description: '念去去 千里烟波 暮霭沉沉楚天阔 人生自古多离别 更那堪冷落清秋节。',
    detail: ''
  },
  {
    key: 11,
    description: '我可以微笑着听你说你们的故事，但真的打不起笑脸听你说你们的关系。',
    detail: ''
  },
  {
    key: 12,
    description: '想洗澡吗？不要到外面等待下雨；想成功吗？不要空等机遇的到来。',
    detail: ''
  },
  {
    key: 13,
    description: '听见某个名字，想起某些事情，这个城市安静的让人心颤。',
    detail: ''
  },
  {
    key: 14,
    description: '走完同一条街，回到两个世界。',
    detail: ''
  },
  {
    key: 15,
    description: '每个人都有一段悲伤，想隐藏却欲盖弥彰。',
    detail: ''
  },
];

export default {
  hotLitterateurs,
  excerpts
}
