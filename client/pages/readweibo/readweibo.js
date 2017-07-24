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
  var that = this
  var current=e.target.dataset.src; 
  var pic_list = [];
  var c = current.split();
  console.log(c)

   wx.request({
      url: 'http://127.0.0.1:8000/previewimage', //仅为示例，并非真实的接口地址
      data:{
        pic_url:current
      },
      success: function (res) {
        that.pic_list = res.data
        wx.previewImage({  
          current: current, // 当前显示图片的http链接  
          urls: that.pic_list // 需要预览的图片http链接列表  
        })
      }
    })    
},    

skip: function (e) {
  wx.navigateTo({
    url: '../../pages/publishweibo/publishweibo'
  })
},

})