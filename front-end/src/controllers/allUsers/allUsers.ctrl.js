(function () {
    'use strict'

    angular
        .module('aisApp')
        .controller('allUsersCtrl', allUsersCtrl);

    allUsersCtrl.$inject = ['userService'];

    function allUsersCtrl(userService) {
        var vm = this;

        userService.getUsers().then(function (res) {
            vm.users = res.data.users;
        });

    }
})();
