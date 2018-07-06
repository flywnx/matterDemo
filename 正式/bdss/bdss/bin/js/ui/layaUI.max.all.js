var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var GameViewUI = /** @class */ (function (_super) {
        __extends(GameViewUI, _super);
        function GameViewUI() {
            return _super.call(this) || this;
        }
        GameViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameViewUI.uiView);
        };
        GameViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 750, "skin": "game/bg.jpg", "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 360, "x": 680, "width": 62, "var": "target", "skin": "game/target.png", "name": "target", "height": 164 } }, { "type": "Image", "props": { "y": 880, "x": 110, "width": 38, "visible": false, "var": "dao", "skin": "dao/dao.png", "name": "dao", "height": 127 } }, { "type": "Sprite", "props": { "y": 0, "x": 0, "width": 750, "visible": false, "var": "touchImg", "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 261, "x": 453, "var": "c1", "skin": "game/c1.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 648, "x": 63, "var": "c2", "skin": "game/c2.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 619, "x": 91, "var": "c31", "skin": "game/c3.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 588, "x": 126, "var": "c32", "skin": "game/c3.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 548, "x": 174, "var": "c33", "skin": "game/c3.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 520, "x": 207, "var": "c34", "skin": "game/c3.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 485, "x": 251, "var": "c35", "skin": "game/c3.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 441, "x": 297, "var": "c36", "skin": "game/c3.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 393, "x": 344, "var": "c37", "skin": "game/c3.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 333, "x": 396, "var": "c38", "skin": "game/c3.png", "anchorY": 0.5, "anchorX": 0.5 } }] }] }] };
        return GameViewUI;
    }(View));
    ui.GameViewUI = GameViewUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map