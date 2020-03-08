// 热门文章
const hotPhysics = [{
  key: 1,
  articlename: '《这届勇士若夺冠最具含金量 已追上公牛湖人王朝》-佚名',
  description: '话题性是体育文化的重要组成部分，开启一个热门话题，与球迷们共同交流讨论，集思广益，让体育融入生活。',
  articleImgSrc: 'https://inews.gtimg.com/newsapp_bt/0/7089194685/641',
  href: 'https://sports.qq.com/a/20190101/001696.htm',
  favorites: '39821',
  likes: '6721',
  dislikes: '4217',
  messages: '55891'
}, {
  key: 2,
  articlename: '《用舒服的方式打球》-姚明',
  description: ' 如果你知道目标在何方，只要看着脚下，走你的路，终有一天，当你抬起头，伸出手，就会发现目标已近在咫尺。',
  articleImgSrc: 'https://dss1.bdstatic.com/6OF1bjeh1BF3odCf/it/u=3010908228,980408618&fm=74&app=80&f=JPEG&size=f121,140?sec=1880279984&t=a1507716516b06c8a32b21b20944de5d',
  href: 'https://www.duanwenxue.com/article/4334117.html',
  favorites: '35718',
  likes: '7712',
  dislikes: '1093',
  messages: '32612'
}, {
  key: 3,
  articlename: '《乔丹自述的成功的十大秘籍》-庞启帆',
  description: '乔丹的非凡成就与他的天赋有关，但这绝不是全部的原因。让我们一起听听乔丹自述成功的秘诀吧。',
  articleImgSrc: 'http://img4.imgtn.bdimg.com/it/u=1838249316,238225954&fm=26&gp=0.jpg',
  href: 'https://www.xzbu.com/7/view-5564666.htm',
  favorites: '34709',
  likes: '11082',
  dislikes: '572',
  messages: '20916'
}, {
  key: 4,
  articlename: '《漫话世界杯》-阿伍',
  description: '导读世界杯又仿佛人生，在经历了万千次拼搏和奋斗后，哪怕有一两次破门而入，实现自己的目标理想，都是值得欢呼雀跃的。',
  articleImgSrc: 'http://img4.imgtn.bdimg.com/it/u=3965391256,44110794&fm=26&gp=0.jpg',
  href: 'https://www.nipei.com/t/19884-manhua-shijiebei.html',
  favorites: '9056',
  likes: '8721',
  dislikes: '780',
  messages: '15202'
}, {
  key: 5,
  articlename: '《足球如人生》-江北乔木',
  description: '人生如足球，足球如人生。愿我们在人生的足球场上，踢好每一个球，射中成功之门。',
  articleImgSrc: 'http://img0.imgtn.bdimg.com/it/u=4026248288,447523658&fm=26&gp=0.jpg',
  href: 'http://www.duwenzhang.com/wenzhang/renshengzheli/20180628/390416.html',
  favorites: '7834',
  likes: '7712',
  dislikes: '1023',
  messages: '10231'
}, {
  key: 6,
  articlename: '《身体健康相关文章推荐》-吴丽梅',
  description: '健康的忠告，都是专家几十年的亲生体会，很受用！',
  articleImgSrc: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3656255514,1202749555&fm=26&gp=0.jpg',
  href: 'https://wenku.baidu.com/view/d764696a876fb84ae45c3b3567ec102de2bddfde.html',
  favorites: '7712',
  likes: '5568',
  dislikes: '1092',
  messages: '9345'
}, {
  key: 7,
  articlename: '《足球明星社会特征与价值探究》-丰志帅',
  description: '催生足球明星的足球运动技战术本身以外,从体育本身、经济价值、文化层次、社会行为等诸方面的社会学思考来诠释足球明星的社会特征与价值。',
  articleImgSrc: 'http://qikl.sws555.top/uploads/images/5126.jpg',
  href: 'http://qikl.sws555.top/index.php?c=content&a=periodicalshow&id=45683432',
  favorites: '6312',
  likes: '3211',
  dislikes: '1108',
  messages: '5720'
}];

