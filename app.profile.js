var profile = {

        basePath: '.',
        releaseDir: '../release',
        action: 'release',
        cssOptimize: 'comments',
        mini: true,
        optimize: 'closure',
        layerOptimize: 'closure',
        stripConsole: 'all',
        selectorEngine: 'acme',
        layers: {
            'dojo/dojo': {
                include: [
                    'app/Popup',
                    'app/Map',
                    'app/widget/Display',
                    'app/widget/HouseWidget',
                    'app/widget/ChurchWidget',
                    'app/widget/POIWidget'
                ],
                boot: true,
                customBase: true
            }
        },

        staticHasFeatures: {
            'dojo-trace-api': 0,
            'dojo-log-api': 0,
            'dojo-publish-privates': 0,
            'dojo-sync-loader': 0,
            'dojo-xhr-factory': 0,
            'dojo-test-sniff': 0
        }, 

        packages:[
            {
                name: "dojo",
                location: "dojo"
            },{
                name: "dijit",
                location: "dijit"
            },{
                name: "dojox",
                location: "dojox"
            },{
                name: "app",
                location: "app"
            }
        ]
};