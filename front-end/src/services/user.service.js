(function () {
    'use strict';

    angular
        .module('aisApp')
        .service('userService', userService);

    userService.$inject = ['$http'];

    function userService($http) {
        var addUser = function (user) {
            return $http.post('/api/users', user).then(function (res) {
                return res
            });
        };

        return {
            addUser: addUser
        };
    }
})();