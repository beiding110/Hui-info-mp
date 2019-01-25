import _ from '../../../../js/app-mp'
import util from '../../../../utils/util'

// pages/trace/component/trace-card/trace-card.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        readonly: {
            type: Boolean,
            value: true
        },
        value: {
            type: String,
            value: '',
            observer(n, o) {
                this.setData({
                    model: n
                })
            }
        },
        data: {
            type: Object,
            value: {
                RowGuid: '',
                CityCode: '',
                DateRange: '',
                KeyName: ''
            }
        },
        save: {
            type: Function,
            value: undefined
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        model: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        modelUpdate(e) {
            _.modelEmit.call(this, {
                model: e.detail.value
            })
        },

        toKeyWord() {
            // console.log('keyword')
            util.vipTest(() => {
                if(this.properties.readonly) {
                    var search = _.toSearch({
                        type: this.properties.data.RowGuid || 'new'
                    });
                    wx.navigateTo({
                        url: ('/pages/trace/form-keyword/form-keyword' + search)
                    });
                }
            })
        },
        toSetting() {
            // console.log('setting');
            function navHandler(RowGuid) {
                util.vipTest(() => {
                    var search = _.toSearch({
                        type: RowGuid ? RowGuid : (this.properties.data.RowGuid || 'new')
                    });
                    wx.navigateTo({
                        url: ('/pages/trace/form-settings/form-settings' + search)
                    });
                })
            }

            if (this.properties.save){
                this.properties.save(navHandler);
            } else {
                navHandler.call(this)
            }
        },
        toDetail(e) {
            if(!this.data.model) return;
            let dataset = e.target.dataset;
            // console.log('detail');
            var search = _.toSearch({
                RowGuid: dataset.guid,
                CityCode: dataset.citycode,
                DateRange: dataset.daterange,
                KeyName: dataset.keyname
            });

            wx.navigateTo({
                url: ('/pages/trace/detail/detail' + search)
            });
        },
    }
})
