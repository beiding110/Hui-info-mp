//index.js
//获取应用实例
const app = getApp()
import _ from '../../../js/app-mp'
import getDictionary from '../../../utils/getDictionary.js'

Page({
    data: {
        //查询对象
        searchObj: {
            KeyName: '',
            CityCode: '',
            HyCode: '',
            JdCode: ''
        },

        //查询数据
        KeyName: '',
        CityCode: '',
        HyData: '',
        JdData: '',

        //字典
        CityData: [],
        TypeData: [],
        DateRangeData: []
    },
    onLoad: function () {
        //请求使用到的数据字典
        getDictionary.call(this);
    },
    keyNameUpdate(e) {
        this.setData({
            KeyName: e.detail,
            'searchObj.KeyName': e.detail
        })
    },
    cityCodeInput(e) {
        this.searchHandler('CityCode', e.detail);
    },
    typeCodeInput(e) {
        this.searchHandler('TypeCode', e.detail);
    },
    dateRangeInput(e) {
        this.searchHandler('DateRange', e.detail);
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
