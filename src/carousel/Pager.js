var DOMElement = require('famous/dom-renderables/DOMElement');
var PhysicsEngine = require('famous/physics/PhysicsEngine');
var FamousEngine = require('famous/core/FamousEngine');
var GestureHandler = require('famous/components/GestureHandler');

var physics = require('famous/physics');
var math = require('famous/math');
var Box = physics.Box;
var Spring = physics.Spring;
var RotationalSpring = physics.RotationalSpring;
var RotationalDrag = physics.RotationalDrag;
var Quaternion = math.Quaternion;
var Vec3 = math.Vec3;

function Pager (node, options) {
    this.node = node;
    this.currentIndex = 0;
    this.threshold = 4000;
    this.pageWidth = 0;

    var resizeComponent = {
        onSizeChange: function(size) {
            this.defineWidth(size)
        }.bind(this)
    };
    this.node.addComponent(resizeComponent);

    // Add a physics simulation and update this instance
    // using regular time updates from the clock.
    this.simulation = new PhysicsEngine();

    // .requestUpdate will call the .onUpdate method next frame, passing in the time stamp for that frame
    FamousEngine.requestUpdate(this);

    this.threshold = 4000;
    this.force = new Vec3();

    this.pages = _createPages.call(this, node, options.pageData);
}

Pager.prototype.defineWidth = function(size){
  this.pageWidth = size[0];
};

Pager.prototype.onUpdate = function(time) {
    this.simulation.update(time)

    var page;
    var physicsTransform;
    var p;
    var r;
    for (var i = 0, len = this.pages.length; i < len; i++) {
        page = this.pages[i];

        // Get the transform from the `Box` body
        physicsTransform = this.simulation.getTransform(page.box);
        p = physicsTransform.position;
        r = physicsTransform.rotation;

        // Set the `imageNode`'s x-position to the `Box` body's x-position
        page.node.setPosition(p[0] * this.pageWidth, 0, 0);

        // Set the `imageNode`'s rotation to match the `Box` body's rotation
        page.node.setRotation(r[0], r[1], r[2], r[3]);
    }

    FamousEngine.requestUpdateOnNextTick(this);
};

Pager.prototype.pageChange = function(oldIndex, newIndex) {
    if (oldIndex < newIndex) {
        this.pages[oldIndex].anchor.set(-1, 0, 0);
        this.pages[oldIndex].quaternion.fromEuler(0, Math.PI/2, 0);
        this.pages[newIndex].anchor.set(0, 0, 0);
        this.pages[newIndex].quaternion.set(1, 0, 0, 0);
    } else {
        this.pages[oldIndex].anchor.set(1, 0, 0);
        this.pages[oldIndex].quaternion.fromEuler(0, -Math.PI/2, 0);
        this.pages[newIndex].anchor.set(0, 0, 0);
        this.pages[newIndex].quaternion.set(1, 0, 0, 0);
    }
    this.currentIndex = newIndex;
};

function _createPages(root, pageData) {
    var pages = [];

    for (var i = 0; i < pageData.length; i++) {
        var imageNode = root.addChild();

        imageNode.setSizeMode(1,1,1)
        imageNode.setAbsoluteSize(500, 500, 0);
        imageNode.setAlign(0.5, 0.5);
        imageNode.setMountPoint(0.5, 0.5);
        imageNode.setOrigin(0.5, 0.5);

        var gestureHandler = new GestureHandler(imageNode);
            gestureHandler.on('drag', function(index, e) {
                    this.force.set(e.centerDelta.x, 0, 0); // Add a force equal to change in X direction
                    this.force.scale(20); // Scale the force up
                    this.pages[index].box.applyForce(this.force); // Apply the force to the `Box` body

                    if (e.centerVelocity.x > this.threshold) {
                        if (this.draggedIndex === index && this.currentIndex === index) {
                            // Move index to left
                            this.node.emit('pageChange', {direction: -1, amount: 1});
                        }
                    }
                    else if (e.centerVelocity.x < -this.threshold){
                        if (this.draggedIndex === index && this.currentIndex === index) {
                            this.node.emit('pageChange', {direction: 1,  amount:1});
                        }
                    }

                    if (e.status === 'start') {
                        this.draggedIndex = index;
                    }
                }.bind(this, i));

        var el = new DOMElement(imageNode);
        el.setProperty('backgroundImage', 'url(' + pageData[i] + ')');
        el.setProperty('background-repeat', 'no-repeat');
        el.setProperty('background-size', 'cover');

        // A `Box` body to relay simulation data back to the visual element
        var box = new Box({
            mass: 100,
            size: [100,100,100]
        });

        // Place all anchors off the screen, except for the
        // anchor belonging to the first image node
        var anchor = i === 0 ? new Vec3(0, 0, 0) : new Vec3(1, 0, 0);

        // Attach the box to the anchor with a `Spring` force
        var spring = new Spring(null, box, {
            period: 0.6,
            dampingRatio: 0.5,
            anchor: anchor
        });

        // Rotate the image 90deg about the y-axis,
        // except for first image node
        var quaternion = i === 0 ? new Quaternion() : new Quaternion().fromEuler(0,-Math.PI/2,0);

        // Attach an anchor orientation to the `Box` body with a `RotationalSpring` torque
        var rotationalSpring = new RotationalSpring(null, box, {
            period: 1,
            dampingRatio: 0.2,
            anchor: quaternion
        });

        // Notify the physics engine to track the box and the springs
        this.simulation.add(box, spring, rotationalSpring);

        pages.push({
          node: imageNode,
          el: el,
          box: box,
          spring: spring,
          quaternion: quaternion,
          rotationalSpring: rotationalSpring,
          anchor: anchor
        });
    }

    return pages;
}

module.exports = Pager;
