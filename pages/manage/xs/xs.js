//xs.js
//获取应用实例
var app = getApp();

Page({
  data: {

  },


  onLoad: function(e){
    var _this = this;
    console.log(e.id);
    wx.request({
      url: 'http://106.13.53.42:3154/get_student_info/',
      method: 'POST',
      data: {
        openid: app._user.openid,
        key: e.id
      },
      success: function(res){
        if (res.data && res.data.status == 200 ){
          const d = res.data.data.testData[0];
          _this.setData({
            headImg: '/images/more/about.png',
            activeName: d.xm,
            activeXh: d.xh,
            xb: d.xb,
            yxm: d.yxm,
            zym: d.zym,
            nj: d.nj,
            bj: d.bj,
            message: 'message'
          })
        }
      }
    })
  },

  bindInput: function(e){
    console.log(e)
    this.setData({
      [e.target.dataset.type]: e.detail.value
    })
  },

  onHandleSubmit: function(){
    const _this = this;
    const d = _this.data;
    console.log(`https://hdumanagernews.applinzi.com/admin/stuinfo_update.php?activeName=${d.activeName}&activeXh=${d.activeXh}&xb=${d.xb}&yxm=${d.yxm}&zym=${d.zym}&nj=${d.nj}&bj=${d.bj}&message=${d.message}`)
    wx.request({
      url: `https://hdumanagernews.applinzi.com/admin/stuinfo_update.php?activeName=${d.activeName}&activeXh=${d.activeXh}&xb=${d.xb}&yxm=${d.yxm}&zym=${d.zym}&nj=${d.nj}&bj=${d.bj}&message=${d.message}`,
      method: 'GET',
      success: function(){
        wx.showToast({
          title: '修改成功！',
          duration: 1500,
          success: function(){
            setTimeout(() => wx.navigateBack(), 1500)
          }
        })
      }
    })
  }
});