
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    start () {

    },

    initCallBack(boolean, callback){
        this.boolean = boolean,
        this.callback = callback;
    },

    touchEvent(){
        this.callback(this.boolean);
    },

    // update (dt) {},
});
