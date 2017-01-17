(function () {
    'use strict'

    angular
        .module('aisApp')
        .controller('newDocumentCtrl', newDocumentCtrl)

    newDocumentCtrl.$inject = ['documentService', '$scope', 'authService', '$timeout']

    function newDocumentCtrl(documentService, $scope, authService, timeout) {
        var vm = this;

        $scope.$watch('files', function () {
            if ($scope.files && $scope.files.length) {
                for (var i = 0; i < $scope.files.length; i++) {
                    var file = $scope.files[i];
                    if (!file.$error) {
                        var userId = authService.currentUser().id;
                        documentService.uploadDocuments(file, userId)
                        .then(function (resp) {
                            vm.message = resp.data.message;
                        })
                    }
                }
            }
        });

    }
})();