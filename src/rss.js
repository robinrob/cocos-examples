var rss = rss || {}

rss.chipmunk = "chipmunk"
rss.box2D = "box2d"
rss.physics = rss.box2D
//rss.physics = rss.chipmunk

switch(rss.physics) {
    case rss.chipmunk:
        rss.gravity = -350
        break;
    case rss.box2D:
        rss.gravity = new Box2D.Common.Math.b2Vec2(0, 0);
        break;
}

rss.groundHeight = 10

rss.exampleMan = {
    impulse: 20,
    gravity: -350
}

rss.exampleCar = {
    impulse: 5,
    gravity: -350
}

rss.exampleSpaceship = {
    gravity: -700
}

rss.spaceship = {}
rss.spaceship.mass = 100
rss.spaceship.acc = 1000

rss.colors = {
    yellow: new cc.color(255, 255, 0, 255),
    green: new cc.color(0, 255, 0, 255),
    purple: new cc.color(174, 0, 255, 255),
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

rss.res = {
    fish1_png  : "res/fish/fish1.png",
    fish_png  : "res/fish/fish.png",
    fish_plist : "res/fish/fish.plist",

    spaceship_png : "res/spaceship/spaceship.png",
    spaceship_plist : "res/spaceship/spaceship.plist"
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
var chair = {}
rss.chair = chair

var width = {}
chair.width = width
width.leg = 10
width.crotch = 20
width.back = 10
width.seat= 2 * width.leg + width.crotch
width.total = rss.sum(width)

var height = {}
chair.height = height
height.leg = 40
height.back = 30
height.seat = 10
height.total = rss.sum(height)

var mass = {}
chair.mass = mass
mass.leg = 1
mass.back = 5
mass.seat = 5
mass.total = rss.sum(mass)