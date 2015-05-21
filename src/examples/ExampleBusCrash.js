var ExampleBusCrash = {
    Layer: BaseLayer.extend({
        ctor: function (space) {
            this._super()
            this.r.space = space

            //this._debugNode = new cc.PhysicsDebugNode(this.r.space)
            //this._debugNode.setVisible(true)
            //Parallax ratio and offset
            //this.addChild(this._debugNode, 10)

            this.init()
        },

        init: function () {
            this._super()

            cc.spriteFrameCache.addSpriteFrames(rss.res.spritesheet_plist)

            // Create the button
            var button = new ccui.Button()
            button.setTouchEnabled(true)
            button.loadTextures("animationbuttonnormal.png", "animationbuttonpressed.png", "", ccui.Widget.PLIST_TEXTURE)
            button.setScale(3.0)
            button.setPosition(rss.p.add(rss.top(), cc.p(-150, -300)))
            button.addTouchEventListener(this.crash, this)
            this.addChild(button)

            var button = new ccui.Button()
            button.setTouchEnabled(true)
            button.loadTextures("animationbuttonnormal.png", "animationbuttonpressed.png", "", ccui.Widget.PLIST_TEXTURE)
            button.setScale(3.0)
            button.setPosition(rss.p.add(rss.top(), cc.p(150, -300)))
            button.addTouchEventListener(function() {
                setTimeout(function(){
                    var scene = cc.director.getRunningScene()
                    cc.director.pause()
                    cc.director.runScene(new ExampleBusCrash.Scene())
                    cc.director.resume()
                },100)
            }, this)
            button.setLocalZOrder(100)
            this.addChild(button)

            var box = rss.Box.create({
                pos: rss.center(),
                size: rss.winsize(),
                color: rss.colors.red,
                thickness: 50
            }).addToSpace(this.r.space)
            box.setFriction(1.0)
            this.addChild(box)

            this.r.items = []
            this.r.chairs = []
            this.r.men = []

            this.addChairDog(2)
            this.addChairMan(4)
            this.addChairMan(6)

            this.r.shouldStep = false
        },

        addChairMan: function(x) {
            var chair = Chair.create({
                pos: cc.p(),
                scale: 3.0,
                color: rss.colors.blue
            })
            chair.setPos(cc.p(x * chair.getWidth(), 118))
            chair.setFriction(1.0)
            this.addChair(chair)

            var man = SidewaysMan.create({
                pos: rss.p.add(chair.getPos(), cc.p(8, 72)),
                scale: 2.0
            })
            man.setFriction(1.0)
            this.addMan(man)
        },

        addChairDog: function(x) {
            var chair = Chair.create({
                pos: cc.p(),
                scale: 3.0,
                color: rss.colors.yellow
            })
            chair.setPos(cc.p(x * chair.getWidth(), 118))
            chair.setFriction(1.0)
            this.addChair(chair)

            var dog = Dog.create({
                pos: rss.p.add(chair.getPos(), cc.p(35, 78)),
                scale: 1.0
            })
            dog.setFriction(1.0)
            this.addMan(dog)
        },

        addChair: function(chair) {
            chair.setGroup(this.r.chairs.length + 1)
            this.r.chairs.push(chair)
            this.addItem(chair)
        },

        addMan: function(man) {
            man.setGroup(999 - this.r.men.length)
            this.r.men.push(man)
            this.addItem(man)
        },

        addItem: function(item) {
            item.addToSpace(this.r.space)
            this.addChild(item)
            this.r.items.push(item)
            item.draw()
            return item
        },

        crash: function(evt) {
            this.r.shouldStep = true
            this.r.items.forEach(function(item) {
                item.applyImpulse(cc.p(5000, 0))
            })
        },

        update: function(dt) {
            if (this.r.shouldStep == true) {
                this.r.space.step(dt)
                this.r.items.forEach(function (item) {
                    item.draw()
                })
            }
        }
    }),

    Scene: BaseScene.extend({
        onEnter:function () {
            cc.log("Scene.onEnter ...")
            this._super()

            this.r.space = new cp.Space()
            this.r.space.gravity = cp.v(0, rss.gravity)

            this.r.layer = new ExampleBusCrash.Layer(this.r.space)
            this.addChild(this.r.layer)

            this.scheduleUpdate()
        },

        update: function(dt) {
            this.r.layer.update(dt)
        }
    })
}