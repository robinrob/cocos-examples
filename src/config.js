var rss = rss || {}
rss.ui = rss.ui || {}

rss.physics = rss.chipmunk

switch(rss.physics) {
    case rss.chipmunk:
        rss.gravity = -350
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

rss.ui.buttonOuterColor = rss.colors.orange
rss.ui.buttonInnerColor = rss.colors.green
rss.ui.buttonTextColor = rss.colors.orange

rss.tagOfLayer = {
    Animation: 1
}

rss.tag = {
    // Note that when tag is used for collision group, 0 means all objects with that tag DO collide (in Chipmunk)
    player: 1,
    man: 999,
    chair: 3
}

rss.res = {
    spritesheet_png : "res/spritesheet.png",
    spritesheet_plist : "res/spritesheet.plist",

    spaceship_ogg: "res/background.ogg"
    //spaceship_ogg: "res/delta_iv.wav"
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
rss.man = new (function() {
    this.acc = 600,
    this.gravity = -350

    this.leg = {
        width: 10,
        height: 40,
        mass: 16,
        color: rss.colors.green
    }

    this.crotch = {
        width: 5,
        height: 5,
        mass: 0
    }

    this.torso = {
        width: 2 * this.leg.width + this.crotch.width,
        height: 2 * this.leg.width + this.crotch.width,
        mass: 20,
        color: rss.colors.orange
    }

    this.arm = {
        width: 5,
        height: 30,
        mass: 6,
        color: rss.colors.yellow
    }

    this.armpit = {
        width: 5,
        mass: 0
    }

    this.neck = {
        width: 5,
        height: 5,
        mass: 0
    }

    this.head = {
        width: 20,
        height: 20,
        mass: 8,
        color: rss.colors.pink
    }

    this.leg.left = {
        pos: cc.p(-1 * (this.leg.width + this.crotch.width) / 2, this.leg.height / 2)
    }

    this.leg.right = {
        pos: cc.p(-1 * this.leg.left.pos.x, this.leg.left.pos.y)
    }

    this.torso.pos = cc.p(0, this.leg.height + this.crotch.height + this.torso.width / 2)

    this.arm.left = {
        pos: cc.p(
            -1 * (this.torso.width + this.armpit.width + this.arm.width) / 2,
            this.torso.pos.y + this.torso.height / 2 - this.arm.height / 2
        )
    }

    this.arm.right = {
        pos: cc.p(
            -1 * this.arm.left.pos.x,
            this.arm.left.pos.y
        )
    }

    this.head.pos = rss.p.addY(this.torso.pos, this.torso.height / 2 + this.neck.height + this.head.height / 2)

    // Aggregate attributes
    this.width = 2 * (this.arm.width + this.armpit.width) + this.torso.width
    this.height = rss.sumAttr('height', [this.leg, this.crotch, this.torso, this.neck, this.head])
    this.mass = rss.sumAttr('mass', [this.leg, this.crotch, this.torso, this.arm, this.armpit, this.neck, this.head])
    this.size = cc.size(this.width, this.height)
})()

// Sideways Man
rss.sideMan = new (function() {
    // Aggregate config
    this.acc = 400,
    this.gravity = -350

    // Element dimensions
    this.leg = {
        width: 10,
        height: 40,
        mass: 16,
        color: rss.colors.green
    }

    this.crotch = {
        width: 5,
        height: 5
    }

    this.torso = {
        width: 1.5 * this.leg.width + this.crotch.width,
        height: 0.7 * this.leg.height,
        mass: 20,
        color: rss.colors.orange
    }

    this.arm = {
        width: 5,
        height: 30,
        mass: 6,
        color: rss.colors.yellow
    }

    this.neck = {
        width: 5,
        height: 5
    }

    this.head = {
        width: 20,
        height: 20,
        mass: 10,
        color: rss.colors.pink
    }

    // Element and joint positions
    this.leg.pos = cc.p(0, this.leg.height / 2)
    this.leg.joint = cc.p(0, this.leg.height / 2)

    this.torso.pos = cc.p(0, this.leg.height + this.crotch.height + this.torso.height / 2)

    this.arm.pos = rss.p.addY(this.torso.pos, this.torso.height * (0.5 - 1/6) - this.arm.height / 2)
    this.arm.joint = cc.p(0, this.arm.height / 2)

    this.head.pos = rss.p.addY(this.torso.pos, this.torso.height / 2 + this.neck.height + this.head.height / 2)
    this.head.joint = cc.p(0, - this.head.height / 2)

    // Aggregate dimensions
    this.width = this.torso.width
    this.height = rss.sumAttr('height', [this.leg, this.crotch, this.torso, this.neck, this.head.height])
    this.size = cc.size(this.width, this.height)
    this.mass = rss.sumAttr('mass', [this.leg, this.torso, this.arm, this.head.height])
    this.clearance = this.leg.height
})()

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
rss.chair = new (function() {
    // Dimensions
    this.thickness = 8

    this.leg = {
        width: this.thickness,
        height: 30,
        mass: 20
    }

    this.seat = {
        width: 40,
        height: this.thickness,
        mass: 50
    }

    this.back ={
        width: this.thickness,
        height: 35,
        mass: 5
    }

    // Positions and joints
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

    // Aggregate attributes
    this.width = this.seat.width
    this.height = this.leg.height - this.seat.height + this.back.height
    this.size = cc.size(this.width, this.height)
    this.mass = 2 * this.leg.mass +  this.seat.mass + this.back.mass
    this.clearance = this.leg.height + this.seat.height / 2
})()

// Dog
rss.dog = new (function() {
    this.leg = {
        width: 10,
        height: 40,
        mass: 5,
        color: rss.colors.green
    }

    this.armpit = {
        height: 5,
        width: 5
    }

    this.torso = {
        width: 70,
        height: 30,
        mass: 15,
        color: rss.colors.orange
    }

    this.tail = {
        width: 8,
        height: 50,
        mass: 3,
        color: rss.colors.purple
    }

    this.neck = {
        width: 5
    }

    this.head = {
        width: 40,
        height: 40,
        mass: 8,
        color: rss.colors.pink
    }

    // Positions & joints
    this.leg.left = {
        pos: cc.p(-(this.torso.width - this.leg.width) / 2, this.leg.height / 2),
        joint: cc.p(0, 0.5)
    }

    this.leg.right = {
        pos: cc.p(-this.leg.left.pos.x, this.leg.left.pos.y),
        joint: cc.p(0, 0.5)
    }

    this.torso.pos = cc.p(0, this.leg.height + this.armpit.height + this.torso.height / 2)

    this.tail.pos = cc.p(
        -((this.torso.width + this.tail.width) / 2 + this.armpit.width),
        this.torso.pos.y + this.torso.height / 2 - this.tail.height / 2
    )
    this.tail.joint = cc.p(0, 0.5)

    this.head.pos = cc.p(
        (this.torso.width + this.head.width) / 2 + this.neck.width,
        this.torso.pos.y + this.torso.height / 2
    )
    this.head.joint = cc.p(-0.5, 0)

    // Aggregate attributes
    this.width = this.torso.width + this.head.width
    this.height = this.leg.height + this.armpit.height + this.torso.height
    this.size = cc.size(this.width, this.height)
    this.mass = 4 * this.leg.mass + this.torso.mass + this.tail.mass + this.head.mass
    this.clearance = this.leg.height
})()