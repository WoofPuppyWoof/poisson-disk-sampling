var r = 2; // 10
var k = 30;
var grid = [];
var w = r / Math.sqrt(2);
var active = [];
var cols, rows;
//var ordered = []; not needed

function setup() {
  createCanvas(400, 400);
  background(0);
  strokeWeight(4);
  //colorMode(HSB); just changes the color

  // STEP 0
  cols = floor(width / w);
  rows = floor(height / w);
  for (var i = 0; i < cols * rows; i++) {
    grid[i] = undefined;
  }

  // STEP 1
  var x = random(width); // width / 2
  var y = random(height); // height / 2
  var i = floor(x / w);
  var j = floor(y / w);
  var pos = createVector(x, y);
  grid[i + j * cols] = pos;
  active.push(pos);
  //frameRate(1);
}

function draw() {
  background(0);
  // noLoop();
  
  for (var total = 0; total < 25; total++) { // makes multiple points per frame
  if (active.length > 0) {
    var randIndex = floor(random(active.length));
    var pos = active[randIndex];
    var found = false;
    for (var n = 0; n < k; n++) {
      var sample = p5.Vector.random2D();
      var m = random(r, 2 * r);
      sample.setMag(m);
      sample.add(pos);

      var col = floor(sample.x / w);
      var row = floor(sample.y / w);

      if (col > -1 && row > -1 && col < cols && row < rows && !grid[col + row * cols]) {
        var ok = true;
        for (var i = -1; i <= 1; i++) {
          for (var j = -1; j <= 1; j++) {
            var index = (col + i) + (row + j) * cols;
            var neighbor = grid[index];
            if (neighbor) {
              var d = p5.Vector.dist(sample, neighbor);
              if (d < r) {
                ok = false;
              }
            }
          }
        }
        if (ok) {
          found = true;
          grid[col + row * cols] = sample;
          active.push(sample);
          //ordered.push(sample); not needed
          // should i break?
          break;
        }
      }
    }

    if (!found) {
      active.splice(randIndex, 1);
    }

  }
}

  for (var i = 0; i < grid/*ordered*/.length; i++) {
    if (grid/*ordered*/[i]) {
      stroke(255); // i % 360, 100, 100
      strokeWeight(1); // 4
      point(grid/*ordered*/[i].x, grid/*ordered*/[i].y);
    }
  }

   for (var i = 0; i < active.length; i++) {
     stroke(255, 0, 255);
     strokeWeight(1); // 4
     point(active[i].x, active[i].y);
   }
  console.log(active.length);
}
