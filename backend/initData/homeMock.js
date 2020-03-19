   // 每日更新  
   const list = [{
     id: `fake-list-1`,
     title: '边城',
     imgSrc: 'http://localhost:9999/images/cover/biancheng.jpg',
     description: '《边城》是沈从文创作的中篇小说，首次出版于1934年。该小说以20世纪30年代川湘交界的边城小镇茶峒为背景，以兼具抒情诗和小品文的优美笔触，描绘了湘西地区特有的风土人情；借船家少女翠翠的纯爱故事，展现出了人性的善良美好。',
   }, {
     id: `fake-list-2`,
     title: '平凡的世界',
     imgSrc: 'http://localhost:9999/images/cover/pingfanshijie.jpg',
     description: '《平凡的世界》以孙少安和孙少平两兄弟为中心，刻画了当时社会各阶层众多普通人的形象；劳动与爱情、挫折与追求、痛苦与欢乐、日常生活与巨大社会冲突纷繁地交织在一起，深刻地展示了普通人在大时代历史进程中所走过的艰难曲折的道路。'
   }, {
     id: `fake-list-3`,
     title: '围城',
     imgSrc: 'http://localhost:9999/images/cover/weicheng.jpg',
     description: '《围城》是钱钟书所著的长篇小说，是中国现代文学史上一部风格独特的讽刺小说。被誉为“新儒林外史”。第一版于1947年由上海晨光出版公司出版。故事主要写抗战初期知识分子的群相。'
   }, {
     id: `fake-list-1`,
     title: '红高粱',
     imgSrc: 'http://localhost:9999/images/cover/honggaoliang.jpg',
     description: '《红高粱》是一部表现高密人民在抗日战争中的顽强生命力和充满血性与民族精神的经典之作，从民间的角度给读者再现了抗日战争的年代，展现的是一种为生存而奋起反抗的暴力欲。'
   }]

   // 热门作者
   const listData = [{
     name: '朱自清',
     href: 'https://baike.baidu.com/item/%E6%9C%B1%E8%87%AA%E6%B8%85/106017?fr=aladdin',
     avatar: 'http://localhost:9999/images/cover/zhuziqing.jpg',
     description: '散文家、诗人、学者。代表作：《春》《绿》《背影》《荷塘月色》《匆匆》',
     favorites: '1.1K',
     likes: '12K',
     dislikes: '253',
     messages: '25K'
   }, {
     name: '莫言',
     herf: 'https://baike.baidu.com/item/%E8%8E%AB%E8%A8%80/941736',
     avatar: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=23b696f50255b3199cf985737b92e51b/55e736d12f2eb9381725a006dd628535e4dd6ffe.jpg',
     description: '作者。代表作：《红高粱家族》《檀香刑》《丰乳肥臀》',
     favorites: '0.53K',
     likes: '8.7K',
     dislikes: '179',
     messages: '13K'
   }, {
     name: '老舍',
     href: ' https://baike.baidu.com/item/%E8%80%81%E8%88%8D/193756?fr=aladdin',
     avatar: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=988f53a3f0edab64607f4592965fc4a6/3bf33a87e950352afadc08605843fbf2b2118b1c.jpg',
     description: '小说家，作家，语言大师，人民艺术家。代表作：《骆驼祥子》《四世同堂》《茶馆》',
     favorites: '0.22K',
     likes: '4.8K',
     dislikes: '271',
     messages: '12.4K'
   }];

   // 热门文章
   const hotArticles = [{
     articlename: '《匆匆》-朱自清',
     description: '燕子去了，有再来的时候；杨柳枯了，有再青的时候；桃花谢了，有再开的时候。但是，聪明的，你告诉我，我们的日子为什么一去不复返呢？',
     articleImgSrc: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2789062348,1002085452&fm=26&gp=0.jpg',
     href: 'https://zhidao.baidu.com/question/21816886.html?qbl=relate_question_0&word=%B4%D2%B4%D2',
     favorites: '2K',
     likes: '134K',
     dislikes: '561',
     messages: '12k'
   }, {
     articlename: '《骆驼祥子》-老舍',
     description: '今天买上了新车，就算是生日吧，人的也是车的，好记，而且车既是自己的心血，简直没什么不可以把人与车算在一块的地方。',
     articleImgSrc: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=994103856,3948510057&fm=26&gp=0.jpg',
     href: 'https://www.ppzuowen.com/book/luotuoxiangzi/',
     favorites: '1.5K',
     likes: '83K',
     dislikes: '420',
     messages: '6.3K'
   }, {
     articlename: '《荷塘月色》-朱自清',
     description: '层层的叶子中间，零星地点缀着些白花，有袅娜地开着的，有羞涩地打着朵儿的；正如一粒粒的明珠，又如碧天里的星星，又如刚出浴的美人。',
     articleImgSrc: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3956095388,4232370697&fm=26&gp=0.jpg',
     href: 'http://www.ccview.net/htm/xiandai/zzq/zzqsw002.htm',
     favorites: '923',
     likes: '53K',
     dislikes: '634',
     messages: '6.4K'
   }];

   // 高亮神评
   const hotComments = [{
     commenter: '走打球大气',
     commentObject: '婷婷酱',
     commentContent: '我多想再爱你一次，我的太阳~',
     commentStars: '22K',
     commentsDislike: '1.2K'
   }, {
     commenter: '林刚',
     commentObject: '哪来的小妹',
     commentContent: '哪来的？？？',
     commentStars: '17.2K',
     commentsDislike: '3K'
   }, {
     commenter: '寸寸237',
     commentObject: '相个大恒库',
     commentContent: '快要开工啦，别睡觉哈~',
     commentStars: '12.9K',
     commentsDislike: '2.6K'
   }, {
     commenter: '是解释不结实',
     commentObject: '洗发水👉02',
     commentContent: '借点用用',
     commentStars: '12.3K',
     commentsDislike: '4K'
   }, {
     commenter: '这个有点男',
     commentObject: '太难了，兄弟',
     commentContent: 'bro，肿么了？',
     commentStars: '11.5',
     commentsDislike: '3.3K'
   }, {
     commenter: '唐曾是你',
     commentObject: '老唐是我',
     commentContent: '知道了，臭弟弟~',
     commentStars: '9.2K',
     commentsDislike: '3.6K'
   }, {
     commenter: '问要个问药',
     commentObject: '无情的老虎钳',
     commentContent: '说着的有点疼！！',
     commentStars: '8.2K',
     commentsDislike: '4K'
   }];

   export default {
    list,
    listData,
    hotArticles,
    hotComments
   }