import loginHandler from './loginHandler.js'

export default function(cb, loainHandlerCb) {
    // 获取个人信息，包括头像昵称城市等；
    wx.getUserInfo({
        success: res => {
            console.log(res)
            // 可以将 res 发送给后台解码出 unionId
            this.globalData.userInfo = res.userInfo;

            //登录操作
            //包含成功后的wxLoginCallback调用
            loginHandler.call(this, res.userInfo, (loainHandlerCb || function(){}));

            cb && cb()
        }
    })
}
