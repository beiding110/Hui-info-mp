const app = getApp();
import ajax from './ajax.js'
import Chain from './Chain.js'
import ui from './ui.js'

const _ = {
    clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },
    merge(org, add) {
        let o  = this.clone(org),
            a = this.clone(add);

        if(Array.isArray(o) && Array.isArray(a)) {
            o.push.apply(o, a);
            return o
        }
    },
    mixin(from, to, cover) {
        Object.keys(from).forEach(function(key) {
            to[key] = to[key] ? (cover ? from[key] : to[key]) : from[key]
        });
        return to;
    },

    modelEmit(obj, cb) {
        this.setData(obj);
        Object.keys(obj).forEach((key, index) => {
            this.triggerEvent('input', obj[key]);
        });

        cb && cb();
    },
    toSearch(obj, flag) {
		var res = '?'
		if (typeof obj == 'object' && Array.isArray(obj)) {
			obj.forEach(function (item, index) {
				res += ('[' + index + ']=' + owner.toSearch(item, true) + '&');
			});
		} else if (typeof obj == 'object') {
			Object.keys(obj).forEach(function (key) {
				if (typeof obj[key] == 'object' && Array.isArray(obj[key])) {
					obj[key].forEach(function (item, index) {
						res += (key + '[' + index + ']=' + owner.toSearch(item, true) + '&')
					});
				} else if (typeof obj[key] == 'object' && obj[key] != null) {
					res += (owner.toSearch(obj[key], true) + '&');
				} else {
					var item = /[\u3220-\uFA29]/.test(obj[key]) ? escape(obj[key]) : obj[key];
					res += (key + '=' + (item || '') + '&');
				}

			});
		} else {
			return obj;
		}
		return !!flag ? res.slice(1, -1) : res.slice(0, -1);
	},

    $get: ajax.$get,
    $post: ajax.$post,
    Chain,
    showMsg: ui.showMsg,
    showMsgBox: ui.showMsgBox,
}

// Array.prototype.merge = function(arr) {
//     let cArr = _.clone(arr);
//     cArr.push.apply(cArr, arr);
//     return cArr;
// }

export default _
