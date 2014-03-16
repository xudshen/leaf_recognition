/**
 * Created by xudshen on 13-10-15.
 */

var projectDirect = angular.module('projectDirect', []);

projectDirect.directive('datepicker', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, controller) {
            element.datetimepicker().on('changeDate', function (ev) {
                controller.$setViewValue(element.context.value);
                scope.$apply();
            });
        }
    }
});

projectDirect.directive('tablesorter', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, controller) {
            scope.$watch(function () {
                return controller.$modelValue;
            }, function (newValue) {
                element.tablesorter();
            });
        }
    }
});

projectDirect.directive('morrischarts', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, controller) {
            //console.log(JSON.stringify(scope.chartData));
            scope.$watch(function () {
                return controller.$modelValue;
            }, function (newValue) {
                //scope.options.chart.width = element.width() - 15;
                //element.highcharts(scope.options);
                //console.log(element.width())
                if (scope.options.type == 'Donut')
                    Morris.Donut(scope.options);
            });
        }
    }
});

projectDirect.directive('highcharts', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, controller) {
            //console.log(JSON.stringify(scope.chartData));
            scope.$watch(function () {
                return controller.$modelValue;
            }, function (newValue) {
                //scope.options.chart.width = element.width() - 15;
                element.highcharts(scope.options);
                //console.log(element.width())
            });
        }
    }
});

projectDirect.directive('workflow', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, controller) {
            scope.$watch(function () {
                return controller.$modelValue;
            }, function (newValue) {
                if (newValue == null || !newValue.update)
                    return;

                if (newValue.init){
                    appendHtml = ''
                    for(var k in newValue.states){
                        appendHtml += '<div id="'+ k +'" class="item" style="' + newValue.states[k] + '">' + k +'<div class="ep"></div></div>';
                    }
                    //insert into
                    element.html(appendHtml).each(function(){
                        //*****copied from internet******************
                        //*****i don't konw how does this part work**
                        jsPlumb.importDefaults({
                        connector: [ "StateMachine", { curviness: 20 } ],
                        Endpoint: ["Dot", {radius: 2}],
                        HoverPaintStyle: {strokeStyle: "#428bca", lineWidth: 2 },
                        ConnectionOverlays: [
                                [ "PlainArrow", {
                                    location: 1,
                                    id: "arrow",
                                    width: 6,
                                    length: 6,
                                    foldback: 1
                                } ],
                                [ "Label", { label:"", id:"label", cssClass:"aLabel" }]
                            ]
                        });
                        var windows = jsPlumb.getSelector(".item");
                        jsPlumb.bind("doubleClick", function(c) {
                            jsPlumb.detach(c);
                        });
                        jsPlumb.bind("connection", function(info) {
                            if(newValue.transitions[info.connection.sourceId][info.connection.targetId].toString().length != 0)
                                info.connection.getOverlay("label").setLabel(newValue.transitions[info.connection.sourceId][info.connection.targetId]);
                            else info.connection.getOverlay("label").hide();
                        });
                        jsPlumb.doWhileSuspended(function() {
                            // make each ".ep" div a source and give it some parameters to work with.  here we tell it
                            // to use a Continuous anchor and the StateMachine connectors, and also we give it the
                            // connector's paint style.  note that in this demo the strokeStyle is dynamically generated,
                            // which prevents us from just setting a jsPlumb.Defaults.PaintStyle.  but that is what i
                            // would recommend you do. Note also here that we use the 'filter' option to tell jsPlumb
                            // which parts of the element should actually respond to a drag start.
                            jsPlumb.makeSource(windows, {
                                filter:".ep",				// only supported by jquery
                                anchor:"Continuous",
                                connector:[ "StateMachine", { curviness:20 } ],
                                connectorStyle:{ strokeStyle:"#5c96bc", lineWidth:2, outlineColor:"transparent", outlineWidth:4 },
                                maxConnections:5,
                                onMaxConnections:function(info, e) {
                                    alert("Maximum connections (" + info.maxConnections + ") reached");
                                }
                            });

                            // initialise all '.w' elements as connection targets.
                            jsPlumb.makeTarget(windows, {
                                dropOptions:{ hoverClass:"dragHover" },
                                anchor:"Continuous"
                            });
                            // and finally, make a couple of connections
                            for(var start in newValue.transitions){
                                for (var end in newValue.transitions[start]){
                                    if(newValue.transitions[start][end].toString().length == 0)
                                        jsPlumb.connect({ source:start, target:end}).setPaintStyle({strokeStyle: "grey", lineWidth: 1});
                                    else
                                        jsPlumb.connect({ source:start, target:end}).setPaintStyle({strokeStyle: "green", lineWidth: 1});
                                }
                            }
                        });
                        jsPlumb.draggable(jsPlumb.getSelector(".item"), {containment:"parent"});
                    });
                }
            });
        }
    }
});