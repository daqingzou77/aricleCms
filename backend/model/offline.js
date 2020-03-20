import mongoose from 'mongoose';

/**
 * 离线消息
 * 消息发送人 sender 
 * 消息接收人 toFriend 
 * 消息内容 content 
 * 消息时间 time 
 * 
 */
const offlineSchema = mongoose.Schema({
   sender: String,
   toFriend: String,
   content: String,
   time: Date
});

offlineSchema.index({ id: 1 });


export default mongoose.model('offline', offlineSchema);