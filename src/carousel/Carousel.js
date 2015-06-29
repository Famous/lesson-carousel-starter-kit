var FamousEngine = require('famous/core/FamousEngine');
var DOMElement = require('famous/dom-renderables/DOMElement');
// var Arrow = require('./Arrow.js');
// var Pager = require('./Pager.js');
// var Dots = require('./Dots.js');

function Carousel(selector, data) {
    this.context = FamousEngine.createScene(selector);
    this.root = this.context.addChild();

    // Keep reference to the page data, which is
    // the images we'll display in our carousel
    this.pageData = data.pageData;

    // this.arrows = {
    //     back: this.root.addChild(new Arrow({ direction: -1 })),
    //     next: this.root.addChild(new Arrow({ direction:  1 }))
    // };

    // this.pager = new Pager(this.root.addChild(), { pageData: this.pageData });

    // this.dots = new Dots(this.root.addChild(), { numPages: this.pageData.length });

    // _positionComponents.call(this);
}

function _positionComponents() {

    this.arrows.back.setSizeMode(1,1)
    this.arrows.back.setAbsoluteSize(40, 40);
    this.arrows.back.setPosition(40, 0, 0);
    this.arrows.back.setAlign(0, .5, 0);
    this.arrows.back.setMountPoint(0, .5, 0);

    this.arrows.next.setSizeMode(1,1)
    this.arrows.next.setAbsoluteSize(40, 40);
    this.arrows.next.setPosition(-40, 0, 0);
    this.arrows.next.setAlign(1, .5, 0);
    this.arrows.next.setMountPoint(1, .5, 0);

    this.dots.node.setSizeMode(1,1)
    this.dots.node.setAbsoluteSize(null, 20);
    this.dots.node.setPosition(0, -50, 0);
    this.dots.node.setAlign(.5, 1, 0);
    this.dots.node.setMountPoint(.5, 1, 0);

    this.pager.node.setAlign(.5, .5, 0);
    this.pager.node.setMountPoint(.5, .5, 0);
}

module.exports = Carousel;
