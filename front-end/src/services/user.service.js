(function () {
    'use strict';

    angular
        .module('aisApp')
        .service('userService', userService);

    userService.$inject = ['$http', 'authService'];

    function userService($http, authService) {
        var service = this;
        var token = authService.getToken();
        var options = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        service.getUsers = function () {
            return $http.get('/api/users', options);
        }

        service.addUser = function (user) {
            return $http.post('/api/users', user, options)
                .then(function (res) {
                    return res;
                });
        };
    }
})();