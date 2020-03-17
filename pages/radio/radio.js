// pages/radio/radio.js
import {post , wxPromise,upLoad} from '../../utils/promise';
const recorderManager = wx.getRecorderManager();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    filePath:'',
    grayJ:false,  //是否显示动画背景--灰色
    redJ:false,   //是否显示红色
    J:39,
    minePhoe:'',
    imgArr:[]
  },
  back(e){
    const ursl=e.detail
    wx.redirectTo({
      url:`../${ursl.getPhone}/${ursl.getPhone}`
    })
  },
  /**开始录音 */
  start(){
    wx.vibrateShort({
      success: function () {
      }
    })
    const options = {
      duration: 60000,
      format: 'mp3'
    }
    this.setData({
      grayJ:true,
      redJ:true,
      J:39,
    });
    this.speaking();
    recorderManager.start(options);
    recorderManager.onStart(() => {
      // console.log('recorder start')
    });
    recorderManager.onError((res) => {
      
    })
  },
  
  /**结束录音 */
  stop(){
    recorderManager.stop();
    clearInterval(this.timer);
    var that=this;
    recorderManager.onStop((res) => {
      const { tempFilePath } = res;
      wx.setStorageSync('filePath',tempFilePath);
      wx.redirectTo({
        url:'../editRadio/editRadio'
      })
    })
    that.setData({
      grayJ:false,
      redJ:false
    })
    
  },
  /**语音动画红色显示 */

  speaking() {
    var _this = this;
    //话筒帧动画
    var i = 39;
    this.timer = setInterval(function () {
      i--;
      _this.setData({
        J:i
      })
      if(i<0){
        clearInterval(_this.timer);
      }
    }, 1500);
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let minePhoe=wx.getStorageSync('minePhone');
    let imgArr=[];
    for(var i=1;i<41;i++){
      imgArr.push(`../../img/${i}.png`);
    }
    this.setData({
      minePhoe,
      imgArr
    })
    
  },

  
})