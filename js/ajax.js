import msg from './ui.js'

function $ajax(arg) {
    wx.request({
        url: 'http://www.hbidding.com/huiinfo' + arg.url || '',
        data: arg.data || {},
        method: arg.type || 'GET',
        success: function(res) {
            if(res.statusCode === 200) {
                var obj = typeof(res.data)=='string' ? JSON.parse(res.data) : res.data;

                if(obj.Success){

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
