// pages/mine/mine.js
import {post} from '../../utils/promise';
let time=require('../../utils/util.js');
let innerAudioContext = wx.createInnerAudioContext();//播放录音;
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    isAct:'',
    listOne:[],
    listTwo:[],
    isActive:1,
    userPic:'',
    userName:'',
    isRudio:false,
    selfPath:'' ,//自己的录音 --我的留言
  },
  mineTitle(e){
    let num = e.currentTarget.dataset.num;
    let listOne=this.data.listOne;
    let listTwo=this.data.listTwo;
    innerAudioContext.pause();
    if(num==1 && listOne.length>0){
      listOne.forEach((item,index)=>{
        item.cast=false;
      })
      this.setData({
          isAct:1,
          isActive:1,
          listOne
      })
    }else if(num==2 && listTwo.length>0){
      listTwo.forEach((item,index)=>{
        item.cast=false;
      })
      this.setData({
        isAct:2,
        isActive:2,
        listTwo
      })
      
    }else if(num==1){
      this.setData({
        isActive:1,
        isAct:0
      })
    }else if(num==2){
      this.setData({
        isActive:2,
        isAct:0
      })
    }
    else{
      this.setData({
        isAct:0
      })
    }
    
  },
  /**点击播放 */
  bindAudio(e){
    let listOne=this.data.listOne;
    let clickId=e.currentTarget.dataset.num;
    let IsCast=false;
    listOne.forEach((item,index)=>{
      if(item.id==clickId){
        item.cast=!item.cast;
        IsCast=item.cast;
      }else{
        item.cast=false
      }
      innerAudioContext.pause();
    })
    let Path=e.currentTarget.dataset.path;
    let selfPath='';
    innerAudioContext.src=Path;
    if(IsCast){
      innerAudioContext.play();
    }else{
      innerAudioContext.pause();
    }
    this.setData({
      listOne,
      selfPath
    })
  },
  bindAudioTwo(e){
    //遍历循坏获取头像和录音
    let clickId=e.currentTarget.dataset.num;
    let listTwo=this.data.listTwo
    listTwo.forEach((item,index)=>{
      if(item.id==clickId){
        /**播放存储的录音 */
        wx.setStorageSync('getFailPath',item.path);
        wx.setStorageSync('sender_avatar',item.sender_avatar);
        wx.setStorageSync('sender_nickname',item.sender_nickname);
        wx.redirectTo({
          url:'../getRadio/getRadio'
        })
      }
    })
  },
  back(){
    innerAudioContext.pause();
    wx.redirectTo({
      url:"../index/index"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.mine==2){
      this.setData({
        isAct:2,
        isActive:2
      })
    }
    else{
      this.setData({
        isAct:1,
        isActive:1
      })
    }
    this.sendRadio();
    this.reciveRadio();
  },
  //发件的列表
  sendRadio(){
    post('/api/user/send_list').then((res)=>{
      if(res.data.code_status==0){
        let list=res.data.data.list;
        list.forEach((item,index)=>{
          let Minetime=item.add_time;
          item.add_time=time.formatTimeTwo(Minetime,'Y/M/D');
        })
        this.setData({
          listOne:list
        })
        if(list.length==0){
          this.setData({
            isAct:0
          })
        }
      }
    })
  },
  //收件的列表
  reciveRadio(){
    post('/api/user/receive_list').then((res)=>{
      if(res.data.code_status==0){
        let list=res.data.data.list;
        list.forEach((item,index)=>{
          let Minetime=item.add_time;
          item.add_time=time.formatTimeTwo(Minetime,'Y/M/D');
        })
        this.setData({
          listTwo:list
        })
      }
      else{
        wx.showToast({
          title:res.data.data
        })
      }
    })
  },
  //获取人物头像和名称
  getHeadImg(){
    this.setData({
      userPic:wx.getStorageSync('userPic'),
      userName:wx.getStorageSync('userName')
    })
    
  },
  onShow(){
    this.getHeadImg();
  },
})