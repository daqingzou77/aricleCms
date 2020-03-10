import mongoose from 'mongoose';

/**
 * 系统用户
 * 用户名 username
 * 昵称 nickname
 * 头像 avatar
 * 用户类型 userType  0 用户 1 作者 2 管理员
 * 密码 password
 * 手机号  telephoneNumber
 * 邮箱 email
 * 描述 decription
 * 创建时间 creatTime
 * 消息中心 messagesList: [{
       回复人：replyer
       上次留言 lastMessage
       留言时间 lastTime
       回复内容 replyMessage
       回复时间 replyTime
    }]
    好友列表 friendsList: []
    关注列表 attentionList: []
    拉黑列表 blacklist: []
 * 
 */
const userSchema = mongoose.Schema({
    username: String,
    nickname: String,
    avatar: String,
    userType: Number, // 0 用户 1 作者 2 管理员
    password: String,
    telephoneNumber: String,
    email: String,
    decription: String,
    createTime: {type: Date, default: new Date()},
    messageList: Array,
    friendsList: Array,
    attentionList: Array,
    blacklist: Array,
});

userSchema.index({ id: 1 });


export default mongoose.model('user', userSchema);