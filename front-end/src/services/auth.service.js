(function () {
    'use strict';

    angular
        .module('aisApp')
        .factory('authService', authService);

    authService.$inject = ['$http'];

    function authService($http) {
        var saveToken = function (token) {
            localStorage['ais-token'] = token;
        };
        var getToken = function () {
            return localStorage['ais-token'];
        };

        /*var register = function (user) {
                    return $http.post('/api/register', user).then(function (res) {
                        saveToken(res.data.token);
                    });
       };*/

        var login = function (user) {
            return $http.post('/sigin', user).then(function (res) {
                saveToken(res.data.token);
            });
        };

        var logout = function () {
            localStorage.removeItem('ais-token');
        };

        var isLoggedIn = function () {
            var token = getToken();
            if (token) {
                var payload = JSON.parse(atob(token.split('.')[1]));
                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        var currentUser = function () {
            if (isLoggedIn()) {
                var token = getToken();
                var payload = JSON.parse(atob(token.split('.')[1]));
                return {
                    id: payload._id,
                    email: payload.email,
                    name: payload.name,
                    profileStatus: payload.profileStatus
                };
            }
        };

        return {
            saveToken: saveToken,
            getToken: getToken,
            //register: register,
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            currentUser: currentUser
        };
    }
})();