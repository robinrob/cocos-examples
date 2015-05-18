var rss = rss || {}

rss.chipmunk = "chipmunk"
rss.box2D = "box2d"
//rss.physics = rss.box2D
rss.physics = rss.chipmunk

switch(rss.physics) {
    case rss.chipmunk:
        rss.gravity = -35
        break;
    case rss.box2D:
        rss.gravity = new Box2D.Common.Math.b2Vec2(0, -350);
        break;
}

rss.groundHeight = 10

rss.star = {
    width: 100,
    height: 100,
    mass: 1
}

rss.exampleMan = {
    acc: 200,
    gravity: -350
}

rss.exampleCar = {
    impulse: 5,
    gravity: -350
}

rss.exampleSpaceship = {
    gravity: -700
}

rss.spaceship = {
    mass: 100,
    acc: 3000
}

rss.colors = {
    yellow: new cc.color(255, 255, 0, 255),
    green: new cc.color(0, 255, 0, 255),
    purple: new cc.color(174, 0, 255, 255),
    red: new cc.color(255, 0, 0, 255),
    pink: new cc.color(255, 0, 255, 255),
    orange: new cc.color(255, 78, 0, 255),
    maroon: new cc.color(172, 6, 84, 255),
    brown: new cc.color(145, 58, 6, 255),
    blue: new cc.color(6, 87, 234, 255),
    black: new cc.color(0, 0, 0, 255),
    white: new cc.color(255, 255, 255, 255)
}

rss.g = {
    buttonOuterColor: rss.colors.orange,
    buttonInnerColor: rss.colors.green,
    buttonTextColor: rss.colors.orange
}

rss.tagOfLayer = {
    Animation: 1
}

rss.tag = {
    man: 0
}

rss.res = {
    spritesheet_png : "res/spritesheet.png",
    spritesheet_plist : "res/spritesheet.plist"
}

// Resources for pre-loading
rss.resources = []
for (var i in rss.res) {
    rss.resources.push(rss.res[i])
}

// Used by keyboard listeners
rss.keys = []


/* Object configs */

// Ball
var ball = {}
rss.ball = ball

ball.mass = 100


// Man
//rss.man2 = new (function() {
//    this.scale = 2.0
//
//    this.leg = {
//        width: 10 * this.scale,
//        height: 40 * this.scale,
//        mass: 16
//    }
//
//    this.crotch = {
//        width: 5 * this.scale,
//        height: 5 * this.scale,
//        mass: 5
//    }
//
//    this.torso = {
//        width: 2 * this.leg.width + this.crotch.width,
//        height: this.torso.width,
//        mass: 20
//    }
//
//    this.arm = {
//        width: 5 * this.scale,
//        height: 30 * this.scale,
//        mass: 6
//    }
//
//    this.armpit = {
//        width: 5 * this.scale
//    }
//
//    this.neck = {
//        width: 5 * this.scale,
//        height: 5 * this.scale
//    }
//
//    this.head = {
//        width: 20 * this.scale,
//        height: 20 * this.scale,
//        mass: 20
//    }
//
//    this.comps = [this.leg, this.seat, this.back]
//    this.width = rss.sumAttr('width', this.comps)
//    this.height = rss.sumAttr('height', this.comps)
//    this.mass = rss.sumAttr('mass', this.comps)
//})()

var man = {}
rss.man = man

var width = {}
man.width = width
width.leg = 10
width.crotch = 5
width.arm = 5
width.armpit = 5
width.torso = 2 * width.leg + width.crotch
width.head = 20
width.total = rss.sum(width)

var height = {}
man.height = height
height.leg = 40
height.crotch = 5
height.arm = 30
height.torso = width.torso
height.neck = 5
height.head = width.head
height.total = rss.sum(height)

var mass = {}
man.mass = mass
mass.leg = 16
mass.arm = 6
mass.torso = 20
mass.head = 8
mass.total = rss.sum(mass)

var y = {}
man.y = y
y.shoulder = height.leg + height.torso

// Car
var car = {}
rss.car = car

var width = {}
car.width = width
width.wheel = 30
width.bonnet = 20
width.body = 60
width.chassis = width.bonnet + width.body
width.total = width.chassis

var height = {}
car.height = height
height.wheel = width.wheel
height.bonnet = 20
height.body = 40
height.chassis = 10

var mass = {}
car.mass = mass
mass.wheel = 10
mass.bonnet = 20
mass.body = 40
mass.chassis = 20

// Chair
rss.chair = function() {
    this.scale = 1.0

    // Dimensions
    this.leg = {
        width: 10 * this.scale,
        height: 40 * this.scale,
        mass: 20
    }

    this.seat = {
        width: 40 * this.scale,
        height: 10 * this.scale,
        mass: 50
    }

    this.back ={
        width: 10 * this.scale,
        height: 35 * this.scale,
        mass: 5
    }

    // Positions
    this.leg.left = {
        pos: cc.p(
            -this.seat.width / 2 + this.leg.width / 2,
            this.leg.height / 2
        ),
        joint: cc.p(
            0,
            this.leg.height / 2 - this.seat.height / 2
        )
    }

    this.leg.right = {
        pos: cc.p(
            this.seat.width / 2 - this.leg.width / 2,
            this.leg.height / 2
        ),
        joint: cc.p(
            0,
            this.leg.height / 2 - this.seat.height / 2
        )
    }

    this.seat.pos = cc.p(
        0,
        this.leg.height - this.seat.height / 2
    )

    this.back.pos = cc.p(
        -this.seat.width / 2 + this.leg.width / 2,
        this.leg.height - this.seat.height + this.back.height / 2
    )
    this.back.joint = cc.p(
        0,
        -this.back.height / 2 + this.seat.height / 2
    )

    // Collective chair scalar quantities
    this.comps = [this.leg, this.seat, this.back]
    this.width = this.seat.width
    this.height = this.leg.height - this.seat.height + this.back.height
    this.mass = rss.sumAttr('mass', this.comps)
}