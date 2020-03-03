
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
        display_point: 0,
        point: 0,
        point_time: 10,
        level_lbl: cc.Label,
        point_lbl: cc.Label,
        display_point_lbl: cc.Label,
    },

    start () {
        cc.log("time = ", this.time_progress);
        this.reloadMap();
    },

    reloadMap(){


        this.box_inside.removeAllChildren();
        this.level_lbl.string = "Level "+this.level;
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
            this.displayPoint();
            this.reloadMap();
        }
        else{
            this.time -= 10;
            this.real_time -= 10;
            this.point_time = 10;
            this.reloadMap();
        }
    },

    update (dt) {
        this.delta_time += dt;
        if (this.delta_time >1){
            this.time--;
            this.point_time--;
            this.delta_time = 0;
        }
        this.real_time -= dt;
        if (this.real_time>0){
            this.setTimer();
        }
        else{
            this.endGame();
        }
    },

    displayPoint(){
        this.point += this.point_time;
        this.point_lbl.string = String(this.point);
        this.display_point_lbl.node.y = 360;
        this.display_point_lbl.string = "+"+this.point_time;
        this.display_point_lbl.node.runAction(
            cc.sequence(
                cc.fadeIn(0.1),
                cc.moveBy(0.5, cc.v2(0, 50)),
                cc.fadeOut(0.1)
            )
        );

        this.point_time = 10;
    },

    endGame(){
        
    },

    setTimer(){
        this.time_lbl.string = String(this.time);
        this.time_progress.progress = this.real_time/60;
        if (this.real_time>30){
            var time;
            if (this.real_time>60){
                time = 60
            }
            this.time_progress.node.getChildByName("bar").color = new cc.Color (255-255*(time-30)/30, 255, 0);
        }
        else{
            this.time_progress.node.getChildByName("bar").color = new cc.Color (255, 255*(this.real_time/30), 0);
        }
    }
});
