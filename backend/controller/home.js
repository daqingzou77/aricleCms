class Home {
  constructor(app) {
    Object.assign(this, {
        app,
     })
     this.init();
  };
  init() {
    this.app.post('/api/home/getDailyPush', this.getDailyPush.bind(this)); // 获取推送
    this.app.post('/api/home/getHotAuthor', this.getHotAuthor.bind(this)); // 热门作者
    this.app.post('/api/home/getHotArticles', this.getHotArticles.bind(this)); // 热门文章
    this.app.post('/api/home/getAuthorUpdate', this.getAuthorUpdate.bind(this)); // 作者更新
    this.app.post('/api/home/getHotComments', this.getHotComments.bind(this)); // 热门评论
    this.app.post('/api/home/getStatics', this.getStatics.bind(this)); // 数据统计
  }

  getDailyPush(req, res, next) {

  } 

  getHotAuthor(req, res, next) {

  }

  getHotArticles(req, res, next) {

  }

  getAuthorUpdate(req, res, next) {

  }

  getHotComments(req, res, next) {

  }

  getStatics(req, res, next) {
      
  }
}