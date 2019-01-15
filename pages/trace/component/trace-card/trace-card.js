import _ from '../../../../js/app-mp'

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
            console.log('keyword')
            if(this.properties.readonly) {
                var search = _.toSearch({
                    type: 'new'
                });
                wx.navigateTo({
                    url: ('/pages/trace/form-keyword/form-keyword' + search)
                });
            }
        },
        toSetting() {
            console.log('setting')
            var search = _.toSearch({
                type: 'new'
            });
            wx.navigateTo({
                url: ('/pages/trace/form-settings/form-settings' + search)
            });
        },
        toDetail() {
            console.log('detail');
            var search = _.toSearch({
                type: 'new'
            });
            wx.navigateTo({
                url: ('/pages/trace/detail/detail' + search)
            });
        },
    }
})
