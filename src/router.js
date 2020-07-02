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
        title: '登陆'
      }
    },
    {
      path: '/caseManagement',
      name: 'caseManagement',
      component: () => import('@/components/layout/baseLayout'),
      meta: {
        subMenu: true, // 是否含有子菜单，是否在头部展示tab
        title: '案件管理'
      },
      children: [
        {
          path: '/caseManagement',
          name: 'caseMan',
          component: () => import('@/components/layout/emptyLayout'),
          meta: {
            title: '案件管理'
          },
          children: [
            {
              path: '/caseManagement/CaseList',
              name: ' CaseList',
              component: () => import('@/components/caseManagement/CaseList/CaseList'),
              meta: {
                title: '案件列表'
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
        title: '分类管理'
      },
      children: [
        {
          path: '/classifyManagement',
          name: 'classifyMan',
          component: () => import('@/components/layout/emptyLayout'),
          meta: {
            title: '分类管理'
          },
          children: [
            {
              path: '/classifyManagement/CaseClassification',
              name: ' CaseClassification ',
              component: () => import('@/components/classifyManagement/CaseClassification/CaseClassification'),
              meta: {
                title: '案件分类'
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
        title: '日志统计'
      },
      children: [
        {
          path: '/LogStatistics',
          name: 'LogStat',
          component: () => import('@/components/layout/emptyLayout'),
          meta: {
            title: '日志统计'
          },
          children: [
            {
              path: '/LogStatistics/pushLog',
              name: ' pushLog ',
              component: () => import('@/components/LogStatistics/pushLog/pushLog'),
              meta: {
                title: '推送日志'
              }
            },
            {
              path: '/LogStatistics/userLog',
              name: ' userLog',
              component: () => import('@/components/LogStatistics/userLog/userLog'),
              meta: {
                title: '用户日志'
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
        title: '系统管理'
      },
      children: [
        {
          path: '/systemManage',
          name: 'sysMan',
          component: () => import('@/components/layout/emptyLayout'),
          meta: {
            title: '系统管理'
          },
          children: [
            {
              path: '/systemManage/userManage',
              name: ' userManage ',
              component: () => import('@/components/systemManage/userManage/userManage'),
              meta: {
                title: '用户管理'
              }
            },
            {
              path: '/systemManage/roleManage',
              name: ' roleManage',
              component: () => import('@/components/systemManage/roleManage/roleManage'),
              meta: {
                title: '角色管理'
              }
            },
            {
              path: '/systemManage/originManage',
              name: ' originManage',
              component: () => import('@/components/systemManage/originManage/originManage'),
              meta: {
                title: '组织机构'
              }
            }
          ]
        }
      ]
    }
  ]
})
