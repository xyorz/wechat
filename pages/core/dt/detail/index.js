// pages/answerInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'1',
    time:'60',
    questionMenu:'高等数学',
    questionNum:'60'   // 题目数量
  },
  onLoad (e) {
    const _this = this;
    const id = e.tk;
    wx.request({
      url: `https://hdumanagernews.applinzi.com/dati/questionbanklist.php?type=listsearch&id=${id}`,
      method: 'GET',
      success: function(res){
        if(res.statusCode==200&&res.data){
          const d = res.data[0];
         
          _this.setData({
            id: d['id'],
            time: d['time'],
            questionMenu: d['name'],
            questionNum: d['num']
          })
        }
      }
    })
    // var id = e.id
    // var questionMenu = e.questionMenu
    // var time, questionNum
    // wx.u.getSetting().then(res=>{
    //   for(let i in res.result){
    //     if(res.result[i].key == 'time'){
    //       time = res.result[i].value
    //     } else if (res.result[i].key == 'questionNum'){
    //       questionNum = res.result[i].value
    //     }
    //   }
    //   this.setData({
    //     id:id,
    //     time:time,
    //     questionMenu: questionMenu,
    //     questionNum:questionNum
    //   })
    // })
  },
  start(){
    wx.redirectTo({
      url: '/pages/core/dt/answer/index?id=' + this.data.id + '&time=' + this.data.time + '&total=' + this.data.questionNum
    })
  }
})