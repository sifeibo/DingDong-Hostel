//跳转如果没有登录过跳转到登录界面
function navigateTo(urll){
  var userInfo = getApp().globalData.userInfo
  console.log(userInfo)
  // if (userInfo == null) {
  //   console.log("无身份，跳转到登录界面")
  //   wx.navigateTo({
  //     url: '/pages/login/login'
  //   })
  // }else{
    // if (userInfo.shenfen === 2) { 
    //   console.log("身份为阿姨，跳转到订单界面")
    //   wx.switchTab({
    //     url: '/pages/order/order',
    //   })
    // }
    // else{
      console.log("身份为客户，跳转到正确的界面")
      wx.navigateTo({
        url: urll,
      })
    // }
  // } 
}

//封装request方法
const request = (url, method, data) => {
  var promise = new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中'
    })
    //网络请求
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //服务器返回数据
        wx.hideLoading()
        if (res.statusCode == 200) {
          wx.showToast({
            title: '加载成功'
          })
          resolve(res);
        } else {
          //返回错误提示信息
          reject(res.data);
        }
      },
      fail: function (res) {
        wx.hideLoading()
        wx.showToast({
          title: '无法连接服务器',
          icon: 'loading',
          duration: 1000
        })
        reject('网络出错');
      },

    });
  });
  return promise;
}

//封装request方法
const request1 = (url, method, data) => {
  var promise = new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中'
    })
    console.log('Cookie',getApp().globalData.cookie)
    //网络请求
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': getApp().globalData.cookie
      },
      success: function (res) {
        //服务器返回数据
        wx.hideLoading()
        if (res.statusCode == 200) {
          wx.showToast({
            title: '加载成功'
          })
          resolve(res);
        } else {
          //返回错误提示信息
          reject(res.data);
        }
      },
      fail: function (res) {
        wx.hideLoading()
        wx.showToast({
          title: '无法连接服务器',
          icon: 'loading',
          duration: 1000
        })
        reject('网络出错');
      },

    });
  });
  return promise;
}


module.exports = {
  navigateTo: navigateTo,
  request:request,
  request1: request1
}