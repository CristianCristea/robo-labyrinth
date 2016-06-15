"use strict";

function Maze(width, height) {
  this.width = width;
  this.height = height;

  this.startX           = null;
  this.startY           = null;
  this.startOrientation = null;
  this.endX             = null;
  this.endY             = null;

  this.spaces = [];

  var x, y;
  for(x=1; x <= width; x++) {
    // create an empty array inside each width elem 
    this.spaces[x] = [];

    // loop through each y elem and add it to the array
    for(y=1; y <= height; y++) {
      this.spaces[x][y] = "(" + x + "," + y + ")";
    }
  }

}

// setter methods
Maze.prototype.setStart = function(x, y, orientation) {
  this.startX = x;
  this.startY = y;
  this.startOrientation = orientation;
};

Maze.prototype.setEnd = function(x, y) {
  this.endX = x;
  this.endY = y;
};