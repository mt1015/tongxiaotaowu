// pages/order_detail/order_detail.js
import { request} from "../../request/index.js";
Page({
  data: {
    ordersList:{},
    id:null,
  },
  GoodsInfo:{},
  onLoad: function (options){
    console.log(options);
    let id=options.id;
    this.setData({
      id
    }),
    this.getCates();
  },



  //获取商品详情数据
  getCates(){
    var id=this.data.id
    request({
      // url: 'http://localhost:8081/myphp/app.php?action=read'
      url: 'http://localhost:8081/myphp/get.php?action=getorder&good_id='+id
    })
    .then(res=>{
      console.log(res);
      this.setData({
        ordersList:res.data.message,
      })
    })
    // this.GoodsInfo=goodsList.data
  },
})
