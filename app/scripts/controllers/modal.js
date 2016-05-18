'use strict';

angular.module('clusteringApp')
.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {  

  $scope.ok = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});