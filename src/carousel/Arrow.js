var DOMElement = require('famous/dom-renderables/DOMElement');
var Node = require('famous/core/Node');

function Arrow(options) {
  Node.call(this);

  this.el = new DOMElement(this);
  this.el.setProperty('color', 'white')
  this.direction = options.direction;
  this.el.setContent(this.direction === 1 ? '>' : '<');
  this.el.setProperty('fontSize', '40px');
  this.el.setProperty('lineHeight', '40px');
  this.el.setProperty('cursor', 'pointer');
  this.el.setProperty('textHighlight', 'none');
  this.el.setProperty('zIndex', '2');

  // Listen to the click event
  this.addUIEvent('click');
}

Arrow.prototype = Object.create(Node.prototype);
Arrow.prototype.constructor = Arrow;

module.exports = Arrow;
