import mongoose from 'mongoose'; 

/**
 * 点赞拉黑
 * 文章名 articlename
 * 点赞数 likes
 * 拉黑数 belittles
 * 
 */
const star = mongoose.Schema({
    articlename: String,
    likes: String,
    belittles: String
});
export default mongoose.model('star', star);