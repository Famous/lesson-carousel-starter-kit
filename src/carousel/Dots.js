var DOMElement = require('famous/dom-renderables/DOMElement');

function Dots(node, options) {
    this.node = node;
   // Storage for all the children -- the 'dot' nodes
    this.dots = [];

    // Size and positioning for the individual dots
    this.dotWidth = options.dotWidth || 10;
    this.spacing = options.spacing || 5;

    // Determine how many children to add, and add them
    this.numPages = options.numPages;
    for (var i = 0; i < this.numPages; i++) {
        // Create new child node for each dot
        var dotNode = node.addChild();

        // Size the child
        dotNode.setSizeMode(1,1)
        dotNode.setAbsoluteSize(this.dotWidth, this.dotWidth)

        // Store child nodes in the dots array
        this.dots.push(new Dot(dotNode, i));
    }

    // Highlight the first dot in the collection
    this.dots[0].select();

    //add a component to keep dot layout updated
    var resizeComponent = {
        onSizeChange: function(size) {
            //this will layout the dots whenever a resize occurs
            this.layoutDots(size)
            //size === [parent size, 20, parent size]
        }.bind(this)
    };
    this.node.addComponent(resizeComponent);
}

// Evenly space out the dots
Dots.prototype.layoutDots = function(size) {
    if (size) {
        this.size = size;
    }
    var totalDotSize = this.dotWidth * this.numPages + this.spacing * (this.numPages - 1);
    var start = (this.size[0] - totalDotSize) / 2;
    for (var i = 0; i < this.numPages; i++) {
        this.dots[i].node.setPosition(start + (this.dotWidth + this.spacing) * i, 0, 0);
    }
}

// Updating the selected dots on change of current page.
Dots.prototype.pageChange = function(oldIndex, newIndex) {
    this.dots[oldIndex].dot.deselect();
    this.dots[newIndex].dot.select();
}

function Dot(node, options) {
    this.node = node;
    this.el = new DOMElement(node);
    this.el.setProperty('borderRadius', '5px');
    this.el.setProperty('border', '2px solid white');
    this.el.setProperty('boxSizing', 'border-box');
}

Dot.prototype.select = function() {
    this.el.setProperty('backgroundColor', 'white');
};

Dot.prototype.deselect = function() {
    this.el.setProperty('backgroundColor', 'transparent');
};

module.exports = Dots;
