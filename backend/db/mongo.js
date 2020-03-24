import mongoose from 'mongoose';
import config from '../config/app.config';

const configs = config.mongo.dev;

class Mongo {
  constructor() {
    this.init(); 
  }

  //初始化数据库
  init() {
    mongoose.set('useCreateIndex', true)
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
    mongoose.connect(configs, opts);
    const db = mongoose.connection;
    db.on('open', ()=> console.log('mongoDb connection success'));
    db.on('error', e => console.log('mongoDb connection failed', e.toString()));
  }
}

export default Mongo;