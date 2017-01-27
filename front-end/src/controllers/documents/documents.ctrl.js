(function () {
    'use strict'

    angular
        .module('aisApp')
        .controller('documentsCtrl', documentsCtrl);

    documentsCtrl.$inject = ['documentService', 'authService'];

    function documentsCtrl (documentService, authService) {
        var vm = this;

        vm.sortType     = 'ownerName'; // set the default sort type
        vm.sortReverse  = false;

        console.log(authService.currentUser().profileStatus)
        console.log(authService.currentUser())


        if (authService.currentUser().profileStatus === 'admin') {
            documentService.getAllDocuments().then(function (res) {
                vm.documents = res;
            });
        } else {
            var currentUserId = authService.currentUser().id;
            console.log(currentUserId)
            // documentService.getUserDocuments(currentUserId).then(function (res) {
            //     vm.documents = res;
            // });
        }

        


        vm.downloadDocument = function(userId, docName) {
            documentService.downloadDocument(userId, docName)
        }
    }
})();
