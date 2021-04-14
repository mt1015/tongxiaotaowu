import { request} from "../../request/index.js";
Page({
  data: {
    //分类
    MenuList:[],
    GoodsList:[]
  },
  Cates:[],
  onLoad: function (options) {
    this.getCates();
    this.getGoods();
  },
  //获取分类接口数据
  getCates(){
    request({
      url: 'http://localhost:8081/myphp/get.php?action=read'
    })
    .then(res=>{
      this.Cates=res.data.message;
      let MenuList=this.Cates.map(v=>v.cat_name);
      this.setData({
        MenuList,
      })
    })
  },
  //获取商品信息
  getGoods(){
    request({
      url: 'http://localhost:8081/myphp/app.php?action=read'
    })
    .then(res=>{
     
      this.setData({
        GoodsList:res.data.goods
      })
    })
  }
})
