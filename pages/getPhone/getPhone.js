// pages/getPhone/getPhone.js
import {post , wxPromise} from '../../utils/promise';
Page({

  /**
   * 页面的初始数据
   */
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
 
  bindB(e){
    // console.log(e.detail.value);
      let minePhone=e.detail.value;
      const phone=/^[1][3,4,5,7,8,9][0-9]{9}$/;
      if(phone.test(minePhone)){
        this.setData({
          minePhone,
          canGo:true
        }) 
      }
      else{
        wx.removeStorageSync('minePhone');
        wx.showToast({
          title:'请输入正确格式的手机号',
          icon:'none'
        })
        this.setData({
          phone:''
        })
      }
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