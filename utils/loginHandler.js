import _ from '../js/app-mp'

export default function(userInfo, callback) {
    //登录接口
    _.$post('/Api/User/UserLogin', userInfo, (data) => {
        // this.globalData.$cookie = data['ASP.NET_SessionId'];
        this.globalData.$openid = data['OpenID'];

        if(!!callback) {
            callback()
        };

        //调用登录成功回调；
        this.wxLoginCallback && this.wxLoginCallback();
        this.wxLoginCallback = null;
    });
}
