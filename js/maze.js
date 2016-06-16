"use strict";

function Maze(width, height) {
  this.width = width;
  this.height = height;

  this.startX           = null;
  this.startY           = null;
  this.startOrientation = null;
  this.endX             = null;
  this.endY             = null;

  this.directions = ["north", "south", "east", "west"];
  this.spaces = [];

  var x, y;
  for(x=1; x <= width; x++) {
    // create an empty array inside each width elem 
    this.spaces[x] = [];

    // loop through each elem and create an MazeSpace obj
    for(y=1; y <= height; y++) {
      this.spaces[x][y] = new MazeSpace(this.directions);
    }
  }

}

// setter methods
Maze.prototype.setStart = function(x, y, orientation) {
  if (this.isInBounds(x, y) && this.isValidDirection(orientation)) {
    this.startX = x;
    this.startY = y;
    this.startOrientation = orientation;
    return true;
  }
  return false;
};

Maze.prototype.setEnd = function(x, y) {
  if (!this.isInBounds(x, y)) {
    return false;
  }
  this.endX = x;
  this.endY = y;
  return true;
};

Maze.prototype.setWall = function(x, y, direction) {
  if ( this.isInBounds(x, y) && 
       this.isValidDirection(direction)
     ) {
    this.spaces[x][y].setWall(direction);
    return true;
  }
  return false;
};

Maze.prototype.isValidDirection = function(direction) {
  return this.directions.indexOf(direction) !== -1;
};

Maze.prototype.isInBounds = function(x, y) {
  return x > 0 && x <= this.width && y > 0 && y <= this.height;
};

Maze.prototype.canMove = function(x, y, direction) {
  // check if the direction is valid
  if (!this.isValidDirection(direction)) {
    return false;
  }

  // check if the current space is in the maze
  if (!this.isInBounds(x, y)) {
    return false;
  }

  // check if the space where the robot will move is in the maze
  var forwardX, forwardY;
  switch (direction) {
    case "north":
      forwardX = x;
      forwardY = y+1;
      break;
    case "east":
      forwardX = x+1;
      forwardY = y;
      break;
    case "south":
      forwardX = x;
      forwardY = y-1;
      break;
    case "west":
      forwardX = x-1;
      forwardY = y;
      break;
  }

  if (!this.isInBounds(forwardX, forwardY)) {
    return false;
  }

  // check for walls
  // check for wall on robot side
  if (this.spaces[x][y][direction]) {
    return false;
  }

  // check for wall on the other side
  var opposites = {
    north: "south",
    east: "west",
    south: "north",
    west: "east"
  };

  if (this.spaces[forwardX][forwardY][opposites[direction]]) {
    return false;
  }

  return true;
};