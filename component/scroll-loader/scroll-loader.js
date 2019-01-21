import _ from '../../js/app-mp'

// component/scroll-loader/scroll-loader.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        action: {
            type: String,
            value: '',
            // observer(n, o) {
            //     if(!!n) this.reload();
            // }
        },
        length: {
            type: Number,
            value: 10
        },
        extra: {
            type: Object,
            value: {}
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
        model: [],

        upperLoading: false,
        lowerLoading: false,

        pageIndex: 1,
        loadController: true
    },

    /**
     * 组件的方法列表
     */
    methods: {
        reload() {
            this.setData({
                loadController: true,
                PageIndex: 1
            });
            this.queryData(0, () => {
                // console.log('upper complete')
            });
        },
        lowerHandler() {
            this.queryData(1, () => {
                // console.log('lower complete')
            });
        },
        queryData(type, callback) {
            var that = this,
                loadingType = 'lowerLoading'
            if(this.properties.action){
                if(that.data.loadController){

                    if(!type) {
                        loadingType = 'upperLoading'
                    };
                    let loadingObj = {};
                    loadingObj[loadingType] = true
                    this.setData(loadingObj);

                    // setTimeout(() => {
                    var search = {
                        PageIndex: this.data.pageIndex
                    };
                    _.mixin(this.properties.extra, search);
                    _.$get(this.properties.action, search, (data) => {
                        // var data = (new Array(40)).fill(1)
                        var oldData = [];

                        if(data.length < that.properties.length){
                            this.setData({
                                loadController: false
                            });
                        }

                        if(type) {
                            oldData = this.data.model;
                        };

                        let dataObj = {
                            PageIndex: !type ? 1 : (this.data.PageIndex + 1)
                        };
                        dataObj[loadingType] = false;
                        this.setData(dataObj);

                        _.modelEmit.call(this, {model: _.merge(oldData, data)});

                        wx.vibrateShort();

                        callback && callback();
                    })


                    // }, 1000);
                }
            } else {
                console.warning('请绑定 scroll-loader 的action属性')
            }
        }
    },
    ready() {
        if(!this.properties.lazy)
            this.reload()
    }
})
