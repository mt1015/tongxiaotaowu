import { request} from "../../request/index.js";
Page({
  data: {
    //分类
    // MenuList:[],
    goodsList:{},
    id:null,
    currentIndex:2
  },
  GoodsInfo:{},
  onLoad: function (options){
    console.log(options);
    let id=options.id;
    let currentIndex=options.currentIndex;
    this.setData({
      id,
      currentIndex
    }),
    this.getCates();
  },

// 点击 加入购物车
handleCartAdd:function(e) {
  var openid=wx.getStorageSync('openid');
  if(openid==''){
    wx.showToast({
      title: '请先登录',
      icon: 'none'
    })
  }else{
    // 1 获取缓存中的购物车 数组
  let cart = wx.getStorageSync("cart") || [];
  // 2 判断 商品对象是否存在于购物车数组中
  let index = cart.findIndex(v => v.id === this.GoodsInfo[0].id);
  //  console.log(this.GoodsInfo.data.id);
  console.log(index);
  if (index === -1) {
    //3  不存在 第一次添加
    this.GoodsInfo[0].num = 1;
    this.GoodsInfo[0].checked = true;
    cart.push(this.GoodsInfo[0]);
  } else {
    // 4 已经存在购物车数据 执行 num++
    // cart[index].num++;
    wx.showToast({
      title: '该商品已存在于购物车！',
      icon:'none'
    })
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
  setTimeout(function () {
    wx.reLaunch({
      url: '/pages/cart/cart',
    })
  }, 1000);
  }
  
},

  //获取商品详情数据
  getCates(){
    var id=this.data.id
    request({
      // url: 'http://localhost:8081/myphp/app.php?action=read'
      url: 'http://localhost:8081/myphp/get.php?action=read&good_id='+id
    })
    .then(res=>{
      this.setData({
        goodsList:res.data.message,
      })
      this.GoodsInfo=res.data.message;
      console.log(this.GoodsInfo[0].id);
    })
    // this.GoodsInfo=goodsList.data
  },
})
