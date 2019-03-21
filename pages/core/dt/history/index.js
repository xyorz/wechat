// pages/history/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:true,
    total:0,
    score:0,
    average:0
  },

  onLoad (options) {
    var objectId = options.id
    const _this = this;

    wx.getStorage({
      key: 'judges',
      success: function(res) {
        let r = res.data.split('');
        let sc = 0;
        let re = r.map((item) => {
          item === "1"? sc += 1 : 0;
          return { judge: parseInt(item) }
        })
        _this.setData({
          loading: false,
          total: r.length, // 满分分数
          score: sc,  // 获得分数
          // 这个就是上一个页面的 result，这里只用到其中的judge
          questions: re
        })
      },
    })



  },

  back(){
    wx.navigateTo({
      url: '/pages/core/dt/select/index',
    })
  },

  backHome() {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
  // 不存在的功能
  // analysis(){
  //   wx.navigateTo({
  //     url: '/pages/analysis/index?objectId='+ this.data.objectId,
  //   })
  // }
})