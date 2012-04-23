var width = window.innerWidth;
var height = window.innerHeight;
var fps = 1000;
var block;
var context;

// write out canvas as we have to put width/height inline in the HTML, CSS will just scale pixels
document.write('<canvas id="canvas" width=' + width + ' height=' + height + '></canvas>');

function generate() {
    context = document.getElementById("canvas").getContext("2d");
    context.fillStyle = "#FFFFFF";
    context.strokeStyle = "#000000";
    context.fillRect(0,0, width, height);
    block = new NOISE(context, width);
    block.x = width/2;
    block.y = height/2;
    setInterval(draw, 1000 / fps);
}

function draw() {
    block.draw(context);
}

function NOISE(ctx, w) {
  this.x = 0;
  this.y = 0;
  this.width  = w;
  this.marginRatio = 0.00;
  this.panelRatio = 1;
  this.aspectRatio = 1;
  this.screenWidth = w * (1 - this.marginRatio * 3 - this.panelRatio);
  this.screenHeight = this.screenWidth / this.aspectRatio;
  this.screenWidth = 2000;
  this.screenHeight = 2000;
  this.screenXOffset = -w / 2 + this.marginRatio * w + this.screenWidth / 2;
  this.height = (w * this.marginRatio * 2 + this.screenWidth) / this.aspectRatio;
  this.pixels = new Pixels(ctx, this.screenWidth, this.screenHeight);
  this.draw = function(context) {
      context.save();
      context.translate(this.x, this.y);
      context.translate(this.screenXOffset, 0);
      this.drawStatic(context);
      context.restore();
  }
  this.drawStatic = function(context) {
      for (var y=0 ; y<this.pixels.height ; ++y) {
        for (var x=0 ; x<this.pixels.width ; ++x) {
          var grey = Math.random() * 255;
          this.pixels.color.r = 238;
          this.pixels.color.g = 20;
          this.pixels.color.b = 91;
          this.pixels.color.a = grey;
          this.pixels.putPixel(x, y);
        }
      }
      this.pixels.draw(context, this.x + this.screenXOffset, this.y);
  }
}

function Pixels(context, w,h) {
  this.image = context.getImageData(0, 0, w, h);
  this.width = w;
  this.height = h;
  this.color = new Object();
  this.color.r = 255;
  this.color.g = 255;
  this.color.b = 255;
  this.color.a = 10;
  this.putPixel = function(x,y) {
    var p = (y * this.image.width + x) * 4;
    this.image.data[p]   = this.color.r;
    this.image.data[p+1] = this.color.g;
    this.image.data[p+2] = this.color.b;
    this.image.data[p+3] = this.color.a;
  }
  this.draw = function(context, x, y) {
    context.putImageData(this.image, x - this.width/2, y - this.height/2);
  }
}

function rand(x) {
  return Math.random() * x;
}

function vary(x, variance) {
  return x + variance - 2 * rand(variance);
}