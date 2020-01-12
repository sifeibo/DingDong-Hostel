// pages/paihang/paihang.js
const tools = require('../../utils/tools.js')
var app = getApp()
Page({
  data: {
    list:[],
    list1:[],
    tag: true,
    service:"",
    rank:''
  },
  closePopupTap:function(){
    this.setData({
      tag: true
    })
  },
  click:function(e){
    var vm = this;
    console.log(e.currentTarget.dataset.id)
    tools.request(app.globalData.url + "/getUsersRanking", 'post', { 'serviceTypeId': e.currentTarget.dataset.id})
    .then(resp => {
      var list1 = [];
      for(var i = 0;i<10;i++){
        list1.push(
          resp.data.data[i]
        )
      }
      vm.setData({
        tag: false,
        list1: list1,
        service: e.currentTarget.dataset.service
      })
      console.log("个人排行榜",vm.data.list1)
    })
    tools.request(app.globalData.url + "/getUserNowRanking", 'post', { 'serviceTypeId': e.currentTarget.dataset.id,'userid':app.globalData.userInfo.userid })
    .then(resp=>{
      var rank = 0;
      console.log(resp.data.rank)
      if (resp.data.rank===0){
        rank = '暂无排名'
      }else{
        rank = resp.data.rank
      }
      vm.setData({
        rank: rank
      })
    })
  },
  onLoad: function (options) {
    var vm = this;
    //获取代发布的服务
    tools.request(app.globalData.url + "/getPreServices", 'post', {})
      .then(resp => {
        vm.setData({
          list: resp.data
        })
        console.log(vm.data.list)
      })
  }
})