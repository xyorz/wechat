Page({
  data: {
  
    count: 0,

    options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],

    quesItems: [
      { name: '', answer: 0, ques: ['', '', '', ''] },
    ],
  },

  bindClick: function (e) {
    this.data.quesItems[e.target.dataset.quesId].answer = e.target.dataset.optionsId;
    this.setData({
      quesItems: this.data.quesItems
    });
  },

  bindInput: function(e){
    this.data.quesItems[e.target.dataset.quesId].ques[e.target.dataset.optionsId] = e.detail.value;
    this.setData({
      quesItems: this.data.quesItems
    });
  },

  bindInputTitle: function(e){
    console.log(e);
    this.data.quesItems[e.target.dataset.quesId].name = e.detail.value;
    this.setData({
      quesItems: this.data.quesItems
    });
  },

  createQues: function(){
    this.data.quesItems.push(
      { name: '', answer: 0, ques: ['', '', '', ''] },
    )
    this.setData({
      quesItems: this.data.quesItems
    });
  },

  delQues: function(e){
    this.data.quesItems.splice(e.target.dataset.quesId, 1)
    this.setData({
      quesItems: this.data.quesItems
    });
  }
})