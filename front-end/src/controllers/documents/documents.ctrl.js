(function () {
    'use strict'

    angular
        .module('aisApp')
        .controller('documentsCtrl', documentsCtrl);

    documentsCtrl.$inject = ['documentService'];

    function documentsCtrl (documentService) {
        var vm = this;

        documentService.getAllDocuments().then(function (res) {
            vm.allDocuments = res;
            console.log(vm.allDocuments)
        });

        vm.downloadDocument = function(userId, docName) {
            documentService.downloadDocument(userId, docName)
        }
    }
})();
