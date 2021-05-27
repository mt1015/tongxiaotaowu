// pages/look_suggestion/look_suggestion.js
import { request} from "../../request/index.js";
Page({
  data: {
    List:[]
  },
  Cates:[],
  onLoad: function (options) {
    this.getCates();
    // this.getGoods();
  },
  //获取分类接口数据
  getCates(){
    request({
      url: 'http://localhost:8081/myphp/suggestion.php?action=read'
    })
    .then(res=>{
      this.setData({
        List:res.data.message
      })
    })
  }
 })