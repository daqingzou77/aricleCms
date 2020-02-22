import mongoose from 'mongoose'; 

/**
 * 附件
 * 附件名 annexName
 * 附件时间 annexTime
 * 所属文章类型 annexType 科学 0、历史 1、纪实 2、文学 3、体育 4、明星 5
 * 附件发布人 annexPublisher
 * 
 */
const star = mongoose.Schema({
    annexName: String,
    annexTime: Date,
    annexType: Number,
    annexPublisher: String
});
export default mongoose.model('star', star);