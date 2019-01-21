import msg from './ui.js'

function $ajax(arg) {
    var app = getApp()
    wx.request({
        url: 'http://192.168.1.79:6060/huiInfo' + arg.url || '',//http://192.168.1.79:6060/huiInfo //http://www.hbidding.com/huiinfo
        data: arg.data || {},
        method: arg.type || 'GET',
        header: {
            'content-type': 'application/x-www-form-urlencoded',
            '$source': app.globalData.$accountInfo.miniProgram.appId,
            '$code': app.globalData.$code || ''
        },
        success: function(res) {
            if(res.statusCode === 200) {
                var obj = typeof(res.data)=='string' ? JSON.parse(res.data) : res.data;

                if(obj.Success){
                    app.globalData.IsVip = obj.IsVip;

                    if(/{|}|\[|\]/.test(obj.Data) && typeof obj.Data == 'string'){
                        arg.success && arg.success(JSON.parse(obj.Data), obj);
                    }else{
                        arg.success && arg.success(obj.Data, obj);
                    }

                }else{
                    msg.showMsgBox(obj.Msg)
                }
            }
        },
        fail(res) {
            console.error(res);
            msg.showMsg('系统错误', 'none')
        },
        complete(res) {}
    })
}

export default {
    $get(a, b, c) {
        var url, data, callback;

        url = a;
        data = '';
        callback = callback || function () { }

        if (arguments.length == 2 && typeof (b) == 'function') {
            callback = b;
        } else if (arguments.length == 2 && typeof (b) != 'function') {
            data = b;
        } else if (arguments.length == 3) {
            data = b;
            callback = c;
        }

        $ajax({
            url: url,
            data: data,
            success: callback,
            type: 'GET'
        })
    },
    $post(a, b, c) {
        var url, data, callback;

        url = a;
        data = '';
        callback = callback || function () { }

        if (arguments.length == 2 && typeof (b) == 'function') {
            callback = b;
        } else if (arguments.length == 2 && typeof (b) != 'function') {
            data = b;
        } else if (arguments.length == 3) {
            data = b;
            callback = c;
        }

        $ajax({
            url: url,
            data: data,
            success: callback,
            type: 'POST'
        })
    }
}
