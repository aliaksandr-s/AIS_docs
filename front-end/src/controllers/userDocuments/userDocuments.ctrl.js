(function () {
    'use strict'

    angular 
        .module('aisApp')
        .controller('userDocumentsCtrl', userDocumentsCtrl)

    userDocumentsCtrl.$inject = ['documentService', '$stateParams'];

    function userDocumentsCtrl(documentService, $stateParams) {
        var vm = this;

        vm.user = $stateParams.user;
        // vm.documents = $stateParams.user.docs;
        console.log(vm.user._id)

        documentService.getUserDocuments($stateParams.user._id).then(function (res) {
            vm.documents = res;
            console.log(vm.documents)    
        }).catch(function (err) {
            console.log(err)
        })

        vm.getDocument = function(userId, docName) {
            documentService.downloadDocument(userId, docName)
        }

    }

})();