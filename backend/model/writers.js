import mongoose from 'mongoose';

/**
 * 作者
 * 姓名 name
 * 百度链接 href
 * 头像链接 avatar
 * 描述 description
 * 收藏 favorites
 * 点赞 likes
 * 拉黑 dislikes
 * 消息 messages
 * 
 */

const writer = mongoose.Schema({
    name: '朱自清',
    href: 'https://baike.baidu.com/item/%E6%9C%B1%E8%87%AA%E6%B8%85/106017?fr=aladdin',
    avatar: 'http://img1.imgtn.bdimg.com/it/u=2182637661,2104375444&fm=26&gp=0.jpg',
    description: '散文家、诗人、学者。代表作：《春》《绿》《背影》《荷塘月色》《匆匆》',
    favorites: '12325',
    likes: '12K',
    dislikes: '253',
    messages: '25K'
});

export default mongoose.model('writers', writer);