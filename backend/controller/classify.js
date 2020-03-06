import scienceMock from '../initData/scienceMock';
const { hotArticles, dailyUpdate, scienceTips } = scienceMock;

class Classify {
  constructor(app) {
    Object.assign(this, {
      app
    });
    this.init();
  }

  init() {
    this.app.get('/api/classify/getHotRecommandFromScience', this.getHotRecommandFromScience.bind(this)); // 获取科学热门推荐
    this.app.get('/api/classify/getLiveUpdateFromScience', this.getLiveUpdateFromScience.bind(this)); // 即时获取科学
    this.app.get('/api/classify/getScienceTips', this.getScienceTips.bind(this)); // 获取科学知识
   
    this.app.get('/api/classify/getHotRecommandFromHistory', this.getHotRecommandFromHistory.bind(this)); // 获取历史推荐
    this.app.get('/api/classify/getLiveUpdateFromHistory', this.getLiveUpdateFromHistory.bind(this)); // 即时获取历史
    this.app.get('/api/classify/getHistoricalStorys', this.getHistoricalStorys.bind(this)); // 获取历史典故

    this.app.get('/api/classify/getHotRecommandFromLitterateur', this.getHotRecommandFromLitterateur.bind(this)); // 获取文学热门推荐
    this.app.get('/api/classify/getLiveUpdateFromLitterateur', this.getLiveUpdateFromLitterateur.bind(this)); // 即时获取文学
    this.app.get('/api/classify/getExcerpts', this.getExcerpts.bind(this)); // 获取金句摘抄

    this.app.get('/api/classify/getHotRecommandFromPhysic', this.getHotRecommandFromPhysic.bind(this)); // 获取体育热门
    this.app.get('/api/classify/getLiveUpdateFromPhysic', this.getLiveUpdateFromPhysic.bind(this)); // 即时获取体育
    this.app.get('/api/classify/getSportSense', this.getSportSense.bind(this)); // 获取体育常识
  }

  getHotRecommandFromScience(req, res, next) {
    res.tools.setJson(0, '热门推荐获取成功', hotArticles);
  }

  getLiveUpdateFromScience(req, res, next) {
    res.tools.setJson(0, '实时更新成功', dailyUpdate);
  }

  getScienceTips(req, res, next) {
    res.tools.setJson(0, '获取科学知识成功',  scienceTips);
  }

  getHotRecommandFromHistory(req, res, next) {
    res.tools.setJson(0, '热门推荐获取成功', hotArticles);

  }

  getLiveUpdateFromHistory(req, res, next) {
    res.tools.setJson(0, '实时更新成功', dailyUpdate);

  }

  getHistoricalStorys(req, res, next) {
    res.tools.setJson(0, '获取科学知识成功',  scienceTips);

  }

  getHotRecommandFromLitterateur(req, res, next) {

  }

  getLiveUpdateFromLitterateur(req, res, next) {

  }

  getExcerpts(req, res, next) {

  }

  getHotRecommandFromPhysic(req, res, next) {

  }

  getLiveUpdateFromPhysic(req, res, next) {

  }

  getSportSense(req, res, next) {

  }

}

export default Classify;