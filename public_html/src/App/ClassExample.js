/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global gEngine, SimpleShader, SquareRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ClassExample() {
    this.mSizeChange = 0.01;
    this.mChildShouldUpdate = false;
    this.mArmShouldRotate = false;
    this.mHeadShouldSpin = false;   
    this.vmShouldDrawControl = false;
    
    // variables of the shader for drawing: one shader to be shared by two renderables
    this.mConstColorShader = null;

    // variables for the squares
    this.mCurrentObject = null;        // these are the Renderable objects

    this.mConstColorShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",      // Path to the VertexShader 
        "src/GLSLShaders/SimpleFS.glsl");    // Path to the simple FragmentShader

    this.mCurrentObject = new SquareRenderable(this.mConstColorShader);
    this.mCurrentObject.setColor([0, 1, 0, 1]);

    this.mCurrentObject.getXform().setPosition(-50,20);
    this.mCurrentObject.getXform().setSize(1, 1);
    
    this.mCurrentGameObject = new GameObject(this.mCurrentObject);
    
    this.mAllObjects = [];
    this.mAllObjects.push(this.mCurrentObject); 
    
    
    this.mXfSq =  new SquareRenderable(this.mConstColorShader);
    this.mXfSq.setColor([0.4, 0., 0.4, 1]);
    this.mXfSq.getXform().setSize(0.2, 0.2);


    this.mParent = new SceneNode(this.mConstColorShader, "Root", true);
    this.mParent.getXform().setPivot(0,1);
    
    this.mTopChild = new ScaleObject(this.mConstColorShader, "TopGen 1",
                            0, 2);
                            
    this.mParent.addAsChild(this.mTopChild);
    
    this.mMidClaw = new ScaleArm(this.mConstColorShader, "ClawGen 1", 0, 4);
    this.mTopChild.addAsChild(this.mMidClaw);
    
    this.mLeftClaw = new ScaleArm(this.mConstColorShader, "ClawGen 2", -4, 4);
    this.mTopChild.addAsChild(this.mLeftClaw);
    
    this.mRightClaw = new ScaleArm(this.mConstColorShader, "ClawGen 3", 4, 4);
    this.mTopChild.addAsChild(this.mRightClaw);
    
     // shapes in the parent
    var obj = new TriangleRenderable(this.mConstColorShader);
    this.mParent.addToSet(obj);
    obj.setColor([1, 0.5, 0, 1]);
    var xf = obj.getXform();
    xf.setSize(3,3);
    xf.setRotationInDegree(45);
    
    var obj = new TriangleRenderable(this.mConstColorShader);
    this.mParent.addToSet(obj);
    obj.setColor([0, 0, 0.8, 1]);
    var xf = obj.getXform();
    xf.setSize(1,1);
    xf.setPosition(0, 0.75);
    xf.setRotationInDegree(225);
    
    var obj = new TriangleRenderable(this.mConstColorShader);
    this.mParent.addToSet(obj);
    obj.setColor([0.5, 0, 1, 1]);
    var xf = obj.getXform();
    xf.setSize(1,1);
    xf.setPosition(0.75, 0);
    xf.setRotationInDegree(45); 
    
    var obj = new TriangleRenderable(this.mConstColorShader);
    this.mParent.addToSet(obj);
    obj.setColor([1, 0, 0.5, 1]);
    var xf = obj.getXform();
    xf.setSize(1,1);
    xf.setPosition(-0.75, 0);
    xf.setRotationInDegree(45); 
    
    var obj = new TriangleRenderable(this.mConstColorShader);
    this.mParent.addToSet(obj);
    obj.setColor([0, 0.5, 1, 1]);
    var xf = obj.getXform();
    xf.setSize(1,1);
    xf.setPosition(0, 0.8);
    xf.setRotationInDegree(45);
}

ClassExample.prototype.draw = function (camera) {

    // Step F: Starts the drawing by activating the camera
    camera.setupViewProjection(true);

    // centre red square
    for (var i=0; i<this.mAllObjects.length; i++)
        this.mAllObjects[i].draw(camera);
    
    
     this.mParent.draw(camera);
    if (this.vmShouldDrawControl) {
        this.mHeadSq.draw(camera);
        this.mBlueSq.draw(camera);
        this.mRedSq.draw(camera);
        this.mXfSq.draw(camera);
    }
};


