import mongoose from 'mongoose';

const offlineSchema = mongoose.Schema({
   sender: String,
   toFriend: String,
   content: String,
   time: Date
});

offlineSchema.index({ id: 1 });


export default mongoose.model('offlineMessage', offlineSchema);