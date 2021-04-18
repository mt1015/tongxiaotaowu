// pages/my/my.js
Page({

  data: {
    userinfo:{}
  },
  onShow(){
    const userinfo=wx.getStorageSync('userInfo');
    this.setData({userinfo})
  }
})