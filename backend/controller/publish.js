import articles from '../model/articles';
import edits from '../model/edit';

class PublishOnline {
  constructor(app) {
    Object.assign(this, {
       articles,
       edits,
       app
    })
    this.init();
  }

  init() {
    // 在线上传+文章编辑
    this.app.post('/api/publishOnline/publishArticle', this.publishArticle.bind(this)); // 文章上传
    this.app.post('/api/publishOnline/saveArticleRecord', this.saveArticleRecord.bind(this)); // 保存文章编辑记录
    this.app.get('/api/publishOnline/getEditRecord', this.getEditRecord.bind(this)); // 获取编辑记录
    this.app.post('/api/publishOnline/getArticleDetail', this.getArticleDetail.bind(this)); // 获取编辑详情
    this.app.get('/api/publishOnline/getPublishedArtilces', this.getPublishedArtilces.bind(this)); // 获取已发布文章信息
  }
  
  saveArticleRecord(req, res, next) {
    this.edits.create(req.body)
    .then(data => {
       return res.tools.setJson(0, '编辑添加成功', data);
    })
    .catch(err => next(err));
  }

  publishArticle(req, res, next) {
    const addParam = req.body;
    const { articlename } = addParam;
    this.articles.findOne({ articlename })
    .then(doc => {
      if(doc) {
        return res.tools.setJson(0, '该文章已存在', [])
      } else {
        addParam.publishTime = new Date();
        this.articles.create(addParam)
        .then(data => {
          return res.tools.setJson(0, '文章添加成功', data)
        })
      }
    })
    .catch(err => next(err));
  }

  getEditRecord(req, res, next) {
    this.edits.find()
    .then(doc => {
      return res.tools.setJson(0, '编辑记录获取成功', doc)
    })
    .catch(err => next(err));
  }

  getArticleDetail(req, res, next) {
    const { editTitle, editTime } = req.body;
    this.edits.findOne({ editTime, editTitle})
    .then(doc => {
       if(!doc) {
         return res.tools.setJson(0, '获取详情失败', doc);
       } else {
          return res.tools.setJson(0, '获取详情成功', doc);
       }
    })
    .catch(err => next(err)); 
 }

  getPublishedArtilces(req, res, next) {  
    this.articles.find({
      status: 1,
      articleForm: 0
    })
    .then(doc => {
      return res.tools.setJson(0, '获取发布文章成功', doc);t     
    })
    .catch(err => next(err));
  }
}

export default PublishOnline;