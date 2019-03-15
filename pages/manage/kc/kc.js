//ks.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    list: [],
    first: 1
  },
  togglePage: function (e) {
    var id = e.currentTarget.id, data = {};
    data.show = [];
    for (var i = 0, len = this.data.class.length; i < len; i++) {
        data.show[i] = false;
    }
    if(this.data.first){
      this.setData(data);
      this.data.first = 0;
    }
    data.show[id] = !this.data.show[id];
    this.setData(data);
  },
  onLoad: function(options){
    var _this = this;
    app.loginLoad(function(){
      _this.loginHandler.call(_this, options);
    });
  },
  //让分享时自动登录
  loginHandler: function(options){
    var _this = this;
    var id, name;
    if(options.id && options.name){
      id = options.id;
      name = options.name;
      _this.setData({
        teacher: false
      });
    }else{
      id = app._user.we.info.id,
      name = app._user.we.info.name;
      _this.setData({
        teacher: app._user.teacher
      });
    }
    if(!id || !name){
      _this.setData({
        remind: '未绑定'
      });
      return false;
    }
    _this.setData({
      id: id,
      name: name
    });
    var data = {
      openid: app._user.openid,
      id: id
    };
    if(app._user.teacher && !options.name){ data.type = 'teacher'; }

    //判断并读取缓存
    if(app.cache.ks && !options.name){ ksRender(app.cache.ks); }
    function ksRender(list){
      if(!list || !list.length){
        _this.setData({
          remind: '无考试安排'
        });
        return false;
      }
      var days = ['一','二','三','四','五','六','日'];
      for (var i = 0, len = list.length; i < len; ++i) {
        list[i].open = false;
        list[i].index = i;
        list[i].day = days[list[i].day - 1];
        list[i].time = list[i].time.trim().replace('—','~');
        list[i].lesson = list[i].lesson.replace(',','-');
      }
      list[0].open = true;
      _this.setData({
        list: list,
        remind: ''
      });
    }
    wx.showNavigationBarLoading();
    wx.request({
      // url: app._server + "/api/get_ks.php",
      url: app._server + "/get_ks/",
      method: 'POST',
      // data: app.key(data),
      data: {
        id: id
      },
      success: function(res) {
        if (res.data && res.data.status === 200){
          var list = res.data.data;
          if(list) {
            if(!options.name){
              //保存考试缓存
              app.saveCache('ks', list);
            }
            ksRender(list);
          } else { _this.setData({ remind: '暂无数据' }); }

        } else {
          app.removeCache('ks');
          _this.setData({
            remind: res.data.message || '未知错误'
          });
        }
      },
      fail: function(res) {
        if(_this.data.remind == '加载中'){
          _this.setData({
            remind: '网络错误'
          });
        }
        console.warn('网络错误');
      },
      complete: function() {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    });
  },
  // 展示考试详情
  slideDetail: function(e) {
    var id = e.currentTarget.dataset.id, 
        list = this.data.list;
    // 每次点击都将当前open换为相反的状态并更新到视图，视图根据open的值来切换css
    for (var i = 0, len = list.length; i < len; ++i) {
      if (i == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      list: list
    });
  }
});