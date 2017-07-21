
var app=getApp()

Page({
  data: {
    pic:0,
    indeximage:'',
    pictures:[],
    uploadpic:[],
    range: ['凤雅苑', '凤凰苑', '凤湖苑', '凤曦苑'],
    rangeArray: [
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
    index:0,

      
  },

onLoad: function(options) {
    this.chooseimage()
  },

skip: function (e) {
  wx.navigateTo({
    url: '../../pages/publishsell/publishsell'
  })
},


  bindPickerChange: function (e) {
     console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
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

  chooseimage: function(e){
     var that = this;
      wx.chooseImage({
      count: 8, 
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res){
        // 获取成功,将获取到的地址赋值给临时变量
        var tempFilePaths = res.tempFilePaths;
        that.setData({
        //将临时变量赋值给已经在data中定义好的变量
          // avatarUrl:tempFilePaths,
          indeximage:tempFilePaths,
        })
      },
    })
  },


   formSubmit: function(e){
    var that = this
    console.log(this.data.pic)
    var formData = e.detail.value
    var pics = this.data.uploadpic
    var indeximage = this.data.indeximage[0]
    const uploadTask = wx.uploadFile({
              url: 'http://127.0.0.1:8000/', //仅为示例，非真实的接口地址
              filePath: indeximage,
              name: 'photo',
              formData: formData,
              success: function (res) {
                  if(that.data.pic>0){
                    app.uploadimg({
                    url: 'http://127.0.0.1:8000/',
                    path:pics
                  })
                  }
                  
                  console.log(res.data)
                  wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 2000
                  })

                  //do something
          },
              fail:function(res){
                console.log(res.data)
          }
        })

    uploadTask.onProgressUpdate((res)=>{
      console.log('上传进度',res.progress)
      console.log('已经上传的数据长度',res.totalBytesSent)
      console.log('预期需要上传的数据总长度',res.totalBytesExpectedToSend)
      })
    wx.navigateTo({
      url: '../../pages/readweibo/readweibo'
    })

  }



  //   formSubmit: function(e){
  //   console.log(e.detail.value)
  //   var formData = e.detail.value
  //   var pics = this.data.uploadpic
           
  //   app.uploadimg({
  //             url: 'http://127.0.0.1:8000/',
  //               path:pics,
  //               formData: formData
  //                 })
  //    wx.showToast({
  //                   title: '成功',
  //                   icon: 'success',
  //                   duration: 2000
  //                 })
  // }




    // wx.request({
    //   url: 'http://127.0.0.1:8000', //仅为示例，并非真实的接口地址
    //   data: formData,
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
        
        

    //   }
    // })
    

  // },
 


})


