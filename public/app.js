angular.module('myApp', ['myApp.service'])
  .controller('AppCtrl', ['$scope', 'Persons', function($scope, Persons) {

    $scope.persons = [];
 

    Persons.getAll(function(data){
      $scope.persons = data;
    });

    $scope.edit = function(person) {
      Persons.edit(person, function(data){
        // Grades.getAll(function(data){
        //   $scope.grades = data;
        // });
      });
    };

    $scope.delete = function(_id){
      Persons.delete(_id, function(data){
        Persons.getAll(function(data){
          $scope.persons = data;
        });
      });
    };

    $scope.addPerson = function(inputContact,inputTel) {
      Persons.addPerson(inputContact,inputTel, function(data){
        Persons.getAll(function(data){
          $scope.persons = data;
          $scope.inputContact='';
          $scope.inputTel='';	
        });
      });
    };


  }]);
