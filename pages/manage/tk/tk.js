// pages/select/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    selectQuestionMenu: '选择题库分类',
    objectQuestionMenu: [
      { objectId: 0, name: 'name' },
      { objectId: 0, name: 'name' },
      { objectId: 0, name: 'name' },
      { objectId: 0, name: 'name' },
    ],
    questionMenu: ['高等数学', '离散数学', '大学物理', '概率论'],
    index: 0,
  },

  onLoad(e) {

    //获取套题
    // wx.u.getQuestionMenu().then(res=>{
    //   var questionMenu = [];
    //   if( res.result.length>0 ){
    //     for( var i =0;i<res.result.length;i++ ){
    //       questionMenu.push(res.result[i].name);
    //     }
    //   }
    //   console.log(questionMenu);
    //   this.setData({
    //     questionMenu: questionMenu,
    //     objectQuestionMenu:res.result
    //   })
    // })
  },

  /**
   * 选择题库
   */
  changeMenu(e) {
    console.log(e);
    this.setData({
      index: e.detail.value,
      selectQuestionMenu: this.data.questionMenu[e.detail.value]
    })
  },

  bindInput(e) {
    // console.log(e)
    this.setData({
      name: e.detail.value
    })
  },

  /**
   * 开始答题
   */
  startAnswer(e) {
    if (this.data.selectQuestionMenu == '选择题库分类') {
      wx.showToast({
        title: '请选择题库分类',
        duration: 1500,
        image: '/images/core/dt/warning.png'
      })
      return;
    }
    if (this.data.name == '') {
      wx.showToast({
        title: '请输入题库名称',
        duration: 1500,
        image: '/images/core/dt/warning.png'
      })
      return;
    }
    console.log(this.data.index);
    wx.navigateTo({
      url: '/pages/manage/tk/create/create?tk_type=' + this.data.selectQuestionMenu + '&tk_name=' + this.data.name,
    })
  }
})