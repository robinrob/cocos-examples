var BaseLayer = cc.Layer.extend({
    ctor: function(){
        this._super();

        this.r = {}
    },

    init:function() {
        this._super()
    },

    getSpace: function() {
        return this.r.space
    }
});