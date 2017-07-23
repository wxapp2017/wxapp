// pages/readweibo/readweibo.js
Page({

	data: {
    sign:'',
    pic:[],
		tiezi:[]

	},


onLoad: function(options) {
  var myDate = new Date();
  console.log(Date.parse(myDate))
    console.log('加载页面')
    var that = this

    wx.request({
      url: 'http://127.0.0.1:8000/readweibo', //仅为示例，并非真实的接口地址
      success: function (res) {
        console.log(res.data)
        console.log('数据：'+res.data)
        that.setData({
        	tiezi: res.data
        })

      }
    })
  },

 previewImage: function(e) {
   
  var current=e.target.dataset.src;  
  var c = current.split();
  console.log(c)

  // console.log(pic_copy)
  // console.log('列表：'+pic_copy)

   wx.request({
      url: 'http://127.0.0.1:8000/previewimage', //仅为示例，并非真实的接口地址
      data:{
        pic_url:current
      },
      success: function (res) {
        console.log('2141243123')
        console.log(res)
        console.log(res.data)
      }
    })

  //  for(var i=0; i<pic_copy.length; i++){
  //   pic_copy[i] = 'http://127.0.0.1:8000/pic/?path='+pic_copy[i]
  //   }  
  
  
  // wx.previewImage({  
  //     current: current, // 当前显示图片的http链接  
  //     urls: pic_copy // 需要预览的图片http链接列表  
  // })  
    },    

skip: function (e) {
  wx.navigateTo({
    url: '../../pages/publishweibo/publishweibo'
  })
},

})