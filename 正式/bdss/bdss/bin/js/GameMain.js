var Sprite = Laya.Sprite;
var Stage = Laya.Stage;
var Render = Laya.Render;
var Browser = Laya.Browser;
var WebGL = Laya.WebGL;
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(750, 1334);
        Laya.stage.alignV = Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Stage.ALIGN_CENTER;
        Laya.stage.addChild(new GameView());
    }
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=GameMain.js.map