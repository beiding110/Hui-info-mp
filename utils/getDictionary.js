import _ from '../js/app-mp'
const app = getApp()

//所属地市
function getCity() {
    _.$get('/Api/Common/GetDictionary', {
        type: 'City',
    }, (res) => {
        this.setData({
            CityData: res
        });
        app.globalData.dictionary.CityData = res;
    });
}

//公告类型
function getGglx() {
    _.$get('/Api/Common/GetDictionary', {
        type: 'GgLx',
    }, (res) => {
        this.setData({
            TypeData: res
        });
        app.globalData.dictionary.TypeData = res;
    });
}

//时间段
function getDateRange() {
    this.setData({
        DateRangeData: app.globalData.dictionary.DateRangeData
    })
}

//所属行业
function getSshy() {
    _.$get('/Api/Common/GetDictionary', {
        type: 'SsHy',
    }, (res) => {
        app.globalData.dictionary.HyData = res;
    });
}

//进度
function getJzjd() {
    _.$get('/Api/Common/GetDictionary', {
        type: 'JzJd',
    }, (res) => {
        app.globalData.dictionary.JdData = res;
    });
}

export default function() {
    app.globalData.dictionary = {
        CityData: [],
        TypeData: [],
        DateRangeData: [
            {label: '近三天', value: '3'},
            {label: '近一周', value: '7'},
            {label: '近一月', value: '30'}
        ],
        HyData: [],
        JdData: []
    };

    //获取系统字典信息
    getCity.call(this);
    getGglx.call(this);
    getDateRange.call(this);
    getSshy.call(this);
    getJzjd.call(this);
}
