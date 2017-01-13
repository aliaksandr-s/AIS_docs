(function () {
    'use strict'

    angular
        .module('aisApp')
        .service('documentService', documentService);

    documentService.$inject = ['$http', 'Upload'];

    function documentService($http, Upload) {
        var service = this;

        service.uploadDocuments = function (file) {
            return Upload.upload({
                url: 'api/document',
                data: {
                    id: "email",
                    file: file
                }
            })
        }
    }
})();