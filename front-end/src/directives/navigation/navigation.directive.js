(function () {
    angular
        .module('aisApp')
        .directive('aisNavigation', navigation);

    function navigation() {
        return {
            restrict: 'E',
            templateUrl: '/dist/directives/navigation/navigation.view.html',
            controller: 'navigationCtrl as navvm'
        };
    }
})();