(function () {
    angular 
        .module('aisApp')
        .controller('userCardCtrl', userCardCtrl);

    userCardCtrl.$inject = ['$scope', '$timeout', 'documentService'];

    function userCardCtrl($scope, $timeout, documentService) {
        var vm = this;

        vm.showUser = function () {
            console.log(vm.user._id)
        }

        vm.getDocument = function(userId, docName) {
            documentService.downloadDocument(userId, docName)
        }

        $scope.uploadFiles = function(files, errFiles, userId) {
            vm.message = "";
            
            $scope.files = files;
            $scope.errFiles = errFiles;
            angular.forEach(files, function(file) {

            documentService.uploadDocuments(file, userId)
                .then(function (resp) {
                    $timeout(function() {
                        vm.message = resp.data.message;
                    })
                }, function(err) {
                    console.log(err)
                })
            });
        }
    }
})();