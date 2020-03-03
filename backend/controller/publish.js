import articles from '../model/articles';

class PublishOnline {
  constructor(app, articles) {
    Object.assign(this, {
       articles,
       app
    })
    this.init();
  }
  init() {
    this.post('/api/publishOnline/addPublishOnlineArticle', this.addPublishOnlineArticle.bind(this)); // 新增文章
    this.post('/api/publishOnline/saveArticleRecord', this.saveArticleRecord.bind(this)); // 保存文章编辑记录
    this.post('/api/publishOnline/publishArticle', this.publishArticle.bind(this)); // 文章上传
    this.get('/api/publishOnline/getEditRecord', this.getEditRecord.bind(this)); // 获取编辑记录
    this.post('/api/publishOnline/getArticleDetail', this.getArticleDetail.bind(this)); // 获取编辑详情
    this.get('/api/publishOnline/getPublishedArtilces', this.getPublishedArtilces.bind(this)); // 获取已发布文章信息
  }
  
  addPublishOnlineArticle(req, res, next) {

  }

  saveArticleRecord(req, res, next) {
      
  }

  publishArticle(req, res, next) {
      
  }

  getEditRecord(req, res, next) {
      
  }

  getArticleDetail(req, res, next) {
      
  }

  getPublishedArtilces(req, res, next) {  
      
 }

}