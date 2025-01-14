let capture;
let buffer = []; 
let maxBufferSize = 100; 
let numSegments = 5; 
let minSegmentSize = 1; 
let maxSegmentSize = 150; 
let blendModes = ['BLEND'];

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture({
    audio: false,
    video: {
      facingMode: {
        exact: "environment" 
      }
    }
  });
  capture.size(windowWidth, windowHeight);
  capture.hide(); 
}

function draw() {
  buffer.push(capture.get());

  if (buffer.length > maxBufferSize) {
    buffer.shift();
  }

  let delayFrames = int(random(1, 5));

  if (buffer.length >= delayFrames) {
    let delayedFrame = buffer[buffer.length - delayFrames];
    for (let i = 0; i < numSegments; i++) {
      let x = int(random(width));
      let y = int(random(height));
      let segmentWidth = int(random(minSegmentSize, maxSegmentSize));
      let segmentHeight = int(random(minSegmentSize, maxSegmentSize));
      let z = random(0, 20000); 

      let segment = delayedFrame.get(x, y, segmentWidth, segmentHeight);

      let randomBlendMode = random(blendModes);
      blendMode(eval(randomBlendMode));

      let perspectiveFactor = map(z, 1, 5000, 1, 0); 
      let perspectiveX = x - width / 2;
      let perspectiveY = y - height / 2;
      perspectiveX *= perspectiveFactor;
      perspectiveY *= perspectiveFactor;
      let transformedWidth = segmentWidth * perspectiveFactor;
      let transformedHeight = segmentHeight * perspectiveFactor;

      stroke(255);
      strokeWeight(2); 
      noFill(); 
      rect(perspectiveX + width / 2, perspectiveY + height / 2, transformedWidth, transformedHeight);

      image(segment, perspectiveX + width / 2, perspectiveY + height / 2, transformedWidth, transformedHeight);

      blendMode(BLEND);
    }
  }
}
