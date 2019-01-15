import _ from '../js/app-mp'
const app = getApp()

//所属地市
function getCity() {
    if(app.globalData.dictionary.CityData.length > 0) {
        this.setData({
            CityData: app.globalData.dictionary.CityData
        });
    } else {
        _.$get('/Api/Common/GetDictionary', {
            type: 'City',
        }, (res) => {
            res.unshift({label: '全部', value: ''});

            if(this.data.CityData !== undefined) {
                this.setData({
                    CityData: res
                });
            }
            app.globalData.dictionary.CityData = res;
        });
    }
}

//公告类型
function getGglx() {
    if(app.globalData.dictionary.TypeData.length > 0) {
        this.setData({
            TypeData: app.globalData.dictionary.TypeData
        });
    } else {
        _.$get('/Api/Common/GetDictionary', {
            type: 'GgLx',
        }, (res) => {
            res.unshift({label: '全部', value: ''});

            if(this.data.TypeData !== undefined) {
                this.setData({
                    TypeData: res
                });
            }
            app.globalData.dictionary.TypeData = res;
        });
    }
}

//时间段
function getDateRange() {
    this.setData({
        DateRangeData: app.globalData.dictionary.DateRangeData
    })
}

//所属行业
function getSshy() {
    if(app.globalData.dictionary.HyData.length > 0) {
        this.setData({
            HyData: app.globalData.dictionary.HyData
        });
    } else {
        _.$get('/Api/Common/GetDictionary', {
            type: 'SsHy',
        }, (res) => {
            res.unshift({label: '全部', value: ''});

            if(this.data.HyData !== undefined) {
                this.setData({
                    HyData: app.globalData.dictionary.HyData
                });
            }
            app.globalData.dictionary.HyData = res;
        });
    }
}

//进度
function getJzjd() {
    if(app.globalData.dictionary.JdData.length > 0) {
        this.setData({
            JdData: app.globalData.dictionary.JdData
        });
    } else {
        _.$get('/Api/Common/GetDictionary', {
            type: 'JzJd',
        }, (res) => {
            res.unshift({label: '全部', value: ''});

            if(this.data.JdData !== undefined) {
                this.setData({
                    JdData: app.globalData.dictionary.JdData
                });
            }
            app.globalData.dictionary.JdData = res;
        });
    }
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
