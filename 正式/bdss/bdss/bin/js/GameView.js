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
var GameView = /** @class */ (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this) || this;
        _this.Matter = Browser.window.Matter;
        _this.LayaRender = Browser.window.LayaRender;
        // 引擎
        _this.Engine = Browser.window.Matter.Engine;
        // // 渲染
        // private Render = Browser.window.Matter.Render;
        // 运动
        _this.Runner = Browser.window.Matter.Runner;
        // 鼠标约束
        _this.MouseConstraint = Browser.window.Matter.MouseConstraint;
        // 鼠标
        _this.Mouse = Browser.window.Matter.Mouse;
        // 世界
        _this.World = Browser.window.Matter.World;
        // 主体配置
        _this.Bodies = Browser.window.Matter.Bodies;
        // 操纵体模型
        _this.Body = Browser.window.Matter.Body;
        // 复合材料
        _this.Composites = Browser.window.Matter.Composites;
        // 约束
        _this.Constraint = Browser.window.Matter.Constraint;
        // 事件
        _this.Events = Browser.window.Matter.Events;
        // 向量
        _this.Vector = Browser.window.Matter.Vector;
        _this.touchCoordinate = { x: 0, y: 0 };
        _this.matterObj = _this.matter();
        // Laya.stage.on(Laya.Event.CLICK, this, this.jt)
        _this.on(Laya.Event.MOUSE_DOWN, _this, _this.MouseDown);
        _this.on(Laya.Event.MOUSE_MOVE, _this, _this.MouseMove);
        _this.on(Laya.Event.MOUSE_UP, _this, _this.MouseUp);
        return _this;
    }
    // 鼠标按下
    GameView.prototype.MouseDown = function (e) {
        console.log(e);
        this.touchCoordinate = { x: e.stageX, y: e.stageY };
        this.touchImg.visible = true;
        this.c1.x = e.stageX;
        this.c1.y = e.stageY;
        this.c2.x = e.stageX;
        this.c2.y = e.stageY;
        for (var i = 1; i < 9; i++) {
            this["c3" + i].x = e.stageX;
            this["c3" + i].y = e.stageY;
        }
    };
    // 鼠标移动
    GameView.prototype.MouseMove = function (e) {
        this.c1.x = e.stageX;
        this.c1.y = e.stageY;
        for (var i = 1; i < 9; i++) {
            this["c3" + i].x = e.stageX + (this.touchCoordinate.x - e.stageX) / 9 * i;
            this["c3" + i].y = e.stageY + (this.touchCoordinate.y - e.stageY) / 9 * i;
        }
    };
    // 鼠标抬起
    GameView.prototype.MouseUp = function (e) {
        this.touchImg.visible = false;
        Laya.stage.on(Laya.Event.CLICK, this, this.jt, [(e.stageX - this.touchCoordinate.x), (e.stageY - this.touchCoordinate.y)]);
    };
    // 物理建模
    GameView.prototype.matter = function () {
        // 状态变量
        var firstCollision = 0;
        // 创建引擎,世界
        var engine = this.Engine.create(), world = engine.world;
        // 渲染世界
        var render = this.LayaRender.create({
            element: document.body,
            engine: engine,
            options: {
                width: 750,
                height: 1334,
            }
        });
        // 执行渲染
        this.LayaRender.run(render);
        //创建动作
        var runner = this.Runner.create();
        this.Runner.run(runner, engine);
        // 添加物体
        // 刀竖柄
        var Hilt2 = this.Bodies.rectangle(140, 895, 10, 20, {
            id: 'Hilt2',
        });
        // 刀横柄
        var Hilt1 = this.Bodies.rectangle(140, 910, 30, 10, {
            id: 'Hilt1',
        });
        // 刀身
        var knife = this.Bodies.rectangle(140, 955, 10, 80, {
            id: 'knife',
        });
        // 刀尖
        var knifeTip = this.Bodies.rectangle(140, 1000, 10, 10, {
            id: 'knifeTip',
        });
        // 整刀
        var knifeAll = this.Body.create({
            id: 'knifeAll',
            parts: [Hilt1, Hilt2, knife, knifeTip],
            stiffness: 1,
            restitution: 0.3,
            collisionFilter: {
                category: 3,
            },
            isSleeping: true,
            render: {
                sprite: { texture: "dao/dao.png", xOffset: 19, yOffset: 63 }
            },
        });
        // 树桩
        var tree = this.Bodies.rectangle(140, 1040, 100, 70, {
            id: 'tree',
            isStatic: true,
            stiffness: 1,
            collisionFilter: {
                category: 1,
            },
            // 地面角度
            angle: -0.1,
        });
        // 靶子
        var target = this.Bodies.rectangle(720, 440, 30, 164, {
            id: 'target',
            stiffness: 1,
            collisionFilter: {
                category: 2,
            }, isStatic: true
        });
        // 杆子
        var pole = this.Bodies.rectangle(720, 660, 20, 800, {
            id: 'pole',
            isStatic: true,
            stiffness: 1,
            collisionFilter: {
                category: 1,
            },
        });
        // 地面
        var ground = this.Bodies.rectangle(400, 1060, 800, 20, {
            id: 'ground',
            isStatic: true,
            stiffness: 1,
            collisionFilter: {
                category: 1,
            },
            // 摩擦力
            friction: 0.8,
            // 地面角度
            angle: -0.1,
        });
        // 为世界添加物体
        this.World.add(world, [knifeAll, tree, ground, target, pole]);
        // 初始化鼠标控制
        var mouse = this.Mouse.create(render.canvas), mouseConstraint = this.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                // 刚度
                stiffness: 1,
                render: {}
            }
        });
        // 碰撞开始监听
        this.Events.on(engine, 'collisionStart', function (event) {
            if (firstCollision > 0) {
                return;
            }
            firstCollision++;
            var pairs = event.pairs.slice();
            pairs.forEach(function (item) {
                console.log(item.id);
                var cs = item["id"].split('_');
                // 刀与靶碰撞，刀就静止
                if (cs[0] == 'knifeTip' && cs[1] == 'target') {
                    knifeAll.isSleeping = true;
                }
            });
        });
        // // 设定角速度
        // Body.setAngularVelocity(knifeAll, 0.15);
        // // 设置线速度   
        // Body.setVelocity(knifeAll, Vector.create(15, -11));
        // 添加鼠标控制
        // World.add(world, mouseConstraint);
        //  保持鼠标与渲染同步
        render.mouse = mouse;
        // 将渲染视口安装到场景中
        // Render.lookAt(render, {
        //   min: { x: 0, y: 0 },
        //   max: { x: 800, y: 600 }
        // });
        return {
            engine: engine,
            runner: runner,
            render: render,
            canvas: render.canvas,
            stop: function () {
                this.Matter.Render.stop(render);
                this.Matter.Runner.stop(runner);
            }
        };
    };
    GameView.prototype.jt = function (x, y) {
        console.log("\u753B\u5E03\u88AB\u70B9\u51FB");
        // 唤醒刀
        this.matterObj.engine.world.bodies[0].isSleeping = false;
        // 设定角速度
        this.Body.setAngularVelocity(this.matterObj.engine.world.bodies[0], 0.4 * (Math.abs(x) / 750));
        // 设置线速度   
        this.Body.setVelocity(this.matterObj.engine.world.bodies[0], this.Vector.create(50 * (Math.abs(x) / 750), -90 * (Math.abs(y) / 1334)));
        Laya.stage.off(Laya.Event.CLICK, this, this.jt);
    };
    return GameView;
}(ui.GameViewUI));
//# sourceMappingURL=GameView.js.map