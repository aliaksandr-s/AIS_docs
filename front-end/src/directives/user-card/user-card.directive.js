(function () {
    angular
        .module('aisApp')
        .directive('aisUserCard', aisUserCard);

    function aisUserCard() {
        return {
            restrict: 'E',
            templateUrl: 'dist/directives/user-card/user-card.view.html',
            scope: {
                user: "="
            },
            controller: 'userCardCtrl as userCard',
            bindToController: true
        }
    }

})();