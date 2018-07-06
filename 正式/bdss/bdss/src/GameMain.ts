
import Sprite = Laya.Sprite;
import Stage = Laya.Stage;
import Render = Laya.Render;
import Browser = Laya.Browser;
import WebGL = Laya.WebGL;

class GameMain {
    constructor() {
        Laya.init(750, 1334);

        Laya.stage.alignV = Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Stage.ALIGN_CENTER;
        Laya.stage.addChild(new GameView())
    }

}
new GameMain()