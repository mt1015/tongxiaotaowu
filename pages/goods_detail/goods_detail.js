import { request} from "../../request/index.js";
Page({
  data: {
    //分类
    // MenuList:[],
    goodsList:{},
    id:null
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

// 点击 加入购物车
handleCartAdd() {
  // 1 获取缓存中的购物车 数组
  let cart = wx.getStorageSync("cart") || [];
  // 2 判断 商品对象是否存在于购物车数组中
  let index = cart.findIndex(v => v.id === this.GoodsInfo.id);
  if (index === -1) {
    //3  不存在 第一次添加
    this.GoodsInfo.num = 1;
    this.GoodsInfo.checked = true;
    cart.push(this.GoodsInfo);
  } else {
    // 4 已经存在购物车数据 执行 num++
    cart[index].num++;
  }
  // 5 把购物车重新添加回缓存中
  wx.setStorageSync("cart", cart);
  // 6 弹窗提示
  wx.showToast({
    title: '加入成功',
    icon: 'success',
    // true 防止用户 手抖 疯狂点击按钮 
    mask: true
  });
},

  //获取分类接口数据
  getCates(){
    var id=this.data.id
    request({
      // url: 'http://localhost:8081/myphp/app.php?action=read'
      url: 'http://localhost:8081/myphp/get.php?action=read&good_id='+id
    })
    .then(res=>{
      this.setData({
        goodsList:res.data.message
      })
    })
    // this.GoodsInfo=goodsList.data
  },
})
