var DOMElement = require('famous/dom-renderables/DOMElement');
var PhysicsEngine = require('famous/physics/PhysicsEngine'); // To use later...

function Pager (node, options) {
    this.node = node;
    this.currentIndex = 0;
    this.threshold = 4000;
    this.pageWidth = 0;

    var resizeComponent = {
        onSizeChange: function(x, y, z) {
            this.defineWidth(x)
        }.bind(this)
    };
    this.node.addComponent(resizeComponent);

    this.pages = _createPages.call(this, node, options.pageData);
}

Pager.prototype.defineWidth = function(width){
  this.pageWidth = width;
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
