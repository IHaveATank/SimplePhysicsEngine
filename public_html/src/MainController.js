/* 
 * File: MainController.js
 * Container controller for the entire world
 */

/*jslint node: true, vars: true, bitwise: true */
/*global angular, document, ClassExample, Camera, CanvasMouseSupport */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

// Creates the "backend" logical support for appMyExample
var myModule = angular.module("appMyExample", ["CSS450Timer", "CSS450Slider", "CSS450Xform"]);

// registers the constructor for the controller
// NOTE: the constructor is only called _AFTER_ the </body> tag is encountered
//       this code does NOT run until the end of loading the HTML page
myModule.controller("MainCtrl", function ($scope) {
    // Initialize the graphics system
    gEngine.Core.initializeWebGL('GLCanvas');
    $scope.mCanvasMouse = new CanvasMouseSupport('GLCanvas'); 
    
    $scope.testingGit = 0;
    // All the mouse coordinate points
    $scope.mClientX = 0;
    $scope.mClientY = 0;
    $scope.mCanvasX = 0;
    $scope.mCanvasY = 0;
    $scope.mViewportX = 0;
    $scope.mViewportY = 0;
    $scope.mCameraX = 0;
    $scope.mCameraY = 0;
    $scope.mWhichCamera = "Large";
    $scope.mWCWindowDrag = false;
    $scope.mViewPortWindowDrag = false;
    $scope.mDargX = 0;
    $scope.mDargY = 0;
    $scope.mOriginalX = 0;
    $scope.mOriginalY = 0;
    $scope.mColor = "FF0000";
    $scope.mInsertShape = false;
    $scope.mActivatePhysics = false;
    $scope.xVelocity = 0;
    $scope.yVelocity = 0;
    

       // this is the model
    $scope.mMyWorld = new ClassExample();
    $scope.mMySquareMinipulator = new SquareMinipulator();

    $scope.mView = new Camera(
                [0, 0],         // wc Center
                100,                // wc Wdith
                [750, 600, 250, 200]);  // viewport: left, bottom, width, height
    
    // small view support
    $scope.setSmallViewWC = function () {       
        $scope.mSmallView.setWCWidth(parseInt($scope.mSmallViewWCWidth));
        
        $scope.mMySquareMinipulator.setCenterWC(
            parseInt($scope.mSmallViewWCCenter[0]),
            parseInt($scope.mSmallViewWCCenter[1]),
            parseInt($scope.mSmallViewWCWidth),
            parseInt($scope.mSmallViewport[2]),
            parseInt($scope.mSmallViewport[3])
        ); 
    };
    
    $scope.setSmallViewWCCenter = function () {                           
        $scope.mMySquareMinipulator.setCenterWC(
            parseInt($scope.mSmallViewWCCenter[0]),
            parseInt($scope.mSmallViewWCCenter[1]),
            parseInt($scope.mSmallViewWCWidth),
            parseInt($scope.mSmallViewport[2]),
            parseInt($scope.mSmallViewport[3])
        ); 

        $scope.mSmallView.setWCCenter(
            parseInt($scope.mSmallViewWCCenter[0]),
            parseInt($scope.mSmallViewWCCenter[1])
        );    
    };
    
    $scope.setSmallViewport = function () {
        var v = $scope.mSmallView.getViewport();
        var i;
        for (i=0; i<4; i++)
            v[i] = parseInt($scope.mSmallViewport[i]);
        
//        $scope.mMySquareMinipulator.setViewport(
//            parseInt($scope.mSmallViewport[0]),
//            parseInt($scope.mSmallViewport[1]),
//            parseInt($scope.mSmallViewport[2]),
//            parseInt($scope.mSmallViewport[3])
//        );

        $scope.mMySquareMinipulator.setCenterWC(
            parseInt($scope.mSmallViewWCCenter[0]),
            parseInt($scope.mSmallViewWCCenter[1]),
            parseInt($scope.mSmallViewWCWidth),
            parseInt($scope.mSmallViewport[2]),
            parseInt($scope.mSmallViewport[3])
        );    
    };
    
    $scope.mSmallViewWCWidth = 50;
    $scope.mSmallViewport = [0, 0, 1000, 600];
    $scope.mSmallViewWCCenter = [0, 0];
    $scope.mSmallView = new Camera(
                [0, 0],// wc Center
                 50, // wc width
                [0, 0, 1000, 600]);    // viewport: left, bottom, width, height
    $scope.mSmallView.setBackgroundColor([0.9, 0.7, 0.7, 1]);
    $scope.setSmallViewWC();
    $scope.setSmallViewWCCenter();
    $scope.setSmallViewport();

    $scope.mainTimerHandler = function () {
        // Step E: Clear the canvas
        gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);        // Clear the canvas
        if ($scope.mActivatePhysics) {
        $scope.mMyWorld.update();
    }
        // $scope.mMyWorld.update();
        $scope.mMyWorld.draw($scope.mView); 
        $scope.mMyWorld.draw($scope.mSmallView);  
        $scope.mMySquareMinipulator.draw($scope.mView);
        
       // $scope.mMySquareMinipulator.draw($scope.mView);
    };

    $scope.computeWCPos = function (event) {
        var wcPos = [0, 0];
        $scope.mClientX = event.clientX;
        $scope.mClientY = event.clientY;
        
        $scope.mCanvasX = $scope.mCanvasMouse.getPixelXPos(event);
        $scope.mCanvasY = $scope.mCanvasMouse.getPixelYPos(event);
        var useCam = $scope.mView; // assume using this camera
        $scope.mWhichCamera = "Large";
        if ($scope.mSmallView.isMouseInViewport($scope.mCanvasX, $scope.mCanvasY)) {
            useCam = $scope.mSmallView;
            $scope.mWhichCamera = "Small";
        }
        
        // these are "private functions" on the camera, 
        // for the purpose of clear illustration, we will call them
        $scope.mViewportX = useCam._viewportX($scope.mCanvasX);
        $scope.mViewportY = useCam._viewportY($scope.mCanvasY);
        
        wcPos[0] = useCam.mouseWCX($scope.mCanvasX);
        wcPos[1] = useCam.mouseWCY($scope.mCanvasY);
        $scope.mCameraX = wcPos[0];
        $scope.mCameraY = wcPos[1];
        return wcPos;      
    };

    // Mouse support for creation of objects
    $scope.defineSquare = function (event) {
        var temp = $scope.checkMinipulation()
        if (!temp) { 
            if ( $scope.mInsertShape)
            {                   
            var wcPos = $scope.computeWCPos(event);           
            $scope.mMyWorld.defineCenter(wcPos, $scope.xVelocity , $scope.yVelocity  );
            $scope.mSelectedXform = $scope.mMyWorld.currentObject().getXform();   
                
            }
            else
            {
            $scope.mDargX = $scope.mCanvasX;
            $scope.mDargY = $scope.mCanvasY;
            $scope.mOriginalX = $scope.mSmallViewWCCenter[0];
            $scope.mOriginalY = $scope.mSmallViewWCCenter[1];
        }
        
        }
        else
        {
            $scope.mSmallViewWCCenter[0] = $scope.mCameraX;
            $scope.mSmallViewWCCenter[1] = $scope.mCameraY; 
            $scope.setSmallViewWCCenter();
        }
    };

    $scope.setVelocity = function () {
        $scope.mMyWorld.setVelocity(this.xVelocity, this.yVelocity);
    };
    
    $scope.dragSquare = function (event) {
        var wcPos = $scope.computeWCPos(event);
        
        // console.log("dragging");
        switch (event.which) {
        case 1: // left
            if ($scope.mWCWindowDrag) {
            $scope.mSmallViewWCCenter[0] = $scope.mCameraX;
            $scope.mSmallViewWCCenter[1] = $scope.mCameraY; 
            $scope.setSmallViewWCCenter();
            }               
//            else if ($scope.mViewPortWindowDrag) {
//            $scope.mSmallViewport[0] = $scope.mCanvasX - ($scope.mSmallViewport[2]/2);
//            $scope.mSmallViewport[1] = $scope.mCanvasY - ($scope.mSmallViewport[3]/2); 
//            $scope.setSmallViewport();
//            }
            else {
                //$scope.mMyWorld.defineWidth(wcPos);
                if ( !$scope.mInsertShape) {    
                $scope.mSmallViewWCCenter[0] = $scope.mOriginalX + (($scope.mDargX - $scope.mCanvasX)*.05);
                $scope.mSmallViewWCCenter[1] = $scope.mOriginalY + (($scope.mDargY - $scope.mCanvasY)*.05);
                $scope.setSmallViewWCCenter();
            }
            }
            break;
        default:
            $scope.mWCWindowDrag = false;
            $scope.mViewPortWindowDrag = false;
            break;   
        } 
    };
    
    $scope.checkMinipulation = function()
    {     
//        var wMX = $scope.mCanvasX - ($scope.mSmallViewport[0] + ($scope.mSmallViewport[2]/2));
//        var wMY = $scope.mCanvasY - ($scope.mSmallViewport[1] + ($scope.mSmallViewport[3]/2));
//        if ((wMX > -10 && wMX < 10) && (wMY > -10 && wMY < 10)) {
//            $scope.mViewPortWindowDrag = true; 
//            return true;
//        }
        //if ($scope.mWhichCamera === "Large") {
        //var wcPos = $scope.computeWCPos(pos);
//        var wMX = $scope.mCanvasX - (($scope.mSmallViewWCCenter[0]+100)*4);
//        var wMY = $scope.mCanvasY - (($scope.mSmallViewWCCenter[1]+75)*4);
//        if ((wMX > -10 && wMX < 10) && (wMY > -10 && wMY < 10)) {
//            $scope.mWCWindowDrag = true;
//            return true;
//        }
//        
        if ($scope.mCanvasX > 750 && $scope.mCanvasY > 600) {
            $scope.mWCWindowDrag = true;
            return true;
        }
        //}       
        //else if ($scope.mWhichCamera === "Small") {
            
        //}
        
        return false;
    };
});