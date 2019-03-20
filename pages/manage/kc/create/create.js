Page({
  data: {
    index: 0,

    class: "",
    day: 0,
    start: 0,
    room: "",
    xq: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
    djj: ['1-2节', '3-4节', '3-5节', '6-7节', '6-8节', '7-8节', '9-10节', '9-11节'],

    s_ks: 0,
    s_js: 15,
    s_dsz: 0,
    ks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    js: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    dsz: ['全部', '单周', '双周'],

    s_jxl: 0,
    s_floor: 0,
    s_room: 0,
    jxl: ['一教', '二教', '三教', '六教', '七教'],
    floor: ['1', '2', '3', '4'],
    room: ['01', '02', '03', '04', '05', '06', '07', '08', '09'],

    selectTime: [
      ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'], 
      ['1-2节', '3-4节', '3-5节', '6-7节', '6-8节', '7-8节', '9-10节', '9-11节'],
    ],
    selectWeek: [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      ['全部', '单周', '双周'],
    ],
    selectRoom: [
      ['一教', '二教', '三教', '六教', '七教'],
      ['1', '2', '3', '4'],
      ['01', '02', '03', '04', '05', '06', '07', '08', '09'],
    ],
    multiIndex: [0, 0, 0],
  },
  bindMultiPickerChange: function (e) {
    let _this = this;
    console.log('e:', e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let details = e.detail.value;
    let values = e.target.dataset.binddata.split(',');
    for(let i in values){
      _this.setData({[values[i]]: details[i]});
    }
  },

})