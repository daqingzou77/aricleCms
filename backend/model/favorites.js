import mongoose from 'mongoose'; 

/**
 * 收藏
 * 文章名 aritlename
 * 收藏人 favoriter
 * 收藏时间 favoriteTime
 * 
 */
const favorite = mongoose.Schema({
    aritlename: String,
    favoriter: String,
    favoriteTime: Date
});
export default mongoose.model('favorite', favorite);