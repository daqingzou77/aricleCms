import async from 'async';
import user from '../model/user';
import articles from '../model/articles';
import scienceMock from '../initData/scienceMock';
import historMock from '../initData/historyMock';
import littrateurMock from '../initData/litterateurMock';
import physicMock from '../initData/physicMock';
import Tools from '../utils/tools';


const Tool = new Tools();
const { hotScience, scienceTips } = scienceMock;
const { historicalArticles, historicalStorys } = historMock;
const { hotLitterateurs, excerpts } = littrateurMock;
const { hotPhysics, sportSense } = physicMock;

class Classify {
  constructor(app) {
    Object.assign(this, {
      app,
      user,
      articles
    });
    this.init();
  }

  init() {
    // 科学类
    this.app.get('/api/classify/getHotRecommandFromScience', this.getHotRecommandFromScience.bind(this)); // 获取科学热门推荐
    this.app.get('/api/classify/getScienceTips', this.getScienceTips.bind(this)); // 获取科学知识
   
    // 历史类
    this.app.get('/api/classify/getHotRecommandFromHistory', this.getHotRecommandFromHistory.bind(this)); // 获取历史推荐
    this.app.get('/api/classify/getHistoricalStorys', this.getHistoricalStorys.bind(this)); // 获取历史典故

    // 文学类
    this.app.get('/api/classify/getHotRecommandFromLitterateur', this.getHotRecommandFromLitterateur.bind(this)); // 获取文学热门推荐
    this.app.get('/api/classify/getExcerpts', this.getExcerpts.bind(this)); // 获取金句摘抄

    // 体育类
    this.app.get('/api/classify/getHotRecommandFromPhysic', this.getHotRecommandFromPhysic.bind(this)); // 获取体育热门
    this.app.get('/api/classify/getSportSense', this.getSportSense.bind(this)); // 获取体育常识
    
    // 获取实时更新内容
    this.app.get('/api/classify/getLiveUpdates', this.getLiveUpdates.bind(this)); // 获取实时更新
  }

  getHotRecommandFromScience(req, res) {
    const responData = Tool.mockData(3, hotScience);
    res.tools.setJson(0, '科学热门推荐获取成功', responData);
  }

  getScienceTips(req, res, next) {
    const responTips = Tool.mockData(12, scienceTips);
    res.tools.setJson(0, '获取科学知识成功',  responTips);
  }

  getHotRecommandFromHistory(req, res, next) {
    const responData = Tool.mockData(3, historicalArticles);
    res.tools.setJson(0, '获取热门历史文章成功', responData);
  }

  getHistoricalStorys(req, res, next) {
    const responTips = Tool.mockData(12, historicalStorys);
    res.tools.setJson(0, '获取历史故事成功',  responTips);
  } 

  getHotRecommandFromLitterateur(req, res, next) {
    const responData = Tool.mockData(3, hotLitterateurs);
    res.tools.setJson(0, '获取热门文学文章成功', responData);
  }

  getExcerpts(req, res, next) {
    const excerpt = Tool.mockData(9, excerpts);
    res.tools.setJson(0, '获去优美句子成功',  excerpt);
  }

  getHotRecommandFromPhysic(req, res, next) {
    const responTips = Tool.mockData(3, hotPhysics);
    res.tools.setJson(0, '热门体育推荐获取成功', responTips);
  }

  getSportSense(req, res, next) {
    const responTips = Tool.mockData(12, sportSense);
    res.tools.setJson(0, '获取体育常识成功',  responTips);
  }

  getLiveUpdates(req, res, next) {
    const { articleType } = req.query;
    // articleType 0 科学 1 历史 2 文学 3 体育
    this.articles.find({ passTime: { $lte: new Date }, articleType }, {
      articlename: 1,
      author: 1,
      articleContent: 1,
      articleForm: 1,
      annexname: 1,
      passTime: 1
    }).sort({_id: -1}).limit(3)
    .then(doc => {
      async.map(doc, (item, callback) => {
        this.user.findOne({
          username: item.author
        }).then(data=>{
          if (!data) {
            item['avatar'] = '';
          } else {
            item['avatar'] = data.avatar;
          }
          callback(null, item);
        })
      }, (err, result) => {
        result.map((item, index) => {
          if (!item)
            result.splice(index, 1)
        })
        res.tools.setJson(0, '实时更新科学列表成功', result);
      })
    })
    .catch(err => next(err))
  }

}

export default Classify;