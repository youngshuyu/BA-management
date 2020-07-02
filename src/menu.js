export const menuData = [
  {
    path: '/caseManagement',
    name: 'caseManagement',
    title: '案件管理',
    children: [
      {
        path: '/caseManagement',
        name: 'caseMan',
        title: '案件管理',
        children: [
          {
            path: '/caseManagement/CaseList',
            name: 'CaseList',
            title: '案件列表'
          }
        ]
      }
    ]
  },
  {
    path: '/classifyManagement',
    name: 'classifyManagement',
    title: '分类管理',
    children: [
      {
        path: '/classifyManagement',
        name: 'classifyMan',
        title: '分类管理',
        children: [
          {
            path: '/classifyManagement/CaseClassification',
            name: 'CaseClassification',
            title: '案件分类'
          }
        ]
      }
    ]
  },
  {
    path: '/LogStatistics',
    name: 'LogStatistics',
    title: '日志统计',
    children: [
      {
        path: '/LogStatistics',
        name: 'LogStat',
        title: '日志统计',
        children: [
          {
            path: '/LogStatistics/pushLog',
            name: 'pushLog',
            title: '推送日志'
          },
          {
            path: '/LogStatistics/userLog',
            name: 'userLog',
            title: '用户日志'
          }
        ]
      }
    ]
  },
  {
    path: '/systemManage',
    name: 'systemManage',
    title: '系统管理',
    children: [
      {
        path: '/systemManage',
        name: 'sysMan',
        title: '系统管理',
        children: [
          {
            path: '/systemManage/userManage',
            name: 'userManage',
            title: '用户管理'
          },
          {
            path: '/systemManage/roleManage',
            name: 'roleManage',
            title: '角色管理'
          },
          {
            path: '/systemManage/originManage',
            name: 'originManage',
            title: '组织机构'
          }
        ]
      }
    ]
  }
]