import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/login'),
      meta: {
        title: 'login'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/components/layout/baseLayout'),
      meta: {
        subMenu: true,
        title: 'home'
      },
      children: [
        {
          path: 'home',
          name: 'homePage',
          component: () => import('@/components/layout/emptyLayout'),
          meta: {
            title: 'homePage'
          },
          children: [
            {
              path: '/home/index',
              name: ' index',
              component: () => import('@/components/home/index'),
              meta: {
                title: 'index'
              }
            }
          ]
        }
      ]
    },
    {
      path: '/personalCenter',
      name: 'perCenter',
      component: () => import('@/components/layout/baseLayout'),
      meta: {
        subMenu: true,
        title: 'perCenter'
      },
      children: [
        {
          path: 'personalCenter',
          name: 'perCen',
          component: () => import('@/components/layout/emptyLayout'),
          meta: {
            title: 'perCenter'
          },
          children: [
            {
              path: '/personalCenter/perCenter',
              name: ' personalCenter',
              component: () => import('@/components/personalCenter/personalCenter'),
              meta: {
                title: 'personalCenter'
              }
            }
          ]
        }
      ]
    },
    {
      path: '/caseManagement',
      name: 'caseManagement',
      component: () => import('@/components/layout/baseLayout'),
      meta: {
        subMenu: true, // 是否含有子菜单，是否在头部展示tab
        title: 'caseManagement'
      },
      children: [
        {
          path: '/caseManagement',
          name: 'caseMan',
          component: () => import('@/components/layout/emptyLayout'),
          meta: {
            title: 'caseManagement'
          },
          children: [
            {
              path: '/caseManagement/CaseList',
              name: ' CaseList',
              component: () => import('@/components/caseManagement/CaseList/CaseList'),
              meta: {
                title: 'CaseList'
              }
            }
          ]
        }
      ]
    },
    {
      path: '/classifyManagement',
      name: 'classifyManagement',
      component: () => import('@/components/layout/baseLayout'),
      meta: {
        subMenu: true, // 是否含有子菜单，是否在头部展示tab
        title: 'classifyManagement'
      },
      children: [
        {
          path: '/classifyManagement',
          name: 'classifyMan',
          component: () => import('@/components/layout/emptyLayout'),
          meta: {
            title: 'classifyManagement'
          },
          children: [
            {
              path: '/classifyManagement/CaseClassification',
              name: ' CaseClassification ',
              component: () => import('@/components/classifyManagement/CaseClassification/CaseClassification'),
              meta: {
                title: 'CaseClassification'
              }
            }
          ]
        }
      ]
    },
    {
      path: '/LogStatistics',
      name: 'LogStatistics',
      component: () => import('@/components/layout/baseLayout'),
      meta: {
        subMenu: true, // 是否含有子菜单，是否在头部展示tab
        title: 'LogStatistics'
      },
      children: [
        {
          path: '/LogStatistics',
          name: 'LogStat',
          component: () => import('@/components/layout/emptyLayout'),
          meta: {
            title: 'LogStatistics'
          },
          children: [
            {
              path: '/LogStatistics/pushLog',
              name: ' pushLog ',
              component: () => import('@/components/LogStatistics/pushLog/pushLog'),
              meta: {
                title: 'pushLog'
              }
            },
            {
              path: '/LogStatistics/userLog',
              name: ' userLog',
              component: () => import('@/components/LogStatistics/userLog/userLog'),
              meta: {
                title: 'userLog'
              }
            }
          ]
        }
      ]
    },
    {
      path: '/systemManage',
      name: 'systemManage',
      component: () => import('@/components/layout/baseLayout'),
      meta: {
        subMenu: true, // 是否含有子菜单，是否在头部展示tab
        title: 'systemManage'
      },
      children: [
        {
          path: '/systemManage',
          name: 'sysMan',
          component: () => import('@/components/layout/emptyLayout'),
          meta: {
            title: 'systemManage'
          },
          children: [
            {
              path: '/systemManage/userManage',
              name: ' userManage ',
              component: () => import('@/components/systemManage/userManage/userManage'),
              meta: {
                title: 'userManage'
              }
            },
            {
              path: '/systemManage/roleManage',
              name: ' roleManage',
              component: () => import('@/components/systemManage/roleManage/roleManage'),
              meta: {
                title: 'roleManage'
              }
            },
            {
              path: '/systemManage/originManage',
              name: ' originManage',
              component: () => import('@/components/systemManage/originManage/originManage'),
              meta: {
                title: 'originManage'
              }
            }
          ]
        }
      ]
    }
  ]
})
