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

    this.arrows; /*= {
        back: new Arrow(this.root.addChild(), { direction: -1 }),
        next: new Arrow(this.root.addChild(), { direction: 1 })
    };*/

    this.pager; //= new Pager(this.root.addChild(), { pageData: this.pageData });

    this.dots; //= new Dots(this.root.addChild(), { numPages: this.pageData.length });
}

module.exports = Carousel;
