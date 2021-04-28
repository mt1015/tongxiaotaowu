import { request} from "../../request/index.js";
Page({
  data: {
    //分类
    // MenuList:[],
    currentIndex: 0,
    GoodsList:[],
    btn:'下架',
    openid:''
  },

 //swiper切换时会调用
 pagechange: function (e) {
  if ("touch" === e.detail.source) {
    let currentPageIndex = this.data.currentIndex
    currentPageIndex = (currentPageIndex + 1) % 2
    this.setData({
      currentIndex: currentPageIndex
    })
  }
},
//用户点击tab时调用
titleClick: function (e) {
    this.setData({
      //拿到当前索引并动态改变
      currentIndex: e.currentTarget.dataset.idx
    })
    this.getCates();
    
},



  // Cates:[],
  onLoad: function (options) {
    this.getCates();
    var openid=wx.getStorageSync('openid');
    this.setData({
      openid
    })
    // this.getGoods();
  },
  //获取分类接口数据
  getCates(){
    var openid=wx.getStorageSync('openid');
    var currentIndex=this.data.currentIndex;
    console.log(currentIndex);
    // console.log(openid)
    request({
      // url: 'http://localhost:8081/myphp/app.php?action=read'
      url: 'http://localhost:8081/myphp/mygoods.php?action=read&openid='+openid+'&currentIndex='+currentIndex
    })
    .then(res=>{
      this.setData({
        GoodsList:res.data.message
      })
    })
  },

  skipTravelDetails:function(e){
    let id=e.currentTarget.dataset.id; //获取点击产品时拿到的id，就是data-id传过来的值
    let currentIndex=e.currentTarget.dataset.index;
    console.log(e);
        // wx.navigateTo跳转页面的方法
        wx.navigateTo({
            url: "../goods_detail/goods_detail?id="+id+'&currentIndex='+currentIndex,
        })
  },
  OffGoods:function(e){
    wx.showModal({
      title: '下架商品',
         content: '确定要下架该商品？',
         showCancel: true,//是否显示取消按钮
         cancelText:"点错了",//默认是“取消”
         cancelColor:'skyblue',//取消文字的颜色
         confirmText:"确定",//默认是“确定”
         confirmColor: 'skyblue',//确定文字的颜色
         success: function (res) {
            if (res.cancel) {
               //点击取消,默认隐藏弹框
            } else {
               //点击确定
              //  temp.splice(index, 1),
              //  that.setData({
              //     tempFilePaths: temp,
              //  })
              var id=e.currentTarget.dataset.id
              console.log(id)
              wx.request({
                url: 'http://localhost:8081/myphp/off.php?action=update',
                method:"POST",
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data:{
                  id:id
                },
                success(res){
                  wx.reLaunch({
                    url: '../myRelease/myRelease',
                  })
                }
              })
            }
         },
         fail: function (res) { },//接口调用失败的回调函数
         complete: function (res) { },
    })
    
  }
 })
