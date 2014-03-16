/**
 * Created with JetBrains WebStorm.
 * User: xudshen
 * Date: 13-9-27
 * Time: 下午2:55
 * To change this template use File | Settings | File Templates.
 */
'use strict';

var projectCtls = angular.module('projectCtls', []);

projectCtls.controller('Dashboard_nodeOverview', ['$scope', '$rootScope', '$location',
    function Dashboard_nodeOverview($scope, $rootScope, $location) {
        $scope.curTime = new Date(Date.now()).toUTCString();
        $scope.options = {
            chart: {
                zoomType: 'x',
                height: 340
            },
            title: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            subtitle: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            xAxis: [
                {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        minute: '%H',
                        hour: '%H'
                    }
                }
            ],
            yAxis: [
                {
                    title: {
                        text: '',
                        style: {
                            display: 'none'
                        }
                    }
                },
                { // Secondary yAxis
                    title: {
                        text: '',
                        style: {
                            display: 'none'
                        }
                    },
                    labels: {
                        format: '{value} %',
                        style: {
                            color: '#3a87ad'
                        }
                    },
                    opposite: true
                }
            ],
            tooltip: {
                shared: true
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                x: 60,
                verticalAlign: 'top',
                y: 50,
                floating: true,
                backgroundColor: '#FFFFFF'
            },
//            plotOptions: {
//                series: {
//                    stacking: 'normal'
//                }
//            },
            series: [
                {
                    name: 'Total Nodes',
                    color: '#C4E3F3',
                    type: 'area',
                    yAxis: 1,
                    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
                    tooltip: {
                        valueSuffix: ' mm'
                    }

                },
                {
                    name: 'Failed Nodes',
                    color: '#EBCCCC',
                    type: 'area',
                    yAxis: 1,
                    data: [1 , 5, 65, 4, 3, 6, 7, 8, 5, 4, 3, 11],
                    tooltip: {
                        valueSuffix: ' mm'
                    }

                },
                {
                    name: 'Rate',
                    color: '#C1E2B4',
                    type: 'spline',
                    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
                    tooltip: {
                        valueSuffix: '°C'
                    }
                }
            ]
        };
        $scope.chartData = 0;
    }]);

projectCtls.controller('Dashboard_actionsToday', ['$scope', '$rootScope', '$location',
    function Dashboard_actionsToday($scope, $rootScope, $location) {
        $scope.curTime = new Date(Date.now()).toUTCString();
        $scope.options = {
            type: 'Donut',
            element: 'actions_today',
            data: [
                {label: "InitialChecked", value2: '12 nodes/ 3.5min', value:12},
                {label: "Ready for Decomm", value2: '12 nodes/ 3.5min', value:12},
                {label: "Wait Decomm", value2: '67 nodes/ 6.5min', value:67},
                {label: "Ready for Diag", value2: '5 nodes/ 3.5min', value:5},
                {label: "Report to Vendor", value2: '6 nodes/ 3.5min', value:6},
                {label: "Restore", value2: '56 nodes/ 3.5min', value:56},
                {label: "Ready for Readd", value2: '89 nodes/ 4.5min', value:89},
                {label: "Other", value2: '4 nodes/ 6.5min', value:4}
            ],
            colors:['#CCFAF8','#CCE3FA','#CDCCFA','#FBCDF0','#FDCED2','#FFDED0','#FFF4D0','#FFFDD0'],
            formatter:
                function (y, data) { return data.value2; }
        };
        $scope.chartData = 0;
    }]);

