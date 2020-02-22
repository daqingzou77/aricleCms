import Menus from '../controller/menus';
import DayMenus from '../controller/dayMenu';
import appletMenus from '../controller/appletMenus';
import dayOrders from '../controller/dayOrders';
import users from '../controller/user';
import vedioList from '../controller/vedioList';

export default (app)=> {
  new Menus(app);
  new DayMenus(app);
  new appletMenus(app);
  new dayOrders(app);
  new users(app);
  new vedioList(app);
}
