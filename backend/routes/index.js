// import Menus from '../controller/menus';
// import DayMenus from '../controller/dayMenu';
// import appletMenus from '../controller/appletMenus';
// import dayOrders from '../controller/dayOrders';
// import users from '../controller/user';
// import vedioList from '../controller/vedioList';
import Articles from '../controller/article'; 
import Publish from '../controller/publish';
import Annex from '../controller/annex';
import Classify from '../controller/classify';
import User from '../controller/user';
import Socket from '../controller/socket';

export default (app, io)=> {
  new Articles(app);
  new Publish(app);
  new Annex(app);
  new Classify(app);
  new User(app);
  new Socket(io);
}
