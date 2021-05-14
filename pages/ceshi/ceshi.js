import { request} from "../../request/index.js";
Page({
  data: {
    list: [],
    page: 1,
    pageNumber: 10
  },
  data:[],
  getCates(){
    request({
      // url: 'http://localhost:8081/myphp/app.php?action=read'
      url: 'http://localhost:8081/myphp/app.php?action=read'
    })
    .then(res=>{
      this.setData({
        data:res.data.goods
      })
      const data=res.data.goods;
    })
  },
  onLoad: function() {
    this.loadData();
  },
  loadData() {
    if (this.data.page == 1) {
      this.setData({
        list: []
      })
    }
    this.setData({
      [`list[${this.data.page-1}]`]: data//分页渲染数据
    })
    wx.stopPullDownRefresh()
    wx.hideLoading()
  },

  onPullDownRefresh() {
    this.setData({
      page: 1
    })
    setTimeout(()=>{
      this.loadData();
    },1000)
  },

  onReachBottom() {
    this.setData({
      page: ++this.data.page
    })
    wx.showLoading()
    setTimeout(() => {
      this.loadData();
    }, 1000)
  }
})