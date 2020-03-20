import mongoose from 'mongoose';

/**
 * 编辑
 * 编辑题目 editTitle
 * 编辑人 editAuthor
 * 编辑类型 editType
 * 编辑时间 editTime
 * 编辑内容 editContent
 * 
 */
const editSchema = mongoose.Schema({
  editTitle: String,
  editAuthor: String,
  editType: Number,
  editTime: { type: Date, default: new Date()},
  editContent: String
});

editSchema.index({id: 1});

export default mongoose.model('edit', editSchema)