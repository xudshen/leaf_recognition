/**
 * Created by xudshen on 13-10-9.
 */
'use strict';

/* Services */
var projectServices = angular.module('projectServices', ['ngResource']);

projectServices.factory('ClusterService', function ($http, $q) {
    var _data = null;

    function _refresh(cluster_name) {
        var url = '/cluster_nodes/?cluster=' + cluster_name
        _data = null;
        var deferred = $q.defer();
        $http.get(url).success(function (data) {
            _data = {};
            for (var idx in data){
                if (!(data[idx].rack_location in _data))
                    _data[data[idx].rack_location] = [];
                _data[data[idx].rack_location].push(data[idx]);
            }
            if ('' in _data){
                _data['unknown'] = _data['']
                _data = _.omit(_data, '');
            }
            console.log(_data);
            for (var k in _data)
            {
                var temp = [];
                var index = 0;
                var count = 0;
                for (var idx in _data[k])
                {
                    if(count == 0) temp[index] = [];
                    temp[index].push(_data[k][idx]);
                    count = count + 1;
                    if(count == 16){
                        index = index + 1;
                        count = 0;
                    }
                }
                while(count != 16){
                    temp[index].push({'state':count});
                    count ++;
                }
                _data[k] = temp;
            }
            console.log(_data);
            deferred.resolve(_data);
        }).error(function () {
                deferred.reject();
            });
        return deferred.promise;
    }

    return {
        refresh: _refresh
    }
});


projectServices.factory('Workflow', function ($http, $q) {
    var _data = null;

    function _refresh() {
        var url = '/workflowInfo';
        _data = null;
        var deferred = $q.defer();
        $http.get(url).success(function (data) {
            if('success' in data && data['success'])
                deferred.resolve(data['response']);
            else
                deferred.reject();
        }).error(function () {
                deferred.reject();
            });
        return deferred.promise;
    }

    function _log(node_name) {
        var url = '/get_workflow_log/?node=' + node_name;
        _data = null;
        var deferred = $q.defer();
        $http.get(url).success(function (data) {
            console.log(data);
            data = _.sortBy(data, function(item){ return new Date(item.timestamp); });
            console.log(data);
            deferred.resolve(data);
        }).error(function () {
                deferred.reject();
            });
        return deferred.promise;
    }

    return {
        refresh: _refresh,
        log: _log
    }
});


projectServices.factory('Meta', function ($http, $q) {
    var _data = null;

    function _find(input) {
        return _.filter(_.map(_data, function (value, key) {
            if (input in value) return value[input].nick;
        }), function (value) {
            if (!_.isNull(value)) return value;
        });
    }

    function _refresh(url) {
        _data = null;
        var deferred = $q.defer();
        $http.get(url).success(function (data) {
            _data = angular.copy(data);
            deferred.resolve(data);
        }).error(function () {
                deferred.reject();
            });
        return deferred.promise;
    }

    return {
        refresh: _refresh,
        find: function (input, url) {
            if (_.isNull(_data)) {
                return _refresh(url).then(function () {
                    return _find(input);
                });
            }
            else return _find;
        }

    }
});

projectServices.factory('EbayServices', function ($http, $q) {
    var _data = null;

    function _asyncProc(url, func) {
        var deferred = $q.defer();
        $http.get(url).success(function (data) {
            deferred.resolve(func(data));
        }).error(function () {
                deferred.reject();
            });
        return deferred.promise;
    }

    function _refresh(urls, alias, column) {
        //make sure return after all data received
        return $q.all(_.map(urls, function (url) {
                return _asyncProc(url, function (data) {
                    if(_.isUndefined(column) || _.isNull(column) || column <= 0){
                        return _.map(data, function (v, k) {
                            v.nick = k;
                            return v;
                        });
                    }
                    else{
                        var ret = []; var temp = []; var num = 0; var index = 0;
                        for(var k in data){
                            temp[num] = data[k];
                            num ++;
                            if(num == column){
                                num = 0;
                                ret[index ++] = temp;
                                temp = [];
                            }
                        }
                        if(temp.length != 0){
                            while(temp.length < column)
                            {
                                temp[temp.length] = temp.length;
                            }
                            ret[index] = temp;
                        }
                        return ret;
                    }
                })
            })).then(function (data) {
                //merge alias with correspond data
                return _.object(alias, data);
            });
    }

    function _update(data, alias) {
        var deferred = $q.defer();
        var formatedData = {};
        _.map(data, function(v,k){
            formatedData[k] = {};
            _.each(v, function(item){
                console.log(item);
                formatedData[k][item['nick']] = angular.copy(item);
            });
        });
        console.log(data);
        console.log(formatedData);
        $http({
            url: '/update',
            method: "POST",
            data: JSON.stringify(formatedData),
            headers: {'Content-Type': 'application/json'}
        }).success(function (data) {
                if (data == "ok")
                    deferred.resolve(true);
                else
                    deferred.resolve(false);
            }).error(function (data) {
                deferred.reject();
            });
        return deferred.promise;
    }

    return {
        refresh: _refresh,
        data: _data,
        update: _update
    }
});



projectServices.factory('EbayQuery', function ($http, $q) {
    function _query(form) {
        var deferred = $q.defer();
        $http({
            url: '/query',
            method: "POST",
            data: form,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject();
            });
        return deferred.promise;
    }

    function _add(form) {
        var deferred = $q.defer();
        $http({
            url: '/add',
            method: "POST",
            data: form,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject();
            });
        return deferred.promise;
    }

    return {
        query: _query,
        add: _add
    }
});