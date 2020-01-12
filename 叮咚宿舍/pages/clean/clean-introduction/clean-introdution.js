// pages/clean/clean-introduction/clean-introdution.js
Page({

  data: {
    fuwuImg: [
    { img: "/images/lunbo/1.jpg", name: '地面清洁' },
    { img: "/images/lunbo/1.jpg", name: '厕所清洁' },
    { img: "/images/lunbo/1.jpg", name: '内务整理' },
    { img: "/images/lunbo/1.jpg", name: '电扇清理' },]
  },
  click:function(options){
    wx.navigateTo({
      url: '/pages/clean/clean-detail/clean-detail'
    })
  },

  onLoad: function (options) {

  },


})