ClassExample.prototype.update = function () {
    var i, xf, velocity, maxSpeed, j;
        // physics simulation
    this._physicsSimulation();
    //this.mEraser.draw(camera);
    
    
    for(i = 0; i < this.mAllObjects.length; i++)
    {
        var dt = this.mAllObjects[i].getTimer() * 0.00005;
        var obj = this.mAllObjects[i].getGameObject().getPhysicsComponent();
        var v = obj.mVelocity;
        vec2.scaleAndAdd(v, v, obj.mAcceleration, (obj.mInvMass * dt ));

        var pos = obj.mXform.getPosition();
        vec2.scaleAndAdd(pos, pos, v, dt);        
    }

    var ignoreVelocity;
    for (i=0; i<this.mAllObjects.length; i++) 
    {
        ignoreVelocity = false;
        xf = this.mAllObjects[i].getXform();
        velocity = this.mAllObjects[i].getVelocity();
        
        /*
        
        //this.mAllObjects[i].getGameObject().update();
        var collisionInfo = new CollisionInfo();
        var collided = null;
        for(j = 0; j < this.mAllObjects.length; j++)
        {
            var platBox = this.mAllObjects[j].getGameObject().getPhysicsComponent();
            collided = this.mAllObjects[i].getGameObject().getPhysicsComponent()
                    .collided(platBox, collisionInfo);
            
            
            if(collided)
            {
                var posVal = platBox.mXform.getPosition();
                xf.setYPos(posVal[1] + xf.getHeight());
                //this.mAllObjects[i].setTimer(0);
                
                ignoreVelocity = true;
                break;
                
            }
        }
        */
        
        if (xf.getYPos() - xf.getHeight() < 0.0) 
        {
            //xf.setYPos(0 + xf.getHeight()); // remove at i-position by 1
        } 
        else 
        {
            if(velocity[1] > 0) 
            {
                xf.setYPos(xf.getYPos() + (velocity[1] - 1));
                this.mAllObjects[i].incYVelocity(-.3);
            } 
            else 
            {
                maxSpeed = 1 * this.mAllObjects[i].getTimer();
                if(maxSpeed > 20) 
                {
                    maxSpeed = 20;
                }
                xf.setYPos(xf.getYPos() - maxSpeed);
                this.mAllObjects[i].incTimer(1);
            }
            
            var collisionInfo = new CollisionInfo();
            var collided = null;
            for(j = 0; j < this.mAllObjects.length; j++)
            {
                var platBox = this.mAllObjects[j].getGameObject().getPhysicsComponent();
                collided = this.mAllObjects[i].getGameObject().getPhysicsComponent()
                        .collided(platBox, collisionInfo);

            }
            
            if(collided)
            {
                var posVal = platBox.mXform.getPosition();
                
                xf.setYPos(posVal[1] + xf.getHeight());
                this.mAllObjects[i].setTimer(0);
                this.mAllObjects[i].setVelocity(0,0);
            }
            else if (xf.getYPos() - xf.getHeight() < 0.0) 
            {
                xf.setYPos(0 + xf.getHeight()); // remove at i-position by 1
                this.mAllObjects[i].setTimer(0);
            }
        } 
    }
    
    
//    // now lets remove the ones fall beneath the screen
//    for (i=this.mAllObjects.length-1; i>=0; i--) {
//        xf = this.mAllObjects[i].getXform();
//        
//        if(clickValue === true) {
//            if (this.mAllObjects[i].mayHaveCollided(this.mEraser)) {
//                this.mAllObjects.splice(i, 1);
//                this.mErasedCount++;
//            }
//        }
//    }
};

ClassExample.prototype.setVelocity = function (x, y) {
    if(this.mCurrentObject !== null) {
        this.mCurrentObject.setVelocity(x, y);
    }
};

ClassExample.prototype.currentObject = function () {
    return this.mCurrentObject;
};

ClassExample.prototype.defineCenter = function (pos, x, y) {
    this.mCurrentObject = new SquareRenderable(this.mConstColorShader);
    this.mCurrentObject.setColor([
        Math.random(), Math.random(), Math.random(), 1]);
    this.mCurrentObject.setVelocity(x, y);
    this.mAllObjects.push(this.mCurrentObject);
    var xf = this.mCurrentObject.getXform();
    xf.setXPos(pos[0]);
    xf.setYPos(pos[1]);
    xf.setSize(2, 2);
};

// from center to current position is 1/2 of width
ClassExample.prototype.defineWidth = function (pos) {
    var xf = this.mCurrentObject.getXform();
    var dx = Math.abs(pos[0] - xf.getXPos());
    var dy = Math.abs(pos[1] - xf.getYPos());
    xf.setSize(dx * 2, dy * 2);
};

ClassExample.prototype._physicsSimulation = function () {

    var i, j;
    for(i = 0; i < this.mAllObjects.length; i++)
    {
        for(j = 0; j < this.mAllObjects.length; j++)
        {
            gEngine.Physics.processObjObj(this.mAllObjects[i].getGameObject(), 
                            this.mAllObjects[j].getGameObject());
        }
    }
    
/*
    // Hero platform
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllPlatforms);
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllWalls);
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllDoors);
    var i;
    for(i = 0; i < this.mAllDarkCreeps.length; i++) {
    gEngine.Physics.processObjSet(this.mAllDarkCreeps[i], this.mAllPlatforms);
    gEngine.Physics.processObjSet(this.mAllDarkCreeps[i], this.mAllWalls);
    gEngine.Physics.processObjSet(this.mAllDarkCreeps[i], this.mAllDoors);
}
    // Minion platform
    gEngine.Physics.processSetSet(this.mAllMinions, this.mAllPlatforms);
    gEngine.Physics.processSetSet(this.mAllMinions, this.mAllWalls);
    gEngine.Physics.processSetSet(this.mAllMinions, this.mAllDoors);
*/
};
