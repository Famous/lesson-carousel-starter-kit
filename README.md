---
layout: default
title: User Interaction
---

<span class="intro-graf">
We've nearly got a working carousel, but we're still missing one important thing: user interaction. In Famous, we can accept and handle input by listening to traditional DOM events.
</span>

Lets start by making arrow interactions move the anchor positions of the page. Since our boxes are attached to the anchors by springs, the movement will provide the forces needed to animate the carousel.

## Emitting events

Within our classes, we'll set things up such that DOM events will be broadcasted up to the parent. We can accomplish this by using `Node#emit`.

Open the `Arrow.js` and add the following:


    // Within Arrow.js ...
    var GestureHandler = require('famous/components/GestureHandler');

    // within the Arrow constructor:
    function emitPageChange() {
        this.node.emit('pageChange', this.direction);
    }.bind(this);

    this.gestures = new GestureHandler(node);
    this.gestures.on('tap', emitPageChange);



This is roughly equivalent to adding `'mousedown'` and `'touchstart'` listeners manually. It is as if we had done:

    this.node.addUIEvent('touchstart');
    this.node.addUIEvent('mousedown');

    this.el.on('touchstart', emitPageChange);
    this.el.on('mousedown', emitPageChange);


Notice how we would add the event to the node with `.addUIEvent()`, and then listen to DOM events on the `DOMElement`. This asks the node to listen for an event, which it would then pass along to each of its components.
For convenience, we will however use the `GestureHandler`, which abstracts this process for us.

Now we need to set up a handler to respond to the `'pageChange'` event which we ourselves are firing in the `'tap'` callback.

<div class="sidenote">
<p><strong>Modified files:</strong> <a href="https://github.com/famous/lesson-carousel-starter-kit/blob/step8-EmittingHandlingEvents/src/carousel/Arrow.js">Arrow.js</a></p>
</div>

## Handling events

In the `Carousel.js` file, let's create an event handler to listen for events. We'll also write a private `_bindEvents` function to act upon these events.

Within the `Carousel` constructor function, add the following lines:

    this.currentIndex = 0;
    _bindEvents.call(this);

Next, add the following `_bindEvents` function to the bottom of the same file.

    function _bindEvents() {
        //listen for a 'pageChange' event and assign a callback
        this.node.on('pageChange', function(direction, amount) {
            amount = amount || 1;

            var oldIndex = this.currentIndex;

            var i = oldIndex + (direction * amount);
            var min = 0;
            var max = this.pageData.length - 1;

            var newIndex = i > max ? max : i < min ? min : i;

            if (this.currentIndex !== newIndex) {
                this.currentIndex = newIndex;
                this.dots.pageChange(oldIndex, this.currentIndex);
                this.pager.pageChange(oldIndex, this.currentIndex);
            }
        }.bind(this));
    }


When receiving a `'pageChange'` event, the carousel instance will call the `pageChange` method on the `Dots` and `Pager` instances. You'll notice that the `Dots` instance already has a `pageChange` method, but we haven't yet added one in Pager. Let's build one now:

    /**
     * Pager.js
     */

    Pager.prototype.pageChange = function(oldIndex, newIndex) {
        if (oldIndex < newIndex) {
            this.pages[oldIndex].anchor.set(-1, 0, 0);
            this.pages[oldIndex].quaternion.fromEuler(0, Math.PI/2, 0);
            this.pages[newIndex].anchor.set(0, 0, 0);
            this.pages[newIndex].quaternion.set(1, 0, 0, 0);
        } else {
            this.pages[oldIndex].anchor.set(1, 0, 0);
            this.pages[oldIndex].quaternion.fromEuler(0, -Math.PI/2, 0);
            this.pages[newIndex].anchor.set(0, 0, 0);
            this.pages[newIndex].quaternion.set(1, 0, 0, 0);
        }
        this.currentIndex = newIndex;
    };

We move our physics anchors off screen by changing their x-postions to `-1` or `1`. Since we multiply our anchor position by the width of the screen in `Pager.update()`, the anchors will be offset fully from the center. If you save and refresh, the app should now animate when you click or touch one of the arrows.

<span class="sidenote">Modified Files: [Carousel.js](https://github.com/famous/lesson-carousel-starter-kit/blob/step8-EmittingHandlingEvents/src/carousel/Carousel.js)
  | [Pager.js](https://github.com/famous/lesson-carousel-starter-kit/blob/step8-EmittingHandlingEvents/src/carousel/Pager.js)
</span>

## Additional Events

### Keyboard events

Add the code below to the `Carousel.js` file's `_bindEvents()` function:



    window.addEventListener('keydown', function(e) {
        if (e.keyCode === 39) this.node.emit('pageChange', 1, 1);
        if (e.keyCode === 37) this.node.emit('pageChange', -1, 1);
    }.bind(this));

With this, now the app will toggle between pages when pressing the left and right arrow keys.

### Drag events

For finger swipes, our `Pager.js` file will again use a `GestureHandler`:


In the `Pager` class constructor, add a threshold for swipe events, and a new force:

    this.threshold = 4000;
    this.force = new Vec3();

Add the snippet below _**inside the for-loop**_ in the `_createPages` function. (And remember to require `GestureHandler`).

    /**
     * Pager.js
     * [complete file not shown]
     */

    // Include this *inside* the for-loop in
    // the `_createPages` function, for each of the imageNode's
    var gestureHandler = new GestureHandler(imageNode);
        gestureHandler.on('drag', function(index, e) {
                this.force.set(e.centerDelta.x, 0, 0); // Add a force equal to change in X direction
                this.force.scale(20); // Scale the force up
                this.pages[index].box.applyForce(this.force); // Apply the force to the `Box` body

                if (e.centerVelocity.x > this.threshold) {
                    if (this.draggedIndex === index && this.currentIndex === index) {
                        // Move index to left
                        this.emitter.emit('pageChange', -1, 1);
                    }
                }
                else if (e.centerVelocity.x < -this.threshold){
                    if (this.draggedIndex === index && this.currentIndex === index) {
                        this.emitter.emit('pageChange', 1, 1);
                    }
                }

                if (e.status === 'start') {
                    this.draggedIndex = index;
                }
            }.bind(this, i));

The gesture handler above applies force to the box through the `'drag'` event for subtle feedback that the dragging has started. However, when the drag velocity is past a certain threshold, we emit a `'pageChange'` event to reposition the anchors and animate the carousel.

<div class="sidenote--other">
<p><strong>Modified files:</strong> <a href="https://github.com/famous/lesson-carousel-starter-kit/blob/step8-EmittingHandlingEvents/src/carousel/Pager.js">Pager.js</a> | <a href="https://github.com/famous/lesson-carousel-starter-kit/blob/step8-EmittingHandlingEvents/src/carousel/Carousel.js">Carousel.js</a></p>
</div>

<div class="sidenote">
<p><strong>Section recap:</strong> <a href="https://github.com/famous/lesson-carousel-starter-kit/tree/step8-EmittingHandlingEvents">Code for this step</a></p>
</div>
