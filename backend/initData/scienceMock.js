   // 头像颜色 
   const avatarColor = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#f32432', '#2322d1', "#fff146"];

    // 科技热门文章
    const hotScience = [{
        key: 'hot1',
        articlename: '《人类的足迹难追寻》-刘武',
        description: '自从达尔文提出进化论以来，人们对于自身的起源的研究就不曾间断过。近一个半世纪过去了，学术界对于人类起源与演化过程已经构建了一个粗略的轮廓。',
        articleImgSrc: 'http://image2.sina.com.cn/IT/d/2006-04-04/U1235P2T1D890242F13DT20060404160148.jpg',
        href: 'http://tech.sina.com.cn/d/2006-03-13/1820865845.shtml',
        favorites: '22346',
        likes: '134451',
        dislikes: '561',
        messages: '12217'
      }, {
        key: 'hot2',
        articlename: '《火星与地球的生命竞赛》-佚名',
        description: '在那遥远的数千万公里之外，一颗红色的行星正在吸引着无数天文学家热情期盼的眼光，来自美国、欧洲和日本的数个探测器正在竞相奔向那颗神秘的星球。',
        articleImgSrc: 'http://www.zazhibest.cn//UploadFiles/2019/75/B132100650050638_S.png',
        href: 'http://tech.sina.com.cn/d/2006-03-13/1636865722.shtml',
        favorites: '18345',
        likes: '83123',
        dislikes: '420',
        messages: '10323'
      }, {
        key: 'hot3',
        articlename: '《机器人坦克走向战场》-佚名',
        description: '每天都是这个太阳，它日复一日，年复一年，似乎永远不知疲倦地照耀着我们的地球，只因有了它，才有了地球上五彩斑斓的生命世界。',
        articleImgSrc: 'http://image2.sina.com.cn/IT/d/2006-04-04/U1235P2T1D890242F13DT20060404160148.jpg',
        href: 'http://tech.sina.com.cn/d/2005-12-28/1029804761.shtml',
        favorites: '17923',
        likes: '53121',
        dislikes: '634',
        messages: '10647'
      }, {
        key: 'hot4',
        articlename: '《太阳依然神秘》-佚名',
        description: '　每天都是这个太阳，它日复一日，年复一年，似乎永远不知疲倦地照耀着我们的地球，只因有了它，才有了地球上五彩斑斓的生命世界。',
        articleImgSrc: 'http://image2.sina.com.cn/IT/d/2006-04-04/U1235P2T1D890242F13DT20060404160148.jpg',
        href: 'http://tech.sina.com.cn/d/2006-01-18/1546823892.shtml',
        favorites: '14423',
        likes: '34531',
        dislikes: '529',
        messages: '9647'
      }, {
        key: 'hot5',
        articlename: '《让照片动起来》-李稚',
        description: '从许多方面来说，这些摄影师都是摄影界的排头兵，他们正运用最新的拍摄技法，将图像创作的极限推至更高。在他们的字典里，找不到“不可能”这个词。',
        articleImgSrc: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=652724626,2647204001&fm=26&gp=0.jpg',
        href: 'http://tech.sina.com.cn/d/2005-12-23/2105801477.shtml',
        favorites: '12923',
        likes: '43121',
        dislikes: '812',
        messages: '7471'
      }, {
        key: 'hot6',
        articlename: '《奇特的颗粒物质》-孟月',
        description: '生活经验告诉我们，当人群通过一个入口时，如果能有序的依次行进，就可以保持畅通的流动，速度越快，流量也就越大；而当人群开始拥挤混乱时，流量会急剧减少。',
        articleImgSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583555483459&di=d325b29e6bc3a91b5d6dd3fd2a0187f6&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fbaike%2Fw%253D268%253Bg%253D0%2Fsign%3D36430c1d08d162d985ee651a29e4ced1%2F6d81800a19d8bc3e857e4413808ba61ea9d345f0.jpg',
        href: 'http://tech.sina.com.cn/d/2005-11-17/1058768396.shtml',
        favorites: '10923',
        likes: '23321',
        dislikes: '901',
        messages: '5239'
      }, {
        key: 'hot7',
        articlename: '《水是生命的唯一源泉吗》-米雪',
        description: '“水是生命之源”——这已经是生活在地球上的我们的共识。对于搜寻外星生命的任务也一直着眼于对外星上“水”的寻找。然而最近，有科学家提出了不同的思路：外星生命也许并不只依靠水而存活！',
        articleImgSrc: 'http://soripan.net/qikan/file/upload/201806/27/16-06-45-35-1.jpg.middle.jpg',
        href: 'http://tech.sina.com.cn/d/2005-11-07/1417758735.shtml',
        favorites: '9173',
        likes: '10472',
        dislikes: '1010',
        messages: '3219'
      }
    ];
  
      //  实时更新
      const dailyScience = [{
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

      const scienceTips = [{
        question: '为什么人会打呵欠？',
        answer: '当我们感到疲累时，体内已产生了许多的二氧化碳。当二氧化碳过多时，必须再增加氧气来平衡体内所需。因为这些残留的二氧化碳，会影响我们身体的机能活动，这时身体便会发出保护性的反应，于是就打起呵欠来。'
      }, {
        question: '为什么蜥蜴的尾巴断落后仍然不断弹跳着？',
        answer: '为了保护自己，很多蜥蝪也利保护色掩人耳目；而部份蜥蜴当受到袭击时，尾巴更会因肌肉剧烈收缩而导致断落。基于断落的尾巴中仍有部份神经活着，它会不断弹跳，从而分散敌人的注意力，以便逃脱。'
      }, {
        question: '为什么海水大多是蓝、绿色？',
        answer: '望向大海，很多时也发现海水呈现蓝、绿色。可是，当你把海水捞起时，你却只能看到它像往日的水般，透明无色。原来，海水本身与我们日常所接触到的水没有大分别，也是透明的。我们所看到的绿色，其实是海水对光吸收能力而产生出来的现象。'
      }, {
        question: '为什么会起鸡皮疙瘩？',
        answer: '我们的皮肤表面长着汗毛，而每一个毛孔下都有一条竖毛肌，当受到神经刺激（例如：生气、害怕、受凉等情况）后，身体的温度会下降，而竖毛肌便会收缩而令毛发竖立起来，形成鸡皮疙瘩。'
      }, {
        question: '打雷是怎么回事？',
        answer: '这是阴电和阳电碰到一起发生的自然现象。下雨时，天上的云有的带阳电，有的带阴电，两种云碰到一起时，就会放电，发出很亮很亮的闪电，同时又放出很大的热量，使周围的空气很快受热，膨胀，并且发出很大的声音，这就是雷声。'
      }, {
        question: '早晚的天空为什么是红色的？',
        answer: '早晨和傍晚，在日出和日落前后的天边，时常会出现五彩缤纷的彩霞。朝霞和晚霞的形成都是由于空气对光线的散射作用。当太阳光射入大气层后，遇到大气分子和悬浮在大气中的微粒，就会发生散射。'
      }, {
        question: '为什么灌满水的瓶子不易破？',
        answer: '有两个相同的玻璃瓶，一个空着，一个灌满了水，同时从相同的高度落到地面上，哪个瓶子容易破？一般说重的瓶子容易破。可是，当瓶子灌满水后，瓶子里的水还有另外一个作用，能减少瓶子的形变，反而使瓶子不容易破了。'
      }, {
        question: '冰糕为什么会冒气？',
        answer: '冰糕冒气是因为外界空气中有不少眼睛看不见的水汽，碰到很冷的冰糕时，一遇冷就液化成雾滴包围在冰糕周围，看上去似乎是冰糕在“冒气”一样。'
      }, {
        question: '向日葵为什么总是向着太阳？',
        answer: '向日葵的茎部含有一种奇妙的植物生长素。这种生长素非常怕光。一遇光线照射，它就会到背光的一面去，同时它还刺激背光一面的细胞迅速繁殖，所以，背光的一面就比向光的一面生长的快，使向日葵产生了向光性弯曲。'
      }, {
        question: '蜜蜂怎样酿蜜？',
        answer: '蜂先把采来的花朵甜汁吐到一个空的蜂房中，到了晚上，再把甜汁吸到自己的蜜胃里进行调制，然后再吐出来，再吞进去，如此轮番吞吞吐吐，要进行100～240次，最后才酿成香甜的蜂蜜。'
      }, {
        question: '为什么星星会一闪一闪的？',
        answer: '我们看到星闪闪，这不是因为星星本身的光度出现变化，而是与大气的遮挡有关。大气隔在我们与星星之间，当星光通过大气层时，会受到大气的密度和厚薄影响。大气不是绝对的透明，它的透明度会根据密度的不同而产生变化。所以我们在地面透过它来看星星，就会看到星星好像在闪动的样子了。'
      }, {
        question: '为什么人老了头发便会变白？',
        answer: '我们的头发中有一种叫「黑色素」的物质，黑色素愈多头发的颜色便愈黑。而黑色素少的话，头发便会发黄或变白。人类到了老年时，身体的各种机能会逐渐衰退，色素的形成亦会愈来愈少，所以头发也会渐渐变白。'
      }, {
        question: '为什么发条拧得紧些，钟表走的时间长些？',
        answer: ' 发条拧得紧些，它的形变就大些，因此具有的弹性势能就多些，弹性势能转化为动能就多些，就能推动钟表的齿轮做较多的功，使钟表走的时间长些。'
      }, {
        question: '暖水瓶为什么能保温？',
        answer: '热的传递方式有三种：热对流，热传导，热辐射。热的对流主要发生在液体和气体之间，热流上升，冷流下降，通过不断循环达到动态平衡，热的传导发生在热的导体上，热从高温的一端向低温一端传导，热的辐射不需要媒介，它通过辐射的方式向低温处传热。暖水瓶的瓶胆与外壳之间是空气，空气是热的不良导体，热传导降低了许多，瓶胆内部光滑如镜，降低了辐射，所以暖水瓶能保温。'
      }, {
        question: '什么是流星？',
        answer: '指运行在星际空间的流星体（通常包括宇宙尘粒和固体块等空间物质）在接近地球时由于受到地球引力的摄动而被地球吸引，从而进入地球大气层，并与大气摩擦燃烧所产生的光迹。'
      } ,{
        question: '蜜蜂是怎样造蜂房的？',
        answer: '每一只工蜂的腰部都有一个蜡腺，能分泌出蜡，这种经过嘴巴的咀嚼后变得又软又韧，用它就可以建造蜂房了。'
      }]

      export default {
        avatarColor,
        hotScience, 
        dailyScience,
        scienceTips
      }
      