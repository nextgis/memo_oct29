define([
    "dojo/_base/declare",
    "dojox/widget/TitleGroup",
    "dijit/TitlePane",
    "dojo/_base/array",
    "dojo/_base/lang"
], function(
    declare,
    TitleGroup,
    TitlePane,
    array,
    lang
) {
    return declare([TitleGroup], {
        postCreate:function() {
            this.inherited(arguments);
            array.forEach(this.people, lang.hitch(this, function(item, index) {
                this.addChild(new TitlePane({
                    title: item.name,
                    content: item.about,
                    open: (index == 0) ? true: false
                }));
            }));
        }
    })
})