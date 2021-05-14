// pages/login2/login2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
      
    }
    
    
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

          }
        })
  },
  login(){
    var userinfo=wx.getStorageSync('userInfo');
    // console.log(userinfo);
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
            // token=res.data.data.token;
            // console.log(token);
            // wx.setStorageSync('name', res.data.nick);//将获取信息写入本地缓存
            wx.setStorageSync('openid', res.data.openid);
            // wx.setStorageSync('imgUrl', res.data.imgurl);
            // wx.setStorageSync('sex', res.data.sex);
          }
        })
      }
    })
  }
  // getUserProfile(e) {
  //   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
  //   // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //   wx.getUserProfile({
  //     desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //     success: (res) => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //       wx.login({
  //         success: function (res) {
  //           var code = res.code;//发送给服务器的code
  //           console.log(code)
  //           wx.getUserProfile({
  //             success: function (res) {
  //               var userNick = res.userInfo.nickName;//用户昵称
  //               var avataUrl = res.userInfo.avatarUrl;//用户头像地址
  //               var gender = res.userInfo.gender;//用户性别
  //               if (code) {
  //                 wx.request({
  //                   url: 'http://localhost:8081/myphp/getInfo.php?',//服务器的地址，现在微信小程序只支持https请求，所以调试的时候请勾选不校监安全域名
  //                   data: {
  //                     code: code,
  //                     nick: userNick,
  //                     avaurl: avataUrl,
  //                     sex: gender,
  //                   },
  //                   header: {
  //                     'content-type': 'application/json'
  //                   },
  //                   success: function (res) {
  //                     console.log(res.data);
  //                     wx.setStorageSync('name', res.data.name);//将获取信息写入本地缓存
  //                     wx.setStorageSync('openid', res.data.openid);
  //                     wx.setStorageSync('imgUrl', res.data.imgurl);
  //                     wx.setStorageSync('sex', res.data.sex);
  //                   }
  //                 })
  //               }
  //               else {
  //                 console.log("获取用户登录态失败！");
  //               }
  //             }
  //           })
  //         },
  //         fail: function (error) {
  //           console.log('login failed ' + error);
  //         }
  //     })
  //     },
    

  //   })
  // },
  
  

})