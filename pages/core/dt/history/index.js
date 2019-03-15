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
    // wx.u.getHistory(objectId).then(res=>{
    //   wx.u.getBeatNum(res.result.menu, res.result.score).then(res1=>{
    //     wx.u.getAverage(res.result.menu).then(res2 => {
    //       this.setData({
    //         objectId:objectId,
    //         loading: false,
    //         total: res.result.questionList.length,
    //         score: res.result.score,
    //         questions: res.result.questionList,
    //         beatNum: res1.result,
    //         average: parseInt(res2.result[0].allScore / res2.result[0].peopleNum)
    //       })
    //     })
    //   }) 
    // })
    this.setData({
      loading: false,
      total: 100, // 满分分数
      score: 60,  // 获得分数
      // 这个就是上一个页面的 result，这里只用到其中的judge
      questions: [
        { judge: 1 },
        { judge: 0 },
        { judge: 1 },
        { judge: 1 },
        { judge: 0 },
        { judge: 1 },
        { judge: 1 },
        { judge: 0 },
      ]
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