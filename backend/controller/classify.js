import scienceMock from '../initData/scienceMock';
import articles from '../model/articles';
import historMock from '../initData/historymock';
import littrateurMock from '../initData/litterateur';
import physicMock from '../initData/physic';
import Tools from '../utils/tools';

const Tool = new Tools();
const { hotScience, scienceTips } = scienceMock;

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
    const responData = Tool.mockData(3, hotScience, 'articlename');
    res.tools.setJson(0, '科学热门推荐获取成功', responData);
  }

  getLiveUpdateFromScience(req, res, next) {
    this.articles.find({ passTime: {$lte: new Date}}).sort({_id: -1}).limit(3)
    .then(doc => {
      res.tools.setJson(0, '实时更新科学列表成功', doc)
    })
  }

  getScienceTips(req, res, next) {
    const responTips = Tool.mockData(12, scienceTips, 'question');
    res.tools.setJson(0, '获取科学知识成功',  responTips);
  }

  getHotRecommandFromHistory(req, res, next) {
    const responData = Tool.mockData(3, hotScience, 'articlename');
    res.tools.setJson(0, '科学热门推荐获取成功', responData);
  }

  getLiveUpdateFromHistory(req, res, next) {
    this.articles.find({ passTime: {$lte: new Date}}).sort({_id: -1}).limit(3)
    .then(doc => {
      res.tools.setJson(0, '实时更新科学列表成功', doc)
    })
  }

  getHistoricalStorys(req, res, next) {
    const responTips = Tool.mockData(12, scienceTips, 'question');
    res.tools.setJson(0, '获取科学知识成功',  responTips);
  }

  getHotRecommandFromLitterateur(req, res, next) {
    res.tools.setJson(0, '热门文学推荐获取成功', hotArticles);
  }

  getLiveUpdateFromLitterateur(req, res, next) {
    res.tools.setJson(0, '实施更新文学列表成功', hotArticles);
  }

  getExcerpts(req, res, next) {
    res.tools.setJson(0, '获取文学金句成功', scienceTips);
  }

  getHotRecommandFromPhysic(req, res, next) {
    res.tools.setJson(0, '科学体育推荐获取成功', hotArticles);
  }

  getLiveUpdateFromPhysic(req, res, next) {
    res.tools.setJson(0, '实时更新体育列表成功', hotArticles);
  }

  getSportSense(req, res, next) {
    res.tools.setJson(0, '获取体育常识成功', scienceTips);
  }

}

export default Classify;