
import dayOrder from '../model/dayOrder';
import { transcode } from 'buffer';
import moment from 'moment';
import commander from 'commander';

class dayOrders {    
  constructor(app) {
    Object.assign(this, {
      app,
      dayOrder,
    });
    this.init();
  }

  init() {
    this.app.get('/api/dayOrder/getOrderList', this.getOrderList.bind(this)); // 获取
    this.app.post('/api/dayOrder/addParam', this.addParam.bind(this)); // 添加订单
    this.app.post('/api/dayOrder/findItemByOption', this.findItemByOption.bind(this)); // 条件查询
    this.app.delete('/api/dayOrder/deleteItemByOption',  this.deleteItemByOption.bind(this)); // 添加删除
    this.app.delete('/api/dayOrder/deleteItems', this.deleteItems.bind(this)); // 多例删除
  }

  getOrderList(req, res, next) {
    this.dayOrder.find({})
    .then(doc => {
       res.tools.setJson(0, '添加成功', doc);
    })
    .catch(err => next(err));
  };

  addParam(req, res, next) {
    const  addParam = req.body;
    addParam.dateTime = new Date();
    this.dayOrder.create(addParam)
    .then(doc => {
       res.tools.setJson(0, '添加成功', doc);
    })
    .catch(err => next(err));
  }

  findItemByOption(req, res, next) {
    const { dateTime, dishName } = req.body;
    this.dayOrder.find({
      dishName: dishName === '' ? { $regex: '' } : dishName,
      dateTime: dateTime === '' ? { $lt: new Date() } : {$gte: dateTime, $lt: moment(dateTime).add(1, 'd')},
    })
    .then(doc => {
      console.log(doc);
      res.tools.setJson(0, '查询资源成功', doc);
    })
    .catch(err => next(err));
  };

  deleteItemByOption (req, res, next) {
    const { dishName }= req.body;
    this.dayOrder.remove({
      dishName,
    })
    .then(doc => {
      res.tools.setJson(0, '删除成功', doc);
    })
    .catch(err => next(err));
  };

  deleteItems(req, res, next) {
    const { deleteArrays } = req.body;
    this.dayOrder.remove({ 
      dishName:{ $in: deleteArrays }
    })
    .then(doc => {
      console.log(doc);
      res.tools.setJson(0, '删除成功', doc);
    })
    .catch(err => next(err));
  };
};

export default dayOrders;