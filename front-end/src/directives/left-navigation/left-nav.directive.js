(function () {
    'use strict';

    angular
        .module('aisApp')
        .directive('aisLeftNav', aisLeftNav);

    function aisLeftNav() {
        return {
            restrict: 'E',
            templateUrl: '/dist/directives/left-navigation/left-nav.view.html',
            controller: 'leftNavCtrl as leftNav'
        };
    }
})();