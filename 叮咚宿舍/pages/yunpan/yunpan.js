// pages/yunpan/yunpan.js
const tools = require('../../utils/tools.js')
var app = getApp()
Page({
  data: {
    selecttag: true,
    shangchuantag: true,
    nametag: true,
    edit: [
      { name: '下载', image: '../../images/yunpan/fenxiang.png' },
      { name: '重命名', image: '../../images/yunpan/rename.png' },
      { name: '删除', image: '../../images/yunpan/shanchu.png' }],
    create: [{ name: '新建文件夹', image: '../../images/yunpan/file.png' },
      { name: '上传微信文件', image: '../../images/yunpan/rename.png' },
      { name: '上传本地图片', image: '../../images/yunpan/shanchu.png' }],
    list: []
  },
  //接受文件列表
  onLoad: function (options) {
    let vm = this;
    tools.request1(app.globalData.url + "/index/getList", 'POST', {})
    .then(resp=>{
      console.log(resp.data.data);
      vm.setData({
        list: resp.data.data
      })
    })
  },
  //编辑选项
  editselect: function(e){
    let index = e.currentTarget.dataset.name;
    if (index == '下载') {
      //下载
      console.log('开始下载')
    } else if (index == '重命名'){
      //重命名
      console.log('开始重命名')
      this.setData({
        selecttag: true,
        nametag: false
      })
    } else if (index == '删除') {
      //删除
      console.log('开始删除')
    }
  },
  //新建选项
  createselect: function(e){
    let index = e.currentTarget.dataset.index;
    if (index == 0) {
      //新建文件夹
      console.log('新建文件夹')
      this.setData({
        nametag: false,
        shangchuantag: true
      })
    } else if (index == 1) {
      //上传文件
      console.log('上传文件');
      wx.chooseMessageFile({
        count:1,
        type:'file',
        success(res){
          console.log(res.tempFiles[0])
          if (res.tempFiles[0].size < 31457280) {
           // wx.uploadFile({
            //   url: '',
            //   filePath: res.tempFiles[0].path,
            //   name: res.tempFiles[0].name,
            //   success(res){
            //     console.log(res)
            //   }
            // })
          }else{
            wx.showToast({
              title: '你选中的文件超过30M！',
              icon: 'none'
            })
          }
        }
      })

    } else if (index == 2) {
      //上传图片
      console.log('上传图片');
      wx.chooseImage({
        success: function(res) {
          console.log(res);
          count:9;
          console.log(res.tempFilePaths)
          let size = 0;
          for(var a in res.tempFiles){
            size += res.tempFiles[a].size
          }
          if (size < 31457280){
            //上传
            console.log('上传')
            // wx.uploadFile({
            //   url: '',
            //   filePath: res.tempFilePaths,
            //   name: 'file',
            //   success(res){
            //     console.log(res)
            //   }
            // })
          }else{
            wx.showToast({
              title: '你选中的图片超过30M！',
              icon:'none'
            })
          }
        },
      })
    }
  },
  //点击文件夹或者是文件
  clickfile: function(e){
    console.log('打开文件夹:',e.currentTarget.dataset.name)
    var attribute = e.currentTarget.dataset.attribute;
    if (attribute == 'dir'){
      wx.navigateTo({
        url: '/pages/yunpan/dir-1/dir-1',
      })
    }else{
      wx.showToast({
        title: '暂不支持在线预览，请下载后打开',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //关闭命名图层
  closename: function(e){
    this.setData({
      nametag: true
    })
  },
  //打开操作图层
  clickselect: function(e){
    if(e.currentTarget.dataset.attribute === 'dir'){
      this.setData({
        selecttag: false,
        filename: e.currentTarget.dataset.name,
        isdir: true
      })
    }else{
      this.setData({
        selecttag: false,
        filename: e.currentTarget.dataset.name,
        isdir: false
      })
    }
  },
  //关闭操作图层
  closePopupTap: function(e){
    this.setData({
      selecttag: true
    })
  },
  //关闭上传
  closeshangchuan: function(e){
    this.setData({
      shangchuantag: true
    })
  },
  //上传按键
  shangchuan: function(e){
    this.setData({
      shangchuantag: false
    })
  }
})