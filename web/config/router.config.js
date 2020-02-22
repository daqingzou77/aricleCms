export default [
  // app
  {
    path: '/',
    component: '../layouts/ScheduleLayout',
    routes: [
      // dashboard
      // dashboard
      { path: '/', redirect: '/scheduling' },
      {
        path: '/scheduling',
        name: 'scheduling',
        component: './Scheduling',
      },
      {
        path: '/situation',
        name: 'situation',
        component: './Situation',
      },
      {
        path: '/mainevent',
        name: 'mainevent',
        component: './Mainevent',
      },
      /* 作战值班路由 */
      {
        path: '/schedule',
        name: 'schedule',
        icon: 'layout',
        routes: [
          {
            path: '/schedule/todolist',
            name: 'todolist',
            component: './Mainevent/Todolist',
          },
          {
            path: '/schedule/matter',
            name: 'matter',
            component: './Mainevent/Matter',
          },
          {
            path: '/schedule/phoneCheckin',
            name: 'phone',
            component: './Mainevent/Phone',
          },
          {
            path: '/schedule/mailCheckin',
            name: 'mail',
            component: './Mainevent/Mail',
          },
          {
            path: '/schedule/historicallog',
            name: 'historicallog',
            component: './Historicallog',
          },
          {
            path: '/schedule/newlog',
            name: 'newlog',
            component: './Newlog',
          },
          {
            path: '/schedule/arrangement',
            name: 'arrangement',
            component: './Arrangement',
          },
          {
            path: '/schedule/help',
            name: 'help',
            component: './Help',
          },
        ],
      },
      {
        path: '/map',
        name: 'map',
        component: './Result/Success',
      },
      {
        component: '404',
      },
    ],
  },
];
