(function () {
    'use strict'

    angular
        .module('aisApp')
        .controller('documentsCtrl', documentsCtrl);

    documentsCtrl.$inject = ['userService'];

    function documentsCtrl (userService) {
        var vm = this;

        userService.getUsers().then(function (res) {
            vm.users = res.data.users;
        });
    }
})();