projectCtls.controller('Dashboard_noderank', ['$scope', '$rootScope', '$location',
    function Dashboard_noderank($scope, $rootScope, $location) {
        $scope.curTime = new Date(Date.now()).toUTCString();
        $scope.data = [
            {node: 'phxdpehdc10dn0066', cnt:345, cluster:'phx', url:'/2/node_status?nodeName=phxdpehdc10dn0066.stratus.phx.ebay.com'},
            {node: 'phxdpehdc10dn0066', cnt:123, cluster:'phx', url:'/2/node_status?nodeName=phxdpehdc10dn0066.stratus.phx.ebay.com'},
            {node: 'phxdpehdc10dn0066', cnt:89, cluster:'phx', url:'/2/node_status?nodeName=phxdpehdc10dn0066.stratus.phx.ebay.com'},
            {node: 'phxdpehdc10dn0066', cnt:78, cluster:'phx', url:'/2/node_status?nodeName=phxdpehdc10dn0066.stratus.phx.ebay.com'},
            {node: 'phxdpehdc10dn0066', cnt:67, cluster:'phx', url:'/2/node_status?nodeName=phxdpehdc10dn0066.stratus.phx.ebay.com'},
            {node: 'phxdpehdc10dn0066', cnt:56, cluster:'phx', url:'/2/node_status?nodeName=phxdpehdc10dn0066.stratus.phx.ebay.com'},
            {node: 'phxdpehdc10dn0066', cnt:45, cluster:'phx', url:'/2/node_status?nodeName=phxdpehdc10dn0066.stratus.phx.ebay.com'},
            {node: 'phxdpehdc10dn0066', cnt:34, cluster:'phx', url:'/2/node_status?nodeName=phxdpehdc10dn0066.stratus.phx.ebay.com'},
        ];
    }]);

projectCtls.controller('Dashboard_transaction', ['$scope', '$rootScope', '$location',
    function Dashboard_transaction($scope, $rootScope, $location) {
        $scope.curTime = new Date(Date.now()).toUTCString();
        $scope.data = [
            {time: 'just now', desc:'fasfasfasfasfda', url:'/2/node_status?nodeName=phxdpehdc10dn0066.stratus.phx.ebay.com'},
            {time: '2 minutes ago', desc:'fasfasfasfasfda', url:'/2/node_status?nodeName=phxdpehdc10dn0066.stratus.phx.ebay.com'},
            {time: '2 minutes ago', desc:'fasfasfasfasfda', url:'/2/node_status?nodeName=phxdpehdc10dn0066.stratus.phx.ebay.com'},
            {time: '2 minutes ago', desc:'fasfasfasfasfda', url:'/2/node_status?nodeName=phxdpehdc10dn0066.stratus.phx.ebay.com'},
            {time: '4 minutes ago', desc:'fasfasfasfasfda', url:'/2/node_status?nodeName=phxdpehdc10dn0066.stratus.phx.ebay.com'},
            {time: '4 minutes ago', desc:'fasfasfasfasfda', url:'/2/node_status?nodeName=phxdpehdc10dn0066.stratus.phx.ebay.com'},
            {time: '4 minutes ago', desc:'fasfasfasfasfda', url:'/2/node_status?nodeName=phxdpehdc10dn0066.stratus.phx.ebay.com'},
            {time: '4 minutes ago', desc:'fasfasfasfasfda', url:'/2/node_status?nodeName=phxdpehdc10dn0066.stratus.phx.ebay.com'},
        ];
    }]);


projectCtls.controller('ClusterNodes', ['$scope', '$rootScope', '$location', 'ClusterService',
    function ClusterNodes($scope, $rootScope, $location, ClusterService) {
        $scope.curTime = new Date(Date.now()).toUTCString();
        //$scope.cluster_name = $location.search()['cluster_name'];
        if (($location.$$absUrl.toString()).indexOf('?cluster_name=') >= 0) {
            $scope.cluster_name = ($location.$$absUrl.toString()).substring(
                $location.$$absUrl.indexOf('?cluster_name=') + 14).split('&')[0];
        }

        ClusterService.refresh($scope.cluster_name).then(function (data) {
            $scope.ClusterService = angular.copy(data);
        });
    }]);

projectCtls.controller('NodeStatus', ['$scope', '$rootScope', '$location', 'Workflow',
    function NodeStatus($scope, $rootScope, $location, Workflow) {
        $scope.curTime = new Date(Date.now()).toUTCString();
        if (($location.$$absUrl.toString()).indexOf('?nodeName=') >= 0) {
            $scope.nodeName = ($location.$$absUrl.toString()).substring(
                $location.$$absUrl.indexOf('?nodeName=') + '?nodeName='.length).split('&')[0];
        }

//        $scope.workflow = {
//            states:['state1', 'state2', 'state3'],
//            transitions:
//            {'state1':{'state1':'info', 'state3':'more info'}},
//            update:true,
//            init: true
//        }
        Workflow.refresh().then(function (data) {
            $scope.workflow = angular.copy(data);
        });

        Workflow.log($scope.nodeName).then(function (data) {
            $scope.workflow_log = angular.copy(data);
        });
    }]);


