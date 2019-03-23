var base64 = require("./base64");

Page({
  data: {
    cards: [
      {
        id: 0,
        title: '教师满意度',
        detail: '一个关于学生对教师满意度的问卷调查。',
      },
      {
        id: 1,
        title: '宿舍满意度',
        detail: '一个关于学生对宿舍满意度的问卷调查。',
      },
      {
        id: 2,
        title: '宿舍满意度',
        detail: '一个关于学生对宿舍满意度的问卷调查。',
      },
    ]
  },
  onLoad: function () {
    this.setData({
      icon20: "/images/core/jy/green.png",
      icon60: "/images/core/jy/green.png"
    });
  }
});