(function () {
    'use strict'

    angular 
        .module('aisApp')
        .controller('adminCtrl', adminCtrl)

    adminCtrl.$inject = ['$scope']

    function adminCtrl($scope) {
        var vm = this;

        vm.test = 'HI'
    }
})();