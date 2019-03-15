Page({
  data: {
    index: 0,

    type: ['教务公告', 'OA公告', '会议通知', '学术讲座', '综合新闻'],
    s_type: 0,
    selectType: [
      ['教务公告', 'OA公告', '会议通知', '学术讲座', '综合新闻'],
    ],  

    textAreaData: "",

    multiIndex: [0, 0, 0],
  },

  bindMultiPickerChange: function (e) {
    let _this = this;
    console.log('e:', e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let details = e.detail.value;
    let values = e.target.dataset.binddata.split(',');
    for (let i in values) {
      _this.setData({ [values[i]]: details[i] });
    }
  },

  bindTextArea: function(e){
    this.setData({
      textAreaData: e.detail.value
    })
  }

})