define([
    "dojo/_base/declare",
    "dijit/layout/ContentPane"
], function(
    declare,
    ContentPane
) {
    return declare([ContentPane], {
        
        postCreate:function() {
            this.inherited(arguments);
            this.set("content", this.desc);
        }
    })
})