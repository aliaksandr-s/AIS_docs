(function () {
    angular
        .module('aisApp')
        .controller('navigationCtrl', navigationCtrl);

    navigationCtrl.$inject = ['$rootScope', '$state'];

    function navigationCtrl($rootScope, $state) {
        var vm = this;
        /*vm.isLoggedIn = authService.isLoggedIn();
        vm.currentUser = authService.currentUser();
        vm.logout = function () {
        	authService.logout();
        	vm.isLoggedIn = authService.isLoggedIn();
        	vm.currentUser = authService.currentUser();

        	$route.reload();
        };

        $rootScope.$on('isLogined', function () {
        	vm.isLoggedIn = authService.isLoggedIn();
        	vm.currentUser = authService.currentUser();
        });*/
    }
})();