Page({
  data: {
    items: [
      {
        'name': '院区',
        'picker': true,
        'mode': 'selector',
        'value': 0,
        'range': ['凤雅苑', '凤凰苑', '凤湖苑', '凤曦苑']
      },
         
      {
        'name': '一段文本',
        'textarea': true
      },
      {
        'name': '发布',
        'button': true
      }
    ]
  },
  bindPickerChange: function (e) {
    var index = e.target.dataset.index,
        newItems = this.data.items

    newItems[index].value = e.detail.value

    this.setData({
      items: newItems
    })
  },
   formSubmit: function(e){
    console.log(e.detail.value)
    var formData = e.detail.value

    // wx.request({
    //   url: 'http://127.0.0.1:8000', //仅为示例，并非真实的接口地址
    //   data: formData,
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // }),
     wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://127.0.0.1:8000/', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'photo',
          success: function (res) {
            console.log('11111111111'),
            console.log(res.data)
            //do something
          },
          fail:function(res){
            console.log(res.data)
          }
  
          
        })
      }
    })

  },
 


})
