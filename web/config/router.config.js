
export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './Login/Login' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/ScheduleLayout',
    routes: [
      { path: '/', redirect: '/home' },
      {
        path: '/home',
        name: 'scheduling',
        component: './Home',
      },
      /** 文章分类 */
      {
        path: '/classify',
        name: 'classify',
        routes: [
          {
            path: '/classify/science',
            name: 'science',
            component: './Classify/Science'
          },
          {
            path: '/classify/history',
            name: 'history',
            component: './Classify/History'
          },
          {
            path: '/classify/Litterateur',
            name: 'litterateur',
            component: './Classify/Litterateur'
          },
          {
            path: '/classify/physical',
            name: 'physical',
            component: './Classify/Physical'
          },
        ]
      },
     {
       path: '/publish',
       name: 'publish',
       routes: [
        {
          path: '/publish/publishOnline',
          name: 'publishOnline',
          component: './Publish/OnlinePublish'
        },
        {
          path: '/publish/AnnexUpload',
          name: 'annexUpload',
          component: './Publish/AnnexUpload'
        },
       ] 
     },
     {
       path: '/maintain',
       name: 'manage',
       routes: [
        {
          path: '/maintain/audit',
          name: 'publishOnline',
          component: './Maintain/Audit'
        }, 
        {
          path: '/maintain/manage',
          name: 'publishOnline',
          component: './Maintain/Manage'
        }
       ]
     },
     {
      path: '/userCenter',
      name: 'userCenter',
      routes: [
        {
          path: '/userCenter/personCenter',
          name: 'userCenter',
          component: './UserCenter/PersonCenter',
        },
        {
          path: '/userCenter/userManage',
          name: 'userManage',
          component: './UserCenter/UserManage',
        }
      ]
    },
      {
        component: '404',
      },
    ],
  },
];
