const app = getApp()
const tools = require('../../../utils/tools.js')
Page({
  data: {
    list: [],
    xuehao: '',
    colors: ['red', '#FF8C69', '#CD3278', '#FF4500', '#98FB98', '#00CDCD', '#7A378B', '#8B3A3A']
  },
  onLoad: function () {
    this.setAniation();
  },
  onShow: function(){
    var vm = this;
    tools.request(app.globalData.url + "/getMotherList", 'post', {})
      .then(resp => {
        console.log('评论列表为:',resp.data.data);
        vm.setData({
          list: resp.data.data
        })
      })
  },
  setAniation: function () {
    //定义动画
    var animationUp = wx.createAnimation({
      timingFunction: 'ease-in-out'
    })

    this.animationUp = animationUp
  },
  //评论
  comment: function () {
    wx.navigateTo({
      url: '/pages/clean/comment/comment',
    })
  },
  //点击爱心
  onUpTap: function (e) {
    console.log(e.currentTarget.dataset.id)
    if (app.globalData.userInfo.xuehao == ''){
      wx.showModal({
        title: 'Sorry',
        content: '设置了学号信息才能点赞哦！',
        showCancel: true,
        cancelText: '取消',
        confirmText: '确定',
        success: function (res) {
          wx.redirectTo({
            url: '/pages/me/person/person'
          })
        }
      })
    }else{
    //学号存在增加次数
    tools.request(app.globalData.url + "/userVote", 'post', {'xuehao': app.globalData.userInfo.xuehao, 'vote_id': e.currentTarget.dataset.id})
      .then(resp => {
        console.log('增加爱心成功吗:', resp.data.flag);
        if (resp.data.flag == true) {
          //修改当前页面的list
          console.log(e.currentTarget.dataset.index)
          let list = this.data.list;
          list[e.currentTarget.dataset.index].upStatus = !list[e.currentTarget.dataset.index].upStatus;
          list[e.currentTarget.dataset.index].vote += 1;
          this.setData({
            list: list
          })
        } else {
          wx.showModal({
            title: 'Sorry',
            content: '今天你已经点过赞了'
          })
        }
      })
    }
    this.animationUp.scale(2).step();
    this.setData({
      animationUp: this.animationUp.export()
    })
    setTimeout(function () {
      this.animationUp.scale(1).step();
      this.setData({
        animationUp: this.animationUp.export()
      })
    }.bind(this), 300);
  },
  search: function (e) {
    console.log(e.detail.value);
    this.setData({
      xuehao: 'x'+ e.detail.value
    })
  }
})
