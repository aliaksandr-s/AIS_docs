(function () {
    'use strict'

    angular
        .module('aisApp')
        .service('documentService', documentService);

    documentService.$inject = ['$http', 'Upload'];

    function documentService($http, Upload) {
        var service = this;

        // service.uploadDocuments = function (files) {
        //     if (files && files.length) {
        //         for (var i = 0; i < files.length; i++) {
        //             var file = files[i];
        //             if (!file.$error) {
        //                 Upload.upload({
        //                     url: 'api/document',
        //                     data: {
        //                         email: "email",
        //                         file: file
        //                     }
        //                 }).then(function (resp) {
        //                     console.log(resp)
        //                 });
        //             }
        //         }
        //     }
        // };

        service.uploadDocuments = function (file) {
            return Upload.upload({
                url: 'api/document',
                data: {
                    email: "email",
                    file: file
                }
            })
        }
    }
})();