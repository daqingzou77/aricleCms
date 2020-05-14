import icArrangment from '@/assets/menuIcon/ic_arrangement.svg';
import icChangeShift from '@/assets/menuIcon/ic_changeshift.svg';
import icDutyevent from '@/assets/menuIcon/ic_dutyevent.svg';
import icHelp from '@/assets/menuIcon/ic_help.svg';
import icHistoricalLog from '@/assets/menuIcon/ic_historical_log.svg';
import icMailCheckin from '@/assets/menuIcon/ic_mail_checkin.svg';
import icMap from '@/assets/menuIcon/ic_map.svg';
import icMatter from '@/assets/menuIcon/ic_matter.svg';
import icNewLog from '@/assets/menuIcon/ic_new_daily_record.svg';
import icPhoneCheckin from '@/assets/menuIcon/ic_phone_checkin.svg';
import icPunchCard from '@/assets/menuIcon/ic_punch_card.svg';
import icScheduling from '@/assets/menuIcon/ic_scheduling.svg';
import icSituation from '@/assets/menuIcon/ic_situation.svg';

const visitMenu = [{
      key: 1,
      title: '首页',
      child: [
        {
          key: 101,
          title: '首页',
          icon: icMap,
          path: '/home',
        },
      ],
    },
    {
      key: 2,
      title: '文章分类',
      child: [
        {
          key: 201,
          title: '科学',
          icon: icChangeShift,
          path: '/classify/science',
        },
        {
          key: 202,
          title: '历史',
          icon: icDutyevent,
          path: '/classify/history',
        },
        {
          key: 203,
          title: '文学',
          icon: icHistoricalLog,
          path: '/classify/Litterateur',
        },
        {
          key: 204,
          title: '体育',
          icon: icMatter,
          path: '/classify/physical',
        },
      ],
    },
    {
      key: 3,
      title: '退出',
      child: [
        {
          key: 601,
          title: '退出系统',
          icon: icHelp,
          path: '/help',
        },
      ],
    },
];
const userMenu = [{
    key: 1,
    title: '首页',
    child: [
      {
        key: 101,
        title: '首页',
        icon: icMap,
        path: '/home',
      },
    ],
  },
  {
    key: 2,
    title: '文章分类',
    child: [
      {
        key: 201,
        title: '科学',
        icon: icChangeShift,
        path: '/classify/science',
      },
      {
        key: 202,
        title: '历史',
        icon: icDutyevent,
        path: '/classify/history',
      },
      {
        key: 203,
        title: '文学',
        icon: icHistoricalLog,
        path: '/classify/Litterateur',
      },
      {
        key: 204,
        title: '体育',
        icon: icMatter,
        path: '/classify/physical',
      },
    ],
  },
  {
    key: 5,
    title: '用户中心',
    child: [
      {
        key: 501,
        title: '个人中心',
        icon: icArrangment,
        path: '/userCenter/personCenter',
      },
      {
        key: 502,
        title: '消息中心',
        icon: icPhoneCheckin,
        path: '/userCenter/messageCenter',
      }
    ],
  },
  {
    key: 6,
    title: '退出',
    child: [
      {
        key: 601,
        title: '退出系统',
        icon: icHelp,
        path: '/help',
      },
    ],
  }
];
const writeMenu = [{
    key: 1,
    title: '首页',
    child: [
      {
        key: 101,
        title: '首页',
        icon: icMap,
        path: '/home',
      },
    ],
  },
  {
    key: 2,
    title: '文章分类',
    child: [
      {
        key: 201,
        title: '科学',
        icon: icChangeShift,
        path: '/classify/science',
      },
      {
        key: 202,
        title: '历史',
        icon: icDutyevent,
        path: '/classify/history',
      },
      {
        key: 203,
        title: '文学',
        icon: icHistoricalLog,
        path: '/classify/Litterateur',
      },
      {
        key: 204,
        title: '体育',
        icon: icMatter,
        path: '/classify/physical',
      },
    ],
  },
  {
    key: 3,
    title: '文章发布',
    child: [
      {
        key: 301,
        title: '在线发布',
        icon: icPunchCard,
        path: '/publish/publishOnline',
      },
      {
        key: 302,
        title: '文章上传',
        icon: icSituation,
        path: '/publish/AnnexUpload',
      }
    ]
  },
  {
    key: 5,
    title: '用户中心',
    child: [
      {
        key: 501,
        title: '个人中心',
        icon: icArrangment,
        path: '/userCenter/personCenter',
      },
      {
        key: 502,
        title: '消息中心',
        icon: icPhoneCheckin,
        path: '/userCenter/messageCenter',
      },
    ],
  },
  {
    key: 6,
    title: '退出',
    child: [
      {
        key: 601,
        title: '退出系统',
        icon: icHelp,
        path: '/help',
      },
    ]}
];
const adminMenu = [{
    key: 1,
    title: '首页',
    child: [
      {
        key: 101,
        title: '首页',
        icon: icMap,
        path: '/home',
      },
    ],
  },
  {
    key: 2,
    title: '文章分类',
    child: [
      {
        key: 201,
        title: '科学',
        icon: icChangeShift,
        path: '/classify/science',
      },
      {
        key: 202,
        title: '历史',
        icon: icDutyevent,
        path: '/classify/history',
      },
      {
        key: 203,
        title: '文学',
        icon: icHistoricalLog,
        path: '/classify/Litterateur',
      },
      {
        key: 204,
        title: '体育',
        icon: icMatter,
        path: '/classify/physical',
      },
    ],
  },
  {
    key: 4,
    title: '文章管理',
    child: [
      {
        key: 401,
        title: '文章审核',
        icon: icScheduling,
        path: '/maintain/audit'
      },
      {
        key: 402,
        title: '文章管理',
        icon: icMailCheckin,
        path: '/maintain/manage',
      },
    ],
  },
  {
    key: 5,
    title: '用户中心',
    child: [
      {
        key: 501,
        title: '个人中心',
        icon: icArrangment,
        path: '/userCenter/personCenter',
      },
      {
        key: 502,
        title: '消息中心',
        icon: icPhoneCheckin,
        path: '/userCenter/messageCenter',
      },
      {
        key: 503,
        title: '用户管理',
        icon: icNewLog,
        path: '/userCenter/userManage'
      }
    ],
  },
  {
    key: 6,
    title: '退出',
    child: [
      {
        key: 601,
        title: '退出系统',
        icon: icHelp,
        path: '/help',
      },
    ],
  },
];

export default {
    visitMenu,
    userMenu,
    writeMenu,
    adminMenu
  }