// components/inputPhone/input-phone.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindB(e){
      let myPhone=e.detail.value;
      let phone=/^[1][3,4,5,7,8,9][0-9]{9}$/;
      if(phone.test(myPhone)){
        this.triggerEvent('bindB',e);
      }
      else{
        wx.showToast({
          title:'请输入正确格式的手机号',
          icon:'none'
        })
        this.setData({
          phone:''
        })
      }
    }
  }
})
