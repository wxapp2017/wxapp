
var app=getApp()

Page({
  data: {
    pic:0,
    pictures:[],
    uploadpic:[],

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
        'name': '发送',
        'button': true
      }

      ]
      
  },

  onLoad: function(options) {

    console.log(this.data.pictures)
    console.log(this.data.a)
    // Do some initialize when page load.
  },

  bindPickerChange: function (e) {
    var index = e.target.dataset.index,
        newItems = this.data.items

    newItems[index].value = e.detail.value

    this.setData({
      items: newItems
    })
  },



  bindViewTap:function(){
    var that = this;
    var pic = that.data.pic + 1
    var pict = that.data.pictures
    var uploadpic = that.data.uploadpic
    wx.chooseImage({
    
      count: 8, 
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res){
        // 获取成功,将获取到的地址赋值给临时变量
        var tempFilePaths = res.tempFilePaths;
        pict[pic-1] = res.tempFilePaths;
        uploadpic[pic-1] = res.tempFilePaths[0]
        that.setData({
        //将临时变量赋值给已经在data中定义好的变量
          // avatarUrl:tempFilePaths,
          pictures:pict,
          pic:pic
        })
      },
    })
  },



   formSubmit: function(e){
    var formData = e.detail.value
    var pics = this.data.uploadpic
            wx.uploadFile({
              url: 'http://127.0.0.1:8000/', //仅为示例，非真实的接口地址
              filePath: pics[0],
              name: 'photo',
              formData: formData,
              success: function (res) {
                  delete pics[0]
                  app.uploadimg({
                    url: 'http://127.0.0.1:8000/',
                    path:pics
                  })
                  console.log('111111')
                  // console.log(delete this.data.uploadpic[0])
                  console.log(res.data)

                  //do something
          },
              fail:function(res){
                console.log(res.data)
          }
        })
    




    // wx.request({
    //   url: 'http://127.0.0.1:8000', //仅为示例，并非真实的接口地址
    //   data: formData,
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
        
        

    //   }
    // })
    

  },
 


})