projectCtls.controller('ShowStatusCtl', ['$scope', '$rootScope', 'Meta', 'EbayServices',
    function ShowStatusCtl($scope, $rootScope, Meta, EbayServices) {
        $scope.column = 3;
        $scope.width = "33%";
        $scope.ebayServices;

        EbayServices.refresh(['res/eBay Core.json'], ['eBay Core'], $scope.column).then(function (data) {
            //$scope.$apply(function(){$scope.ebayServices = data; return data;});
            $scope.ebayServices = angular.copy(data);
        });

        $scope.curTime = new Date(Date.now()).toUTCString();
        $scope.responseText = "";
        $scope.statusDic = ['OK', 'Partial', 'Failed'];
    }]);

projectCtls.controller('ShowStatusQueryCtl', ['$scope', '$rootScope', 'Meta', 'EbayQuery',
    function ShowStatusCtl($scope, $rootScope, Meta, EbayQuery) {
        function getDay() {
            var date = new Date(parseInt(Date.now() / 24 / 3600 / 1000) * 24 * 3600 * 1000);
            return date;
        }

        function getFormatDate(date) {
            var str = date.toUTCString();
            var items = str.split(' ');
            return items[0] + ' ' + items[1] + ' ' + items[2] + ' ' + items[3] + ' ' + items[5];
        }

        function reformat(s) {
            return (new Date(Date.parse(s.replace(/-/g, "/")))).getTime();
        }

        $scope.selectedDay = getDay();
        $scope.timeLabel = getFormatDate($scope.selectedDay);
        Meta.refresh('res/meta.json');
        refresh($scope.selectedDay);


        $scope.logs;
        $scope.chartData;
        $scope.options = {
            chart: {
                backgroundColor: '#fff',
                plotBackgroundColor: '#fff',
                height: 200,
                width: 1000,
                marginLeft: 24,
                marginRight: 24,
                marginTop: 24,
                type: 'area'
            },
            title: {
                text: ''
            },
            legend: {
                enabled: false
            },
            xAxis: {
                opposite: true,
                type: 'datetime',
                gridLineWidth: 1,
                dateTimeLabelFormats: {
                    minute: '%H',
                    hour: '%H'
                },
                //categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                //        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

                tickInterval: 1 * 3600 * 1000
            },
            yAxis: {
                title: '',
                gridLineWidth: 0,
                //categories: ['Apples', 'Bananas', 'Oranges', 'Others']
                categories: [''],
                min: 0,
                max: 1
            },
            scrollbar: {
                enabled: true
            },
            tooltip: {
                shared: true,
                useHTML: true,
                headerFormat: '<small>{point.key}</small><table>',
                pointFormat: '<tr><td><span style="width: 18px; height: 18px;background: {series.color};border-radius: 4px;float:left"></span></td><td><span style="">{series.name}<span></td></tr>',
                footerFormat: '</table>',
                valueDecimals: 2
            },
            plotOptions: {
                area: {
                    lineWidth: 0,
                    fillOpacity: 0.6,
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: false
                            }
                        }
                    }
                }
            },
            series: []
        };
        function refresh(selectedDay) {
            EbayQuery.query(
                {
                    "impacts": "",
                    "start": selectedDay.getUTCFullYear() + '-' + (selectedDay.getUTCMonth() + 1) + '-' + selectedDay.getUTCDate() + ' 00:00:00 GMT',
                    "end": selectedDay.getUTCFullYear() + '-' + (selectedDay.getUTCMonth() + 1) + '-' + selectedDay.getUTCDate() + ' 23:59:59 GMT',
                    "statusList": {"OK": true, "Partial": true, "Failed": true}
                }).then(function (data) {
                    if (_.isUndefined(data) || _.isNull(data)) return;
                    if (data.length == 0) {
                        $scope.logs = [];
                        $scope.chartData = [];
                        $scope.options.series = [];
                    }
                    else {
                        var dic = _.uniq(_.map(data, function (item) {
                            return item.impact
                        }));
                        //console.log(dic);
                        data = _.sortBy(data, function (item) {
                            return item.start;
                        });
                        //for chart
                        $scope.chartData = _.map(angular.copy(data), function (item) {
                            return {
                                'name': item['impact'],
                                'data': [
                                    {x: reformat(item['start']), y: 1},
                                    {x: reformat(item['end']), y: 1}
                                ],
                                'fillColor': {
                                    pattern: "img/pattern" + (dic.indexOf(item.impact) + 1) + ".png",
                                    width: 6,
                                    height: 6
                                },
                                'fillOpacity': 0.5,
                                'color': '#f3ae08'
                            };
                        });
                        $scope.options.xAxis.min = parseInt($scope.chartData[0].data[0].x / 24 / 3600 / 1000) * 24 * 3600 * 1000;
                        $scope.options.xAxis.max = parseInt($scope.chartData[0].data[0].x / 24 / 3600 / 1000) * 24 * 3600 * 1000 + 24 * 3600 * 1000;
                        $scope.options.series = ($scope.chartData);
                        //for log
                        $scope.logs = _.map(angular.copy(data), function (item) {
                            item.start = (item.start.split(' '))[1] + ':00';
                            item.end = (item.end.split(' '))[1] + ':00';
                            item.imgurl = "img/pattern" + (dic.indexOf(item.impact) + 1) + ".png";
                            return item;
                        });
                    }

                })
        };

        $scope.back = function () {
            $scope.selectedDay.setDate($scope.selectedDay.getDate() - 1);
            $scope.timeLabel = getFormatDate($scope.selectedDay);
            refresh($scope.selectedDay);
        };

        $scope.forward = function () {
            if ($scope.isValid()) {
                $scope.selectedDay.setDate($scope.selectedDay.getDate() + 1);
                $scope.timeLabel = getFormatDate($scope.selectedDay);
                refresh($scope.selectedDay);
            }
        }

        $scope.isValid = function () {
            return $scope.selectedDay < getDay();
        }
    }]);