// 体育常识
const sportSense = [{
  key: 1,
  description: '剧烈运动时和运动后不可大量饮水',
  detail: '剧烈运动时，体内盐分随大量的汗液排出体外，饮水过多会使血液的渗透压降低，破坏体内水盐代谢平衡，影响人体正常生理功能，甚至还会发生肌肉痉挛现象。由于运动时，需要增加心跳、呼吸的频率来增加血液和氧气，以满足运动需要。而大量饮水会使胃部膨胀充盈，妨碍膈肌活动，影响呼吸;血液的循环流量增加，加重了心脏负担，不仅不利于运动，还会伤害心脏。'
}, {
  key: 2,
  description: '进餐后不宜运动',
  detail: '进餐后需要较多的血液流到胃肠道，帮助食物消化与养分吸收，如果这时参加运动就会造成血液流向四肢，妨碍胃肠的消化，时间一长就会导致疾病。体弱者进餐后血压还会降低，称为餐后低血压，外出活动容易跌倒。长期餐后运动容易得盲肠炎。饮酒后不可进行游泳等运动项目。'
}, {
  key: 3,
  description: '在不适当的地点运动会带来伤害',
  detail: '由于运动的基本功能是通过呼吸从外界摄入大量新鲜氧气，以满足健康的需求，故运动前一定要选择好地点，以平坦开阔，空气新鲜的公园、河滩、体育场等处最佳。'
}, {
  key: 4,
  description: '不要在情绪不好的时候运动',
  detail: '运动不仅是身体的锻炼，也是心理的锻炼。当你生气、悲伤时，不要到运动场上去发泄。运动医学专家的解释是：人的情绪直接影响着身体的生理机能，而情绪的变化又产生于大脑深部，并扩散到全身，在心脏及其他器官上留下痕迹，这种痕迹将影响人体机能的健康。'
}, {
  key: 5,
  description: '选择最佳运动量',
  detail: '选择最佳运动量的方法很多：例如指数评定法、心率评定法、库珀评定法、菲克斯评定法、疲劳评定法、简便评定法、阶段评定法等等。由于每一个人的实际情况千差万别，安静心率相差15—30%，甚至更多，所以选择最佳运动量应根据自己的年龄、性别、职业特点、体力状况、健康水平、体育基础、生活环境、目的任务等不同情况来决定。'
}, {
  key: 6,
  description: '整理运动的好处',
  detail: '整理活动可以使紧张的肌肉得到放松，在运动中，肌肉毛细血管大量开放，肌肉高度紧张。如果激烈运动后立即静止不动，肌肉内淤积的血液就不能及时流回心脏，肌肉僵硬，疲劳不易消除。相反，运动后做一些整理活动，使运动慢慢缓和下来，或通过按摩挤压肌肉和穴位，就可以使肌肉得到充分的放松和休息。'
}, {
  key: 7,
  description: '运动后营养的补充与恢复',
  detail: '运动员经常是每天都要训练，接近比赛时甚至一天训练两次，参加比赛也经常需要一天连续出赛两三次，包括预赛、准决赛、和决赛，例如田径和游泳；或是在短短数天中每天连续出赛，例如篮球。这时运动后的营养补充就变得非常重要，对于下次练习的成效或是比赛的结果有绝对的影响。对运动员而言，运动后的恢复不应该是顺其自然，而应该是主动积极的补充运动所消耗的能量和营养，为紧接而来的比赛或训练做好准备。'
}, {
  key: 8,
  description: '运动后不能立即洗澡',
  detail: '运动后立即洗澡会导致心脏和脑部供血不足以致于头晕眼花浑身无力，还会由于身上的乳酸积累过多使全身酸痛。'
}, {
  key: 9,
  description: '经常从事科学合理的体育锻炼对运动系统有什么作用？ ',
  detail: '可以使骨变得更加粗壮和坚固；可以使关节伸展性增加，关节活动范围加大，灵活而牢固；可以使肌肉逐渐变得结实，肌肉力量增加；可以促进人体长高，四肢发达，胸围增大，肌肉中脂肪减少，体型也变得更加匀称而健美。'
}, {
  key: 10,
  description: '跑步',
  detail: '跑步是运动之王，但也是最易脱水的运动，虽是有氧运动，但十分消耗，及其容易发生心脏骤停等事故，所以，防止脱水是十分重要的。'
}, {
  key: 11,
  description: '不要蹲坐休息',
  detail: '这是非常普遍的做法，运动结束后感觉累了，就蹲下或坐下认为能省力和休息，其实，这是一个错误的做法。健身运动后若立即蹲坐下来休息，会阻碍下肢血液回流，影响血液循环，加深肌体疲劳。严重时会产生重力性休克。'
}, {
  key: 12,
  description: '游泳',
  detail: '这是世界上最已发生事故的运动，据说，世界上每年死于溺水的人比癌症还要多，所以，防护工具与锻炼不可少。'
}, {
  key: 13,
  description: '运动后的营养补充着重的三方面',
  detail: '1.补充因流汗而损失的水份和电解质；2.补充运动中消耗的肝醣(glycogen)；3.补充运动中消耗的肝醣(glycogen)'
}];

export default {
  hotPhysics,
  sportSense
}
