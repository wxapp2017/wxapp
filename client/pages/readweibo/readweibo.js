// pages/readweibo/readweibo.js
Page({

	data: {

		tiezi:[]

	},


onLoad: function(options) {
    console.log('加载页面')
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/readweibo', //仅为示例，并非真实的接口地址
      success: function (res) {
      	console.log(res)
        console.log(res.data)
        console.log('11111')
        console.log(res.data[0])
        that.setData({
        	tiezi: res.data
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