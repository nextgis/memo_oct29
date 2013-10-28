define([
    "dojo/_base/declare",
    "dojo/text!./templates/Display.html",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "app/Map",
    //template
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane"
], function(
    declare,
    template,
    _WidgetBase,
    _TemplatedMixin,
    Map
) {
    return declare([_WidgetBase, _TemplatedMixin], {
        
        baseClass: "Display",
        
        templateString: template,

        _mapSetup: function() {
            this.map = new Map(this.mapNode, {minZoom: 14});
            this.map.llmap.setView(this._center, this._zoom);
        },

        constructor: function(options) {
            //?
            declare.safeMixin(this, options);
            this._center = [55.7610, 37.6283];
            this._zoom = 16;
        },

        startup: function() {
            //?
            this.inherited(arguments);
            this._mapSetup();



        }
    });
});