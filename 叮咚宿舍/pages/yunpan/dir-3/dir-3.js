// pages/yunpan/yunpan.js
Page({
  data: {
    selecttag: true,
    shangchuantag: true,
    edit: [{ name: '重命名', image: '../../../images/yunpan/rename.png' },
    { name: '删除', image: '../../../images/yunpan/shanchu.png' }],
    edit2: [{ name: '下载', image: '../../../images/yunpan/fenxiang.png' },
    { name: '重命名', image: '../../../images/yunpan/rename.png' },
    { name: '删除', image: '../../../images/yunpan/shanchu.png' }],
    create: [{ name: '新建文件夹', image: '../../../images/yunpan/file.png' },
    { name: '上传本地文件', image: '../../../images/yunpan/rename.png' },
    { name: '上传本地图片', image: '../../../images/yunpan/shanchu.png' }]
  },
  onLoad: function (options) {

  },
  //点击文件夹或者是文件
  clickfile: function (e) {
    var tag = 'file';
    if (tag == 'file') {
      wx.navigateTo({
        url: '/pages/yunpan/dir-4/dir-4',
      })
    } else {
      wx.showToast({
        title: '暂不支持在线预览，请下载后打开',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //打开图层
  clickselect: function (e) {
    console.log(e.currentTarget.dataset.index);
    this.setData({
      selecttag: false
    })
  },
  //关闭图层
  closePopupTap: function (e) {
    this.setData({
      selecttag: true
    })
  },
  //关闭上传
  closeshangchuan: function (e) {
    this.setData({
      shangchuantag: true
    })
  },
  //上传按键
  shangchuan: function (e) {
    this.setData({
      shangchuantag: false
    })
  }
})