// pages/school/school.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // array: ['岭南师范学院','广东医科大学','广东海洋大学','广东海洋大学寸金学院','敬请期待~'],
    objectArray:[
      {
        "id":0,
        "message":'岭南师范学院'
      },
      {
        "id":1,
        "message":'广东医科大学'
      },
      {
        "id":2,
        "message":'广东海洋大学'
      },
      {
        "id":3,
        "message":'广东海洋大学寸金学院'
      },
      {
        "id":4,
        "message":'敬请期待~'
      }
    ],
    index:0,
    currentIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  SelectSchool:function(e){
    var index=e.currentTarget.dataset.id;
    console.log(index);
    if(index==0){
      wx.showToast({
        title: '岭南师范学院',
        icon:'none'
      })
    }
    else if(index==1){
      wx.showToast({
        title: '广东医科大学',
        icon:'none'
      })
    }
    else if(index==2){
      wx.showToast({
        title: '广东海洋大学',
        icon:'none'
      })
    }
    else if(index==3){
      wx.showToast({
        title: '广东海洋大学寸金学院',
        icon:'none'
      })
    }
    else if(index==4){
      wx.showToast({
        title: '其它学校，敬请期待',
        icon:'none'
      })
    }
    
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