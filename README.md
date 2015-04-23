##Carousel Lesson Starter Kit - Step 2: Adding Child Nodes

##Check out the Full Lesson Here:
[http://learn-staging.famo.us/lessons/carousel/Layout.html](http://learn-staging.famo.us/lessons/carousel/Layout.html)

=================

_Excerpt from Step 2: Adding Child Nodes_

## Layout

<span class="intro-graf">
Let's look at how to organize and position elements in Famous in order to create a layout for our application.
</span>

We'll use the parent class, `Carousel`, to initialize the sub-elements of the app. You can follow along in the [Carousel.js](https://github.famo.us/learn/lesson-carousel-steps/blob/step1/HelloFamous/src/carousel/Carousel.js) file.

<span class="art-insert">
![AddingAreas](http://learn-staging.famo.us/lessons/carousel/assets/images/appareas.png)
</span>

The diagram above illustrates where within the screen each of the elements will reside. We can establish these element areas by adding [scene graph nodes](#) to the root node, and then styling them with [components](#).

## Adding child elements

Since all elements in Famous are represented by [scene graph nodes](#), we need to add new nodes in order to establish new elements. To add a child node, simply call `.addChild()` on the scene graph node you wish to extend. (The returned object will be a new node that you can add even more children to, and so on.)

Because we need to create four elements --- two `Arrow` elements, a `Dots` element, and a `Pager` element, we will need to call `.addChild()` four times on our root node `this.root`. In addition to our nodes, we'll also create references to the _dispatch_ object for each node, as well as some empty _storage_ objects to hold the sub-elements components of these child instances.

    /**
     * Carousel.js (as of step 2)
     */

    var Context = require('famous-core').Context;
    var HTMLElement = require('famous-dom-renderables').HTMLElement;

    function Carousel(selector, data) {
        this.context = new Context(selector);
        this.root = this.context.addChild();

        // Keep reference to the page data, which is
        // the images we'll display in our carousel
        this.pageData = data.pageData;

        this.arrows = {};
        var backArrowNode = this.root.addChild();
        var dispatch = backArrowNode.getDispatch();
        var nextArrowNode = this.root.addChild();
        var dispatch = nextArrowNode.getDispatch();

        this.pager = {};
        var pagerNode = this.root.addChild();
        var dispatch = pagerNode.getDispatch();

        this.dots = {};
        var dotsNode = this.root.addChild();
        var dispatch = pagerNode.getDispatch();           
    }

    module.exports = Carousel;

<div class="sidenote">
<p><strong>Modified files:</strong> <a href="https://github.famo.us/learn/lesson-carousel-steps/blob/step2/AddingComponents/src/carousel/Carousel.js">Carousel.js</a></p>
</div>

## Attaching components

We recommend sizing, positioning, and styling elements from the parent element --- an approach we call _top-down_. Being consistent about where your app's positioning and sizing control comes from will give you a great advantage as it grows in complexity.

Following this convention, we will add `Size`, `Position`, `Align`, and `MountPoint` components to the _storage_ objects we created within `Carousel` in the previous step. (Below, note the commented out lines below and make sure to include them in your code; these will come into play later when we create our classes.)
    
    /**
     * Carousel.js (as of step 3)
     */

    var Context = require('famous-core').Context;
    var HTMLElement = require('famous-dom-renderables').HTMLElement;
    var Size = require('famous-components').Size;
    var Position = require('famous-components').Position;
    var Align = require('famous-components').Align;
    var MountPoint = require('famous-components').MountPoint;

    // We'll uncommment these lines once we've built out
    // the individual element classes.
    //
    // var Arrow = require('./Arrow.js');
    // var Pager = require('./Pager.js');
    // var Dots = require('./Dots.js');

    function Carousel(selector, data) {
        this.context = new Context(selector);
        this.root = this.context.addChild();
        this.pageData = data.pageData;        

        // Note the commented-out lines below, which we will
        // uncomment once we've built out the implementations.

        this.arrows = {};
        var backArrowNode = this.root.addChild();
        var backArrowDispatch = backArrowNode.getDispatch();
        this.arrows.back = {
            node: backArrowNode,
            //childInstance: new Arrow(backArrowNode, { direction: -1}),
            size: new Size(backArrowDispatch),
            position: new Position(backArrowDispatch),
            align: new Align(backArrowDispatch),
            mountPoint: new MountPoint(backArrowDispatch)
        };

        var nextArrowNode = this.root.addChild();
        var nextArrowDispatch = nextArrowNode.getDispatch();
        this.arrows.next = {
            node: nextArrowNode,
            //childInstance: new Arrow(nextArrowNode, { direction: 1}),
            size: new Size(nextArrowDispatch),
            position: new Position(nextArrowDispatch),
            align: new Align(nextArrowDispatch),
            mountPoint: new MountPoint(nextArrowDispatch)
        };
     
        this.pager = {};
        var pagerNode = this.root.addChild();
        var pagerDispatch = pagerNode.getDispatch();
        this.pager = {
            node: pagerNode,
            //childInstance: new Pager(pagerNode, { pageData: this.pageData }),
            size: new Size(pagerDispatch),
            position: new Position(pagerDispatch),
            align: new Align(pagerDispatch),
            mountPoint: new MountPoint(pagerDispatch)
        };

        this.dots = {};
        var dotsNode = this.root.addChild();
        var dotsDispatch = dotsNode.getDispatch();
        this.dots = {
            node: dotsNode,
            //childInstance: new Dots(dotsNode, { numPages: this.pageData.length }),
            size: new Size(dotsDispatch),
            position: new Position(dotsDispatch),
            align: new Align(dotsDispatch),
            mountPoint: new MountPoint(dotsDispatch)
        };

        // We will add the implementation of this function
        // in the section below. Once added, uncomment this.
        //
        //_positionComponents.call(this);
    }

    module.exports = Carousel;

Notice how we pass each scene graph node's _dispatch_ to each component's constructor, and then store these instances in the storage objects for use later.

<div class="sidenote">
<p><strong>Modified files:</strong> <a href="https://github.famo.us/learn/lesson-carousel-steps/blob/step3/AddingComponents/src/carousel/Carousel.js">Carousel.js</a></p>
</div>

## Positioning children

Now that all of the child elements are set up and decorated with rendering components, we can position them.

For code reuse purposes, we'll put the positioning code into an external function called `_positionComponents()`. Also note the `_` (underscore) prefix, which we recommend to denote functions that are private to a module.

Copy and paste the following code snippet just below your `Carousel` constructor, and uncomment the constructor's call to `_positionComponents()`.

    /**
     * Carousel.js (as of step 4)
     * [complete file not shown]
     */

    // Place this snippet directly below the `Carousel`
    // constructor function.

    function _positionComponents() {
        this.arrows.back.size.setAbsolute(40, 40);
        this.arrows.back.position.set(40, 0, 0);
        this.arrows.back.align.set(0, .5, 0);
        this.arrows.back.mountPoint.set(0, .5, 0);

        this.arrows.next.size.setAbsolute(40, 40);
        this.arrows.next.position.set(-40, 0, 0);
        this.arrows.next.align.set(1, .5, 0);
        this.arrows.next.mountPoint.set(1, .5, 0);

        this.dots.size.setAbsolute(null, 20, 0);
        this.dots.position.set(0, -50, 0);
        this.dots.align.set(.5, 1, 0);
        this.dots.mountPoint.set(.5, 1, 0);

        this.pager.align.set(.5, .5, 0);
        this.pager.mountPoint.set(.5, .5, 0);
    }
    
    // Don't forget to uncomment the call to this function
    // inside your Carousel class!
    //
    //  /* _positionComponents.call(this); */
    //
    // If not called, the elements won't get positioned. 

Here, we reference the components through the storage objects we created in the previous steps. With this function, our nodes are sized and positioned. However, before any content will be visible, we will need to define child classes for the child elements `Pager`, `Arrow`, and `Dots`.

<div class="sidenote--other">
<p><strong>Modified files:</strong> <a href="https://github.famo.us/learn/lesson-carousel-steps/blob/step4/PositioningChildren/src/carousel/Carousel.js">Carousel.js</a></p>
</div>

<div class="sidenote">
<p><strong>Section recap:</strong> <a href="https://github.famo.us/learn/lesson-carousel-steps/tree/step4/PositioningChildren">Code for this step</a></p>
</div>

<span class="cta">
[Up next: Organizing code &raquo;](http://learn-staging.famo.us/lessons/carousel/OrganizingCode.html)

=================
All rights reserved. Famous Industries 2015
