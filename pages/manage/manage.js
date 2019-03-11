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
      'type': 'all',
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
  },

  // 点击改变导航条图表大小
  changeFilter: function (e) {
    var _this = this;
    this.setData({
      'active.type': e.target.id
    })
    // 获取后端数据
    _this.getNewList();

    // // 测试用后端数据
    // var type = _this.data.active.type;
    // this.setData({
    //   'user_type': 'guest',
    //   'active.data[0].articleid': 1, 'active.data[0].type': 'new', 'active.data[0].title': type + '标题1', 'active.data[0].time': '2012-12-25',
    //   'active.data[1].articleid': 2, 'active.data[1].type': 'new', 'active.data[1].title': type + '标题2', 'active.data[1].time': '2012-12-25',
    //   'active.data[2].articleid': 3, 'active.data[2].type': 'new', 'active.data[2].title': type + '标题2', 'active.data[2].time': '2012-12-25',
    //   'active.data[3].articleid': 4, 'active.data[3].type': 'new', 'active.data[3].title': type + '标题2', 'active.data[3].time': '2012-12-25',
    // });

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
        console.log(res.data[0].title)
        _this.setData({
          'user_type': 'guest',
          'active.data[0].articleid': 1, 'active.data[0].type': _this.data.active.type, 'active.data[0].title': type + res.data[0].title, 'active.data[0].time': res.data[0].time,
          'active.data[1].articleid': 2, 'active.data[1].type': _this.data.active.type, 'active.data[1].title': type + '标题2', 'active.data[1].time': '2012-12-25',
          'active.data[2].articleid': 3, 'active.data[2].type': _this.data.active.type, 'active.data[2].title': type + '标题2', 'active.data[2].time': '2012-12-25',
          'active.data[3].articleid': 4, 'active.data[3].type': _this.data.active.type, 'active.data[3].title': type + '标题2', 'active.data[3].time': '2012-12-25',
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