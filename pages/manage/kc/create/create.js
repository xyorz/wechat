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

  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      selectWeek: this.data.selectWeek,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.selectWeek[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
            data.selectWeek[2] = ['猪肉绦虫', '吸血虫'];
            break;
          case 1:
            data.selectWeek[1] = ['鱼', '两栖动物', '爬行动物'];
            data.selectWeek[2] = ['鲫鱼', '带鱼'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.selectWeek[2] = ['猪肉绦虫', '吸血虫'];
                break;
              case 1:
                data.selectWeek[2] = ['蛔虫'];
                break;
              case 2:
                data.selectWeek[2] = ['蚂蚁', '蚂蟥'];
                break;
              case 3:
                data.selectWeek[2] = ['河蚌', '蜗牛', '蛞蝓'];
                break;
              case 4:
                data.selectWeek[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.selectWeek[2] = ['鲫鱼', '带鱼'];
                break;
              case 1:
                data.selectWeek[2] = ['青蛙', '娃娃鱼'];
                break;
              case 2:
                data.selectWeek[2] = ['蜥蜴', '龟', '壁虎'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },

})