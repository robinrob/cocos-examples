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

//cc.Point.prototype.toV = function() {
//    return cp.v(this.x, this.y)
//}
//¡
//cc.Point.prototype.addX = function(dx) {
//    this.x += dx
//}
//
//cc.Point.prototype.addY = function(dy) {
//    this.x += dy
//}

cp.Vect.prototype.toP = function() {
    return cc.p(this.x, this.y)
}

cp.Vect.prototype.addX = function(dx) {
    this.x += dx
    return this
}

cp.Vect.prototype.addY = function(dy) {
    this.y += dy
    return this
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

rss.p = function(x, y) {
    return new cc.Point(x, y)
}

rss.addX = function(obj, dx) {
    return cc.p(obj.x + dx, obj.y)
}

rss.addY = function(obj, dy) {
    return cc.p(obj.x, obj.y + dy)
}

rss.distance = function(p1, p2) {
    return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2))
}

rss.toRad = function(deg) {
    return cc.degreesToRadians(deg)
}

rss.toDeg = function(rad) {
    return cc.radiansToDegrees(rad)
}

rss.pinJoint = function(space, obj1, obj2) {
    var p1 = obj1.getJointP()
    var p2 = obj2.getJointP()
    var joint = new cp.PinJoint(p1, p2, rss.distance(p1, p2))
    space.addConstraint(joint)
    return joint
}

rss.pivotJoint = function(space, obj1, obj2) {
    var joint = new cp.PivotJoint(obj1.body, obj2.body, obj1.getJointP())
    space.addConstraint(joint)
    return joint
}

rss.slideJoint = function(space, obj1, obj2) {
    var joint = new cp.SlideJoint(obj1.body, obj2.body, obj1.getJointPs()[0], obj1.getJointPs()[1], obj2.getJointP())
    space.addConstraint(joint)
    return joint
}

rss.grooveJoint = function(space, obj1, obj2) {
    var joint = new cp.GrooveJoint(obj1.body, obj2.body, obj1.getJointPs()[0], obj1.getJointPs()[1], obj2.getJointP())
    space.addConstraint(joint)
    return joint
}

rss.ratchetJoint = function(space, obj1, obj2, offset, phase) {
    var joint = new cp.RatchetJoint(obj1.body, obj2.body, offset, phase)
    space.addConstraint(joint)
    return joint
}