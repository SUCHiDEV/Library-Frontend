app.controller('AppController', function($q, $scope, $window, $timeout, AppService){
    $scope.user = {
        isLogged: false,
        name: '',
        avgBooksYear: 0,
        avgPagesDay: 0,
        lastRead: false,
        currentRead: false,
        rentedBooks: [],
        borrowBooks: []
    };

    $scope.login = function(username, password){
//        console.log(username, password);
        AppService.doRequestPOST('/login?username='+username+'&password='+password).then(function(response){
            console.log(response);
        }, function(response){
            console.alert(response);
        });
    };
});
