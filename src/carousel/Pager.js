var DOMElement = require('famous/dom-renderables/DOMElement');
var PhysicsEngine = require('famous/physics/PhysicsEngine'); // To use later...
var FamousEngine = require('famous/core/FamousEngine');

function Pager (node, options) {
    this.node = node;
    this.currentIndex = 0;
    this.threshold = 4000;
    this.pageWidth = 0;
    this.pages = _createPages.call(this, node, options.pageData);

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
}

Pager.prototype.defineWidth = function(size){
  this.pageWidth = size[0];
}

Pager.prototype.onUpdate = function(time) {
    this.simulation.update(time)
    // we will fill this out later
    // ...

    // by queueing up our .onUpdate, we can be sure this will be called every frame
    FamousEngine.requestUpdateOnNextTick(this);
}

function _createPages(root, pageData) {
    var pages = [];

    for (var i = 0; i < pageData.length; i++) {
        var imageNode = root.addChild();

        imageNode.setSizeMode(1,1,1)
        imageNode.setAbsoluteSize(500, 500, 0);
        imageNode.setAlign(0.5, 0.5);
        imageNode.setMountPoint(0.5, 0.5);
        imageNode.setOrigin(0.5, 0.5);

        var el = new DOMElement(imageNode);
        el.setProperty('backgroundImage', 'url(' + pageData[i] + ')');
        el.setProperty('background-repeat', 'no-repeat');
        el.setProperty('background-size', 'cover');

        pages.push(imageNode);
    }

    return pages;
}

module.exports = Pager;
