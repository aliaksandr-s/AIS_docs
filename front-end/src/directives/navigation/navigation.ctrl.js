(function () {
    angular
        .module('aisApp')
        .controller('navigationCtrl', navigationCtrl);

    navigationCtrl.$inject = ['$rootScope', '$state', 'authService'];

    function navigationCtrl($rootScope, $state, authService) {
        var vm = this;

        vm.isLoggedIn = authService.isLoggedIn();
        vm.currentUser = authService.currentUser();
        vm.logout = function () {
            authService.logout();
            vm.isLoggedIn = authService.isLoggedIn();
            vm.currentUser = authService.currentUser();

            $rootScope.$emit('isLoginedOut');
        };

        $rootScope.$on('isLogined', function () {
            vm.isLoggedIn = authService.isLoggedIn();
            vm.currentUser = authService.currentUser();
        });
    }
})();