projectCtls.controller('StatusCtl', ['$scope', '$rootScope', 'Meta', 'EbayServices',
    function StatusCtl($scope, $rootScope, Meta, EbayServices) {
        $scope.ebayServices, $scope.form;

        EbayServices.refresh(['res/eBay Core.json'], ['eBay Core']).then(function (data) {
            //$scope.$apply(function(){$scope.ebayServices = data; return data;});
            $scope.ebayServices = angular.copy(data);
            $scope.form = angular.copy(data);
        });

        $scope.clear = function () {
            $scope.form = angular.copy($scope.ebayServices);
        }

        $scope.save = function () {
            //_data = angular.copy($scope.form);
            $scope.ebayServices = $scope.form;
            $scope.form = angular.copy($scope.ebayServices);

            EbayServices.update($scope.form).then(function (success) {
                if (success)
                    $scope.responseText = 'Updated';
                else
                    $scope.responseText = 'Failed';
            });
        }

        $scope.isChanged = function () {
            if ($scope.responseText != '')
                $scope.responseText = ''
        }

        $scope.isClearDisabled = function () {
            return angular.equals($scope.ebayServices, $scope.form);
        };

        $scope.isSaveDisabled = function () {
            return angular.equals($scope.ebayServices, $scope.form);
        };

        $scope.curTime = new Date(Date.now()).toUTCString();
        $scope.responseText = "";
        $scope.statusDic = ['OK', 'Partial', 'Failed'];
    }]);

