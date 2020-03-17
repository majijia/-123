// components/backArrow.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  options:{
    // styleIsolation:'isolated'
    addGlobalClass: true
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
    goBack(){
      var myEventDetail={index:'index',getPhone:'getPhone',getMessge:'getMessge'}
      this.triggerEvent('myevent',myEventDetail);
    },
  }
})
