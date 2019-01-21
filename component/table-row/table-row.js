// component/table-row/table-row.js
Component({
    relations: {
        '../table-row/table-con': {
            type: 'parent',
            linked(tar) {
                this.setData({
                    $parent: tar
                });
            },
            linkChanged(tar) {},
            unlinked(tar) {},
        }
    },
    /**
     * 组件的属性列表
     */
    properties: {
        label: {
            type: String,
            value: ''
        },
        prop: {
            type: String,
            value: ''
        },
        labelWidth: {
            type: String,
            value: 'auto'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        $parent: []
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
