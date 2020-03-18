import {post} from '../../utils/promise'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    canGo:false
  },
  goGetRadio(){
    /**提取录音 */
    post('/api/file/receive',{extracte_code:this.data.phone})
    .then(res=>{
      let list = res.data.data.list;
      if(list.length==1){
        wx.setStorageSync('getFailPath',list[0].path);
        wx.setStorageSync('sender_avatar',list[0].sender_avatar);
        wx.setStorageSync('sender_nickname',list[0].sender_nickname);
        wx.redirectTo({
          url:'../getRadio/getRadio'
        })
      }else if(list.length>1){
        wx.redirectTo({
          url:'../mine/mine?mine=2'
        })
      }else{
        wx.showToast({
          title:'没有发现有您的留言呢，检查一下手机号是否正确',
          icon:'none'
        })
      }
    })
  },
  back(e){
    const urls=e.detail;
    wx.redirectTo({
      url:`../${urls.index}/${urls.index}`
    })
  },
  /**验证手机号 */
  bindB(e){
    let minePhone=e.detail.detail.value;
    this.setData({
      phone:minePhone,
      canGo:true
    })
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