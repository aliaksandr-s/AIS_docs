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

(function () {
    'use strict'

    angular
        .module('aisApp')
        .controller('childController', childController);

    childController.$inject = ['userService', 'documentService', '$scope', '$timeout'];

    function childController(userService, documentService, $scope, $timeout) {
        var vm = this;

        userService.getUsers().then(function (res) {
            vm.users = res.data.users;
        });

        vm.getDocument = function(userId, docName) {
            documentService.downloadDocument(userId, docName)
        }

        $scope.uploadFiles = function(files, errFiles, userId) {
            $scope.files = files;
            $scope.errFiles = errFiles;
            angular.forEach(files, function(file) {

            documentService.uploadDocuments(file, userId)
                .then(function (resp) {
                    $timeout(function() {
                        vm.message = resp.data.message;
                    })
                }, function(err) {
                    console.log(err)
                })
            });
        }

    }
})();