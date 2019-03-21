//news.js
//获取应用实例
var app = getApp();
Page({
  data: {
    page: 0,
    list: [
      { id: 1, 'type': 'jw', name: '教务公告', storage: [], url: 'news/jw_list.php', enabled: { guest: true, student: true, teacher: true } },
      { id: 2, 'type': 'oa', name: 'OA公告', storage: [], url: 'news/oa_list.php', enabled: { guest: true, student: true, teacher: true } },
      { id: 3, 'type': 'hy', name: '会议通知', storage: [], url: 'news/hy_list.php', enabled: { guest: true, student: true, teacher: true } },
      { id: 4, 'type': 'jz', name: '学术讲座', storage: [], url: 'news/jz_list.php', enabled: { guest: true, student: true, teacher: true } },
      { id: 5, 'type': 'new', name: '综合新闻', storage: [], url: 'news/new_list.php', enabled: { guest: true, student: true, teacher: true } },
    ],
    'active': {
      id: 0,
      'type': 'jw',
      data: [],
      showMore: true,


      remind: '上滑加载更多'

    },
    loading: false,
    user_type: 'guest',
    disabledRemind: false
  },


  // 第一次加载页面
  onLoad: function () {
    var _this = this;
    this.getNewList()
  },

  onShow: function(){
    this.getNewList()
  },

  // 点击改变导航条图表大小
  changeFilter: function (e) {
    var _this = this;
    this.setData({
      'active.type': e.target.id
    })
    // 获取后端数据
    _this.getNewList();
  },

  // 后端数据对接
  getNewList: function () {
    var _this = this;
    var type = _this.data.active.type;
    wx.request({
      url: 'http://hdumanagernews.applinzi.com/news.php',
      data: {
        // 新闻类型
        'type': _this.data.active.type,
        'openid': 'openid'
      },
      success: function (res) {
        // 后台数据
        console.log(res)
        let d = [];
        if(res.statusCode==200&&res.data){
          for(let index in res.data){
            d.push({
              acticleid: res.data[index].id,
              type: _this.data.active.type,
              title: res.data[index].title,
              time: res.data[index].time
            })
          }
        }
        _this.setData({
          'active.data': d
        });
      }
    })
  },


  onLoad: function () {
    if (app._user.is_bind) {
      this.setData({
        user_type: !app._user.teacher ? 'student' : 'teacher'
      });
    } else {
      this.setData({
        user_type: 'guest',
        'active.id': 5,
        'active.type': 'new'
      });
    }
    this.setData({
      'loading': true,
      'active.data': [],
      'active.showMore': true,
      'active.remind': '',
      'page': 0
    });
    // this.getNewsList();
  },
  //无权限查询
  changeFilterDisabled: function () {
    var _this = this;
    if (!_this.data.disabledRemind) {
      _this.setData({
        disabledRemind: true
      });
      setTimeout(function () {
        _this.setData({
          disabledRemind: false
        });
      }, 2000);
    }
  }

});