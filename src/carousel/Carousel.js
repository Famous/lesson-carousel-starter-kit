var FamousPlatform = require('famous');
var Famous = FamousPlatform.core.Famous;
var DOMElement = FamousPlatform.domRenderables.DOMElement;

function Carousel(selector, data) {
    this.context = Famous.createContext(selector);
    this.root = this.context.addChild();

    // Keep reference to the page data, which is
    // the images we'll display in our carousel
    this.pageData = data.pageData;

    this.arrows = {};
    var backArrowNode = this.root.addChild();
    var nextArrowNode = this.root.addChild();

    this.pager = {};
    var pagerNode = this.root.addChild();

    this.dots = {};
    var dotsNode = this.root.addChild();

    
}

module.exports = Carousel;