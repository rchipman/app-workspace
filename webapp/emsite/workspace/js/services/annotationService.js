Workspace.factory('annotationService', function () {
  var data = [
  {
  project:{
    id: 57,
    name: "Bad Project"
  },
  annotation:{
    id: 5,
    name: "Stupid art",
    description: "This is my fifth child's bad art",
    status: 'Done',
    hasRecentActivity: true,
    createTime: '05/04/2014 14:33:56',
    lastUpdateTime: '05/06/2014 06:30:23',
    owner: 'Bob Dole',
    path: 'img/ForMom.jpg'
    }
  },
  {
  project:{
    id: 7,
    name: "Good Project"
  },
  annotation:{
    id: 57,
    name: "Nice art",
    description: "This is my fourth child's good art",
    status: 'Done',
    hasRecentActivity: false,
    createTime: '05/14/2014 14:36:56',
    lastUpdateTime: '06/06/2014 06:30:23',
    owner: 'Bob Dole',
    path: 'img/FenceDog.jpg'
    }
  },
  {
  project:{
    id: 14,
    name: "Great Project"
  },
  annotation:{
    id: 67,
    name: "Great art",
    description: "This is my first child's amazing art",
    status: 'Done',
    hasRecentActivity: false,
    createTime: '05/04/1987 14:33:56',
    lastUpdateTime: '05/06/1999 06:30:23',
    owner: 'Bobette Dole',
    path: 'img/TigerTug.jpg'
    }
  },
  {
  project:{
    id: 13,
    name: "Unknown Project"
  },
  annotation:{
    id: 89,
    name: "Maybe art",
    description: "This is my second child's interpretive pseudo art project",
    status: 'In Progress',
    hasRecentActivity: true,
    createTime: '01/04/2011 14:33:56',
    lastUpdateTime: '05/14/2014 15:31:23',
    owner: 'Fred Dole',
    path: 'img/BlueBus.jpg'
    }
  }
  ]
   
  /* 
  annotationApi.query({}, function(response){
  realData = response
  })
  */
   
  return { 
  mockData: data
  }
})