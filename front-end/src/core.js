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
            .state('home.clients', {
                url: 'user/add',
                templateUrl: 'dist/controllers/newUser/newUser.view.html',
                controller: 'newUserCtrl',
                controllerAs: 'newUser'
            })
            .state('home.documents', {
                url: 'documents/add',
                templateUrl: 'dist/controllers/newDocument/newDocument.view.html',
                controller: 'newDocumentCtrl',
                controllerAs: 'newDoc'
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