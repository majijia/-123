// pages/getPhone/getPhone.js
import {post , wxPromise} from '../../utils/promise';
Page({
  
  data: {
    phone:'',
    minePhone:'',
    canGo:false
  },
  /**返回上一页 */
  back(e){
    const urls=e.detail;
    wx.redirectTo({
      url:`../${urls.index}/${urls.index}`
    })
  },
 
  bindBTwo(e){
    let minePhone=e.detail.detail.value;
    this.setData({
      minePhone,
      canGo:true
    })
  },
  goRadio(){
    wx.setStorageSync('minePhone',this.data.minePhone);
    if(wx.getStorageSync('minePhone')){
      wx.redirectTo({
        url:'../radio/radio'
      })
    }
    else{
      wx.showToast({
        title:'请输入正确的手机号码',
        icon:'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      canGo:false
    })
  },
  
  
})