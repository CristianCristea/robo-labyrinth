"use strict";

function MazeSpace(directions) {
  var i;
  for(i=0; i<directions.length; i++) {
    this[directions[i]] = false;
  }
}

MazeSpace.prototype.setWall = function(direction) {
  this[direction] = true;
};