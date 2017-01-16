(function () {
    'use strict'

    angular
        .module('aisApp')
        .controller('allUsersCtrl', allUsersCtrl);

    allUsersCtrl.$inject = ['userService', 'documentService'];

    function allUsersCtrl(userService, documentService) {
        var vm = this;

        userService.getUsers().then(function (res) {
            vm.users = res.data.users;
        });

        vm.getDocument = function(userId, docName) {
            documentService.downloadDocument(userId, docName)

        }

    }
})();