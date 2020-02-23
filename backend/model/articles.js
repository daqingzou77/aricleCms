import mongoose from 'mongoose';

/**
 * 文章
 * 文章名 articlename
 * 头像 avatar
 * 作者 author
 * 文章类型 articleType 科学 0、历史 1、纪实 2、文学 3、体育 4、明星 5
 * 文章描述 ariticleDescription
 * 创建时间 createTime
 * 状态 status  0 未发布 1 审核中 2 通过
 * 文章内容 articleContents: [{ 
      章节 section
      章节内容 content
      章节时间 sectionTime
      状态 status  0 未发布 1 审核中 2 通过
      发布时间 publishTime
      审核时间 auditTime
      通过时间 passTime
      点赞数 likes   
      拉黑数 dislikes
      评论数 comments
      收藏数 favorites
      评论 commentList：[{ username, commentContent, commentTime }]
    }]
 * 
 */
const article = mongoose.Schema({
    articlename: String,
    avatar: String,
    author: String,
    articleType: Number,
    ariticleDescription: String,
    createTime: Date,
    status: Number,
    articleContents: String,
});

export default mongoose.model('article', article)