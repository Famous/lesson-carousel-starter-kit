var DOMElement = require('famous/dom-renderables/DOMElement');
var GestureHandler = require('famous/components/GestureHandler');

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

  function emitPageChange() {
      this.node.emit('pageChange', this.direction);
  }

  this.gestures = new GestureHandler(node);
  this.gestures.on('tap', emitPageChange);
}

module.exports = Arrow;