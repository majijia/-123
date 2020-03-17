const baseUrl="https://mini.moonlight.rchang.cn";
const headerConfig = {
    "Content-Type": "application/json",
  }
export function wxPromise(fn){
    return function(obj={}){
        return new Promise((resolve,reject)=>{
            obj.success=res=>{
                resolve(res)
            };
            obj.fail=res=>{
                reject(res)
            };
            fn(obj)
        })
    }
}
//post请求的封装
export function post(url,data={}){
    return new Promise((resolve,reject)=>{
        // console.log(wx.getStorageSync('openId'));
        let openId=wx.getStorageSync('openId');
        data.openid=openId;
        //网络请求
        wx.request({
            url:baseUrl+url,
            data,
            method:'POST',
            head:headerConfig,
            success:function(res){
                resolve(res)
            },
            fail:function(error){
                reject(error)
            }
        })
    })
}
// 这是对get请求的封装
export function get(url, data={}){
    return new Promise((resolve, reject) => {
       //网络请求
       wx.request({
          url:  baseUrl  + url,
          data,
          method: 'GET',
          header:headerConfig,
          success: function (res) {//服务器返回数据
            resolve(res);
          },
          fail: function (error) {
             reject(error);
          }
       })
    });
  }
//封装上传
export function upLoad(url,formData={},filePath){
    return new Promise((resolve,reject)=>{
        wx.uploadFile({
            url:baseUrl+url,
            formData,
            method:'POST',
            header:{"Content-Type": "multipart/form-data"},
            filePath,
            name:'file',
            success:(res)=>{
                resolve(res)
            },
            fail:(err)=>{
                reject(err)
            }
        })
    })
}