import articles from '../model/articles';

class Articles {
  constructor(app) {
    Object.assign(this, {
      app,
      articles
    })
    this.init();
  }

  init() {
    this.app.get('/api/article/getArticleList', this.getArticleList.bind(this)); // 获取文章信息列表
    this.app.post('/api/article/getArticleByOptions', this.getArticleByOptions.bind(this)); // 条件查询文章信息
    this.app.post('/api/article/getArticleByMutiKeys', this.getArticleByMutiKeys.bind(this)); // 多关键字查询
    this.app.delete('/api/article/deleteArticleItem', this.deleteArticleItem.bind(this)); // 删除文章信息
    this.app.post('/api/'); // 处理单例文章信息 
  }

  getArticleList(req, res, next) {
    this.articles.find({})
    .then(doc => {
      res.tools.setJson('0', '查询成功', doc)
    })
    .catch(err => next(err));
  }

  deleteArticleItem(req, res, next) {
    const { articlename } = req.body;
    this.articles.remove({
      articlename
    })
    .then(doc => {
      res.tools.setJson(0, '删除成功', doc);
    })
    .catch(err => next(err));
  }
}

export default Articles;