projectCtls.controller('StatusQueryCtl', ['$scope', 'Meta', 'EbayQuery', function StatusQueryCtl($scope, Meta, EbayQuery) {

    $scope.meta = {};
    $scope.meta_add;
    Meta.refresh('res/meta.json').then(function (data) {
        _.map(data, function (v, k) {
            $scope.meta[k] = [];
            var count = 0;
            var column = 3;
            var temp = {};
            _.each(v, function (v1, k1) {
                v1['selected'] = false;
                temp[k1] = v1;
                count++;
                if (count == column) {
                    count = 0;
                    $scope.meta[k].push(temp);
                    temp = {};
                }
            });
            $scope.meta[k].push(temp);
        });
        //console.log($scope.meta);
        $scope.meta_add = angular.copy($scope.meta);
    });


    $scope.queryForm = {
        'impacts': "",
        'start': null,
        'end': null,
        'statusList': {"OK": false, "Partial": false, "Failed": false}
    };

    $scope.selectedServices = "Select Services";
    $scope.updateImpacts = function () {
        $scope.queryForm.impacts = "";
        $scope.selectedServices = "";
        _.each($scope.meta, function (v, k) {
            _.each(v, function (item) {
                _.each(item, function (v1, k1) {
                    if (v1.selected) {
                        $scope.selectedServices += v1.nick + ", ";
                        $scope.queryForm.impacts += k1 + ", ";
                    }
                });
            });
        });
        if ($scope.queryForm.impacts.length == 0) {
            $scope.selectedServices = "Select Services";
            $scope.queryForm.impacts = "";
        }
        else {
            $scope.queryForm.impacts = $scope.queryForm.impacts.substring(0, $scope.queryForm.impacts.length - 2);
            $scope.selectedServices = $scope.selectedServices.substring(0, $scope.selectedServices.length - 2);
        }
    };

    $scope.result;
    $scope.queryHint = "";
    $scope.query = function () {
        $scope.queryHint = "";
        if (_.isNull($scope.queryForm.start) || _.isNull($scope.queryForm.end) ||
            $scope.queryForm.start.trim().length == 0 || $scope.queryForm.end.trim().length == 0) $scope.queryHint = "please enter valid time";
        else if (_.filter($scope.queryForm.statusList,function (v, k) {
            return v;
        }).length == 0) $scope.queryHint = "please select at least one status";
        else {
            $scope.result = null;
            EbayQuery.query($scope.queryForm).then(function (data) {
                if (_.isNull(data) || data.length == 0)  $scope.queryHint = "no data";
                else $scope.result = angular.copy(data);
            });
        }
    }


    $scope.addFormEmpty = {
        'impacts': "",
        'start': null,
        'end': null,
        'status': "",
        'desc': ''
    };
    $scope.addForm = {
        'impacts': "",
        'start': null,
        'end': null,
        'status': "",
        'desc': ''
    };

    $scope.selectedServices_add = "Select Services";
    $scope.updateImpacts_add = function () {
        $scope.addForm.impacts = "";
        $scope.selectedServices_add = "";
        _.each($scope.meta_add, function (v, k) {
            _.each(v, function (item) {
                _.each(item, function (v1, k1) {
                    if (v1.selected) {
                        $scope.selectedServices_add += v1.nick + ", ";
                        $scope.addForm.impacts += k1 + ", ";
                    }
                });
            });
        });
        if ($scope.addForm.impacts.length == 0) {
            $scope.selectedServices_add = "Select Services";
            $scope.addForm.impacts = "";
        }
        else {
            $scope.addForm.impacts = $scope.addForm.impacts.substring(0, $scope.addForm.impacts.length - 2);
            $scope.selectedServices_add = $scope.selectedServices_add.substring(0, $scope.selectedServices_add.length - 2);
        }
    };

    $scope.clearForm = function () {
        _.each($scope.meta_add, function (v, k) {
            _.each(v, function (item) {
                _.each(item, function (v1, k1) {
                    v1.selected = false;
                });
            });
        });
        $scope.selectedServices_add = "Select Services";
        $scope.addForm = angular.copy($scope.addFormEmpty);
    }
    $scope.isClearDisabled = function () {
        return angular.equals($scope.addForm, $scope.addFormEmpty);
        ;
    };
    $scope.isAddDisabled = function () {
        return angular.equals($scope.addForm, $scope.addFormEmpty);
        ;
    };

    $scope.addOutput = "";
    $scope.add = function () {
        EbayQuery.add($scope.addForm).then(function (data) {
            $scope.addOutput = "Added! ";
        });
    }
}]);