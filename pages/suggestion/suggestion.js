// pages/suggestion/suggestion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:''

  },
  formSubmit: function (e){
    // var that=this;
    let content=e.detail.value.content;
    console.log(content);
    if(content!=''&&content.length<1000){
      wx.request({
        url: 'http://localhost:8081/myphp/suggestion.php?action=create',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
          content:content
        },
        success:function(res){
          wx.showToast({
            title: '感谢您的建议',
            icon:'success',
            duration:1000
          })
          setTimeout(function () {
            wx.reLaunch({
              url: '/pages/my/my',
            })
          }, 1000);
        },
        fail:function(rea){
          wx.showToast({
            title: '提交失败',
            icon:'error',
            duration:1000
          })
        }
      })

    }else{
      wx.showToast({
        title: '内容不能为空',
        icon:'error',
        duration:1000
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})