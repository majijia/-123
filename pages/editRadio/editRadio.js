import {post , wxPromise,upLoad} from '../../utils/promise';
const innerAudioContext = wx.createInnerAudioContext();//播放录音;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRudio:false,
    audioPath:'',
    sliderValue: 0, //控制进度条slider的值，
    duration:0,
    startDuration:0,
    updateState: false, //防止视频播放过程中导致的拖拽失效
    isShow:false,
    isSend:0,
    sendResult:'',
  },
  /**播放与暂停 */
  isAudio(){
    var that=this;
    innerAudioContext.src=wx.getStorageSync('filePath');
    if(that.data.isRudio){
      that.setData({
        isRudio:false
       })
       innerAudioContext.pause();
    }
    else{
      that.setData({
        isRudio:true
       })
      innerAudioContext.onPlay((res)=>{
        var duration=innerAudioContext.duration;
      })
      innerAudioContext.onTimeUpdate(function(res){
        var currentTime = innerAudioContext.currentTime  * 1000;
        that.setData({ 
          duration:Math.floor(innerAudioContext.duration),
          sliderValue: Math.floor(innerAudioContext.currentTime) ,
          startDuration:Math.floor(innerAudioContext.currentTime)
        });
        if(that.data.duration==that.data.sliderValue){
          that.setData({
            isRudio:false
          })
        }
      })
      innerAudioContext.play();
    }  
  },
  /**删除重录 */
  deleteRadio(){
    innerAudioContext.pause();
    this.setData({
      isRudio:false
    })
    wx.removeStorageSync('filePath');
    wx.redirectTo({
      url:'../radio/radio'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let audioPath=wx.getStorageSync('filePath');
    this.setData({
      audioPath,
      updateState: true,
      sendResult:true
    })
    /**获取进度条的值 */
    innerAudioContext.onTimeUpdate(function(res){
      var currentTime = innerAudioContext.currentTime  * 1000;
      that.setData({ 
        duration:Math.floor(innerAudioContext.duration),
        sliderValue: Math.floor(innerAudioContext.currentTime),
        startDuration:Math.floor(innerAudioContext.currentTime)
      });
      if(that.data.duration==that.data.sliderValue){
        that.setData({
          isRudio:false
        })
      }
    })
  },
  //点击发送
  sendRadio(){
    innerAudioContext.pause();
    this.setData({
      isRudio:false
    })
    this.sendFile();
  },
  /**发送文件 */
  sendFile(){
    var that=this;
    let tempFilePath=wx.getStorageSync('filePath');
    if(that.data.sendResult){
      upLoad('/api/file/send',{openid:wx.getStorageSync('openId'),extracte_code:wx.getStorageSync('minePhone')},tempFilePath)
      .then(res=>{
          let list=JSON.parse(res.data);
          that.setData({
            isShow:true
          })
          if(list.code_status==0){
            wx.removeStorageSync('filePath');
            wx.setStorageSync('sender_nickname',list.data.sender_nickname);
            wx.setStorageSync('sender_avatar',list.data.sender_avatar);
            that.setData({
              isSend:1,
              sendResult:true
            })
          }
          else{
            that.setData({
              isSend:2,
              sendResult:false
            })
          }
      })
    }
    else{
      that.setData({
        sendResult:false
      })
      wx.showToast({
        title:'文件有误请稍候发送',
        icon:'none'
      })
    }
  },
  /**去除遮罩 */
  sendOk(){
    this.setData({
      isShow:false,
      isSend:0
    })
    this.goMine();
  },
  GoMine(){
    this.goMine();
    this.setData({
      isShow:false,
      isSend:0
    })
  },
  /**再次发送 */
  sendAgain(){
    this.sendFile();
  },
  /**跳转我的 */
  goMine(){
    wx.redirectTo({
      url:'../mine/mine'
    })
  },
  // sliderChanging(e) {
  //   this.setData({
  //     updateState: false //拖拽过程中，不允许更新进度条
  //   })
  // },
  /**进度条改变触发 */
  // sliderChange(e) {
  //   if (this.data.duration) {
  //     this.audioCtx.seek(e.detail.value / 100 * this.data.duration); //完成拖动后，计算对应时间并跳转到指定位置
  //     let startDuration=e.detail.value / 100 * this.data.duration;
  //     this.setData({
  //       sliderValue: e.detail.value,
  //       updateState: true, //完成拖动后允许更新滚动条,
  //       startDuration:Math.floor(startDuration)
  //     })
  //   }
  // },
  
  // videoUpdate(e) {
  //   if (this.data.updateState) { //判断拖拽完成后才触发更新，避免拖拽失效
  //     let sliderValue = e.detail.currentTime / e.detail.duration * 100;
  //     this.setData({
  //       sliderValue,
  //       duration: Math.floor(e.detail.duration)
  //     })
  //     let startDuration=sliderValue/100 * this.data.duration;
  //     this.setData({
  //       startDuration:Math.floor(startDuration)
  //     })
  //   }
  // },
})