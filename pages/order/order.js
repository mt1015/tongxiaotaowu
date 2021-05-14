import { request} from "../../request/index.js";
Page({
  data: {
    //分类
    // MenuList:[],
    currentIndex: 1,
    GoodsList:[],
    // btn:'下架',
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
      url: 'http://localhost:8081/myphp/mygoods.php?action=getorder&openid='+openid+'&currentIndex='+currentIndex
      // url: 'http://localhost:8081/myphp/order.php?action=read&openid='+openid+'&currentIndex='+currentIndex
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
            url: "../order_detail/order_detail?id="+id+'&currentIndex='+currentIndex,
        })
  },
 })
