(function () {
    'use strict';

    angular.module('aisApp', ['ui.router', 'ngFileUpload'])
        .config(['$stateProvider', '$locationProvider',
            '$urlMatcherFactoryProvider', '$urlRouterProvider', config
        ]);

    function config($stateProvider, $locationProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $urlMatcherFactoryProvider.caseInsensitive(true);

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'dist/controllers/home/home.view.html',
                controller: 'homeCtrl',
                controllerAs: 'home'
            })
            .state('newUser', {
                url: '/new-user',
                templateUrl: 'dist/controllers/newUser/newUser.view.html',
                controller: 'newUserCtrl',
                controllerAs: 'newUser'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'dist/controllers/login/login.view.html',
                controller: 'loginCtrl',
                controllerAs: 'login'
            })

        $locationProvider.html5Mode(true);
    }
})();