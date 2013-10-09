// global context variables

// offset information
var offsetX = 55;
var offsetY = 382;
var sizeX = 51;
var sizeY = 51;

// puzzle information
var currentPuzzle = 0;
var currentPuzzleScore = 0;
var score = 0;

// color information for the graph
var color = '#FF0000';

// position of stickman
var currentPosition = {x: 0, y: 0};
var distance = 0;
var Path = new Array();
var initialDisplacement = 0;

// keep track of the timer for animation
var timerID;

$(document).ready(function () {
  // Start the first puzzle
  loadPuzzle(currentPuzzle);
  
  // initiate stickman protocol
  $('#stickman').draggable({
    containment: [ 848, 324, 1180, 324 ],
    start: function () {
      startDrawing();
    },
    drag: function ( event, ui ) {
      distance = parseInt($(ui.helper).css('left'));
    }
  });
  
  // controls
  // reset the stage
  $('#restart').bind('mousedown', function () {
    $('#restart').attr('src', 'images/redo-red.png');
    resetCanvas(true);
  });
  
  $('#restart').bind('mouseup', function () {
    $('#restart').attr('src', 'images/redo.png');
  });
  
  // next puzzle
  $('#next').bind('mousedown', function () {
    $('#next').attr('src', 'images/next-red.png');
    currentPuzzle++;
    
    if (currentPuzzle >= Puzzles.length) {
      currentPuzzle = Puzzles.length - 1;
    }
    
    resetCanvas();
  });
  
  $('#next').bind('mouseup', function () {
    $('#next').attr('src', 'images/next.png');
  });
  
  // previous puzzle
  $('#previous').bind('mousedown', function () {
    $('#previous').attr('src', 'images/previous-red.png');
    currentPuzzle--;
    
    if (currentPuzzle < 0) {
      currentPuzzle = 0;
    }
    
    resetCanvas();
  });
  
  $('#previous').bind('mouseup', function () {
    $('#previous').attr('src', 'images/previous.png');
  });

});

function resetCanvas(resetScore) {
  // reset stickman
  $('#stickman').css('left', '20px');
  
  // clear the animation
  window.clearInterval(timerID);
  currentPosition = {x: 0, y: 0};
  distance = 0;
  
  // clear the stage
  clear();
  
  // reset the score
  
  if (resetScore) {
    score = score - currentPuzzleScore;
    $('#score-display').html(score);
  }
  
  // always reset the current puzzle score
  currentPuzzleScore = 0;
  
  // reset the current puzzle
  loadPuzzle(currentPuzzle);
}

function startDrawing() {
  // clear the previous path recorded by the stickman
  Path = new Array();
  
  // just in case, clear any previous animation
  window.clearInterval(timerID);
  
  if (Puzzles[currentPuzzle].type == "Displacement") {
    // now start the new animation
    timerID = window.setInterval("draw()", 100);
  } else {
    timerID = window.setInterval("draw()", 200);
  }
}

