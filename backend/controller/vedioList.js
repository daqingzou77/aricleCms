import videoList from '../model/vedioList';


class video {
  constructor(app){
    Object.assign(this, {
      app,
      videoList: videoList,
    })
    this.init();
  };
  init() {
    this.app.get('/api/video/getVideoList', this.getVideoList.bind(this));
    this.app.post('/api/video/addVideoParam', this.addVideoParam.bind(this));
  }

  getVideoList(req, res, next) {
    this.videoList.find({})
    .then((doc)=>{
       res.tools.setJson(0, '查询成功', doc);
    })
    .catch(err => next(err));
  }

  addVideoParam(req, res, next) {
    const addParam = req.body;
    this.videoList.create(addParam)
    .then(doc => {
       res.tools.setJson(0, '信息添加成功', doc);
    })
    .catch(err => next(err));
  }
}

export default video;