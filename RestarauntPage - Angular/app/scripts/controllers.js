'use strict';

var app = angular.module('confusionApp');
        app.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            $scope.tab = 1;
            //comment
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.dishes= menuFactory.getDishes();

            
            
            $scope.select = function(setTab){
                $scope.tab = setTab;
                
                switch(setTab){
                    case 2:
                        $scope.filtText = "appetizer";
                        break;
                    case 3:
                        $scope.filtText = "mains";
                        break;
                    case 4:
                        $scope.filtText = "dessert";
                        break;
                    default:
                        $scope.filtText = "";
                }
            };
            
            $scope.toggleDetails = function(){
               //single line inversion of a boolean variable
                $scope.showDetails = !$scope.showDetails;
                /* inversion using if state
                if($scope.showDetails ){
                    $scope.showDetails = false;
                } else{
                    $scope.showDetails = true;
                }
                */
            };
            
            $scope.isSelected = function(checkTab){
                return ($scope.tab === checkTab);
            };
        }])
        
        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", 
                               firstName:"", 
                               lastName:"",
                               agree:false, 
                               email:"" };
             var channels = [
                 {value:"tel", label:"Tel."},
                 {value:"Email", label:"Email"}
             ];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
        }])

        .controller('FeedbackController', ['$scope', function($scope) {
           $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])
        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
            var dish= menuFactory.getDish(parseInt($stateParams.id,10));
                        $scope.dish = dish;
                    }])

        .controller('DishCommentController', ['$scope', function($scope) {
            
            //Step 1: Create a JavaScript object to hold the comment from the form
             $scope.mycomment = {
                  rating:5,
                  comment:"",
                  author:"",
                  date:""
             };
            
            $scope.submitComment = function () {
                
               $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                $scope.dish.comments.push($scope.mycomment);

                $scope.commentForm.$setPristine();
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
                console.log($scope.commentForm);
                console.log($scope.mycomment);
            }
        }])
         .controller('IndexController', ['$scope','menuFactory','corporateFactory', function($scope,menuFactory,corpfac) {

            $scope.dish = menuFactory.getDish(0);
                 


            $scope.promotionDish = menuFactory.getPromotion(0);
            $scope.execleader = corpfac.getLeader(3);

        }])
        .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {

        $scope.leaders = corporateFactory.getLeaders();

        }])

        
    ;