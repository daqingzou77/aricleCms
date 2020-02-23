import mongoose from 'mongoose'; 

/**
 * 点赞拉黑
 * 文章名 articlename
 * 点赞数 likes
 * 拉黑数 dislikes
 * 
 */
const star = mongoose.Schema({
    articlename: String,
    likes: String,
    dislikes: String
});
export default mongoose.model('star', star);