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
    this.app.post('/api/article/addArticle', this.addArticle.bind(this)); // 新增文章
    this.app.get('/api/article/getArticleList', this.getArticleList.bind(this)); // 获取文章信息列表
    this.app.post('/api/article/getArticleByOptions', this.getArticleByOptions.bind(this)); // 条件查询文章信息
    this.app.delete('/api/article/deleteArticleItem', this.deleteArticleItem.bind(this)); // 删除文章信息
    this.app.put('/api/article/updateArticle', this.updateArticle.bind(this)); // 修改单篇文章信息
    this.app.get('/api/article/findArticleStatus', this.findArticleStatus.bind(this)); // 获取文章处理信息
    this.app.post('/api/article/solveArticleItem', this.solveArticleItem.bind(this)); // 处理单例文章信息 

    this.app.post('/api/article/getArticleByMutiKeys', this.getArticleByMutiKeys.bind(this)); // 多关键字查询
  }
  
  addArticle(req, res, next) {
    const addParam = req.body;
    const { articlename } = addParam;
    this.articles.findOne({ articlename })
    .then(doc => {
      if(doc) {
        return res.tools.setJson(1, '该文章已存在', [])
      } else {
        this.articles.create(addParam)
        .then(data => {
          return res.tools.setJson(0, '文章添加成功', data)
        })
      }
    })
    .catch(err => next(err))
  }

  getArticleList(req, res, next) {
    this.articles.find({})
    .then(doc => {
      res.tools.setJson('0', '查询成功', doc)
    })
    .catch(err => next(err));
  }

  getArticleByOptions(req, res, next) {
    const { articlename = '', startTime = '', endTime = '', status = 1 } = req.body;
    let time = {};
    let articleTime = Object.assign(time);
    console.log('articleTime', articleTime);
    this.articles.findOne({
      articlename,
      status,
      publishTime: status === 1 ? {$gte: startTime, $lte: endTime} : '',
      auditTime: status === 2 ? {$gte: startTime, $lte: endTime}: '',
      passTime: status === 3 ? {$gte: startTime, $lte: endTime}: '',
      revokeTime: status === 4 ? {$gte: startTime, $lte: endTime}: '',
    })
    .then(doc => {
      if (!doc) {
        res.tools.setJson(1, '文章不存在', doc)
      } else {
        res.tools.setJson(0, '文章查询成功', doc);
      }
    })
    .catch(err => next(err));
  }

  updateArticle(req, res, next) {
    const updateParam = req.body;
    const { articlename } = updateParam;
    this.articles.findOne({ articlename })
    .then(doc => {
      if(!doc) {
        return res.tool.setJson(1, '该文章不存在', doc);
      } else {
        this.articles.updateOne({articlename} , {$set:  updateParam })
        .then( doc => {
          if (doc.nModified > 0) {
            return res.tools.setJson(0, '修改成功', doc);
          } else {
            return res.tools.setJson(1, '修改失败', []);
          }
        })
      }
    })
    .catch(err => next(err));
  }

  deleteArticleItem(req, res, next) {
    const { articlename } = req.body;
    this.articles.remove({
      articlename
    })
    .then(doc => {
      if (doc.deletedCount > 0) {
        res.tools.setJson(0, '删除成功', doc);
      } else {
        res.tools.setJson(1, '文章不存在', doc)
      }
    })
    .catch(err => next(err));
  }

  findArticleStatus(req, res, next) {
    const articlename = req.query.articlename;
    console.log(articlename)
    this.articles.find({ articlename}, {articlename: 1, author: 1, status: 1, publishTime: 1, auditTime: 1, passTime: 1, revokeTime: 1 })
    .then(doc => {
      if (!doc) {
        console.log(doc);
        res.tools.setJson(1, '查询失败', []);
      } else {
        console.log(doc);
        res.tools.setJson(0, '查询成功', doc);
      }
    })
  }

  solveArticleItem(req, res, next) {
   const { status, articlename } = req.body;
   this.articles.updateOne({ articlename}, {$set: { status }})
  }

  getArticleByMutiKeys(req, res, next) {

  }
}

export default Articles;