import Home from '../controller/home';
import Articles from '../controller/article'; 
import Publish from '../controller/publish';
import Annex from '../controller/annex';
import Classify from '../controller/classify';
import User from '../controller/user';
import Socket from '../controller/socket';
import MessageCenter from '../controller/messageCenter';

export default (app, io)=> {
  new Home(app);
  new Articles(app);
  new Publish(app);
  new Annex(app);
  new Classify(app);
  new User(app);
  new MessageCenter(app);
  new Socket(io);
}
