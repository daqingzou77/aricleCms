import mongoose from 'mongoose'; 

/**
 * 评论
 * 文章名 articlename
 * 章节名 section
 * 评论时间 commentsTime
 * 评论人 commentsReader
 * 评论内容  commentsList：[{
      回复人 replyer 
      回复内容  replyContent
      回复时间  replyTime
   }]
 * 
 */
const comment = mongoose.Schema({
    articlename: String,
    section: String,
    commentsTime: Date,
    commentsReader: String,
    commentsList: Array
});
export default mongoose.model('comment', comment);