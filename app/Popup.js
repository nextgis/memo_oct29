define([
    "dojo/dom-style",
    "dojo/dom-class",
    "dojo/dom-construct"
], function(
    domStyle,
    domClass,
    domConstruct
) {
    return L.Popup.extend({
     
        options: {
            maxWidth: 350
        },

        _initLayout: function () {
            L.Popup.prototype._initLayout.apply(this, []);
            domClass.remove(this._container);
            domClass.remove(this._wrapper);
            domClass.remove(this._tipContainer);
            domClass.remove(this._tip);
            domClass.add(this._container, "dijitTooltipAbove");
            domStyle.set(this._container, { position: "absolute" });
            domClass.add(this._wrapper, "dijitTooltipContainer");
            domClass.add(this._tipContainer, "dijitTooltipConnector");

            var titleWrap = domConstruct.create("div", {
                "class": "dijitTooltipTitleWrapper"
            }, this._wrapper, "first");

            var titleNode = domConstruct.create("div", {
                innerHTML: this.options.title ? this.options.title : "&nbsp;",
                "class": "dijitTooltipTitle"
            }, titleWrap, "first");

        },
        
        _updatePosition: function () {
            if (!this._map) { return; }

            var pos = this._map.latLngToLayerPoint(this._latlng),
                animated = this._animated,
                offset = L.point(this.options.offset);

            if (animated) {
                L.DomUtil.setPosition(this._container, pos);
            }

            this._containerBottom = -offset.y - (animated ? 0 : pos.y);
            this._containerLeft = -(domStyle.get(this._tipContainer, "width") / 2 + domStyle.get(this._tipContainer, "left")) + offset.x + (animated ? 0 : pos.x);

            this._container.style.bottom = this._containerBottom + 'px';
            this._container.style.left = this._containerLeft + 'px';
        }

    });

});