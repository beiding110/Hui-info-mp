import _ from '../js/app-mp'

export default function(userInfo) {
    _.$post('/Api/User/UserLogin', userInfo, (data) => {
        this.globalData.$cookie = data;
        this.wxLoginCallback && this.wxLoginCallback();

        this.wxLoginCallback = null;
    });
}
