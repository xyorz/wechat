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
    console.log(this.data.index);
    wx.navigateTo({
      url: '/pages/manage/dt/detail/index?id=' + this.data.objectQuestionMenu[this.data.index].objectId + '&questionMenu=' + this.data.objectQuestionMenu[this.data.index].name,
    })
  }
})