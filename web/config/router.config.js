


export default [
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
        {
          path: '/publish/Audit',
          name: 'audit',
          component: './Publish/Audit'
        }
       ] 
     },
     {
       path: '/manage',
       name: 'manage',
       component: './Manage'
     },
     {
      path: '/userCenter',
      name: 'userCenter',
      routes: [
        {
          path: '/userCenter/personCenter',
          name: 'usrCenter',
          component: './UserCenter/PersonCenter',
        },
      ]
    },
    {
      path: '/help',
      name: 'help',
      component: './Help'
    },
      {
        component: '404',
      },
    ],
  },
];
