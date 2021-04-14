const app = getApp()
Page({
data: {
  imgs: [],
  array: ['学习用品', '生活用品', '体育器材', '美妆', '电器','其他'],
  index:0
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
  if (imgs.length >= 9) {
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
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths;
      var imgs = that.data.imgs;
      // console.log(tempFilePaths + '----');
      for (var i = 0; i < tempFilePaths.length; i++) {
        if (imgs.length >= 9) {
          that.setData({
            imgs: imgs
          });
          return false;
        } else {
          imgs.push(tempFilePaths[i]);
        }
      }
      // console.log(imgs);
      that.setData({
        imgs: imgs
      });
    }
  });
},
// 删除图片
deleteImg: function (e) {
  var imgs = this.data.imgs;
  var index = e.currentTarget.dataset.index;
  imgs.splice(index, 1);
  this.setData({
    imgs: imgs
  });
},
// 预览图片
previewImg: function (e) {
  //获取当前图片的下标
  var index = e.currentTarget.dataset.index;
  //所有图片
  var imgs = this.data.imgs;
  wx.previewImage({
    //当前显示图片
    current: imgs[index],
    //所有图片
    urls: imgs
  })
},
// 上传图片结束



//点击发送按钮，触发上传数据到数据库操作
formSubmit: function (e) {
  console.log(e.detail.value);
  wx.request({
    //调用上传数据接口
    url: 'http://localhost:8081/myphp/app.php?action=create',
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST",
    //上传服务器的数据（要与接口中写的参数一致）
    data: { name: e.detail.value.name, category: e.detail.value.category, 
      price: e.detail.value.price,tel:e.detail.value,explain:e.detail.value.explain,image_url:e.detail.value.imgs},
    success: function (res) {
      console.log(res.data);  //打印接口返回信息
      if (res.data.status == 0) {
        //提交失败toast
        wx.showToast({
        title: '提交商品信息失败！',
        icon: 'loading',
        duration: 1500
        })
      } else {
        //提交成功toast
        wx.showToast({
          title: '提交商品信息成功！',
          icon: 'success',
          duration: 1000
        })
      }
    }
  })
},
})
