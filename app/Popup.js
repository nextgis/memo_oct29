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
            L.Popup.prototype._updatePosition.apply(this, []);
            domStyle.set(this._container, {left: -(8 + domStyle.get(this._tipContainer, "left")) + "px"});
        }

    });

});