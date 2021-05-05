// pages/search/search.js
const app = getApp()
Page({
  data: {
    goodsList:[]
  },
  //执行点击事件
  formSubmit: function (e) {
    //声明当天执行的
    var that = this;
    //获取表单所有name=keyword的值
    var formData = e.detail.value.keyword;
    //显示搜索中的提示
    wx.showLoading({
      title: '搜索中',
      icon: 'loading'
    })
    if(formData!=''){
      //向搜索后端服务器发起请求
    wx.request({
      //URL
      url: 'http://localhost:8081/myphp/searchs.php?action=search&query=' + formData,
      //发送的数据
      data: formData,
      //请求的数据时JSON格式
      header: {
        'Content-Type':'application/json'
      },

      //请求成功
      success: function (res) {
        //控制台打印（开发调试用）
        console.log(res.data)
        //把所有结果存进一个名为goodsList的数组
        if(res.data.message!=''){
          that.setData({
            goodsList: res.data.message,
          })
          //搜索成功后，隐藏搜索中的提示
          wx.hideLoading();
        }else{
          wx.showToast({
            title: '找不到，换个词吧~',
            icon:'none'
          })
        }
        
      }
    })
    }else{
      wx.showToast({
        title: '请输入搜索词！',
        icon:'none'
      })
    }
  },
  skipTravelDetails:function(e){
    let id=e.currentTarget.dataset.id //获取点击产品时拿到的id，就是data-id传过来的值
        // wx.navigateTo跳转页面的方法
        wx.navigateTo({
            url: "../goods_detail/goods_detail?id="+id,
        })
  }
})
