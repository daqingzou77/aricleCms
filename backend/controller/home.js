import async from 'async';
import articles from '../model/articles';
import user from '../model/user';
import homeMock from '../initData/homeMock';
const { list, listData, hotArticles, hotComments} = homeMock;

class Home {
  constructor(app) {
    Object.assign(this, {
        app,
        articles,
        user
     })
     this.init();
  };
  init() {
    this.app.get('/api/home/getDailyPush', this.getDailyPush.bind(this)); // 获取推送
    this.app.get('/api/home/getHotAuthor', this.getHotAuthor.bind(this)); // 热门作者
    this.app.get('/api/home/getHotArticles', this.getHotArticles.bind(this)); // 热门文章
    this.app.get('/api/home/getAuthorUpdate', this.getAuthorUpdate.bind(this)); // 作者更新
    this.app.get('/api/home/getHotComments', this.getHotComments.bind(this)); // 热门评论
    this.app.get('/api/home/getStatics', this.getStatics.bind(this)); // 数据统计
  }

  getDailyPush(req, res, next) {
    return res.tools.setJson(0, '推送文章', list);
  } 

  getHotAuthor(req, res, next) {
    return res.tools.setJson(0, '推送文章', listData);
  }

  getHotArticles(req, res, next) {
    return res.tools.setJson(0, '推送文章', hotArticles);
  }

  getAuthorUpdate(req, res, next) {
      this.articles.find({ passTime: { $lte: new Date }}, {
        articlename: 1,
        author: 1,
        articleContent: 1,
        articleForm: 1,
        annexname: 1
      }).sort({_id: -1}).limit(3)
      .then(doc => {
        async.map(doc, (item, callback) => {
          this.user.findOne({
            username: item.author
          }).then(data=>{
            item['avatar'] = data.avatar;
            callback(null, item);
          })
        }, (err, result) => {
          res.tools.setJson(0, '实时更新科学列表成功', result);
        })
      })
      .catch(err => next(err))
  }

  getHotComments(req, res, next) {
    return res.tools.setJson(0, '推送文章', hotComments);
  }

  getStatics(req, res, next) {
    this.articles.find({}, {
     likes: 1,
     dislikes: 1,
     comments: 1,
     favorites: 1
    }).then(doc => {
      let resp = {};
      resp['release'] = doc.length;
      resp['likes'] = 0;
      resp['dislikes'] = 0;
      resp['favorites'] = 0;
      resp['comments'] = 0;
      doc.map(item => {
        const { likes, dislikes, favorites, comments } = item;
        resp['likes'] += likes;
        resp['dislikes'] += dislikes;
        resp['favorites'] += favorites;
        resp['comments'] += comments;
      })
      res.tools.setJson(0, '获取统计成功', resp);
    })
    .catch(err => next(err));
  }
}

export default Home;