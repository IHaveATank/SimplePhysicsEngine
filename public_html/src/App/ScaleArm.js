/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global gEngine, SimpleShader, SquareRenderable, SceneNode */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ScaleArm(shader, name, xPivot, yPivot) {
    SceneNode.call(this, shader, name, true);   // calling super class constructor

    var xf = this.getXform();
    xf.setPivot(xPivot, yPivot);
    
    var obj = new SquareRenderable(shader);
    this.addToSet(obj);
    obj.setColor([0,1,0.5,1]);
    xf = obj.getXform();
    xf.setSize(2, 0.5);
    xf.setPosition(xPivot, yPivot);
    
    var obj = new SquareRenderable(shader);
    this.addToSet(obj);
    obj.setColor([1,0.5,0,1]);
    xf = obj.getXform();
    xf.setSize(0.5, 1.25);
    xf.setPosition(xPivot, yPivot - 0.85);
    
    var obj = new SquareRenderable(shader);
    this.addToSet(obj);
    obj.setColor([1,1,1,1]);
    xf = obj.getXform();
    xf.setSize(0.25, 1);
    xf.setPosition(xPivot, yPivot - 0.85);
    
    var obj = new SquareRenderable(shader);
    this.addToSet(obj);
    obj.setColor([1,1,0,1]);
    xf = obj.getXform();
    xf.setSize(0.5, 1);
    xf.setPosition(xPivot - 1, yPivot + 0.75);    
    
    var obj = new SquareRenderable(shader);
    this.addToSet(obj);
    obj.setColor([1,1,0,1]);
    xf = obj.getXform();
    xf.setSize(0.5, 1);
    xf.setPosition(xPivot + 1, yPivot + 0.75);      
    /*
    
    obj = new SquareRenderable(shader);
    this.addToSet(obj);
    obj.setColor([0,0.5,0.5,1]);
    xf = obj.getXform();
    xf.setSize(7, 0.75);
    xf.setPosition(xPivot, yPivot);
    
    obj = new SquareRenderable(shader);
    this.addToSet(obj);
    obj.setColor([0.5, 0.5, 0.7, 1]);
    xf = obj.getXform();
    xf.setSize(6, 0.5);
    xf.setPosition(xPivot, yPivot);
    
    obj = new SquareRenderable(shader);
    this.addToSet(obj);
    obj.setColor([1, 0, 1,1]);
    xf = obj.getXform();
    xf.setSize(5, 0.25);
    xf.setPosition(xPivot, yPivot); 
    
    obj = new SquareRenderable(shader);
    this.addToSet(obj);
    obj.setColor([1,1,1,1]);
    xf = obj.getXform();
    xf.setSize(4, 0.125);
    xf.setPosition(xPivot, yPivot);    
    /*
    var triObj = new TriangleRenderable(shader);
    this.addToSet(triObj);
    triObj.setColor([1, 1, 1, 1]);
    xf = triObj.getXform();
    xf.setSize(2,2);
    xf.setPosition(xPivot, 1 + yPivot);
    xf.setRotationInDegree(45);
    
    // now create the children shapes
    var obj = new SquareRenderable(shader);  // The yellow 1x2 base
    this.addToSet(obj);
    obj.setColor([1, 1, 0, 1]);
    xf = obj.getXform();
    xf.setSize(1, 2);
    xf.setPosition(xPivot, 1 + yPivot);
 
    obj = new SquareRenderable(shader);  // The red top
    this.addToSet(obj);
    obj.setColor([0.7, 0.2, 0.2, 1]);
    xf = obj.getXform();
    xf.setSize(1, 0.5); // so that we can see the connecting point
    xf.setPosition(xPivot, 1.75 + yPivot);
    
    obj = new SquareRenderable(shader); // The green base (left)
    this.addToSet(obj);
    obj.setColor([0, 1, 0, 1]);
    xf = obj.getXform();
    xf.setSize(0.25, 0.25); // so that we can see the connecting point
    xf.setPosition(xPivot+0.375, yPivot+0.125);
    
    obj = new SquareRenderable(shader); // The green base (right)
    this.addToSet(obj);
    obj.setColor([0, 1, 0, 1]);
    xf = obj.getXform();
    xf.setSize(0.25, 0.25); // so that we can see the connecting point
    xf.setPosition(xPivot-0.375, yPivot+0.125);
    
    obj = new SquareRenderable(shader); // The middle blue "circle"
    this.addToSet(obj);
    obj.setColor([0, 0, 1, 1]);
    xf = obj.getXform();
    xf.setSize(0.5, 0.5); // so that we can see the connecting point
    xf.setPosition(xPivot, yPivot+1);
    
    this.mPulseRate = 0.005;
    this.mRotateRate = -2;
    */
}
gEngine.Core.inheritPrototype(ScaleArm, SceneNode);

ScaleArm.prototype.update = function () {
    // index-1 is the red-top
    /*
    var xf = this.getRenderableAt(1).getXform();
    xf.incRotationByDegree(this.mRotateRate);
    
    // index-4 is the blue circle
    xf = this.getRenderableAt(4).getXform();
    xf.incSizeBy(this.mPulseRate);
    if (xf.getWidth() > 0.7 || xf.getWidth() < 0.4)
        this.mPulseRate = -this.mPulseRate;
        */
};