var DOMElement = require('famous/dom-renderables/DOMElement');

function Arrow(node, options) {
  this.node = node;
  this.el = new DOMElement(node);
  this.el.setProperty('color', 'white')
  this.direction = options.direction;
  this.el.setContent(this.direction === 1 ? '>' : '<');
  this.el.setProperty('fontSize', '40px');
  this.el.setProperty('lineHeight', '40px');
  this.el.setProperty('cursor', 'pointer');
  this.el.setProperty('textHighlight', 'none');
  this.el.setProperty('zIndex', '2');
}

module.exports = Arrow;