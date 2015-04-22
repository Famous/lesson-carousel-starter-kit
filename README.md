##Carousel Lesson Starter Kit

Screen shot at current step:

![screenshot](./Screenshot.png)

[http://learn-staging.famo.us/lessons/carousel/HelloFamous.html](http://learn-staging.famo.us/lessons/carousel/HelloFamous.html)

Hello Famous!

Before we begin creating the carousel itself, let’s display a basic “Hello World” message, just to establish the foundations for our application.

Throughout the app, we’ll use the JavaScript “class” pattern to organize our code. It’s a good idea to familiarize yourself with this pattern, since many Famous applications use it for structure.

A basic structure

Copy and paste the code snippets below into the files main.js and Carousel.js (respectively), which are included in the carousel starter kit that you downloaded in the getting started section.

/**
 * main.js
 */

var Carousel = require('./Carousel');
var data = require('../data/ImageData');
var carousel = new Carousel('body', { pageData: data });
/**
 * Carousel.js
 */

var Context = require('famous-core').Context;
var HTMLElement = require('famous-dom-renderables').HTMLElement;

function Carousel(selector, data) {
    // Create a Context instance. Contexts are
    // the starting point for all Famous apps.
    this.context = new Context(selector);

    // Add the first scene graph node to the
    // context. This is the 'root' node.
    this.root = this.context.addChild();

    // The node's dispatch is a special object
    // that we can decorate with visual components.
    var dispatch = this.root.getDispatch();

    // Decorate the dispatch with an HTMLElement
    // component, and use the component to apply
    // content and styling
    this.el = new HTMLElement(dispatch);
    this.el.content('Hello Famous!');
    this.el.property('font-size', '40px');
    this.el.property('color','white');
}

module.exports = Carousel;
Explanation

In the code above, note how the carousel constructor creates a new context object and passes it a CSS selector for the specific DOM element (in this case, the 'body') that we want to mount our app to.

The context object forms the base of the Famous scene graph and handles attaching our app to the DOM. Adding child nodes to the context – extending the scene graph – is the process by which we add visual elements to our app.

Pay attention to how the dispatch object gets passed as an argument to to the HTMLElement component’s constructor. This is how we decorate our scene graph nodes with visual components.

Next steps

Now that we understand how to put together a basic Famous scene, let’s move on to architecting our more-complex carousel app.



=================
All rights reserved. Famous Industries 2015