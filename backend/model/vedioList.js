import mongoose from 'mongoose';

const videos = mongoose.Schema({
    avatarSrc: String,
    imageUrl: String,
    subTitle: String,
    content: String,
    videoUrl: String,
});

const videoList = mongoose.model('video', videos);
export default videoList;