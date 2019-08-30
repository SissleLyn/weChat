const app = getApp();
Page({
  data: {
    indicatorDots: false,
    autoplay: false,
    current: app.globalData.curFooterKey
  },
  onLoad: function() {
    //查询待确认开会状态的会议
    this.queryMeeting();
  },
  addMeeting() {
    const db = wx.cloud.database();
    db.collection('meeting').add({
      data: {
        name: "加快推进在线政务服务平台建设会议",
        duration: "2019年7月8日 14:00——15:30",
        room: "三楼会议室305",
        status: "已取消",
        mId: "20190708004"
      },
      success: res => {
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
  queryMeeting() {
    const db = wx.cloud.database();
    db.collection('meeting').where({
      _openid: this.data.openid,
      status: "待确认"
    }).get({
      success: res => {
        this.setData({
          toConfirm: res.data
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
    db.collection('meeting').where({
      _openid: this.data.openid,
      status: "待参与"
    }).get({
      success: res => {
        this.setData({
          toJoin: res.data
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
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