// pages/my/my.js
Page({

  data: {
    userinfo:{},
    openid:''
  },
  onShow(){
    const userinfo=wx.getStorageSync('userInfo');
    const openid=wx.getStorageSync('openid');
    this.setData({userinfo,openid})
  },
  login:function(){
    setTimeout(function () {
      wx.reLaunch({
        url: '/pages/login2/login2',
      })
    }, 1000);
  },
  getUserProfile: function (res) {
    wx.getUserProfile({
          desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            wx.setStorage({
              key:"userInfo",
              data:res.userInfo,
            })
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
            this.login()
            setTimeout(function () {
              wx.reLaunch({
                url: '/pages/my/my',
              })
            }, 1000);
          },
          fail:(err)=>{
            console.log(err);
        }
          
        })
  },
  login(){
    var userinfo=wx.getStorageSync('userInfo');
    console.log(userinfo);
    var name=userinfo.nickName;
    var imgs=userinfo.avatarUrl;
    var sex = userinfo.gender;
    // console.log(name);
    wx.login({
      success: function (res) {
        // console.log(res);
        var code = res.code;//发送给服务器的code
        // var userNick = res.nickName;//用户昵称
        // var userNick = name;
        // console.log(userNick);
        // var avatarUrl = res.avatarUrl;//用户头像地址
        // var gender = res.gender;//用户性别
        wx.request({
          url: 'http://localhost:8081/myphp/getInfo.php?',//服务器的地址，现在微信小程序只支持https请求，所以调试的时候请勾选不校监安全域名
          data: {
            code: code,
            nick: name,
            avaurl: imgs,
            sex: sex,
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data);
            // wx.setStorageSync('name', res.data.nick);//将获取信息写入本地缓存
            wx.setStorageSync('openid', res.data.openid);
            wx.setStorageSync('token', res.data.token);
            // wx.setStorageSync('imgUrl', res.data.imgurl);
            // wx.setStorageSync('sex', res.data.sex);
          }
        })
      }
    })
  }
})