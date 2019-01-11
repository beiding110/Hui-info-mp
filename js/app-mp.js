const app = getApp();
import ajax from './ajax.js'

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

    $get: ajax.$get
}

// Array.prototype.merge = function(arr) {
//     let cArr = _.clone(arr);
//     cArr.push.apply(cArr, arr);
//     return cArr;
// }

export default _
