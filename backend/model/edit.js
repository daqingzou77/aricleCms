import mongoose from 'mongoose';

const editSchema = mongoose.Schema({
 editTitle: String,
 editAuthor: String,
 editType: Number,
 editTime: { type: Date, default: new Date()},
 editContent: String
});

editSchema.index({id: 1});

export default mongoose.model('edit', editSchema)