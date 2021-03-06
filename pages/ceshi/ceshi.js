Page({
data: {
  imglist:[]
 },
/**
  * form提交事件
  */
 bindFormSubmit:function(e){
   self=this
   //图片
   var imglist = self.data.imglist
   //提问内容
   var content=e.detail.value.content;
   if(content==''){
    wx.showToast({
     title: '内容不能为空',
     icon: 'loading',
     duration: 1000,
     mask:true
    })
   }
   wx.showLoading({
    title: '正在提交...',
    mask:true
   })
   //添加问题
   wx.request({
    url: 'https://xxxxxxxxxx/index.PHP?g=user&m=center&a=createwt',
    data: {
     content:content
    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: app.globalData.header, // 设置请求的 header
    success: function (res) {
     // success
     if(typeof(res.data)=='number'){
      if (imglist != '') {
       //开始插入图片
       for(var i=0;i<imglist.length;i++){
        //上传至服务器
        wx.uploadFile({
         url: 'https://xxxxxxxx/index.php?g=user&m=center&a=upload', //仅为示例，非真实的接口地址
         filePath: imglist[0],
         name: 'files',
         formData: {
          'wtid': res.data
         },
         header: app.globalData.header,
         success: function (res) {
          if(i>=imglist.length){
           self.setData({
            imglist:[]
           })
           wx.hideLoading();
           wx.showToast({
            title: '提问成功',
            icon: 'success',
            duration: 2000,
            mask: true
           })
           wx.navigateBack({
            delta: 1
           })
          }
         }
        })
       }
       console.log(imglist);
      }else{
       wx.hideLoading();
       wx.showToast({
        title: '提问成功',
        icon: 'success',
        duration: 2000,
        mask: true
       })
       wx.navigateBack({
        delta: 1
       })
      }
     }else{
      wx.hideLoading();
      wx.showToast({
       title: res.data,
       icon: 'loading',
       duration: 1000,
       mask: true
      })
     }
    },
    fail: function (res) {
     self.onLoad();
    }
   })
 },
 //点击选择图片
 checkimg:function(){
   console.log('点击选择图片');
   self=this
   wx.chooseImage({
    count: 9, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
     // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
     var tempFilePaths = res.tempFilePaths
     self.setData({
      imglist:tempFilePaths
     })
    }
   })
 },
 //点击预览图片
 ylimg:function(e){
  wx.previewImage({
   current: e.target.dataset.src,
   urls: this.data.imglist // 需要预览的图片http链接列表
  })
 }
})