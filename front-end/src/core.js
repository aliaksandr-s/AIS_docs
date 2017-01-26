(function () {
    'use strict';

    var app = angular.module('aisApp', ['ui.router', 'ngFileUpload'])
        .config(['$stateProvider', '$locationProvider',
            '$urlMatcherFactoryProvider', '$urlRouterProvider', config
        ]);

    function config($stateProvider, $locationProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $urlMatcherFactoryProvider.caseInsensitive(true);
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'dist/controllers/home/home.view.html',
                controller: 'homeCtrl',
                controllerAs: 'home'
            })
            .state('home.add-user', {
                url: 'users/add',
                templateUrl: 'dist/controllers/newUser/newUser.view.html',
                controller: 'newUserCtrl',
                controllerAs: 'newUser',
                resolve: { restrict: adminOnly }
            })
            .state('home.users', {
                url: 'users',
                templateUrl: 'dist/controllers/allUsers/allUsers.view.html',
                controller: 'allUsersCtrl',
                controllerAs: 'allUsers',
                resolve: { restrict: adminOnly }
            })
            .state('home.user-documents', {
                url: 'users/:name/documents',
                templateUrl: 'dist/controllers/userDocuments/userDocuments.view.html',
                controller: 'userDocumentsCtrl',
                controllerAs: 'userDocs',
                params: {user: null, name: null}                
            })
            .state('home.documents', {
                url: 'documents',
                templateUrl: 'dist/controllers/documents/document.view.html',
                controller: 'documentsCtrl',
                controllerAs: 'documents'
            })
            .state('home.add-documents', {
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

    }

    function adminOnly($q, $state, $timeout, authService) {
        if (authService.currentUser().profileStatus === "admin") {
            return $q.when()
        } else {
            $timeout(function () {
                $state.go('home')
            })
            return $q.reject()
        }
    }

    // check if a user logged in on every state change
    app.run(function ($rootScope, authService, $state, $location) {
        // Listen to '$locationChangeSuccess', not '$stateChangeStart'
        $rootScope.$on('$locationChangeSuccess', function () {
            if ($location.url() !== '/login' && !authService.isLoggedIn()) {
                $state.go('login')
            }
        })
    })


})();