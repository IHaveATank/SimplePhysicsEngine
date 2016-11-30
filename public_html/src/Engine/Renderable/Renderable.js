/*
 * File: Renderable.js
 *  
 * Encapsulate the Shader and VertexBuffer into the same object (and will include
 * other attributes later) to represent a Renderable object on the game screen.
 */
/*jslint node: true, vars: true */
/*global gEngine, Transform, mat4, matrix */
/* find out more about jslint: http://www.jslint.com/help.html */

// Constructor and object definition
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Renderable(shader) {
    this.mShader = shader;         // the shader for shading this object
    this.mXform = new Transform(); // transform that moves this object around
    this.mColor = [1, 1, 1, 1];    // color of pixel
    this.velocity = [0, 0];
    this.timer = 0;
    
    this.mGameObject = new GameObject(this);
}

Renderable.prototype.update = function () {};

//<editor-fold desc="Public Methods">
//**-----------------------------------------
// Public methods
//**-----------------------------------------
Renderable.prototype.draw = function (camera) {};
Renderable.prototype.computeAndLoadModelXform = function (parentMat) {
    var m = this.mXform.getXform();
    if (parentMat !== undefined)
        mat4.multiply(m, parentMat, m);
    this.mShader.loadObjectTransform(m);
};

Renderable.prototype.setVelocity = function (x, y) {
    this.velocity[0] = x ;
    this.velocity[1] = y;
};

Renderable.prototype.getXform = function () { return this.mXform; };
Renderable.prototype.setColor = function (color) { this.mColor = color; };
Renderable.prototype.getColor = function () { return this.mColor; };
Renderable.prototype.getVelocity = function () { return this.mVelocity; };

Renderable.prototype.getVelocity = function () { return this.velocity; };

Renderable.prototype.setXVelocity = function (x) {this.velocity[0] = x;};
Renderable.prototype.setYVelocity = function (y) {this.velocity[1] = y;};
Renderable.prototype.incXVelocity = function (x) {this.velocity[0] += x;};
Renderable.prototype.incYVelocity = function (y) {this.velocity[1] += y;};

Renderable.prototype.getGameObject = function() {return this.mGameObject;};

Renderable.prototype.incTimer = function (time) { this.timer += time;};
Renderable.prototype.setTimer = function (time) { this.timer = time;};
Renderable.prototype.getTimer = function () {return this.timer;};
Renderable.prototype.decTimer = function (time) { this.timer -= time;};
//--- end of Public Methods
//</editor-fold>