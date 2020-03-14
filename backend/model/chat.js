import mongoose from 'mongoose';
/**
 * 聊天
 * 
 * 用户名 username
 * 用户头像 userAvatar
 * 消息列表 messList:[
 *   {
 *     receiver:,
 *     allMessages: [{
 *      content1:,
 *      content2:,
 *      logtime:,
 *     }]
 *   }
 * ]
 */
const chatSchema = mongoose.Schema({
   sender: String,
   toFriend: String,
   content: String,
   time: Date
});

chatSchema.index({ id: 1 });


export default mongoose.model('chat', chatSchema);