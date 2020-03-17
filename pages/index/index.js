//index.js
import {post,wxPromise} from '../../utils/promise'
Page({
  data: {
    userName:'',
    userPic:'',
    userId:'',

  },
  /** */
  goPhone(){
    if(this.data.userId){
      wx.redirectTo({
        url:'../getPhone/getPhone'
      })
    }
    else{
      wx.showToast({
        title:'请先登录',
        icon:'none'
      })
    }
  },
  goMine(){
    if(this.data.userId){
      wx.redirectTo({
        url:'../mine/mine'
      })
    }
  },
  goMessge(){
    if(this.data.userId){
      wx.redirectTo({
        url:'../getMessge/getMessge'
      })      
    }
    else{
      wx.showToast({
        title:'请先登录',
        icon:'none'
      })
    }
  },
  onLoad: function() {
    if(!wx.getStorageSync('userId')){
      this.getSession();
    }
    else{
      this.setdata();
    }
  },
  bindGetUserInfo(e){
    let userInfo=e.detail.userInfo;
    wx.setStorageSync('userName',userInfo.nickName);
    wx.setStorageSync('userPic',userInfo.avatarUrl);
    post('/api/user/set_userinfo',{'openid':wx.getStorageSync('openId'),'nickname':wx.getStorageSync('userName'),'avatar':wx.getStorageSync('userPic')})
    .then((res)=>{
      var that=this;
      wx.setStorageSync('userId',res.data.data.userinfo.id);
      that.setData({
        userName:wx.getStorageSync('userName'),
        userPic:wx.getStorageSync('userPic'),
        userId:wx.getStorageSync('userId')
      })
    })
  },

  getSession(){
    /**获取登录的code */
    wxPromise(wx.login)()
    .then(res=>{post("/api/user/get_openid",{code:res.code})
    .then(res=>{
      if(res.data.code_status==0){
        let openId=res.data.data.userinfo.openid;
        let sessionKey=res.data.data.userinfo.session_key;
        wx.setStorageSync('openId',openId);
        wx.setStorageSync('sessionKey',sessionKey);
        this.getRecord();
        }
      })
    })
  },
/**使用录音功能 */
getRecord(){
  wx.getSetting({
    success(res) {
      var that=this;
      if (!res.authSetting['scope.record']) {
        wx.authorize({
          scope: 'scope.record',
          success () {
            // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
            wx.startRecord()
          },
          fail(){
            wx.showModal({
              title: '提示',
              content: '您未授权录音，功能将无法使用',
              showCancel: true,
              confirmText: "授权",
              confirmColor: "#52a2d8",
              success: function (res) {
                if (res.confirm) {
                  //确认则打开设置页面（重点）
                  wx.openSetting({
                    success: (res) => {
                      console.log(res.authSetting);
                    },
                    fail: function () {
                      console.log("授权设置录音失败");
                    }
                  })
                }
            
            }
          })
        }
      })
     }
    }
  
  })
},
  setdata(){
    this.setData({
      userName:wx.getStorageSync('userName'),
      userPic:wx.getStorageSync('userPic'),
      userId:wx.getStorageSync('userId')
    })
  },
})
