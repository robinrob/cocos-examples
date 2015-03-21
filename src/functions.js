var rss = rss || {}

cc.Node.prototype.seq = function() {
    var action = arguments.length > 1 ? cc.Sequence.create.apply(cc.Sequence, arguments) : arguments[0]
    this.runAction(action)
    return action
}

cc.Node.prototype.spawn = function(x, y) {
    var action = cc.Spawn.create.apply(cc.Spawn, arguments)
    this.runAction(action)
    return action
}

cp.Vect.prototype.toP = function() {
    return cc.p(this.x, this.y)
}

cp.Vect.prototype.addX = function(dx) {
    return cp.v(this.x + dx, this.y)
}

cp.Vect.prototype.addY = function(dy) {
    return cp.v(this.x, this.y + dy)
}

cp.Vect.prototype.subX = function(dx) {
    return cp.v(this.x - dx, this.y)
}

cp.Vect.prototype.subY = function(dy) {
    return cp.v(this.x, this.y - dy)
}

rss.log = function(obj) {
    cc.log("Logging object: ")
    for (i in obj) {
        cc.log(i)
    }
}

rss.logP = function(p, name) {
    if (!name) {
        var name = "point"
    }
    cc.log(name + ".x: " + p.x)
    cc.log(name + ".y: " + p.y)
}

rss.logS = function(s) {
    if (!name) {
        var name = "size"
    }
    cc.log(name + ".width: " + s.width)
    cc.log(name + ".height: " + s.height)
}

rss.toV = function(p) {
    return cp.v(p.x, p.y)
}

rss.sum = function(obj) {
    var total = 0
    for (var i in obj) {
        total += obj[i]
    }
    return total
}

rss.sign = function(number) {
    return number?number<0?-1:1:0
}

rss.add = function(p1, p2) {
    return cc.p(p1.x + p2.x, p1.y + p2.y)
}

rss.addX = function(obj, dx) {
    return cc.p(obj.x + dx, obj.y)
}

rss.addY = function(obj, dy) {
    return cc.p(obj.x, obj.y + dy)
}

rss.sub = function(p1, p2) {
    return cc.p(p1.x - p2.x, p1.y - p2.y)
}

rss.subX = function(obj, dx) {
    return cc.p(obj.x - dx, obj.y)
}

rss.subY = function(obj, dy) {
    return cc.p(obj.x, obj.y - dy)
}

rss.mult = function(p, m) {
    return cp.v(p.x * m, p.y * m)
}

rss.addW = function(s, dw) {
    return cc.size(s.width + dw, s.height)
}

rss.addH = function(s, dh) {
    return cc.size(s.width, s.height + dh)
}

rss.subW = function(s, dw) {
    return cc.size(s.width - dw, s.height)
}

rss.subH = function(s, dh) {
    return cc.size(s.width, s.height - dh)
}

rss.vecFromTo = function(a, b) {
    return rss.sub(b, a)
}

rss.unitVecFromTo = function(a, b) {
    return rss.normalize(rss.sub(b, a))
}

rss.distance = function(p1, p2) {
    return rss.mag({x: p2.x - p1.x, y: p2.y - p1.y})
}

rss.mag = function(v) {
    return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2))
}

rss.normalize = function(vec) {
    return cc.p(vec.x / rss.mag(vec), vec.y / rss.mag(vec))
}

rss.toRad = function(deg) {
    return cc.degreesToRadians(deg)
}

rss.toDeg = function(rad) {
    return cc.radiansToDegrees(rad)
}

rss.pinJoint = function(obj1, obj2) {
    return new cp.PinJoint(obj1.body, obj2.body, rss.toV(obj1.getJointP()), rss.toV(obj2.getJointP()))
}

rss.pivotJoint = function(obj1, obj2) {
    return new cp.PivotJoint(obj1.body, obj2.body, obj1.getJointP(true))
}

rss.gearJoint = function(obj1, obj2, phase, ratio) {
    return new cp.GearJoint(obj1.body, obj2.body, phase, ratio)
}

rss.slideJoint = function(obj1, obj2) {
    return new cp.SlideJoint(obj1.body, obj2.body, obj1.getJointPs()[0], obj1.getJointPs()[1], obj2.getJointP())
}

rss.grooveJoint = function(obj1, obj2) {
    return new cp.GrooveJoint(obj1.body, obj2.body, obj1.getJointPs()[0], obj1.getJointPs()[1], obj2.getJointP())
}

rss.ratchetJoint = function(obj1, obj2, offset, phase) {
    return new cp.RatchetJoint(obj1.body, obj2.body, offset, phase)
}

rss.fixedJoint = function(obj1, obj2) {
    var joints = []
    joints.push(rss.gearJoint(obj1, obj2, 0.0, 1.0))
    joints.push(rss.pivotJoint(obj1, obj2))
    return joints
}

/* Control inputs */
rss.upInput = function() {
    return rss.keys[cc.KEY.w] || rss.keys[cc.KEY.up]
}

rss.downInput = function() {
    return rss.keys[cc.KEY.s] || rss.keys[cc.KEY.down]
}

rss.rightInput = function() {
    return rss.keys[cc.KEY.d] || rss.keys[cc.KEY.right]
}

rss.leftInput = function() {
    return rss.keys[cc.KEY.a] || rss.keys[cc.KEY.left]
}

rss.xInput = function() {
    return this.rightInput() || this.leftInput()
}

rss.yInput = function() {
    return this.upInput() || this.downInput()
}

rss.xyInput = function() {
    return this.upInput() || this.downInput() || this.rightInput() || this.leftInput()
}