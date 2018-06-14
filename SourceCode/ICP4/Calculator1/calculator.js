angular.module('CalculatorApp', [])
    .controller('CalculatorController', function($scope) {
        $scope.result = function() {
            if ($scope.operator == '+') {
                return $scope.a + $scope.b;
            }
            if ($scope.operator == '-') {
                return $scope.a - $scope.b;
            }
            if ($scope.operator == '*') {
                return $scope.a * $scope.b;
            }
            if ($scope.operator == '/') {
                return $scope.a / $scope.b;
            }
            if ($scope.operator == '%') {
                return $scope.a % $scope.b;
            }
            if ($scope.operator == '^') {
                return $scope.a ^ $scope.b;
            }
            if ($scope.operator == 'Square root') {
                return Math.sqrt($scope.a) ;
            }
        };
    });