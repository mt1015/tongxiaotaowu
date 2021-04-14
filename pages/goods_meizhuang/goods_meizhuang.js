import { request} from "../../request/index.js";
Page({
  data: {
    //分类
    // MenuList:[],
    GoodsList:[]
  },
  Cates:[],
  onLoad: function (options) {
    this.getCates();
    // this.getGoods();
  },
  //获取分类接口数据
  getCates(){
    request({
      // url: 'http://localhost:8081/myphp/app.php?action=read'
      url: 'http://localhost:8081/myphp/category.php?action=read&num=3'
    })
    .then(res=>{
      this.setData({
        GoodsList:res.data.goods
      })
    })
  },

  skipTravelDetails:function(e){
    let id=e.currentTarget.dataset.id //获取点击产品时拿到的id，就是data-id传过来的值
        // wx.navigateTo跳转页面的方法
        wx.navigateTo({
            url: "../goods_detail/goods_detail?id="+id,
        })
  }
 })
