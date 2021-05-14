// pages/pay/pay.js
import { getSetting, chooseAddress, openSetting, showModal, showToast, requestPayment } from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/index.js";
Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0,
    user_id:''
  },
  
  onShow() {
    // 1 获取缓存中的收货地址信息
    // const address = wx.getStorageSync("address");
    // 1 获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || [];
    // 过滤后的购物车数组,checked=ture
    cart = cart.filter(v => v.checked);
    // this.setData({ address });

    // 1 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num * v.price;
      totalNum += v.num;
    })
    this.setData({
      cart,
      totalPrice, totalNum,
      // address
    });
  },

  setCart(cart) {
    let allChecked = true;
    // 1 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.price;
        totalNum += v.num;
        // totalPrice +=  v[0].num * v[0].price;
        // totalNum += v[0].num;
      } else {
        allChecked = false;
      }
    })
    // 判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      totalPrice, totalNum, allChecked
    });
    wx.setStorageSync("cart", cart);
  },

  // 点击 支付 
  handleOrderPay(){
    const that=this.data;
    wx.showModal({
      cancelColor: 'cancelColor',
      title:'支付',
      content:'是否完成线下支付？',
      showCancel: true,//是否显示取消按钮
      cancelText:"还没有",//默认是“取消”
      cancelColor:'skyblue',//取消文字的颜色
      confirmText:"已支付",//默认是“确定”
      confirmColor: 'skyblue',//确定文字的颜色
      success: function (res) {
        if (res.cancel) {
           //点击取消,默认隐藏弹框
           wx.showToast({
             title: '交易失败!',
             icon:'none'
           })
        } else {
          //获取购物车中的订单数据
          // const cart = that.cart;
          let cart = that.cart;
          let goods = [];
          cart.forEach(v => goods.push({
            B_openid:v.openid,
            goods_id: v.id,
            goods_name: v.name,
            goods_number: v.num,
            goods_price: v.price,
            goods_img:v.image_url
          }))
          //需创建的订单数量
          const num=goods.length;
          for(var i=0;i<num;i++){
            const user_openid = wx.getStorageSync("openid");
            const B_openid=goods[i].B_openid;
            const goods_id=goods[i].goods_id;
            const goods_name=goods[i].goods_name;
            const goods_price=goods[i].goods_price;
            const goods_img=goods[i].goods_img;
            // console.log(goods);
            wx.request({
              //调用上传数据接口
              url: 'http://localhost:8081/myphp/order.php?action=create',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              //上传服务器的数据（要与接口中写的参数一致）
              data: { 
                user_openid: user_openid, 
                B_openid: B_openid, 
                goods_id: goods_id,
                goods_name: goods_name,
                goods_price: goods_price,
                order_img:goods_img
                },
              success: function (res) {
                // console.log(res.data);  //打印接口返回信息
                //把release表中商品status=1
                const id=goods_id;
                wx.request({
                  url: 'http://localhost:8081/myphp/order.php?action=update',
                  method:"POST",
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  data:{
                    id:id
                  },
                })
                //删除购物车中的缓存数据
                let cart=wx.getStorageSync('cart');
                const index = cart.findIndex(v => v.id === id);
                cart.splice(index,1);
                wx.setStorageSync("cart", cart);
                // this.setCart(cart);
              }
            })
          };
          wx.showToast({
            title: '提交订单成功！，请等待卖家确认！',
            icon: 'none',
            duration: 2500
          });
          wx.navigateTo({
            url: '/pages/order/order'
          });
        }
        


        





      }
    })
  },
})