var sliderWidth = 96;

Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    relations: {
        '../nav-item/nav-item': {
            type: 'child',
            linked(tar) {
                let children = this.data.$children;
                children.push(tar);
                this.setData({
                    $children: children,
                    tabs: children.map((item) => {
                        return item.properties.label
                    }),
                    names: children.map((item) => {
                        return item.properties.name
                    }),
                });

                this.setDefaultActive(this.properties.value);
                this.calcWidth();
            },
            linkChanged(tar) {},
            unlinked(tar) {
                let children = this.data.$children;
                children.splice(tar, 1);
                this.setData({
                    $children: children,
                    tabs: children.map((item) => {
                        return item.properties.label
                    }),
                    names: children.map((item) => {
                        return item.properties.name
                    }),
                });

                this.setDefaultActive(this.properties.value);
                this.calcWidth();
            },
        }
    },
    /**
     * 组件的属性列表
     */
    properties: {
        value: {
            type: String,
            value: '',
            observer(n, o) {
                this.setDefaultActive(n);
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        $children: [],
        tabs: [],
        names: [],

        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        tabClick: function (e) {
            this.setData({
                sliderOffset: e.currentTarget.offsetLeft,
                activeIndex: e.currentTarget.id
            });

            this.setChildrenActive(e.currentTarget.id);
        },
        calcWidth() {
            var that = this;
            wx.getSystemInfo({
                success: function(res) {
                    that.setData({
                        sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                        sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                    });
                }
            });
        },
        setChildrenActive(val) {
            this.data.$children.forEach(function(item) {
                item.setData({
                    activeIndex: Number(val)
                })
            })
        },
        setDefaultActive(val) {
            if(val){
                this.setData({
                    activeIndex: this.data.names.indexOf(val)
                });
                this.setChildrenActive(this.data.names.indexOf(val));
            }
        }
    },

    attached() {

    }
})
