// pages/order/order.js
var app = getApp()
// var goodname()
Page({

  data: {
    userInfo: {
      username: '肥波',
      moblie: '17312556080',
      school: '常熟理工学院',
      dong: 10,
      room: 315,
      shenfen:1
    },
    currentTab: 0,
    list: [],
    list1: [],
    list2: [],
    list3: [],
    // orderList:[]
    orderList:[{
      date:'2019/3/25 19:41',
      state:'待支付',
      address:'常熟理工学院东南校区 10-315',
      time:'12:00-13:00',
      work:'清扫厕所 清扫地面 整理内务'
    }, {
        date: '2019/3/25 19:41',
        state: '待支付',
        address: '常熟理工学院东南校区 10-315',
        time: '12:00-13:00',
        work: '清扫厕所 清扫地面 整理内务'
      }]
  },

  orderdetail: function (e) {
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/order/ordertail/ordertail'
    })
  },
  swiperTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
  },
  clickTab: function (e) {
    console.log(this.data.currentTab === e.target.dataset.current);
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  onLoad: function (options) {


  }
})