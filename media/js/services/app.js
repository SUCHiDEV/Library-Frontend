'use strict';

app.service('AppService',function($q, $http){

    var self = this;

    this.doRequestGET = function (request_url) {
        request_url = _addVariable(request_url);
        var def = $q.defer(),
            request = {
                headers: {
                    'X-Requested-With' :'XMLHttpRequest'
                },
                method  : 'GET',
                url     : request_url
            };

        http = $http(request).then(
            function(response){
                //success
                def.resolve(response);
            },
            function(response){
                //error
                def.reject(response);
            }
        );
        delete http;
        return def.promise;
    };

    this.doRequestPOST = function (request_url, data) {
        request_url = _addVariable(request_url);
        var def = $q.defer(),
            request = {
                headers: {
                    'X-Requested-With' :'XMLHttpRequest'
                },
                method  : 'POST',
                url     : request_url,
                data    : data
            };

        http = $http(request).then(
            function(response){
                //success
                def.resolve(response);
            },
            function(response){
                //error
                def.reject(response);
            }
        );
        delete http;
        return def.promise;
    };
});
