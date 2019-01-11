//index.js
//获取应用实例
const app = getApp()
import _ from '../../js/app-mp'
import getDictionary from '../../utils/getDictionary.js'

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

        //列表数据
        tableData: [],

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
        this.searchHandler('KeyName', e.detail);
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

        this.selectComponent('#scrollLoder').reload();
    },
    tableDataUpdate(e) {
        this.setData({
            tableData: e.detail
        });
    }
})