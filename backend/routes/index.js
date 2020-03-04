// import Menus from '../controller/menus';
// import DayMenus from '../controller/dayMenu';
// import appletMenus from '../controller/appletMenus';
// import dayOrders from '../controller/dayOrders';
// import users from '../controller/user';
// import vedioList from '../controller/vedioList';
import Articles from '../controller/article'; 
import Publish from '../controller/publish';
import Annex from '../controller/annex';

export default (app)=> {
  new Articles(app);
  new Publish(app);
  new Annex(app);
}
