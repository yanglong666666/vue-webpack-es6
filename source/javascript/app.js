jsPlumb.ready(function () {

    var instance = window.jsp = jsPlumb.getInstance({
        // default drag options
        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        // the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
        // case it returns the 'labelText' member that we set on each connection in the 'init' method below.
        ConnectionOverlays: [
            [ "Arrow", {
                location: 1,
                visible:true,
                id:"ARROW",
                events:{
                    click:function() { alert("you clicked on the arrow overlay")}
                }
            } ],
            [ "Label", {
                location: 0.1,
                id: "label",
                type:"question",
                cssClass: "aLabel",
                events:{
                    tap:function() { alert("hey"); }
                }
            }]
        ],
        Container: "canvas"
    });

    var basicType = {
        connector: ["Bezier", { curviness:63 } ],
        paintStyle: { strokeStyle: "red", lineWidth: 1 },
        hoverPaintStyle: { strokeStyle: "blue" },
        overlays: [
            "Arrow"
        ]
    };
    instance.registerConnectionType("basic", basicType);

    // this is the paint style for the connecting lines..
    var connectorPaintStyle = {
            lineWidth: 1,
            strokeStyle: "#61B7CF",//Á¬½ÓÏßµÄÑÕÉ«
            joinstyle: "round",
            outlineColor: "white",
            outlineWidth: 2
        },
        connectorPaintStyle1 = {
            lineWidth: 1,
            strokeStyle: "#888888",//Á¬½ÓÏßµÄÑÕÉ«
            joinstyle: "round",
            outlineColor: "white",
            outlineWidth: 2
        },
    // .. and this is the hover style.
        connectorHoverStyle = {
            lineWidth: 1,
            strokeStyle: "#216477",
            outlineWidth: 2,
            outlineColor: "white"
        },
        endpointHoverStyle = {
            fillStyle: "#216477",
            strokeStyle: "#216477"
        },
    // the definition of source endpoints (the small blue ones)
        sourceEndpoint = {
            endpoint: "Dot",
            paintStyle: {
                strokeStyle: "#7AB02C",//Á¬½ÓµãµÄÑÕÉ«
                fillStyle: "transparent",
                radius: 3,
                lineWidth: 3
            },
            isSource: true,
            connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ],
            connectorStyle: connectorPaintStyle,
            hoverPaintStyle: endpointHoverStyle,
            connectorHoverStyle: connectorHoverStyle,
            dragOptions: {},
            overlays: [
                [ "Label", {
                    location: [0.5, 1.5],
                    label: "Drag",
                    cssClass: "endpointSourceLabel",
                    visible:false
                } ]
            ]
        },
        sourceEndpoint1 = {
            endpoint: "Dot",
            paintStyle: {
                strokeStyle: "#888888",//Á¬½ÓµãµÄÑÕÉ«
                fillStyle: "transparent",
                radius: 3,
                lineWidth: 3
            },
            isSource: true,
            connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ],
            connectorStyle: connectorPaintStyle1,
            hoverPaintStyle: endpointHoverStyle,
            connectorHoverStyle: connectorHoverStyle,
            dragOptions: {},
            overlays: [
                [ "Label", {
                    location: [0.5, 1.5],
                    label: "Drag",
                    cssClass: "endpointSourceLabel",
                    visible:false
                } ]
            ]
        },
    // the definition of target endpoints (will appear when the user drags a connection)
        targetEndpoint = {
            endpoint: "Dot",
            paintStyle: { fillStyle: "#7AB02C", radius: 5 },
            hoverPaintStyle: endpointHoverStyle,
            maxConnections: -1,
            dropOptions: { hoverClass: "hover", activeClass: "active" },
            isTarget: true,
            overlays: [
                [ "Label", { location: [0.5, -0.5], label: "Drop", cssClass: "endpointTargetLabel", visible:false } ]
            ]
        },
        targetEndpoint1 = {
            endpoint: "Dot",
            paintStyle: { fillStyle: "#888888", radius: 5 },
            hoverPaintStyle: endpointHoverStyle,
            maxConnections: -1,
            dropOptions: { hoverClass: "hover", activeClass: "active" },
            isTarget: true,
            overlays: [
                [ "Label", { location: [0.5, -0.5], label: "Drop", cssClass: "endpointTargetLabel", visible:false } ]
            ]
        },
        init = function (connection) {
            connection.getOverlay("label").setLabel(connection.sourceId.substring(15) + "-" + connection.targetId.substring(15));
        };

    var _addEndpoints = function (toId, sourceAnchors, targetAnchors) {
        for (var i = 0; i < sourceAnchors.length; i++) {
            var sourceUUID = toId + sourceAnchors[i];
            instance.addEndpoint(toId, sourceEndpoint, {
                anchor: sourceAnchors[i], uuid: sourceUUID
            });
        }
        for (var j = 0; j < targetAnchors.length; j++) {
            var targetUUID = toId + targetAnchors[j];
            instance.addEndpoint(toId, targetEndpoint, { anchor: targetAnchors[j], uuid: targetUUID });
        }
    };

    var _addEndpoints1 = function (toId, sourceAnchors, targetAnchors) {
        for (var i = 0; i < sourceAnchors.length; i++) {
            var sourceUUID = toId + sourceAnchors[i];
            instance.addEndpoint(toId, sourceEndpoint1, {
                anchor: sourceAnchors[i], uuid: sourceUUID
            });
        }
        for (var j = 0; j < targetAnchors.length; j++) {
            var targetUUID = toId + targetAnchors[j];
            instance.addEndpoint(toId, targetEndpoint1, { anchor: targetAnchors[j], uuid: targetUUID });
        }
    };

    // suspend drawing and initialise.
    instance.batch(function () {

        _addEndpoints("Window1", ["RightMiddle"], []);
        _addEndpoints("Window2", ["RightMiddle"], ["LeftMiddle"]);
        _addEndpoints("Window3", ["RightMiddle"], ["LeftMiddle","TopCenter"]);
        _addEndpoints("Window4", ["RightMiddle","BottomCenter"], ["LeftMiddle"]);
        _addEndpoints("Window5", ["TopCenter","BottomCenter"], ["RightMiddle","LeftMiddle"]);
        _addEndpoints("Window6", ["Right","RightMiddle","BottomCenter"], ["TopCenter", "LeftMiddle"]);
        _addEndpoints1("Window7", ["LeftMiddle"], ["TopCenter"]);
        _addEndpoints1("Window8", ["LeftMiddle"], ["RightMiddle"]);
        _addEndpoints1("Window9", ["LeftMiddle"], ["RightMiddle"]);
        _addEndpoints1("Window10", ["LeftMiddle"], ["RightMiddle"]);
        _addEndpoints1("Window11", [], ["RightMiddle"]);

        // listen for new connections; initialise them the same way we initialise the connections at startup.
        //instance.bind("connection", function (connInfo, originalEvent) {
           // init(connInfo.connection);
        //});

        // make all the window divs draggable
        //instance.draggable(jsPlumb.getSelector(".flowchart-demo .window"), { grid: [20, 20] });
        // THIS DEMO ONLY USES getSelector FOR CONVENIENCE. Use your library's appropriate selector
        // method, or document.querySelectorAll:
        //jsPlumb.draggable(document.querySelectorAll(".window"), { grid: [20, 20] });

        // connect a few up
        instance.connect({uuids: ["Window1RightMiddle", "Window2LeftMiddle"], editable: false});
        instance.connect({uuids: ["Window2RightMiddle", "Window3LeftMiddle"], editable: true});
        instance.connect({uuids: ["Window3RightMiddle", "Window4LeftMiddle"], editable: true});
        instance.connect({uuids: ["Window4RightMiddle", "Window5LeftMiddle"], editable: true});
        instance.connect({uuids: ["Window4BottomCenter", "Window6LeftMiddle"], editable: true});
        instance.connect({uuids: ["Window5TopCenter", "Window3TopCenter"], editable: true});
        instance.connect({uuids: ["Window5BottomCenter", "Window6TopCenter"], editable: true});

        instance.connect({uuids: ["Window6RightMiddle", "Window3TopCenter"], editable: true});
        instance.connect({uuids: ["Window6RightMiddle", "Window5RightMiddle"], editable: true});
        instance.connect({uuids: ["Window6BottomCenter", "Window7TopCenter"], editable: true});
        instance.connect({uuids: ["Window7LeftMiddle", "Window8RightMiddle"], editable: true});
        instance.connect({uuids: ["Window8LeftMiddle", "Window9RightMiddle"], editable: true});
        instance.connect({uuids: ["Window9LeftMiddle", "Window10RightMiddle"], editable: true});
        instance.connect({uuids: ["Window10LeftMiddle", "Window11RightMiddle"], editable: true});
        //

    });

    //jsPlumb.fire("jsPlumbDemoLoaded", instance);
});
