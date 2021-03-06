(function () {
    'use strict'

    angular
        .module('aisApp')
        .service('documentService', documentService);

    documentService.$inject = ['$http', 'Upload', 'authService'];

    function documentService($http, Upload, authService) {
        var service = this;
        var token = authService.getToken();
        var options = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        service.uploadDocuments = function (file, userId) {
            return Upload.upload({
                url: 'api/documents',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                data: {
                    id: userId,
                    file: file
                }
            })
        }

        service.downloadDocument = function (userId, docName) {
            return $http.get('api/documents/' + userId + '/' + docName, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                // we should specify that response is a buffer
                responseType: 'arraybuffer',
                // get headers info to set content-type and the name of the file
                transformResponse: function (data, headers) {
                    return {
                        file: data,
                        fileName: headers()["file-name"],
                        fileType: headers()["content-type"]
                    }
                }
            }).then(function (res) {
                // convert our file from buffer -> 8bitArray -> Blob
                // Blob represents a file-like object
                var data = new Uint8Array(res.data.file)
                var url = URL.createObjectURL(new Blob([data], {
                    type: res.data.fileType
                }));

                // create a link element and fake click thus it will open download window
                var a = document.createElement('a');
                a.href = url;
                a.download = res.data.fileName;
                a.target = '_blank';

                a.click();
            })
        }

        service.getAllDocuments = function () {
            return $http.get('api/documents', options)
                .then(function (res) {
                    return res.data.allDocuments;
                });
        }

        service.getUserDocuments = function (userId) {
            return $http.get('api/documents/' + userId, options)
                .then(function (res) {
                    return res.data.userDocuments;
                });
        }
    }
})();