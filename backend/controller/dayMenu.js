import menus from '../model/menus';
import dayMenus from '../model/dayMenus';
import { convertToArray } from '../utils/index';

class DayMenus {
  constructor(app) {
    Object.assign(this, {
      app,
      model: menus,
      dayMenus: dayMenus,
    })
    this.init();
  }

  // 加载路由
  init() {
    this.app.post('/api/dayMenu/findByItems', this.getMenuByItems.bind(this)); // 条件查询
    this.app.put('/api/dayMenu/updateMorning', this.updateMorning.bind(this)); // 修改早餐
    this.app.put('/api/dayMenu/updateNoon', this.updateNoon.bind(this)); // 修改午餐
    this.app.put('/api/dayMenu/updateNight', this.updateNight.bind(this)); // 修改晚餐
    this.app.post('/api/dayMenu/dataExist', this.dataExist.bind(this)); //判断数据是否存在
    this.app.post('/api/dayMenu/addDayMenus', this.addDayMenus.bind(this)); // 添加至每日菜單 
    this.app.post('/api/dayMenu/updateMenus', this.updateMenus.bind(this)); // 修改每日菜单内容
    this.app.get('/api/dayMenu/getDayMenusList', this.getDayMenuList.bind(this)); //查询菜单信息
    this.app.delete('/api/dayMenu/deleteMenuItem', this.deleteMenuItem.bind(this)); // 撤销
    this.app.delete('/api/dayMenu/deleteMenuByType', this.deleteMenuByType.bind(this)); // 类别删除
  }

  getMenuByItems(req, res, next) {
    const { option, selectedType, searchName = '' } = req.body;
    console.log(selectedType);
    console.log(option);
    const promie = this.model.find({
      dishName: searchName === '' ? { $regex: '' } : searchName,
      dishType: selectedType === 2 ? { $regex: '' } : selectedType === 0 ? '炒菜' : '主食',
    });
    if (option === 1) {
      promie.sort({ 'inventory': -1 })
        .then(doc => {
          return res.tools.setJson(0, '查询成功', doc);
        })
        .catch(err => next(err));
    } else {
      promie.sort({ 'sparedNums': -1 })
        .then(doc => {
          return res.tools.setJson(0, '查询成功', doc);
        })
        .catch(err => next(err));
    }
  };

  updateMorning(req, res, next) {
    const { dishName = '', mornings } = req.body;
    console.log(mornings);
    this.model.findOne({ dishName })
      .then(doc => {
        if (doc === null) {
          res.tools.setJson(1, '资源不存在', doc);
          return;
        }
        const { inventory, noon, night, selectedNums } = doc;
        if (inventory - mornings <= 0) {
          return false;
        } else {
          return {
            inventory: inventory,
            morning: mornings,
            selectedNums: mornings + noon + night,
          }
        }
      })
      .then(data => {
        if (data) {
          const { selectedNums, inventory, morning} = data;
          const sparedNums = inventory - selectedNums;
          if (sparedNums < 0) {
            return res.tools.setJson(1, '库存不足', 'absence');
          }
          this.model.updateOne({ dishName }, { $set: { morning, selectedNums, sparedNums } })
            .then(doc => {
              return res.tools.setJson(0, '修改成功', morning);
            })
        } else {
          return res.tools.setJson(1, '库存不足', 'absence');
        }
      })
      .catch(err => next(err));
  };

  updateNoon(req, res, next) {
    const { dishName = '', noons } = req.body;
    this.model.findOne({ dishName })
      .then(doc => {
        if (doc === null) {
          res.tools.setJson(1, '资源不存在', doc);
          return;
        }
        const { inventory, morning, night, selectedNums } = doc;
        if (inventory - noons <= 0) {
          return false;
        } else {
          return {
            inventory,
            noon: noons,
            selectedNums: morning + noons + night,
          }
        }
      })
      .then(data => {
        if (data) {
          const { selectedNums, noon, inventory } = data;
          const sparedNums = inventory - selectedNums;
          if (sparedNums < 0) {
            return res.tools.setJson(1, '库存不足', 'absence');
          }
          this.model.updateOne({ dishName }, { $set: { noon, selectedNums, sparedNums } })
            .then(doc => {
              return res.tools.setJson(0, '修改成功', noon);
            })
        } else {
          return res.tools.setJson(1, '库存不足', 'absence');
        }
      })
      .catch(err => next(err));
  }

  updateNight(req, res, next) {
    const { dishName = '', nights } = req.body;
    this.model.findOne({ dishName })
      .then(doc => {
        if (doc === null) {
          res.tools.setJson(1, '资源不存在', doc);
          return;
        }
        const { inventory, morning, noon } = doc;
        if (inventory - nights <= 0) {
          return false;
        } else {
          return {
            inventory,
            night: nights,
            selectedNums: morning + noon + nights,
          }
        }
      })
      .then(data => {
        if (data) {
          const { selectedNums,  night, inventory } = data;
          const sparedNums = inventory - selectedNums;
          if (sparedNums < 0) {
            return res.tools.setJson(1, '库存不足', 'absence');
          }
          this.model.updateOne({ dishName }, { $set: { night, selectedNums, sparedNums } })
            .then(doc => {
              return res.tools.setJson(0, '修改成功', night);
            })
        } else {

          return res.tools.setJson(1, '库存不足', 'absence');
        }
      })
      .catch(err => next(err));
  }

  dataExist(req, res, next) {
    const { dishName } = req.query.dishName;
    this.dayMenus.find({dishName})
    .then(doc => {
      if (doc.length > 0) {
        res.tools.setJson(1, '资源已存在', doc)
      }else{
        res.tools.setJson(0, '资源不存在', doc)
      }
    })
  };

  addDayMenus(req, res, next) {
    const addArray = convertToArray(req.body);
    let promise = '';
    addArray.map(item => {
      promise = this.dayMenus.create(item);
    });
    promise.then(doc => {
      return res.tools.setJson(0, '资源上传成功', doc);
    })
    .catch(err => next(err));
  };

  updateMenus(req, res, next) {
    const { dishName } = req.body;
    const addArray = convertToArray(req.body);
    console.log(addArray);
    let promise = '';
    this.dayMenus.remove({dishName}).then((doc) => {
      console.log(doc);
      addArray.map(item => {
        promise = this.dayMenus.create(item);
      });
      promise.then(doc => {
        return res.tools.setJson(0, '资源修改成功', doc);
      })
    }).catch(err => next(err));
  };

  getDayMenuList(req, res, next){
    const promise1 = this.dayMenus.find({dishType: '早餐'}).then(data =>{
      return { morning: data };
    });
    const promise2 = this.dayMenus.find({dishType: '午餐'}).then(data =>{
      return { noon: data };
    });
    const promise3 = this.dayMenus.find({dishType: '晚餐'}).then(data =>{
      return { night: data };
    });
    Promise.all([promise1, promise2, promise3]).then(data => {
     res.tools.setJson(0, '查询成功', data);
    })
  }

  deleteMenuItem(req, res, next) {
    const { dishName } = req.body;
    this.dayMenus.remove({ dishName })
    .then(doc => {
      res.tools.setJson(0, '删除成功', doc);
    })
    .catch(err => next(err));
  };

  deleteMenuByType(req, res, next) {
    const { dishName, dishType } = req.body;
    this.dayMenus.remove({ dishName, dishType})
    .then(doc => {
      return res.tools.setJson(0, '删除成功', doc);
    })
    .catch(err => next(err));
  };
}

export default DayMenus;