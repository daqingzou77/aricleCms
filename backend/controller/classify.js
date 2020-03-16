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
      articles
    });
    this.init();
  }

  init() {
    this.app.get('/api/classify/getHotRecommandFromScience', this.getHotRecommandFromScience.bind(this)); // 获取科学热门推荐
    this.app.get('/api/classify/getLiveUpdateFromScience', this.getLiveUpdateFromScience.bind(this)); // 实时获取科学
    this.app.get('/api/classify/getScienceTips', this.getScienceTips.bind(this)); // 获取科学知识
   
    this.app.get('/api/classify/getHotRecommandFromHistory', this.getHotRecommandFromHistory.bind(this)); // 获取历史推荐
    this.app.get('/api/classify/getLiveUpdateFromHistory', this.getLiveUpdateFromHistory.bind(this)); // 实时获取历史
    this.app.get('/api/classify/getHistoricalStorys', this.getHistoricalStorys.bind(this)); // 获取历史典故

    this.app.get('/api/classify/getHotRecommandFromLitterateur', this.getHotRecommandFromLitterateur.bind(this)); // 获取文学热门推荐
    this.app.get('/api/classify/getLiveUpdateFromLitterateur', this.getLiveUpdateFromLitterateur.bind(this)); // 实时获取文学
    this.app.get('/api/classify/getExcerpts', this.getExcerpts.bind(this)); // 获取金句摘抄

    this.app.get('/api/classify/getHotRecommandFromPhysic', this.getHotRecommandFromPhysic.bind(this)); // 获取体育热门
    this.app.get('/api/classify/getLiveUpdateFromPhysic', this.getLiveUpdateFromPhysic.bind(this)); // 实时获取体育
    this.app.get('/api/classify/getSportSense', this.getSportSense.bind(this)); // 获取体育常识
  }

  getHotRecommandFromScience(req, res, next) {
    const responData = Tool.mockData(3, hotScience);
    res.tools.setJson(0, '科学热门推荐获取成功', responData);
  }

  getLiveUpdateFromScience(req, res, next) {
    this.articles.find({ passTime: {$lte: new Date}}).sort({_id: -1}).limit(3)
    .then(doc => {
      res.tools.setJson(0, '实时更新科学列表成功', doc)
    })
  }

  getScienceTips(req, res, next) {
    const responTips = Tool.mockData(12, scienceTips);
    res.tools.setJson(0, '获取科学知识成功',  responTips);
  }

  getHotRecommandFromHistory(req, res, next) {
    const responData = Tool.mockData(3, historicalArticles);
    res.tools.setJson(0, '获取热门历史文章成功', responData);
  }

  getLiveUpdateFromHistory(req, res, next) {
    this.articles.find({ passTime: {$lte: new Date}}).sort({_id: -1}).limit(3)
    .then(doc => {
      res.tools.setJson(0, '实时更新历史列表成功', doc)
    })
  }

  getHistoricalStorys(req, res, next) {
    const responTips = Tool.mockData(12, historicalStorys);
    res.tools.setJson(0, '获取历史故事成功',  responTips);
  } 

  getHotRecommandFromLitterateur(req, res, next) {
    const responData = Tool.mockData(3, hotLitterateurs);
    res.tools.setJson(0, '获取热门文学文章成功', responData);
  }

  getLiveUpdateFromLitterateur(req, res, next) {
    this.articles.find({ passTime: {$lte: new Date}}).sort({_id: -1}).limit(3)
    .then(doc => {
      res.tools.setJson(0, '实时更新历史列表成功', doc)
    })
  }

  getExcerpts(req, res, next) {
    const excerpt = Tool.mockData(9, excerpts);
    res.tools.setJson(0, '获去优美句子成功',  excerpt);
  }

  getHotRecommandFromPhysic(req, res, next) {
    const responTips = Tool.mockData(3, hotPhysics);
    res.tools.setJson(0, '热门体育推荐获取成功', responTips);
  }

  getLiveUpdateFromPhysic(req, res, next) {
    this.articles.find({ passTime: {$lte: new Date}}).sort({_id: -1}).limit(3)
    .then(doc => {
      res.tools.setJson(0, '实时更新历史列表成功', doc)
    })
  }

  getSportSense(req, res, next) {
    const responTips = Tool.mockData(12, sportSense);
    res.tools.setJson(0, '获取体育常识成功',  responTips);
  }

}

export default Classify;