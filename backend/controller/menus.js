import menus from '../model/menus';
class Memus {
  constructor(app) {
    Object.assign(this, {
      app,
      model: menus
    })
    this.init();
  }
  
  init() {
    this.app.get('/api/menu/getList', this.getMenuList.bind(this)); // 查询所有菜类
    this.app.post('/api/menu/getMenuByItems', this.getMenuByItems.bind(this)); // 通过条件查询
    this.app.get('/api/menu/getItemByName', this.getItemByName.bind(this)); // 菜名查询
    this.app.post('/api/menu/addMenuItem', this.addMenuItem.bind(this));  // 添加菜系
    this.app.put('/api/menu/updateMenu', this.updateMenu.bind(this));  // 修改菜系
    this.app.delete('/api/menu/deleteMenuItems', this.deleteMenuItems.bind(this));  // 单例删除
    this.app.delete('/api/menu/deleteMenuItem', this.deleteMenuItem.bind(this));  // 批量删除
  }

  getMenuList(req, res, next) {
    this.model.find({})
    .then(doc => {
      if(!doc) return res.tools.setJson(1, '资源不存在')
      return res.tools.setJson(0, '调用成功', doc)
    })
    .catch(err => next(err));
  };

  getMenuByItems(req, res, next){
    const { searchName = '', selectedType = 0 } = req.body;
    this.model.find({
      dishName: searchName === '' ? {$regex: ''}: searchName,
      dishType: selectedType === 2 ? {$regex: ''} : selectedType === 0 ? '炒菜' : '主食',
    }).then(doc => {
      return res.tools.setJson(0, '查询成功', doc)
    }).catch(err => next(err));
  };

  getItemByName(req, res, next) {
    const name = req.query.dishName;
    this.model.findOne({ dishName: name})
    .then(doc => {
      if(!doc) return res.tools.setJson(1, '资源不存在或已删除', doc);
      return res.tools.setJson(0, '调用成功', doc)
    })
    .catch(err => next(err));
  };

  addMenuItem(req, res, next) {
    const addParam = req.body;
    const { inventory } = addParam;
    addParam.createdTime = new Date();
    addParam.selectedNums = 0;
    addParam.sparedNums = inventory;
    addParam.morning = 0;
    addParam.noon = 0;
    addParam.night = 0;
    this.model.create(addParam)
    .then(doc => res.tools.setJson(0, '资源上传成功', doc))
    .catch(err => next(err));
  };

  updateMenu(req, res, next) {
    const updateParam = req.body;
    console.log(updateParam);
    const { dishName } = updateParam;
    this.model.update({ dishName }, updateParam)
    .then(doc => res.tools.setJson(0, '资源修改成功', doc))
    .catch(err => next(err));
  };

  deleteMenuItem(req, res, next) {
    const deleteParam = req.body.dishName;
    this.model.deleteOne({ dishName: deleteParam })
    .then(doc => res.tools.setJson(0, '删除成功', doc))
    .catch(err => next(err));
  };

  deleteMenuItems(req, res, next) {
    const deleteParam = req.body.deleteArrays;
    console.log(deleteParam);
    this.model.remove({ dishName: {$in: deleteParam}})
    .then(doc => {
      res.tools.setJson(0, '删除成功', doc);
    })
    .catch(err => next(err));
  }
}

export default Memus;