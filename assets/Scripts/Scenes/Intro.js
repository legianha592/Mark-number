

cc.Class({
    extends: cc.Component,

    properties: {
        btn_confirm: cc.Node
    },

    confirm(){
        cc.director.loadScene("Playscene");
    },

    start () {

    },

    // update (dt) {},
});
