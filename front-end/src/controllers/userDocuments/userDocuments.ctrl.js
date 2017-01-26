(function () {
    'use strict'

    angular 
        .module('aisApp')
        .controller('userDocumentsCtrl', userDocumentsCtrl)

    userDocumentsCtrl.$inject = ['documentService', '$stateParams'];

    function userDocumentsCtrl(documentService, $stateParams) {
        var vm = this;

        console.log($stateParams.user.name)

        vm.user = $stateParams.user;
        vm.documents = $stateParams.user.docs;

        vm.getDocument = function(userId, docName) {
            documentService.downloadDocument(userId, docName)
        }

    }

})();