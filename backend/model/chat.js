import mongoose from 'mongoose';

/**
 * 消息聊天
 * 消息发送人 sender 
 * 消息接收人 toFriend 
 * 消息内容 content 
 * 消息时间 time 
 * 
 */
const chatSchema = mongoose.Schema({
  sender: String,
  toFriend: String,
  content: String,
  time: Date
});

chatSchema.index({ id: 1 });


export default mongoose.model('chat', chatSchema);