// comment/comment.js
var app = getApp();
const tools = require('../../../utils/tools.js')
Page({
  data: {
    comment:''
  },
  onLoad: function (options) {

  },
  //评论
  comment:function(e){
    this.setData({
      comment: e.detail.value
    })
  },
  //提交
  submit:function(){
    let vm = this;
    console.log('获取评论信息',vm.data.comment)
    if (vm.data.comment == ''){
      wx.showModal({
        title: 'Sorry',
        content: '评论不能为空！'
      })
    }
    else if (app.globalData.userInfo.xuehao == ''){
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
    }
    else{
      tools.request(app.globalData.url + "/inputContent", 'post', { 'xuehao': app.globalData.userInfo.xuehao,'content': vm.data.comment })
      .then(resp=>{
        console.log(resp)
        if (resp.data.msg == '发表成功'){
          wx.showToast({
            title: resp.data.msg,
          })
        }else{
          wx.showToast({
            icon: 'none',
            title: '只能发表一次哦！',
          })
        }
      })
    }
  }
})