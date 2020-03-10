import mongoose from 'mongoose';

/**
 * 文章
 * 文章名 articlename
 * 头像 avatar
 * 作者 author
 * 文章类型 articleType 0 科学 1 历史 2 文学 3 体育
 * 文章描述 ariticleDescription
 * 创建时间 createTime
 * 状态 status  0 未发布 1 已发布 2 审核中 3 通过 4 已撤销
 * 文章内容 articleContents 
 * 文章形式 articleForm: Number, // 0 在线发布 1 附件上传
   附件名 annexname
 * 发布时间 publishTime
   审核时间 auditTime
   通过时间 passTime
   撤销时间 revokeTime
   审核人 auditor
   点赞数 likes   
   拉黑数 dislikes
   评论数 comments
   收藏数 favorites
   关键词 keywords
   密文索引向量  cipherTextIndex
   预设相似度 preSmi
   评论内容 commentList：[{ 
     评论人 commenter, 
     评论内容 commentContent, 
     评论时间 commentTime
     点赞 likes   
     拉黑 dislikes
   }]
 * 
 */
const articleSchema = mongoose.Schema({
    articlename: String,
    avatar: String,
    author: String,
    articleType: Number, // 0 科学 1 历史 2 文学 3 体育
    articleDescription: String,
    createTime: {type: Date, default: new Date()},
    status: {type: Number, default: 0}, // 0 未发布 1 已发布 2 审核中 3 通过 4 已撤销
    articleContent: { type: String, default: ''},
    articleForm: Number, // 0 在线发布 1 附件上传
    annexname: { type: String, default: ''},
    publishTime: { type: Date, default: ''},
    auditTime: { type: Date, default: ''},
    auditor: String,
    passTime: { type: Date, default: ''},
    passAuditor:String,
    revokeTime: { type: Date, default: ''},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    comments: {type: Number, default: 0},
    favorites: {type: Number, default: 0},
    // AbleList: [
    //   { likeAble: {type: Boolean, default: false} },
    //   { dislikeAble: {type: Boolean, default: false} },
    //   { favoriteAble: {type: Boolean, default: false} },
    //   {commentAble: {type: Boolean, default: false} },
    // ],
    keywords: {type: Array, default: []},
    cipherTextIndex: Object,
    preSmi: Number,
    commentList: [{
      commenter: String,
      commentContent: String,
      commentTime: Date,
      likes: {type: Number, default: 0},
      dislikes: {type: Number, default: 0},
      // likeAble: {type: Boolean, default: false},
      // dislikeAble: {type: Boolean, default: false}
    }]
});

articleSchema.index({ id: 1 });

export default mongoose.model('article', articleSchema)