//index.js
//获取应用实例
const app = getApp()
import _ from '../../../js/app-mp'
import getDictionary from '../../../utils/getDictionary.js'
import codeGetter from '../../../utils/codeGetter.js'

Page({
    data: {
        //查询对象
        searchObj: {
            KeyName: '',
            CityCode: '',
            TypeCode: '',
            DateRange: ''
        },

        //查询数据
        KeyName: '',
        CityCode: '',
        TypeCode: '',
        DateRange: '',

        //字典
        CityData: [],
        TypeData: [],
        DateRangeData: []
    },
    onLoad: function () {
        //请求使用到的数据字典
        getDictionary.call(this);

        // _.$get('/Api/User/LoginOut', () => {
        //
                codeGetter.call(this, () => {
                    // _.$get('/Api/User/GetUserInfo', () => {
                        this.queryData();
                    // })
                })
        //
        // })
    },
    keyNameUpdate(e) {
        this.setData({
            KeyName: e.detail,
            'searchObj.KeyName': e.detail
        })
    },
    modelUpdate(e) {
        let ds = e.target.dataset;
        this.searchHandler(ds.prop, e.detail);
    },
    searchHandler(key, value) {
        let obj = {};

        obj[key] = value;
        obj['searchObj.'+key] = value;

        this.setData(obj);

        this.queryData();
    },
    queryData() {
        this.selectComponent('#scrollLoder').reload();
    },
})
