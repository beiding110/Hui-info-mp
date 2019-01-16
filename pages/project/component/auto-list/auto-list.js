import _ from '../../../../js/app-mp'
import util from '../../../../utils/util'
var app = getApp()

// pages/bidding/component/bidding-list/bidding-list.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        extra: {
            type: Object,
            value: {},
            observer(n, o) {
                // if(n !== o)
                // this.reload()
            }
        },
        url: {
            type: String,
            value: '/Api/Project/GetProjectList'
        },
        lazy: {
            type: Boolean,
            value: false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        tableData: []
    },

    /**
     * 组件的方法列表
     */
    methods: {
        tableDataUpdate(e) {
            this.setData({
                tableData: e.detail
            });
        },
        toDetail() {
            util.vipTest(() => {
                var search = _.toSearch({
                    guid: '5676013822596189820',
                    type: 'GongShi'
                });
                wx.navigateTo({
                    url: '../detail/detail' + search
                })
            })
        },
        reload() {
            this.selectComponent('#scrollLoder').reload();
        }
    }
})
