//issues.js
//获取应用实例
var app = getApp();
Page({
  data: {
    list_remind: '加载中',
    list: {
      status: false,  //是否显示列表
      count: '-',   //次数
      data: [],    //列表内容
      open: 0      //被展示的序号
    },
    title: '',
    content: '',
    info: '',
    imgs: [],
    imgLen: 0,
    upload: false,
    uploading: false,
    qiniu: '',
    showError: false
  },
  onLoad: function () {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        var info = '---\r\n**用户信息**\r\n';
        info += '用户名：' + app._user.wx.nickName;
        if (app._user.we.type) {
          info += '（' + app._user.we.type + '-' + app._user.we.info.name + '-' + app._user.we.info.id + '）';
        }
        info += '\r\n手机型号：' + res.model;
        info += '（' + res.platform + ' - ' + res.windowWidth + 'x' + res.windowHeight + '）';
        info += '\r\n微信版本号：' + res.version;
        info += '\r\n杭电助手版本号：' + app.version;
        _this.setData({
          info: info
        });
      }
    });
    if (app.g_status) { return; }
    wx.showNavigationBarLoading();
    wx.request({
      url: 'https://hdumanagernews.applinzi.com/get_feedback.php?openid=' + app._user.openid,
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (res.statusCode === 200 && res.data) {
          let d = res.data;
          var list = [];
          for(let i in d){
            list.push(d[i])
          }
          
          if (list && list.length) {
            _this.setData({
              'list.count': list.length,
              'list.data': list,
              'list_remind': ''
            });
          } else {
            _this.setData({
              'list_remind': '暂无反馈记录',
              'list.count': 0
            });
          }
        } else {
          _this.setData({
            'list_remind': '加载失败'
          });
        }
      },
      fail: function () {
        _this.setData({
          'list_remind': '加载失败'
        });
      },
      complete: function () {
        wx.hideNavigationBarLoading();
      }
    });
    wx.request({
      url: app._server + '/api/upload/get_upload_token.php',
      method: 'POST',
      data: app.key({
        openid: app._user.openid
      }),
      success: function (res) {
        if (res.data.status === 200) {
          _this.setData({
            upload: true,
            qiniu: res.data.data.token
          });
        }
      },
      complete: function () {
        wx.hideNavigationBarLoading();
      }
    });
  },
  getIssue: function (id, index) {
    var _this = this, thedata = _this.data.list.data[index];
    if (!thedata.content) {
      _this.setData({
        'item_remind': '加载中...'
      });
    } else { return; }
    wx.showNavigationBarLoading();
    wx.request({
      url: 'https://hdumanagernews.applinzi.com/issues/',
      success: function (res) {
        var data = {}, content = res.data;
        content.body = content.body.split('\r\n\r\n---\r\n**用户信息**\r\n')[0];
        data['list.data[' + index + '].content'] = content;
        data['item_remind'] = '';
        _this.setData(data);
      },
      fail: function () {
        _this.setData({
          'item_remind': '加载失败'
        });
      },
      complete: function () {
        wx.hideNavigationBarLoading();
      }
    });
  },
  openList: function (e) {
    var _this = this, list = _this.data.list;
    // if (!list.status && list.count) {
    //   _this.getIssue(list.data[0].issues, 0);
    // }
    _this.setData({
      'list.status': !list.status
    });
  },
  openItem: function (e) {
    var _this = this, index = e.currentTarget.dataset.index, list = _this.data.list;
    if (index != list.open) {
      _this.getIssue(list.data[index].issues, index);
      _this.setData({
        'list.open': index
      });
    }
  },
  listenerTitle: function (e) {
    this.setData({
      'title': e.detail.value
    });
  },
  listenerTextarea: function (e) {
    this.setData({
      'content': e.detail.value
    });
  },
  submit: function () {
    var _this = this, title = '', content = '', imgs = '';
    if (app.g_status) {
      app.showErrorModal(app.g_status, '提交失败');
      return;
    }
    _this.setData({
      showError: true
    });
    if (_this.data.uploading || !_this.data.title || !_this.data.content) {
      return false;
    }
    wx.showModal({
      title: '提示',
      content: '是否确认提交反馈？',
      success: function (res) {
        if (res.confirm) {
          title = '【' + app._user.wx.nickName + '】' + _this.data.title;
          content = _this.data.content + '\r\n\r\n' + _this.data.info;
          app.showLoadToast();
          wx.request({
            url: 'https://hdumanagernews.applinzi.com/feedback.php',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
              openid: app._user.openid,
              title: title,
              body: content
            },
            method: 'POST',
            success: function (res) {
              console.log(res.data)
              if (res.data === 'OK') {
                var text = '反馈成功，您可通过访问 ' + ' 了解反馈动态';
                wx.showModal({
                  title: '反馈成功',
                  content: text,
                  showCancel: false,
                  success: function (res) {
                    wx.navigateBack();
                  }
                });
              } else {
                app.showErrorModal(res.data.message, '提交失败');
              }
            },
            fail: function (res) {
              app.showErrorModal(res.errMsg, '提交失败');
            },
            complete: function () {
              wx.hideToast();
            }
          });
        }
      }
    });
  }
});