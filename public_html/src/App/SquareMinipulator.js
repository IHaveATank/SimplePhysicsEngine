/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global gEngine, SimpleShader, SquareRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function SquareMinipulator() {
    // variables of the shader for drawing: one shader to be shared by two renderables
    this.mConstColorShader = null;

    // variables for the squares
    this.mCurrentObject = null;        // these are the Renderable objects

    this.mConstColorShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",      // Path to the VertexShader 
        "src/GLSLShaders/SimpleFS.glsl");    // Path to the simple FragmentShader
       
    //0-left 1-right 2-top 3-bottom
    this.boundariesWC = [];       
    this.boundariesViewport = [];
    
    for (var i=0; i<4; i++) {
        this.mCurrentObject = new SquareRenderable(this.mConstColorShader);
        this.mCurrentObject.setColor([1, 1, 1, 1]);
        this.boundariesWC.push(this.mCurrentObject);
    }
    
    //this.boundariesWC[4].getXform().setSize(2.5, 2.5);

//    for (var i=0; i<5; i++) {
//        this.mCurrentObject = new SquareRenderable(this.mConstColorShader);
//        this.mCurrentObject.setColor([0, 0, 1, 1]);
//        this.boundariesViewport.push(this.mCurrentObject);
//    } 
//    
//    this.boundariesViewport[4].getXform().setSize(2.5, 2.5);
}

SquareMinipulator.prototype.draw = function (camera) { 
    camera.setupViewProjection();
//    for (var i=0; i<this.boundariesViewport.length; i++)
//        this.boundariesViewport[i].draw(camera); 
//    
    for (var i=0; i<this.boundariesWC.length; i++)
        this.boundariesWC[i].draw(camera);  
    
     
};


SquareMinipulator.prototype.setCenterWC = function (mX, nY, wcW, mW, mH) {
    var aspectDiff = mW/mH;
    var diff =((wcW+2)/2);
    this.boundariesWC[0].getXform().setPosition(-diff+mX, nY);
    this.boundariesWC[0].getXform().setSize(1, (wcW+2)/aspectDiff);  
    this.boundariesWC[1].getXform().setPosition(diff+mX, nY);
    this.boundariesWC[1].getXform().setSize(1, (wcW+2)/aspectDiff); 
    this.boundariesWC[2].getXform().setPosition(mX, (-diff/aspectDiff)+nY);
    this.boundariesWC[2].getXform().setSize(wcW+3, 1); 
    this.boundariesWC[3].getXform().setPosition(mX, (diff/aspectDiff)+nY);
    this.boundariesWC[3].getXform().setSize(wcW+3, 1);  
    //this.boundariesWC[4].getXform().setPosition(mX, nY);
};

//SquareMinipulator.prototype.setViewport = function (mL, mB, mW, mH) {
//    //Convert to WC
//    mL = (mL/4)-100;
//    mB = (mB/4)-75;
//    mW = mW/4;
//    mH = mH/4
//    
//    this.boundariesViewport[0].getXform().setPosition(mL-.5, mB+(mH/2));
//    this.boundariesViewport[0].getXform().setSize(1, mH+2);
//    this.boundariesViewport[1].getXform().setPosition(mL+mW+.5, mB+(mH/2));
//    this.boundariesViewport[1].getXform().setSize(1, mH+2); 
//    this.boundariesViewport[2].getXform().setPosition(mL+(mW/2), mB-.5);
//    this.boundariesViewport[2].getXform().setSize(mW+2, 1); 
//    this.boundariesViewport[3].getXform().setPosition(mL+(mW/2), mB+mH+.5);
//    this.boundariesViewport[3].getXform().setSize(mW+2, 1); 
//    this.boundariesViewport[4].getXform().setPosition(mL+mW/2, mB+mH/2);
//};

