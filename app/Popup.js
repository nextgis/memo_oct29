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
            domClass.remove(this._tip);
            domClass.add(this._container, "dijitTooltipAbove");
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
        },

        _updateContent: function () {
            if (!this._content) { return; }

            if (typeof this._content === 'string') {
                this._contentNode.innerHTML = this._content;
            } else {
                while (this._contentNode.hasChildNodes()) {
                    this._contentNode.removeChild(this._contentNode.firstChild);
                }
                if ("nodeType" in this._content && this._content.nodeType === 1) {
                    this._contentNode.appendChild(this._content);
                } else {
                    this._content.placeAt(this._contentNode);
                }
            }
            this.fire('contentupdate');
        }
    });

});