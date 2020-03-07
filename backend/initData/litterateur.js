    // 热门文章
    const hotLitterateurs = [{
        key: 'hot1',
        articlename: '《匆匆》-朱自清',
        description: '燕子去了，有再来的时候；杨柳枯了，有再青的时候；桃花谢了，有再开的时候。但是，聪明的，你告诉我，我们的日子为什么一去不复返呢？',
        articleImgSrc: 'http://img0.imgtn.bdimg.com/it/u=2085508379,2073110359&fm=26&gp=0.jpg',
        href: 'https://zhidao.baidu.com/question/21816886.html?qbl=relate_question_0&word=%B4%D2%B4%D2',
        favorites: '27812',
        likes: '62712',
        dislikes: '421',
        messages: '62821'
      }, {
        key: 'hot2',
        articlename: '《骆驼祥子》-老舍',
        description: '今天买上了新车，就算是生日吧，人的也是车的，好记，而且车既是自己的心血，简直没什么不可以把人与车算在一块的地方。',
        articleImgSrc: 'http://img1.imgtn.bdimg.com/it/u=1367415601,2647267926&fm=26&gp=0.jpg',
        href: 'https://www.ppzuowen.com/book/luotuoxiangzi/',
        favorites: '21985',
        likes: '57231',
        dislikes: '328',
        messages: '59411'
      }, {
        key: 'hot3',
        articlename: '《荷塘月色》-朱自清',
        description: '层层的叶子中间，零星地点缀着些白花，有袅娜地开着的，有羞涩地打着朵儿的；正如一粒粒的明珠，又如碧天里的星星，又如刚出浴的美人。',
        articleImgSrc: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3956095388,4232370697&fm=26&gp=0.jpg',
        href: 'http://www.ccview.net/htm/xiandai/zzq/zzqsw002.htm',
        favorites: '20743',
        likes: '55602',
        dislikes: '634',
        messages: '58298'
      }, {
        key: 'hot4',
        articlename: '《围城》-钱钟书',
        description: '《围城》是钱钟书所著的长篇小说，是中国现代文学史上一部风格独特的讽刺小说。被誉为“新儒林外史”。第一版于1947年由上海晨光出版公司出版。故事主要写抗战初期知识分子的群相。',
        articleImgSrc: 'https://bkimg.cdn.bcebos.com/pic/d62a6059252dd42afe9d48d4033b5bb5c9eab83d?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg',
        href: 'https://baike.baidu.com/item/%E5%9B%B4%E5%9F%8E/2068378?fr=aladdin',
        favorites: '18235',
        likes: '52198',
        dislikes: '778',
        messages: '52189'
      }, {
        key: 'hot5',
        articlename: '《平凡的世杰》-路遥',
        description: '《平凡的世界》是中国作家路遥创作的一部百万字的小说。这是一部全景式地表现中国当代城乡社会生活的长篇小说，全书共三部。1986年12月首次出版。',
        articleImgSrc: 'https://bkimg.cdn.bcebos.com/pic/14ce36d3d539b600fbdea00ee950352ac65cb773?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg',
        href: 'https://baike.baidu.com/item/%E5%B9%B3%E5%87%A1%E7%9A%84%E4%B8%96%E7%95%8C/166?fr=aladdin',
        favorites: '17541',
        likes: '50482',
        dislikes: '560',
        messages: '50673'
      }, {
        key: 'hot6',
        articlename: '《呐喊》-鲁迅',
        description: '《呐喊》是中国现代小说的开端与成熟的标志，开创了现代现实主义文学的先河。作品通过写实主义、象征主义、浪漫主义等多种手法，以传神的笔触和“画眼睛”、“写灵魂”的艺术技巧，形象生动地塑造了狂人、孔乙己、阿Q等一批不朽的艺术形象',
        articleImgSrc: 'http://img1.imgtn.bdimg.com/it/u=1859007856,2571862129&fm=26&gp=0.jpg',
        href: 'https://baike.baidu.com/item/%E5%91%90%E5%96%8A/2647540',
        favorites: '15772',
        likes: '49123',
        dislikes: '609',
        messages: '45098'
      }, {
        key: 'hot7',
        articlename: '《冰心小说集》-冰心',
        description: '《冰心小说集》是1933年上海北新书局出版的图书，作者是冰心。该书收录了冰心大量的优秀小说、散文，旨在提高读者的文化修养。',
        articleImgSrc: 'https://bkimg.cdn.bcebos.com/pic/ca1349540923dd54e34370d5da09b3de9c82485f?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg',
        href: 'https://baike.baidu.com/item/%E5%86%B0%E5%BF%83%E5%B0%8F%E8%AF%B4%E9%9B%86/3230243?fr=aladdin',
        favorites: '13762',
        likes: '42371',
        dislikes: '772',
        messages: '42851'
      }];
      
      // 优美句子
      const excerpts = [
        {
          description: '爱你的夜真美，想你的夜真长久，离别的夜真无情。',
        },
        {
          description: '聚散离别在泉城，夏日轮回事如风。',
        },
        {
          description:  '有一种离别，是擦着眼泪，不敢回首。',
        },
        {
          description:  '杨柳枝，芳菲节，所恨年年赠离别。一朝春尽红颜老，纵使君来岂堪折。',
        },
        {
          description:  '执意东南的风筝 无法抵达的近 扯线人双手的瘾 难以戒除的远 风衔着离别 谁在十指生茧',
        },
        {
          description:  '离别就像是硬币的正反面，纸质邂逅方才成立，预期为离别惋惜，不如为邂逅喜悦。',
        },
        {
          description:  '独登楼，雁声断秋，相思苦，何时休? 送友行，月姣光清，离别愁，无尽头。',
        },
        {
          description:  '在与身边的人怄气或者没有做到友善后，我总是会懊恼;在与亲人分别时，我总会从心底里产生一种忐忑，害怕此番离别是诀别。',
        },
        {
          description: '离别对于爱情，就像风对于火一样：它熄灭了火星，但却能煽起狂焰。',
        },
        {
          description:  '念去去 千里烟波 暮霭沉沉楚天阔 人生自古多离别 更那堪冷落清秋节。',
        },
        {
          description: '爱从来不知他有自己的深度，除非等到离别时刻。',
        },
      ];

      export default {
        hotLitterateurs,
        excerpts
      }
      