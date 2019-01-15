import _ from '../../js/app-mp'

// component/nav-item/nav-item.js
Component({
    relations: {
        '../navbar/navbar': {
            type: 'parent',
            linked(tar) {
                this.setData({
                    $parent: tar,
                    $slotIndex: tar.data.$children.indexOf(this)
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
        name: {
            type: String,
            value: ''
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        $parent: {},
        activeIndex: 0,
        $slotIndex: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