function draw() {
  if (currentPosition.x >= 1400) {
    window.clearInterval(timerID);
    return;
  }

  // alias the current position
  var x1 = currentPosition.x;
  var y1 = currentPosition.y;
  
  // find the new positions
  // time is always increasing
  var x2 = x1 + 20;
  
  switch (Puzzles[currentPuzzle].type) {
    case "Displacement":
        
        // displacement will be based on the stickman
        var y2 = (distance - 20)/55.3333;
        break;
    
    case "Velocity":
    
        // velocity will be based on the rate of change of the
        // stickman's displacement.
        // to calculate a velocity, we need the previous displacement
        // Good news is, the initial displacement is always 0.
        
        // first get the first displacement
        if (x1 == 0) {
          var d1 = initialDisplacement;
          var d2 = (distance - 20)/5.53333;
        } else {
          var d1 = Path[Math.round((x1 - 20)/20)];
          var d2 = (distance - 20)/5.53333;
        }
        
        Path[Math.round(x1/20)] = d2;
        
        var y2 = d2 - d1;
        //debug(y2);
        
        break;
    
    case "Acceleration":
    
    
        break;
  
  }
  
  // update the graph
  drawLine(x1/100, y1, x2/100, y2, '#0000ff');
  
  // update the scores
  
  // first find out what the value of the function is
  graphY = 0;
  var find = 'x';
  var re = new RegExp(find, 'g');
  for (var i = 0; i < Puzzles[currentPuzzle].length; i++) {
    if (x2/100 >= Puzzles[currentPuzzle][i].lowerbound
        && x2/100 <= Puzzles[currentPuzzle][i].upperbound) {
      graphY = eval(Puzzles[currentPuzzle][i].function.replace(re, x2/100));
    }
  }
    
  // now find the absolute value of the distance between where we are drawing
  // and the value of the function
  // we add one to prevent division by 0 later
  var difference = Math.abs(y2 - graphY) + 1;
  
  // now we want to assign more points for closer distances, and fewer points
  // for further distances. Maybe 1/x^2?
  var points = Math.round(10/(difference*difference*difference));
  
  currentPuzzleScore = Math.round(currentPuzzleScore + points);
  score = Math.round(score + points);
  
  $('#score-display').html(score);
  
  // get ready for the next round
  currentPosition.x = x2;
  currentPosition.y = y2;
}

function loadPuzzle(puzzle) {

  // change the title
  $('#puzzleName').html('Puzzle #' + (puzzle+1));
  
  // add the axis titles
  addLabel("Time", "x-axis");
  addLabel(Puzzles[puzzle]["type"], "y-axis");
  addLabel(Puzzles[puzzle]["type"] + " vs Time", "title");
  
  // load the function
  var find = 'x';
  var re = new RegExp(find, 'g');

  for (var i = 0; i < Puzzles[puzzle].length; i++) {
    
    for (var x = 0; x < 1400; x++) {
      
      if (x/100 >= Puzzles[puzzle][i].lowerbound
        && x/100 <= Puzzles[puzzle][i].upperbound) {
        
        var x1 = x/100;
        var x2 = (x+1)/100;
        var y1 = eval(Puzzles[puzzle][i].function.replace(re, x1));
        var y2 = eval(Puzzles[puzzle][i].function.replace(re, x2));
        
        drawLine(x1, y1, x2, y2, color);
      }
    }
  }
}

function addLabel(label, type) {
  var canvas = document.getElementById('theCanvas');  
  var ctx = canvas.getContext('2d');
  
  
  switch (type) {
    case "x-axis":
      ctx.font = "bold 18px sans-serif";
      ctx.fillText(label, 380, 425);
      break;
    case "y-axis":
      
      ctx.save();
      ctx.font = "bold 18px sans-serif";
      var metric = ctx.measureText(label);
      
      // We want to find the center of the text (or whatever point you want) and rotate about it
      var tx = 30 + metric.width/2;
      var ty = 300;

      // Displacement 116.9
      // Velocity 67.98
      // Translate to near the center to rotate about the center
      ctx.translate(tx, ty);

      // Then rotate...
      ctx.rotate(3 * Math.PI / 2);
      
      // Then translate back to draw in the right place!
      ctx.translate(-1*tx,-1*ty);
      
      ctx.fillText(label, 100, 305 - metric.width/2);
      
      ctx.restore();
      
      break;
    case "title":
      ctx.font = "bold 24px sans-serif";
      ctx.fillText(label, 300, 25);
      break;
  }
  
  
}

function clear() {
  var canvas = document.getElementById('theCanvas');  
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 800, 500);
}

function drawLine(x1, y1, x2, y2, color) {
  var canvas = document.getElementById('theCanvas');  
  var ctx = canvas.getContext('2d');

  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  //ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  
  ctx.moveTo(x1*sizeX + offsetX, offsetY - y1*sizeY);
  ctx.lineTo(x2*sizeX + offsetX, offsetY - y2*sizeY);
  
  ctx.stroke();
}

function debug(message) {
  $('#debug').append(message + '<br />');
}

function odebug(object) {
  for (var i in object) {
    debug(i + ":" + object[i]);
  }
}