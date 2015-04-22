var FamousPlatform = require('famous');
var Famous = FamousPlatform.core.Famous;
var DOMElement = FamousPlatform.domRenderables.DOMElement;

function Carousel(selector, data) {
    // Create a Context instance. Contexts are
    // the starting point for all Famous apps.
    this.context = Famous.createContext(selector);

    // Add the first scene graph node to the
    // context. This is the 'root' node.
    this.root = this.context.addChild();

    // The node's dispatch is a special object
    // that we can decorate with visual components.

    // Decorate the dispatch with an DOMElement
    // component, and use the component to apply
    // content and styling
    this.el = new DOMElement(this.root);
    this.el.setContent('Hello Famous!');
    this.el.setProperty('font-size', '40px');
    this.el.setProperty('color','blue');
}

module.exports = Carousel;