const app = getApp();
Page({
  data: {
    current: "tab1"
  },
  onLoad: function () {
    //查询待确认开会状态的会议
 
  },
  //footerBar函数
  handleChange({ detail }) {
    var curUrl = "";
    switch (detail.key) {
      case "todo":
        curUrl = "../index/index";
        break;
      case "mine":
        curUrl = "../mine/mine";
        break;
      default:
        curUrl = "../index/index";
        break;
    }
    app.globalData.curFooterKey = detail.key;
    wx.navigateTo({
      url: curUrl,
    })
  },

})