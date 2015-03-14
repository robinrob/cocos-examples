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