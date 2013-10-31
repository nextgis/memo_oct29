define([
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dojo/on",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dijit/layout/TabContainer",
    "dijit/layout/ContentPane",
    "dojox/image/Lightbox"
], function(
    declare,
    domConstruct,
    on,
    array,
    lang,
    TabContainer,
    ContentPane,
    Lightbox
) {
    return declare([TabContainer], {
        postCreate:function() {
            this.inherited(arguments);
            
            // Панель описания
            var desc_panel = new ContentPane({
                title: "Описание",
                content: this.desc
            });
            this.addChild(desc_panel);
            
            // Панель фотографий
            if (this.photo) {
                var photo_panel = new ContentPane({
                    title: "Фото",
                    style: "height: 100px"
                });
                this.addChild(photo_panel);

                var dialog = new dojox.image.LightboxDialog({});
                dialog.startup();

                array.forEach(this.photo, lang.hitch(this, function(item) {
                    var src = "/img/app/data/poi/img/" + this.poiid + "/" + item;

                    var surface = domConstruct.create("div", {
                        "class": "featurePhoto-surface featurePhoto-inline"
                    }, photo_panel.containerNode);

                    var align = domConstruct.create("div", {
                        "class": "featurePhoto-align",
                        "style": "width: 64px; height: 64px;"
                    }, surface);

                    var a = domConstruct.create("a", {
                        href: src,
                        target: "_blank"
                    }, align);

                    var img = domConstruct.create("img", {
                        src: src + "?size=64x64",
                        title: ""
                    }, a);

                    dialog.addImage({href: src, title: "Подпись"}, "main");

                    on(a, "click", function (evt) {
                        dialog.show({group: "main", href: this.href, title: ""});
                        evt.preventDefault();
                    });

                }));
            }

        }
    })
})