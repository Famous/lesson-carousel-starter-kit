var FamousEngine = require('famous/core/FamousEngine');
var DOMElement = require('famous/dom-renderables/DOMElement');

function Carousel(selector, data) {
    // Create a new Scene instance. Scenes are
    // the starting point for all Famous apps.
    this.context = FamousEngine.createScene(selector);

    // Add the first scene graph node to the
    // context. This is the 'root' node.
    this.root = this.context.addChild();

    // Decorate the node with a DOMElement
    // component, and use the component to apply
    // content and styling
    this.el = new DOMElement(this.root);
    this.el.setContent('Hello Famous!');
    this.el.setProperty('font-size', '40px');
    this.el.setProperty('color','white');
}

module.exports = Carousel;
