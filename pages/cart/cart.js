import{getSetting,chooseAddress,openSetting,showModal,showToast} from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    cart: [],
    GoodsList:[],
    allChecked: false,
    hasList:false,          // 列表是否有数据
    totalPrice:0,
    openid:''
  },
  onShow() {
    var openid=wx.getStorageSync('openid');
    this.setData({
      openid
    });
    const cart = wx.getStorageSync("cart") || [];
    this.setCart(cart);


  },
   // 商品的选中
   handeItemChange(e) {
    // 1 获取被修改的商品的id
    // console.log(e);
    const id = e.currentTarget.dataset.id;
    // console.log(id);
    // 2 获取购物车数组 
    let { cart } = this.data;
    // console.log(this.data);
    // 3 找到被修改的商品对象
    let index = cart.findIndex(v => v.id === id);
    // console.log(index);
    // 4 选中状态取反
    cart[index].checked = !cart[index].checked;

    this.setCart(cart);

  },
  // 设置购物车状态同时 重新计算 底部工具栏的数据 全选 总价格 购买的数量
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
  // 商品全选功能
  handleItemAllCheck() {
    // 1 获取data中的数据
    let { cart, allChecked } = this.data;
    // 2 修改值
    allChecked = !allChecked;
    // 3 循环修改cart数组 中的商品选中状态
    cart.forEach(v => v.checked = allChecked);
    // 4 把修改后的值 填充回data或者缓存中
    this.setCart(cart);
  },
  // 商品数量的编辑功能
  async handleItemNumEdit(e) {
    // 1 获取传递过来的参数 
    const { operation, id } = e.currentTarget.dataset;
    // 2 获取购物车数组
    // let { cart } = this.data;
    let cart=wx.getStorageSync('cart');
    // console.log(cart);
    // 3 找到需要修改的商品的索引
    const index = cart.findIndex(v => v.goods_id === id);
    // 4 判断是否要执行删除
    if (cart[index].num === 1 && operation === -1) {
      // 4.1 弹窗提示
      const res = await showModal({ content: "您是否要删除？" });
      if (res.confirm) {
        cart.splice(index, 1);
        this.setCart(cart);
      }
    } else {
      // 4  进行修改数量
      cart[index].num += operation;
      // 5 设置回缓存和data中
      this.setCart(cart);
    }
  },
  // 点击 结算 
  async handlePay(){
    // 1 判断收货地址
    // const {address,totalNum}=this.data;
    const {openid,totalNum}=this.data;
    if(!openid){
      await showToast({title:"您还未登录"});
      return;
    }
    // if(!address.userName){
    //   await showToast({title:"您还没有选择收货地址"});
    //   return;
    // }
    // 2 判断用户有没有选购商品
    if(totalNum===0){
      await showToast({title:"您还没有选购商品"});
      return ;
    }
    // 3 跳转到 支付页面
    wx.navigateTo({
      url: '/pages/pay/pay'
    });
      
  }
})