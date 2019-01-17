import _ from '../../js/app-mp'

// component/w-form/w-form.js
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    relations: {
        '../w-form-item/w-form-item': {
            type: 'child',
            linked(tar) {
                let children = this.data.$children;
                children.push(tar);
                this.setData({
                    $children: children
                });
                // console.log(this.data.$children)
            },
            linkChanged(tar) {},
            unlinked(tar) {
                let children = this.data.$children;
                children.splice(tar, 1);
                this.setData({
                    $children: children
                });
            },
        }
    },
    /**
     * 组件的属性列表
     */
    properties: {
        value: {
            type: Object,
            value: {},
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
        $children: [],
        model: {}
    },

    /**
     * 组件的方法列表
     */
    methods: {
        submit() {
            this.validate((res) => {
                if(res) {
                    this.triggerEvent('submit')
                }
            })
        },
        chainItem(obj) {
            var type = obj.type,
            reg = obj.reg,
            target = obj.target,
            next = obj.next;

            if(target.dataset[type]) {
                if(!reg.test(this.data.model[target.properties.prop])){
                    target.setData({
                        error: target.properties.label + '格式错误'
                    });
                    return false;
                };
            }
            next();
        },
        validate(callback) {
            var that = this;

            var res = true;

            this.data.$children.forEach(function(item){
                new _.Chain().link(function(obj,next) {
                    obj.setData({
                        error: null
                    })
                    next();
                }).link(function(obj, next) {
                    if(obj.dataset.required) {
                        if(!that.data.model[obj.properties.prop]){
                            obj.setData({
                                error: obj.properties.label + '必填'
                            })
                            res = false;
                        }
                    };
                    next();
                }).link(function(obj, next){
                    if(that.chainItem({
                        type: 'mobile',
                        reg: /^[1][0-9]{10}$/,
                        target: obj,
                        next: next,
                    }) === false) res=false;
                }).link(function(obj, next){
                    if(that.chainItem({
                        type: 'mail',
                        reg: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                        target: obj,
                        next: next,
                    }) === false) res=false;
                }).link(function(obj, next){
                    if(that.chainItem({
                        type: 'mobile',
                        reg: /^1\d{10}$/,
                        target: obj,
                        next: next,
                    }) === false) res=false;
                }).run(item);
            })

            callback(res);
        },
    }
})
