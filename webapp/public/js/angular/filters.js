'use strict';

/* Filters */

var projectFilters = angular.module('projectFilters', []);

projectFilters.filter('StatusFilter', function () {
    return function (input) {
        var states = {'init':0,
            'hadoop_dpe_initialcheck':1,
            'hadoop_dpe_hddfailure':8,
            'hadoop_dpe_ready4decom':2,
            'hadoop_dpe_wait_decom':3,
            'hadoop_dpe_ready4dn_decom':8,
            'hadoop_dpe_ready4diag':4,
            'hadoop_dpe_report2vendor':5,
            'hadoop_dpe_wait_hp':8,
            'hadoop_dpe_restore':6,
            'hadoop_dpe_reimage':8,
            'hadoop_dpe_ready4readd':7,
            'hadoop_dpe_wait_readd':8,
            'hadoop_dpe_tivoli':8,
            'hadoop_dpe_network':8,
            'hadoop_dpe_reseat':8,
            'hadoop_dpe_misc':8,
            'hadoop_dpe_maintenance_resolved':8,
            'hadoop_dpe_wait_mptbase':8};
        if (input in states) return 'state' + states[input].toString();
        else return "state";
    };
});

projectFilters.filter('NodeFormatter', function () {
    return function (input) {
        if ('node' in input)
            return '<ul style="list-style-type: none;text-align:left;padding-left:5px;padding-top:3px;"><li>host:' + input.node
                + '</li><li>state: ' + input.state
                + '</li><li>last_modified: ' + input.last_modified
                + '</li><li>serial_number: ' + input.serial_number
                + '</li><li>asset_tag: ' + input.asset_tag
                + '</li><li>rack_location: ' + input.rack_location
                + '</li><ul>';
        else return '';
    };
});