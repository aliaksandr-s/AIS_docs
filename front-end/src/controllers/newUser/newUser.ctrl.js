(function () {
    'use strict'

    angular 
        .module('aisApp')
        .controller('newUserCtrl', newUserCtrl)

    newUserCtrl.$inject = ['userService', '$timeout']

    function newUserCtrl(userService, $timeout) {
        var newUser = this;

        newUser.error = "";
        newUser.success = false;

        newUser.add = function () {

            var user = {
                name: newUser.name,
                email: newUser.email,
                password: newUser.password
            }
            
            userService.addUser(user)
                .then(function (res) {

                    newUser.name = "";
                    newUser.email = "";
                    newUser.password = "";
                    newUser.success = true;

                    $timeout(function () {
                        newUser.success = false;
                    }, 3000)

                }, function (err) {
                    
                    newUser.error = err.data.message

                    $timeout(function () {
                        newUser.error = "";
                    }, 3000)

                })
        }
    }
})();