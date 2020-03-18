import mongoose from 'mongoose';

const chatSchema = mongoose.Schema({
   sender: String,
   toFriend: String,
   content: String,
   time: Date
});

chatSchema.index({ id: 1 });


export default mongoose.model('chat', chatSchema);