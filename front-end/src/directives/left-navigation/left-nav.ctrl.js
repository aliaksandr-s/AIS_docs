(function () {
    angular
        .module('aisApp')
        .controller('leftNavCtrl', leftNavCtrl);

    leftNavCtrl.$inject = ['$rootScope', '$state', 'authService'];

    function leftNavCtrl($rootScope, $state, authService) {
        var vm = this;

        vm.isLoggedIn = authService.isLoggedIn();
        vm.currentUser = authService.currentUser();

        $rootScope.$on('isLogined', function () {
            vm.isLoggedIn = authService.isLoggedIn();
            vm.currentUser = authService.currentUser();
        });

        $rootScope.$on('isLoginedOut', function () {
            vm.isLoggedIn = authService.isLoggedIn();
            vm.currentUser = authService.currentUser();
        });
    }
})();