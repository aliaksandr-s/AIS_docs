(function () {
    'use strict'

    angular
        .module('aisApp')
        .controller('newDocumentCtrl', newDocumentCtrl)

    newDocumentCtrl.$inject = ['documentService', '$scope', '$timeout']

    function newDocumentCtrl(documentService, $scope, $timeout) {
        var newDoc = this;

        newDoc.test = function () {
            documentService.test();
        }

        $scope.$watch('files', function () {
            documentService.uploadDocuments($scope.files)
        });

        $scope.$watch('file', function () {
            if ($scope.file != null) {
                $scope.files = [$scope.file];
            }
        });

    }
})();