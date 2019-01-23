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
        toDetail(e) {
            util.vipTest(() => {
                var ds = e.currentTarget.dataset,
                    search = _.toSearch({
                        guid: ds.guid,
                        type: ds.type
                    });
                wx.navigateTo({
                    url: '/pages/project/detail/detail' + search
                });

                this.setData({
                    ['tableData[' + ds.index + '].IsRead']: 1
                });
            })
        },
        reload() {
            this.selectComponent('#scrollLoder').reload();
        },
        timeFormatter(time) {
            return / /.test(time) ? time.split(' ')[0] : time;
        },
        longpressHandler(e) {
            let ds = e.currentTarget.dataset;
            wx.showActionSheet({
                itemList: ['添加/取消收藏该条数据'],
                itemColor: '#BC86D6',
                success(res) {
                    _.$get('/Api/Collection/SetCollectState', {
                        id: ds.guid
                    }, (data, res) => {
                        that.triggerEvent('collect');
                        app.globalData.collectSign = true;
                        _.showMsg(res.Msg);
                    })
                }
            })
        }
    }
})
