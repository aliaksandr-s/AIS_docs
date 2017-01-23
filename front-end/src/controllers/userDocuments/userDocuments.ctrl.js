(function () {
    'use strict'

    angular 
        .module('aisApp')
        .controller('userDocumentsCtrl', userDocumentsCtrl)

    userDocumentsCtrl.$inject = ['documentService'];

    function userDocumentsCtrl(documentService) {
        var vm = this;

        vm.documents = ['df', 'sdf', 'dff']

        vm.userId = documentService.getUserDocuments("587dda8f6f18ea1abe8b75e3")
        console.log(vm.userId)
    }

})();