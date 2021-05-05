var util = require('../../utils/util.js');
const app = getApp()
Page({
data: {
  imgs: [],
  array: ['学习用品', '生活用品', '体育器材', '美妆', '电器','其他'],
  index:0,
},

//接受选中的物品分类
bindPickerChange: function (e) {
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    index: e.detail.value
  })
},

// 上传图片（开始）
chooseImg: function (e) {
  var that = this;
  var imgs = this.data.imgs;
  if (imgs.length >= 1) {
    this.setData({
      lenMore: 1
    });
    setTimeout(function () {
      that.setData({
        lenMore: 0
      });
    }, 2500);
    return false;
  }
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: function (res) {
      var tempFilePaths = res.tempFilePaths;
      var imgs = that.data.imgs;
      for (var i = 0; i < tempFilePaths.length; i++) {
        if (imgs.length >= 1) {
          that.setData({
            imgs: imgs
          });
          return false;
        } else {
          imgs.push(tempFilePaths[i]);
        }
      }
      that.setData({
        imgs: imgs
      });
    },
    fail:function(errInfo) {
      console.info(errInfo) 
     }
  });
  
  
},
deleteImg: function (e) {
  var imgs = this.data.imgs;
  var index = e.currentTarget.dataset.index;
  imgs.splice(index, 1);
  this.setData({
    imgs: imgs
  });
},
previewImg: function (e) {
  var index = e.currentTarget.dataset.index;
  var imgs = this.data.imgs;
  wx.previewImage({
    current: imgs[index],
    urls: imgs
  })
},
// 上传图片结束



//点击发送按钮，触发上传数据到数据库操作
formSubmit: function (e) {
  if(wx.getStorageSync('openid')==''){
    wx.showToast({
      title: '请先登录！',
      icon:'none'
    })
  }else{
    console.log(e.detail.value);
  var that=this;
  let name=e.detail.value.name;
  let category=e.detail.value.category;
  let price=e.detail.value.price;
  let tel=e.detail.value.tel;
  let explain=e.detail.value.explain;
  // let openid=wx.getStorageSync('oppenid');
  var openid=wx.getStorageSync('openid');  //从缓存中拿到发布者的openid
  if(name==''){
    wx.showToast({
      title: '名称不能为空！',
      icon: 'error',
      duration: 1000
    })
  }else if(price==''){
    wx.showToast({
      title: '',
      icon: 'error',
      duration: 1000
    })
  }else if(tel==''){
    wx.showToast({
      title: '联系方式不为空！',
      icon: 'error',
      duration: 1000
    })}
  else if(this.data.imgs==''){
    wx.showToast({
      title: '图片不能为空',
      icon: 'error',
      duration: 1000
    })
      }else{
        wx.uploadFile({
          url: 'http://localhost:8081/myphp/upload.php?',
          filePath: that.data.imgs[0],
          name: 'file',
          formData:{
            openid:openid,
            name: name,
            category: category, 
            price: price,
            tel: tel,
            explain: explain,
          },
          success:function(){
              wx.showToast({
                title: '发布成功',
                icon: 'success',
                duration: 1000,
                
              })
              setTimeout(function () {
                wx.reLaunch({
                  url: '/pages/myRelease/myRelease',
                })
              }, 1000);
            }
        })
        
      }
  }
  
  }
})