// pages/index/index.js
const tools = require('../../utils/tools.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectArray: [],
    //当前点击次数
    clicknum:0,
    //一分钟点击次数
    click:0,
    tag:false,
    service_type_id:0,
    service_name:''
  },
  //获取选择的类型
  getDate: function (e) {
    console.log(e.detail)
    this.setData({
      service_type_id: e.detail.id,
      service_name: e.detail.text
    })
  },
  click:function(e){
    var vm = this;
    vm.data.clicknum ++;
    vm.setData({
      clicknum: vm.data.clicknum
    })
  },
  click1: function (e) {
    var vm = this;
    var userInfo = app.globalData.userInfo;
    vm.data.clicknum = 0;
    if (vm.data.service_name!=''){
      wx.showModal({
        title: '提示',
        content: '接下来你将有10秒钟的时间鞭打肥波,我们会将不同服务的鞭打排名记录下来！',
        success: function (res) {
          if(res.confirm == true){
          vm.setData({
            tag: true
          })
          setTimeout(function () {
            console.log("点击次数为", vm.data.clicknum)
            vm.setData({
              click: vm.data.clicknum,
              tag: false
            })
            tools.request(app.globalData.url + "/serviceSpur", 'post', { 'spurNum': vm.data.click, 'userid': userInfo.userid, 'nickname': userInfo.nickname, 'serviceTypeId': vm.data.service_type_id, 'serviceName': vm.data.service_name})
              .then(resp => {
                    console.log(resp)
                  })
            console.log("点击次数为", vm.data.click)
          }, 10000);
          }
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请先选择你想要支持的服务！',
        success: function (res) {
          console.log("success")
        }
      })
    }
  },
    

    // if(this.data.clicknum == 1){
    //   wx.showToast({
    //     title: '肥波受到了鞭策，正在奋力赶代码！',
    //     icon:'none'
    //   })
    // } else if (this.data.clicknum % 10==0){
    //   wx.showToast({
    //     title: '别打了！肥波要被打死了！',
    //     icon: 'none',
    //     success:function(e){
    //       setTimeout(function () {
    //         wx.switchTab({
    //           url: '/pages/clean/clean'
    //         })
    //       }, 1500);
    //     }
    //   })
    // }
  onLoad: function (options) {
    var vm = this;
    //获取代发布的服务
    tools.request(app.globalData.url + "/getPreServices", 'post', {})
      .then(resp => {
        console.log(resp)
        var list = [];
        for(var i = 0; i<resp.data.length;i++){
          list.push({
            "id": resp.data[i].service_type_id,
            "text": resp.data[i].service_name
          })
        }
        vm.setData({
          selectArray:list
        })
      })
  },
})