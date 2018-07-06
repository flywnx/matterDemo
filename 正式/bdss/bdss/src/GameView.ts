
class GameView extends ui.GameViewUI {

    private Matter: any = Browser.window.Matter;
    private LayaRender: any = Browser.window.LayaRender;


    // 引擎
    private Engine = Browser.window.Matter.Engine;
    // // 渲染
    // private Render = Browser.window.Matter.Render;
    // 运动
    private Runner = Browser.window.Matter.Runner;
    // 鼠标约束
    private MouseConstraint = Browser.window.Matter.MouseConstraint;
    // 鼠标
    private Mouse = Browser.window.Matter.Mouse;
    // 世界
    private World = Browser.window.Matter.World;
    // 主体配置
    private Bodies = Browser.window.Matter.Bodies;
    // 操纵体模型
    private Body = Browser.window.Matter.Body;
    // 复合材料
    private Composites = Browser.window.Matter.Composites;
    // 约束
    private Constraint = Browser.window.Matter.Constraint;
    // 事件
    private Events = Browser.window.Matter.Events;
    // 向量
    private Vector = Browser.window.Matter.Vector;


    private mouseConstraint: any;
    private engine: any;
    private matterObj: any;
    private touchCoordinate = { x: 0, y: 0 }
    constructor() {
        super();


        this.matterObj = this.matter();
        // Laya.stage.on(Laya.Event.CLICK, this, this.jt)
        this.on(Laya.Event.MOUSE_DOWN, this, this.MouseDown)
        this.on(Laya.Event.MOUSE_MOVE, this, this.MouseMove)
        this.on(Laya.Event.MOUSE_UP, this, this.MouseUp)
    }
    // 鼠标按下
    private MouseDown(e): void {
        console.log(e);
        this.touchCoordinate = { x: e.stageX, y: e.stageY }
        this.touchImg.visible = true;
        this.c1.x = e.stageX
        this.c1.y = e.stageY
        this.c2.x = e.stageX
        this.c2.y = e.stageY
        for (let i = 1; i < 9; i++) {
            this[`c3${i}`].x = e.stageX
            this[`c3${i}`].y = e.stageY
        }
    }
    // 鼠标移动
    private MouseMove(e): void {
        this.c1.x = e.stageX
        this.c1.y = e.stageY
        for (let i = 1; i < 9; i++) {
            this[`c3${i}`].x = e.stageX + (this.touchCoordinate.x - e.stageX) / 9 * i
            this[`c3${i}`].y = e.stageY + (this.touchCoordinate.y - e.stageY) / 9 * i
        }

    }
    // 鼠标抬起
    private MouseUp(e): void {
        this.touchImg.visible = false
        Laya.stage.on(Laya.Event.CLICK, this, this.jt,[(e.stageX-this.touchCoordinate.x),(e.stageY-this.touchCoordinate.y)])
    }
    // 物理建模
    private matter(): Object {
        // 状态变量
        let firstCollision = 0


        // 创建引擎,世界
        let engine = this.Engine.create(),
            world = engine.world
        // 渲染世界
        let render = this.LayaRender.create({
            element: document.body,
            engine: engine,
            options: {
                width: 750,
                height: 1334,
                // 速度显示
                // showVelocity: true
            }
        })
        // 执行渲染
        this.LayaRender.run(render);

        //创建动作
        var runner = this.Runner.create();
        this.Runner.run(runner, engine);
        // 添加物体

        // 刀竖柄
        var Hilt2 = this.Bodies.rectangle(140, 895, 10, 20, {
            id: 'Hilt2',
        })
        // 刀横柄
        var Hilt1 = this.Bodies.rectangle(140, 910, 30, 10, {
            id: 'Hilt1',
        })

        // 刀身
        var knife = this.Bodies.rectangle(140, 955, 10, 80, {
            id: 'knife',
        })
        // 刀尖
        var knifeTip = this.Bodies.rectangle(140, 1000, 10, 10, {
            id: 'knifeTip',
        })
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
            // angle: 0,
            // frictionAir: 2,//空气摩擦力
            // friction: 0.0001,//摩擦系数
            // frictionStatic: 1,
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
        let mouse = this.Mouse.create(render.canvas),
            mouseConstraint = this.MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    // 刚度
                    stiffness: 1,
                    render: {
                        // visible: true
                    }
                }
            })

        // 碰撞开始监听
        this.Events.on(engine, 'collisionStart', (event) => {
            if (firstCollision > 0) {
                return
            }
            firstCollision++
            let pairs = [...event.pairs]


            pairs.forEach((item) => {
                console.log(item.id);
                let cs = item[`id`].split('_')
                // 刀与靶碰撞，刀就静止
                if (cs[0] == 'knifeTip' && cs[1] == 'target') {
                    knifeAll.isSleeping = true
                }
            })




        })
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
    }
    private jt(x,y): void {
        console.log(`画布被点击`);
        // 唤醒刀
        this.matterObj.engine.world.bodies[0].isSleeping = false
        // 设定角速度
        this.Body.setAngularVelocity(this.matterObj.engine.world.bodies[0], 0.4*(Math.abs(x)/750));
        // 设置线速度   
        this.Body.setVelocity(this.matterObj.engine.world.bodies[0], this.Vector.create(50*(Math.abs(x)/750), -90*(Math.abs(y)/1334)));
        Laya.stage.off(Laya.Event.CLICK, this, this.jt)
    }

}