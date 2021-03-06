//detail.js (common)
var app = getApp();
module.exports.ipage = {
  data: {
    remind: "加载中",
    id: "",
    title: "",    // 新闻标题
    date: "",     // 发布日期
    author: "",   // 发布作者
    reading: "",   // 阅读量
    content: "",  // 新闻内容
    files_len: 0,  // 附件数量
    files_list: [],
    file_loading: false, //下载状态
    source: '',   // 附件来源
    sources: {
      'jw': '教务在线',
      'oa': 'OA系统',
      'hy': 'OA系统',
      'jz': 'OA系统',
      'new': '新闻中心'
    }
  },
  //分享
  onShareAppMessage: function () {
    var _this = this;
    return {
      title: _this.data.title,
      desc: 'We重邮 - 资讯详情',
      path: 'pages/news/' + _this.data.type + '/' + _this.data.type + '_detail?type=' + _this.data.type + '&id=' + _this.data.id
    }
  },

  convertHtmlToText: function (inputText) {
    var returnText = "" + inputText;
    returnText = returnText.replace(/<\/?[^>]*>/g, '').replace(/[ | ]*\n/g, '\n').replace(/ /ig, '')
      .replace(/&mdash/gi, '-').replace(/&ldquo/gi, '“').replace(/&rdquo/gi, '”');
    return returnText;
  },

  onLoad: function (options) {
    var _this = this;
    app.loginLoad(function () {
      _this.loginHandler.call(_this, options);
    });
  },
  loginHandler: function (options) {
    var _this = this;

    if (!options.type || !options.id) {
      _this.setData({
        remind: '404'
      });
      return false;
    }
    _this.setData({
      'type': options.type,
      id: options.id
    });
    options.openid = app._user.openid;
    wx.request({
      url: 'https://hdumanagernews.applinzi.com/get_news_detail.php',
      data: options,
      success: function (res) {
        console.log(res.data)
        if (res.statusCode === 200) {
          var info = res.data[0];
          // 提取信息中的时间，作者，阅读量
          var author_info = [];
          // if(info.author){
          //   author_info = info.author.split(' ').map(function(e){
          //     console.log(e);
          //     return e.split(':')[1];
          //   });
          // }
          _this.setData({
            date: info.time,  // 发布日期
            author: info.author,     // 发布作者
            reading: info.reading,    // 阅读量
            title: info.title,            //新闻标题
            content: _this.convertHtmlToText(info.body),  // 新闻内容
            source: _this.data.sources[options.type],
            remind: ''
          });

          // 如果存在附件则提取附件里面的信息
          if (info.fjlist && info.fjlist.length) {
            info.fjlist.map(function (e) {
              //判断是否支持预览
              e.preview = (e.fjtitle.search(/\.doc|.xls|.ppt|.pdf|.docx|.xlsx|.pptx$/) !== -1);
              return e;
            });
            _this.setData({
              files_len: info.fjlist.length,
              files_list: info.fjlist
            });
          }
        } else {
          app.showErrorModal(res.data.message);
          _this.setData({
            remind: res.data.message || '未知错误'
          });
        }
      },
      fail: function () {
        app.showErrorModal(res.errMsg);
        _this.setData({
          remind: '网络错误'
        });
      }
    })
  },

  getFj: function (e) {
    var _this = this;
    if (!e.currentTarget.dataset.preview) {
      app.showErrorModal('不支持该格式文件预览！', '无法预览');
      return;
    }
    wx.showModal({
      title: '提示',
      content: '预览或下载附件需要消耗流量，是否继续？',
      confirmText: '继续',
      success: function (res) {
        if (res.confirm) {
          app.showLoadToast('下载中，请稍候');
          wx.showNavigationBarLoading();
          _this.setData({
            file_loading: true
          });
          //下载
          wx.downloadFile({
            url: e.currentTarget.dataset.url,
            success: function (res) {
              var filePath = res.tempFilePath;
              //预览
              wx.openDocument({
                filePath: filePath,
                success: function (res) {
                  console.info('预览成功');
                },
                fail: function (res) {
                  app.showErrorModal(res.errMsg, '预览失败');
                },
                complete: function () {
                  wx.hideNavigationBarLoading();
                  wx.hideToast();
                  _this.setData({
                    file_loading: false
                  });
                }
              });
            },
            fail: function (res) {
              app.showErrorModal(res.errMsg, '下载失败');
              wx.hideNavigationBarLoading();
              wx.hideToast();
              _this.setData({
                file_loading: false
              });
            }
          });
        }
      }
    });
  }
};