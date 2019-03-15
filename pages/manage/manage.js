// pages/manage/manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cards: [
      ["https://we.cqu.pt/app/images/index/kb-bg.png", 
        { id: "wj", img: "/images/core/fw1.png", title: "新增问卷", url: "/pages/manage/tk/create/create" },
        { id: "kc", img: "/images/core/kb.png", title: "课程管理", url: "/pages/manage/kc/kc" }],
      ["https://we.cqu.pt/app/images/index/jy-bg.png",
        { id: "zx", img: "/images/core/ykt.png", title: "资讯管理", url: "/pages/manage/zx/zx" },
        { id: "tk", img: "/images/core/jy.png", title: "题库管理", url: "/pages/manage/tk/tk" }],
      ["https://we.cqu.pt/app/images/index/ykt-bg.png",
      { id: "sp", img: "/images/core/kjs.png", title: "教学视频", url: "" },
      { id: "xy", img: "/images/core/xs.png", title: "学员管理", url: "/pages/core/xs/xs" }],
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})