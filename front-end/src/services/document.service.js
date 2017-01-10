(function () {
    'use strict'

    angular
        .module('aisApp')
        .service('documentService', documentService);

        documentService.$inject = ['$http', 'Upload'];

        function documentService($http, Upload) {
            var test = function () {
                console.log('test')
            }

            var uploadDocuments = function (files) {
                if (files && files.length) {
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        if (!file.$error) {
                            Upload.upload({
                                url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                                data: {
                                    email: "email",
                                    file: file
                                }
                            }).then(function (resp) {
                                console.log('uploaded')
                            });
                        }
                    }
                }
            };

            return {
                test: test,
                uploadDocuments: uploadDocuments
            }
        }
})();