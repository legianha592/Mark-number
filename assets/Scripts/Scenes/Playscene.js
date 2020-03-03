
cc.Class({
    extends: cc.Component,

    properties: {
        time_progress: cc.ProgressBar,
        box_outside: cc.Node,
        box_inside: cc.Node,
        item_box: cc.Prefab,
        time_lbl: cc.Label,
        time: 60,
        real_time: 60,
        delta_time: 0,
        level: 1,
    },

    start () {
        cc.log("time = ", this.time_progress);
        this.reloadMap();
    },

    reloadMap(){
        this.box_inside.removeAllChildren();
        var number_square;
        if (this.level<12){
            number_square = this.level+1;
        }
        else{
            number_square = 12;
        }
        this.box_outside.height = number_square*this.item_box.height+15;
        this.box_outside.width = number_square*this.item_box.height+15;

        var color = []
        for (var i=0; i<3; i++){
            var number = Math.floor(Math.random() * 255);
            color.push(number);
        }
        var random_x = Math.floor(Math.random() *number_square);
        var random_y = Math.floor(Math.random() *number_square)
        for (var i=0; i<number_square; i++){
            for (var j=0; j<number_square; j++){
                var item = cc.instantiate(this.item_box);
                var boolean = false;
                if (random_x === i && random_y === j){
                    var delta_color;
                    if(this.level<30){
                        delta_color = this.level;
                    }
                    else{
                        delta_color = 30;
                    }
                    item.getChildByName("main_color").color = new cc.Color (color[0]-100+3*delta_color, color[1]-100+3*delta_color, color[2]-100+3*delta_color);
                    boolean = true;
                }
                else{
                    item.getChildByName("main_color").color = new cc.Color (color[0], color[1], color[2]); 
                }
                var comp = item.getComponent("Itembox");
                var self = this;
                comp.initCallBack(boolean, function(callback){
                    self.calculate(callback);
                })
                var pos_i = (-number_square/2+0.5+i)*item.width;
                var pos_j = (-number_square/2+0.5+j)*item.height;
                item.x = pos_i;
                item.y = pos_j;

                this.box_inside.addChild(item);
            }
        }

    },

    calculate(boolean){
        if (boolean == true){
            this.level++;
            this.time += 3;
            this.real_time +=3;
            this.reloadMap();
        }
        else{
            this.time -= 10;
            this.real_time -= 10;
            this.reloadMap();
        }
    },

    update (dt) {
        this.delta_time += dt;
        if (this.delta_time >1){
            this.time--;
            this.delta_time = 0;
        }
        this.real_time -= dt;
        this.setTimer();
    },

    setTimer(){
        this.time_lbl.string = String(this.time);
        this.time_progress.progress = this.real_time/60;
        if (this.real_time>30){
            this.time_progress.node.getChildByName("bar").color = new cc.Color (255-255*(this.real_time-30)/30, 255, 0);
        }
        else{
            this.time_progress.node.getChildByName("bar").color = new cc.Color (255, 255*(this.real_time/30), 0);
        }
    }
});
