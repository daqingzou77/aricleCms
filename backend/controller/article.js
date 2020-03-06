import articles from '../model/articles';
import Encrypt from '../utils/encrypt';
const BigInt = require('big-integer');


class Articles {
  constructor(app) {
    Object.assign(this, {
      app,
      articles
    })
    this.init();
  }

  init() {
    // 文章管理
    this.app.post('/api/article/addArticle', this.addArticle.bind(this)); // 新增文章
    this.app.get('/api/article/getArticleList', this.getArticleList.bind(this)); // 获取文章信息列表
    this.app.post('/api/article/getArticleByOptions', this.getArticleByOptions.bind(this)); // 条件查询文章信息
    this.app.delete('/api/article/deleteArticleItem', this.deleteArticleItem.bind(this)); // 删除文章信息
    this.app.put('/api/article/updateArticle', this.updateArticle.bind(this)); // 修改单篇文章信息
    this.app.get('/api/article/findArticleStatus', this.findArticleStatus.bind(this)); // 获取文章处理信息
    this.app.post('/api/article/solveArticleItem', this.solveArticleItem.bind(this)); // 处理单例文章信息
    // 文章审核
    this.app.get('/api/article/getArticleItem', this.getArticleItem.bind(this)); // 获取单篇文章信息
    this.app.get('/api/article/getAuditArticleList', this.getAuditArticleList.bind(this)); // 获取待审核文章列表
    this.app.post('/api/article/pushAuditMessage', this.pushAuditMessage.bind(this)); // 提交审核信息
    this.app.post('/api/article/confirmAuditMessage', this.confirmAuditMessage.bind(this)); // 确认审核内容
   
    // 多关键词检索
    this.app.post('/api/article/getArticleByMutiKeys', this.getArticleByMutiKeys.bind(this)); // 多关键字查询

  }

  addArticle(req, res, next) {
    const addParam = req.body;
    const { articlename } = addParam;
    this.articles.findOne({ articlename })
      .then(doc => {
        if (doc) {
          return res.tools.setJson(0, '该文章已存在', [])
        } else {
          this.articles.create(addParam)
            .then(data => {
              return res.tools.setJson(0, '文章添加成功', data)
            })
        }
      })
      .catch(err => next(err))
  }

  getArticleItem(req, res, next) {
    const articlename = req.query.articlename;
    this.articles.findOne({
      articlename
    }).then(doc => {
      if (!doc) {
        res.tools.setJson(0, '查询无结果', [])
      } else {
        res.tools.setJson(0, '获取单例文章信息成功', doc)
      }
    })
      .catch(err => next(err));
  }

  getArticleList(req, res, next) {
    this.articles.find({})
      .then(doc => {
        res.tools.setJson(0, '查询成功', doc)
      })
      .catch(err => next(err));
  }

  getArticleByOptions(req, res, next) {
    const { articlename = '', startTime, endTime, status = 1 } = req.body;
    let findOptions = {
      articlename: !articlename ? { $regex: '' } : articlename,
      status: !status ? { $regex: '' } : status,
    }
    let condition = startTime ? { $gte: startTime, $lt: endTime } : { $lte: new Date() };
    switch (status) {
      case 1: findOptions.publishTime = condition; break;
      case 2: findOptions.auditTime = condition; break;
      case 3: findOptions.passTime = condition; break;
      case 4: findOptions.revokeTime = condition; break;
      default: findOptions;
    }
    this.articles.find(findOptions)
      .then(doc => {
        if (!doc) {
          res.tools.setJson(0, '文章不存在', doc)
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
        if (!doc) {
          return res.tool.setJson(0, '该文章不存在', doc);
        } else {
          this.articles.updateOne({ articlename }, { $set: updateParam })
            .then(doc => {
              if (doc.nModified > 0) {
                return res.tools.setJson(0, '修改成功', doc);
              } else {
                return res.tools.setJson(0, '修改失败', []);
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
          res.tools.setJson(0, '文章不存在', doc)
        }
      })
      .catch(err => next(err));
  }

  findArticleStatus(req, res, next) {
    const articlename = req.query.articlename;
    this.articles.findOne({ articlename }, { articlename: 1, author: 1, status: 1, publishTime: 1, auditTime: 1, passTime: 1, revokeTime: 1 })
      .then(doc => {
        if (!doc) {
          res.tools.setJson(0, '查询失败', []);
        } else {
          res.tools.setJson(0, '查询成功', doc);
        }
      })
  }

  solveArticleItem(req, res, next) {
    const { status, articlename } = req.body;
    let passTime, auditTime, publishTime, revokeTime = '';
    switch (status) {
      case 1: publishTime = new Date(); break;
      case 2: auditTime = new Date(); break;
      case 3: passTime = new Date(); break;
      case 4: revokeTime = new Date(); break;
    }
    this.articles.updateOne({ articlename }, { $set: { status, publishTime, auditTime, passTime, revokeTime } })
      .then(doc => {
        if (doc.nModified > 0) {
          res.tools.setJson(0, '处理成功', doc);
        } else {
          res.tools.setJson(0, '处理失败', doc);
        }
      })
      .catch(err => next(err));
  }

  getAuditArticleList(req, res, next) {
    this.articles.find({
      status: 1
    })
      .then(doc => {
        res.tools.setJson(0, '获取待审核列表成功', doc);
      })
      .catch(err => next(er));
  }

  pushAuditMessage(req, res, next) {
    const { articlename, auditor } = req.body;
    this.articles.findOne({ articlename })
      .then(doc => {
        if (doc) {
          this.articles.updateOne({ articlename }, {
            $set: { auditTime: new Date(), auditor }
          }).then(doc => {
            if (doc.nModified > 0) {
              res.tools.setJson(0, '审核成功', { status: true });
            } else {
              res.tools.setJson(0, '审核失败', { status: false });
            }
          })
        } else {
          res.tools.setJson(0, '审核失败', { status: false });
        }
      })
      .catch(err => next(err));
  }

  confirmAuditMessage(req, res, next) {
    const { articlename, passAuditor } = req.body;
    let preSmi;
    this.articles.findOne({articlename})
    .then(doc => {
      const { keywords } = doc;
      preSmi = keywords.length / 2;
    }).then(cipherObj => {
      this.articles.updateOne({
        articlename
      }, {
        $set: {
          passTime: new Date(),
          passAuditor,
          status: 3,
          preSmi,
        }
      })
        .then(doc => {
          if (doc.nModified > 0) {
            res.tools.setJson(0, '审核确认成功', { status: true });
          } else {
            res.tools.setJson(0, '审核确认失败', { status: false });
          }
        })
     })
      .catch(err => next(err))
  }

  getArticleByMutiKeys(req, res) {
    const { queryKeywords } = req.body;
    const respData = [];
    this.articles.find({}).then(doc => {
     doc.map(item => {
      const { keywords,  preSmi, articlename, author } = item;
      const EncryptTools = new Encrypt(keywords);
      const Q1 = EncryptTools.getCiphertextDoor(queryKeywords);
      const result = EncryptTools.uploadCiphertextIndex(keywords, articlename, author);
      const { I1, θ } = result;
      if(EncryptTools.getEndSmi(I1, Q1, θ)> preSmi) {
        respData.push(item)
      } 
     })
      res.tools.setJson(0, '查询结果', respData);
    })
  }
}
export default Articles;