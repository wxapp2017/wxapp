// pages/publishsell/publishsell.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    typerange: ['新鲜水果', '蔬菜', '烹饪点心'],
    typerangeArray: [
      {
        id: 0,
        name: '新鲜水果'
      },
      {
        id: 1,
        name: '蔬菜'
      },
      {
        id: 2,
        name: '烹饪点心'
      },
    ],
    typeindex:0,

    arearange: ['凤雅苑', '凤凰苑', '凤湖苑', '凤曦苑'],
    arearangeArray: [
      {
        id: 0,
        name: '凤雅苑'
      },
      {
        id: 1,
        name: '凤凰苑'
      },
      {
        id: 2,
        name: '凤湖苑'
      },
      {
        id: 3,
        name: '凤曦苑'
      }
    ],
    areaindex:0,

   
        checkboxItems: [
            {name: '自己配送', value: '0', checked: true},
            {name: '平台配送', value: '1'}
        ],
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

submit: function (e){
  console.log(this.data.areaindex)
  wx.request({
    url: 'http://127.0.0.1:8000/publishsell',
    data:{
      x : this.data.areaindex
      // y : this.data. 
    },
    success: function(res) {
      console.log(res.data)
  }
  })
},

skip: function (e){
  wx.navigateTo({
    url: '../../pages/publishweibo/publishweibo'
  })
},

bindPickerChange: function (e) {
     console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      typeindex: e.detail.value
    })
  },

bindAreaChange: function (e) {
     console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      areaindex: e.detail.value
    })
  },

checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value);

        var checkboxItems = this.data.checkboxItems, values = e.detail.value;
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
            checkboxItems[i].checked = false;

            for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
                if(checkboxItems[i].value == values[j]){
                    checkboxItems[i].checked = true;
                    break;
                }
            }
        }

        this.setData({
            checkboxItems: checkboxItems
        });
    },
  
})