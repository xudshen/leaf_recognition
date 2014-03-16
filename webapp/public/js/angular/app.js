/**
 * Created by xudshen on 13-10-9.
 */
'use strict';

/* App Module */
var project = angular.module('project', ['projectCtls', 'projectServices', 'projectFilters', 'projectDirect', 'ui.bootstrap'],
    function ($interpolateProvider) {
        $interpolateProvider.startSymbol('<[');
        $interpolateProvider.endSymbol(']>');
});