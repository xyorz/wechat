// pages/select/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectQuestionMenu:'请选择',
    objectQuestionMenu:[
      { objectId: 0, name: 'name' },
      { objectId: 0, name: 'name' },
      { objectId: 0, name: 'name' },
      { objectId: 0, name: 'name' },
      ],
    questionMenu:['高等数学', '离散数学', '大学物理', '概率论'],
    index: 0,
  },

  onLoad (e) {
    const _this = this;
    wx.request({
      url: `https://hdumanagernews.applinzi.com/dati/questionbanklist.php?type=listsearch`,
      method: "GET",
      success: function (res) {
        console.log(res)
        if(res.statusCode==200&&res.data){
          let menu = [];
          for(let index in res.data){
            menu.push(res.data[index].name)
          }
          _this.setData({
            questionMenu: menu
          })
        }
      }
    })
  },

  /**
   * 选择题库
   */
  changeMenu (e){
    console.log(e);
    this.setData({
      index:e.detail.value,
      selectQuestionMenu: this.data.questionMenu[e.detail.value]
    })
  },

  /**
   * 开始答题
   */
  startAnswer (e){
    if (this.data.selectQuestionMenu == '请选择'){
      wx.showToast({
        title: '请选择题目',
        duration:1500,
        image:'/images/core/dt/warning.png'
      })
      return;
    }
    // console.log(this.data.index);
    const ind = parseInt(this.data.index) + 1;
    wx.navigateTo({
      url: '/pages/core/dt/detail/index?tk=' + ind
    })
  }
})