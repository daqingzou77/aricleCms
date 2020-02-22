import dayMenus from '../model/dayMenus';
import appletMenus from '../model/appletMenus';


class AppletMenus {
  constructor(app) {
    Object.assign(this, {
      app,
      dayMenus: dayMenus,
      appletMenus: appletMenus,
    });
    this.init();
  }

  init() {
    this.app.get('/api/appletMenus/addParam', this.addAppletMenus.bind(this)); // 添加小程序菜单
    this.app.get('/api/appletMenus/getAppletMenus', this.getAppletMenus.bind(this)); // 获取小程序菜单
    this.app.post('/api/appletMenus/addMenuItem', this.addMenuItem.bind(this)); // 添加
    this.app.delete('/api/appletMenus/removeMenus', this.removeAppletMenu.bind(this)); // 删除小程序菜单
  };

  addAppletMenus(req, res, next) {
    this.dayMenus.find({})
    .then(doc => {
    if (doc.length > 0) {
      doc.map(item => {
        const { dishName, dishType, dishNum } = item;
        const addParam = { dishName, dishType, dishNum };
        this.appletMenus.create(addParam);
     });
     return res.tools.setJson(0, '插入资源成功', doc);
    }else{
      return res.tools.setJson(1, '无资源');
    }
    })
    .then(() => {
      this.dayMenus.remove({})
    })
    .catch(err => next(err));
  };

  getAppletMenus(req, res, next) {
    const promise1 = this.appletMenus.find({dishType: '早餐'}).then(data =>{
      return { morning: data };
    });
    const promise2 = this.appletMenus.find({dishType: '午餐'}).then(data =>{
      return { noon: data };
    });
    const promise3 = this.appletMenus.find({dishType: '晚餐'}).then(data =>{
      return { night: data };
    });
    Promise.all([promise1, promise2, promise3]).then(data => {
     res.tools.setJson(0, '查询成功', data);
    })
  };

  addMenuItem(req, res, next) {
    const addParam = req.body;
    this.appletMenus.create(addParam)
    .then(doc => {
      return res.tools.setJson(0, '资源添加成功', doc);
    })
    .catch(err => next(err));
  };
  
  removeAppletMenu(req, res, next) {
    this.appletMenus.remove({})
    .then(doc => {
        res.tools.setJson(0, '删除成功', doc);
      }
    )
  };

}

export default AppletMenus;