   // 头像颜色 
   const avatarColor = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#f32432', '#2322d1', "#fff146"];

    // 热门文章
    const hotArticles = [{
        key: 'hot1',
        articlename: '《匆匆》-朱自清',
        description: '燕子去了，有再来的时候；杨柳枯了，有再青的时候；桃花谢了，有再开的时候。但是，聪明的，你告诉我，我们的日子为什么一去不复返呢？',
        articleImgSrc: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3956095388,4232370697&fm=26&gp=0.jpg',
        href: 'https://zhidao.baidu.com/question/21816886.html?qbl=relate_question_0&word=%B4%D2%B4%D2',
        favorites: '2K',
        likes: '134K',
        dislikes: '561',
        messages: '12k'
      }, {
        key: 'hot2',
        articlename: '《骆驼祥子》-老舍',
        description: '今天买上了新车，就算是生日吧，人的也是车的，好记，而且车既是自己的心血，简直没什么不可以把人与车算在一块的地方。',
        articleImgSrc: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3956095388,4232370697&fm=26&gp=0.jpg',
        href: 'https://www.ppzuowen.com/book/luotuoxiangzi/',
        favorites: '1.5K',
        likes: '83K',
        dislikes: '420',
        messages: '6.3K'
      }, {
        key: 'hot3',
        articlename: '《荷塘月色》-朱自清',
        description: '层层的叶子中间，零星地点缀着些白花，有袅娜地开着的，有羞涩地打着朵儿的；正如一粒粒的明珠，又如碧天里的星星，又如刚出浴的美人。',
        articleImgSrc: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3956095388,4232370697&fm=26&gp=0.jpg',
        href: 'http://www.ccview.net/htm/xiandai/zzq/zzqsw002.htm',
        favorites: '923',
        likes: '53K',
        dislikes: '634',
        messages: '6.4K'
      }];
  
      //  实时更新
      const dailyUpdate = [{
        author: '小橘',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        updateContent: '更新小说《犯罪现场》第三节',
        updateTime: new Date(),
      }, {
        author: '小黑',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        updateContent: '上传附件-落日下的余晖.doc',
        updateTime: new Date(),
      }, {
        author: 'yellow336',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        updateContent: '发布散文《秋意》',
        updateTime: new Date(),
      }, {
        author: 'daqing',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        updateContent: '发布短文《两心相悦》',
        updateTime: new Date(),
      }, {
        author: '婷婷701',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        updateContent: '上传附件-这不是真的爱情.doc',
        updateTime: new Date(),
      }, {
        author: '小猪有点皮',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        updateContent: '发布短文《山下农民》',
        updateTime: new Date(),
      }, {
        author: '早更晚更的都更',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        updateContent: '更新小说《校园奇幻漂流》',
        updateTime: new Date(),
      }];

      const scienceTips = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
      ];

      export {
        avatarColor,
        hotArticles,
        dailyUpdate,
        scienceTips
      }
      