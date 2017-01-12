(function () {
    'use strict'

    angular
        .module('aisApp')
        .controller('newDocumentCtrl', newDocumentCtrl)

    newDocumentCtrl.$inject = ['documentService', '$scope', '$timeout']

    function newDocumentCtrl(documentService, $scope, $timeout) {
        var newDoc = this;

        $scope.$watch('files', function () {
            if ($scope.files && $scope.files.length) {
                for (var i = 0; i < $scope.files.length; i++) {
                    var file = $scope.files[i];
                    if (!file.$error) {
                        documentService.uploadDocuments(file)
                        .then(function (resp) {
                            console.log(resp.data.message)
                        });
                    }
                }
            }
        });

        $scope.$watch('file', function () {
            if ($scope.file != null) {
                $scope.files = [$scope.file];
            }
        });

    }
})();