const innerAudioContext = wx.createInnerAudioContext();//播放录音;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRudio:false,
    getFailPath:'',
    sender_avatar:'',
    sender_nickname:'',
    audioPath:'',
    sliderValue: 0, //控制进度条slider的值，
    duration:'',
    startDuration:0,
    updateState: false, //防止视频播放过程中导致的拖拽失效
  },
  /**播放与暂停 */
  isAudio(){
    var that=this;
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
       /**添加的进度条 */
      innerAudioContext.onPlay((res)=>{
        var duration=innerAudioContext.duration;
      })
      innerAudioContext.onTimeUpdate(function(res){
        var currentTime = innerAudioContext.currentTime  * 1000;
        that.setData({ 
          duration:Math.ceil(innerAudioContext.duration),
          sliderValue: Math.ceil(innerAudioContext.currentTime) ,
          startDuration:Math.ceil(innerAudioContext.currentTime)
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
  /**返回我的 */
  deleteRadio(){
    innerAudioContext.pause();
    wx.redirectTo({
      url:'../mine/mine'
    })
  },
    /**返回上一页 */
  back(e){
    const urls=e.detail;
    innerAudioContext.pause()
      wx.redirectTo({
         url:`../${urls.getMessge}/${urls.getMessge}`
      })
  },
  onShow(){
    let audioPath=wx.getStorageSync('getFailPath');
    this.setData({
       audioPath,
       sender_avatar:wx.getStorageSync('userPic'),
       sender_nickname:wx.getStorageSync('userName'),
       updateState: true
    })
    innerAudioContext.src=audioPath;
    innerAudioContext.pause()

  }
})