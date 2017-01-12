(function () {
    'use strict'

    angular 
        .module('aisApp')
        .controller('newUserCtrl', newUserCtrl)

    newUserCtrl.$inject = ['userService', '$timeout']

    function newUserCtrl(userService, $timeout) {
        var newUser = this;

        newUser.buttonMessage = "Add";
        newUser.buttonClass = "btn-primary"

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

                    newUser.buttonMessage = "Saved";
                    newUser.buttonClass = "btn-success"

                    $timeout(function () {
                        newUser.buttonMessage = "Add"
                        newUser.buttonClass = "btn-primary"
                    }, 3000)

                }, function (err) {
                    
                    newUser.buttonMessage = err.data.message
                    newUser.buttonClass = "btn-danger"

                    $timeout(function () {
                        newUser.buttonMessage = "Add"
                        newUser.buttonClass = "btn-primary"
                    }, 3000)

                })
        }
    }
})();