<span class="intro-graf">
Before we begin creating the carousel itself, let's display a basic "Hello World" message, just to establish the foundations for our application.
</span>

Throughout the app, we'll use the JavaScript "class" pattern to organize our code. It's a good idea to familiarize yourself with this pattern, since many Famous applications use it for structure.

## A basic structure

Copy and paste the code snippets below into the files `carousel/Carousel.js`.

    /**
     * carousel/Carousel.js
     */

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


## Explanation

In the code above, note how the carousel constructor calls `.createScene()` on the `Famous` component and passes it a _CSS selector_ for the specific DOM element (in this case, the `'body'`) that we want to mount our app to.

The scene object (returned from `.createScene`) forms the base of the Famous scene graph and handles attaching our app to the DOM. Adding child nodes to the scene -- extending the scene graph -- is the process by which we add visual elements to our app.

Pay attention to how the _root_ scene graph node gets passed as an argument to the HTMLElement component's constructor. This is how we _decorate_ our scene graph nodes with visual components.

## Next steps

Now that we understand how to put together a basic Famous scene, let's move on to architecting our more-complex carousel app.

<div class="sidenote--other">
<p><strong>Modified files:</strong> <a href="https://github.com/famous/lesson-carousel-starter-kit/blob/step1-HelloFamous/src/carousel/Carousel.js">carousel/Carousel.js</a></p>
</div>

<div class="sidenote">
<p><strong>Section recap:</strong> <a href="https://github.com/famous/lesson-carousel-starter-kit/tree/step1-HelloFamous">Code for this step</a></p>
</div>
