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
  onLoad: function(){
    var _this = this;
    this.setData({
      list: {
        // count: '6',
        data: [
          {
            issues: '标签0',
            title: '问题标题',
            content: {
              labels: [
                { name: '标签1' }
              ],
              state: 'closed',
              body: '问题详细描述'
            }
          },
          {
            issues: '标签？',
            title: '问题标题',
            content: {
              labels: [
                { name: '标签' }
              ],
              state: 'closed',
              body: '问题详细描述'
            }
          }
        ],
      },
       //反馈次数

      open: 0,
    })
  },
  openList: function(e) {
    var _this = this, list = _this.data.list;
    if(!list.status && list.count){
      // _this.getIssue(list.data[0].issues, 0);
    }
    _this.setData({
      'list.status': !list.status
    });
  },
  openItem: function(e) {
    var _this = this, index = e.currentTarget.dataset.index, list = _this.data.list;
    if(index != list.open){
      // _this.getIssue(list.data[index].issues, index);
      _this.setData({
        'list.open': index
      });
    }
  },
  listenerTitle: function(e){
    this.setData({
      'title': e.detail.value
    });
  },
  listenerTextarea: function(e){
    this.setData({
      'content': e.detail.value
    });
  },
  submit: function(){
    var _this = this, title = '', content = '', imgs = '';
    if(app.g_status){
      app.showErrorModal(app.g_status, '提交失败');
      return;
    }
    _this.setData({
      showError: true
    });
    if(_this.data.uploading || !_this.data.title || !_this.data.content){
      return false;
    }
    wx.showModal({
      title: '提示',
      content: '是否确认提交反馈？',
      success: function(res) {
        if (res.confirm) {
          title = '【' + app._user.wx.nickName + '】' + _this.data.title;
          content = _this.data.content + '\r\n\r\n' + _this.data.info;
          app.showLoadToast();
          wx.request({
            url: app._server + '/api/feedback.php',
            data: app.key({
              openid: app._user.openid,
              title: title,
              body: content
            }),
            method: 'POST',
            success: function(res){
              if(res.data.status === 200){
                var text = '反馈成功，您可通过访问 ' + res.data.data.html_url + ' 了解反馈动态';
                wx.showModal({
                  title: '反馈成功',
                  content: text,
                  showCancel: false,
                  success: function(res) {
                    wx.navigateBack();
                  }
                });
              }else{
                app.showErrorModal(res.data.message, '提交失败');
              }
            },
            fail: function(res) {
              app.showErrorModal(res.errMsg, '提交失败');
            },
            complete: function() {
              wx.hideToast();
            }
          });
        }
      }
    });
  }
});