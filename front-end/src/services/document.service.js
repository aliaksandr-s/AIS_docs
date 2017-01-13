(function () {
    'use strict'

    angular
        .module('aisApp')
        .service('documentService', documentService);

    documentService.$inject = ['$http', 'Upload'];

    function documentService($http, Upload) {
        var service = this;

        service.uploadDocuments = function (file, userId) {
            return Upload.upload({
                url: 'api/document',
                data: {
                    id: userId,
                    file: file
                }
            })
        }
    }
})();