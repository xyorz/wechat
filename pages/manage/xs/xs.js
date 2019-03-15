//xs.js
//获取应用实例
var app = getApp();

Page({
  data: {

    stuInfo:{
      headImg: '/images/more/about.png',
      activeName: '海星',
      activeXh: '1600000',
      xb: '男',
      yxm: '计算机学院',
      zym: '软件工程',
      nj: '2016',
      bj: '软x',
      xm: '姓名',
      xh: '学号',
      message: 'message'
    },
  },


  onLoad: function(options){
    var _this = this;
    console.log(this.data.stuInfo)
  },
});