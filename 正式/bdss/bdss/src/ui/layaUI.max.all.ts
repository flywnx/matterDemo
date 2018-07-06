
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class GameViewUI extends View {
		public target:Laya.Image;
		public dao:Laya.Image;
		public touchImg:Laya.Sprite;
		public c1:Laya.Image;
		public c2:Laya.Image;
		public c31:Laya.Image;
		public c32:Laya.Image;
		public c33:Laya.Image;
		public c34:Laya.Image;
		public c35:Laya.Image;
		public c36:Laya.Image;
		public c37:Laya.Image;
		public c38:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"width":750,"skin":"game/bg.jpg","height":1334},"child":[{"type":"Image","props":{"y":360,"x":680,"width":62,"var":"target","skin":"game/target.png","name":"target","height":164}},{"type":"Image","props":{"y":880,"x":110,"width":38,"visible":false,"var":"dao","skin":"dao/dao.png","name":"dao","height":127}},{"type":"Sprite","props":{"y":0,"x":0,"width":750,"visible":false,"var":"touchImg","height":1334,"alpha":0.7},"child":[{"type":"Image","props":{"y":261,"x":453,"var":"c1","skin":"game/c1.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":648,"x":63,"var":"c2","skin":"game/c2.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":619,"x":91,"var":"c31","skin":"game/c3.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":588,"x":126,"var":"c32","skin":"game/c3.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":548,"x":174,"var":"c33","skin":"game/c3.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":520,"x":207,"var":"c34","skin":"game/c3.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":485,"x":251,"var":"c35","skin":"game/c3.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":441,"x":297,"var":"c36","skin":"game/c3.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":393,"x":344,"var":"c37","skin":"game/c3.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":333,"x":396,"var":"c38","skin":"game/c3.png","anchorY":0.5,"anchorX":0.5}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameViewUI.uiView);

        }

    }
}
