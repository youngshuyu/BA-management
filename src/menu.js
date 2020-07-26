export const menuData = [{
  path: '/home',
  name: 'home',
  title: 'home',
  children: [
    {
      path: '/home',
      name: 'home',
      title: 'home',
      children: [
        {
          path: '/home/index',
          name: 'home',
          title: 'home'
        }
      ]
    }
  ]
},
{
  path: '/caseManagement',
  name: 'caseManagement',
  title: 'caseManagement',
  children: [
    {
      path: '/caseManagement',
      name: 'caseMan',
      title: 'caseManagement',
      children: [
        {
          path: '/caseManagement/CaseList',
          name: 'CaseList',
          title: 'CaseList'
        }
      ]
    }
  ]
},
{
  path: '/classifyManagement',
  name: 'classifyManagement',
  title: 'classifyManagement',
  children: [
    {
      path: '/classifyManagement',
      name: 'classifyMan',
      title: 'classifyManagement',
      children: [
        {
          path: '/classifyManagement/CaseClassification',
          name: 'CaseClassification',
          title: 'CaseClassification'
        }
      ]
    }
  ]
},
{
  path: '/LogStatistics',
  name: 'LogStatistics',
  title: 'LogStatistics',
  children: [
    {
      path: '/LogStatistics',
      name: 'LogStat',
      title: 'LogStatistics',
      children: [
        {
          path: '/LogStatistics/pushLog',
          name: 'pushLog',
          title: 'pushLog'
        },
        {
          path: '/LogStatistics/userLog',
          name: 'userLog',
          title: 'userLog'
        }
      ]
    }
  ]
},
{
  path: '/systemManage',
  name: 'systemManage',
  title: 'systemManage',
  children: [
    {
      path: '/systemManage',
      name: 'sysMan',
      title: 'systemManage',
      children: [
        {
          path: '/systemManage/userManage',
          name: 'userManage',
          title: 'userManage'
        },
        {
          path: '/systemManage/roleManage',
          name: 'roleManage',
          title: 'roleManage'
        },
        {
          path: '/systemManage/originManage',
          name: 'originManage',
          title: 'originManage'
        }
      ]
    }
  ]
},
{
  path: '/personalCenter',
  name: 'personalCenter',
  title: 'personalCenter',
  children: [
    {
      path: '/personalCenter',
      name: 'perCen',
      title: 'perCenter',
      children: [
        {
          path: '/personalCenter/perCenter',
          name: 'personalCenter',
          title: 'personalCenter'
        }
      ]
    }
  ]
}
]
