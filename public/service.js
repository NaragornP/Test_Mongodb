angular.module('myApp.service', [])

.factory('Persons', ['$http',
  function($http) {

    return {
      getAll: function(callback) {
        $http.get('/getContact')
          .success(function(data, status, headers, config) {
            callback(data);
          }).
        error(function(data, status, headers, config) {
          callback({
            error: 1
          });
        });
      },
      addPerson: function(inputContact,inputTel,callback) {
        var tmp = {
          name: inputContact,
          tel: inputTel
        };

        $http.get('/addContact',{params : tmp})
          .success(function(data, status, headers, config) {
            callback(data);
          }).
        error(function(data, status, headers, config) {
          callback({
            error: 1
          });
        });
      },
      delete: function(index, callback) {
        $http.get('/removeContact/'+index)
          .success(function(data, status, headers, config) {
            callback(data);
          }).
        error(function(data, status, headers, config) {
          callback({
            error: 1
          });
        });
      },
      edit: function(page, callback) {


        $http.get('/updateContact/'+page._id, {params : page})
          .success(function(data, status, headers, config) {
            callback(data);
          }).
        error(function(data, status, headers, config) {
          callback({
            error: 1
          });
        });
      }
    };


  }
]);
