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
 * 地址 address
 * 描述 decription
 * 创建时间 creatTime
 * 私信列表 messageList: []
 * 新消息 newMessageList: []
   好友请求列表 requestList: []
   好友列表 friendsList: []
   拉黑列表 blacklist: []
   上次关闭弹窗时间 lastCloseTime
 * 
 */
const userSchema = mongoose.Schema({
    username: String,
    nickname: String,
    avatar: { type: String, default: "" },
    userType: Number, // 0 用户 1 作者 2 管理员
    password: String,
    telephoneNumber: { type: String, default: ''},
    email: { type: String, default: ''},
    address: { type: String, default: ''}, 
    decription: { type: String, default: ''},
    createTime: {type: Date, default: new Date()},
    messageList: Array,
    newMessageList: Array,
    requestList: Array,
    friendsList: Array,
    blacklist: Array,
    lastCloseTime: Date
});

userSchema.index({ id: 1 });


export default mongoose.model('user', userSchema);