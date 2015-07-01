'use strict';

var FamousEngine = require('famous/core/FamousEngine');

FamousEngine.init();

// App Code
var Carousel = require('./carousel/Carousel');
var imageData = require('./data/imageData');
var carousel = new Carousel('body', { pageData: imageData });
