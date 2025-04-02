//from CDN
import {createNoise3D} from "https://unpkg.com/simplex-noise@4.0.3/dist/esm/simplex-noise.js";
//import { createNoise3D } from "simplex-noise";

window.onload = () => {

    const canvas11 = document.getElementById('canvas11');
    const context11 = canvas11.getContext("2d");
    noiseAnimation(canvas11, context11);

}

function noiseAnimation(canvas, context) {
    const noise3D = createNoise3D();
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let t = 0;
    
    function drawPlasma(){
      for (let x = 0; x < canvas.width; x += 2) {
          for (let y = 0; y < canvas.height; y += 2) {
              const r = noise3D(x / 16, y / 16, t/32) * 0.5 + 0.5;
              const g = noise3D(x / 8, y / 8, t/32) * 0.5 + 0.5;

              drawToArea(
                x, y, 1, 1,
                r * 255,
                (r + g) * 200,
                50,
                255
              );
            //   data[(x + y * canvas.width) * 4 + 0] = r * 255;
            //   data[(x + y * canvas.width) * 4 + 1] = (r + g) * 200;
            //   data[(x + y * canvas.width) * 4 + 2] = 50;
            //   data[(x + y * canvas.width) * 4 + 3] = 255;

            //   data[(x + 1 + y * canvas.width) * 4 + 0] = r * 255;
            //   data[(x + 1 + y * canvas.width) * 4 + 1] = (r + g) * 200;
            //   data[(x + 1 + y * canvas.width) * 4 + 2] = 50;
            //   data[(x + 1 + y * canvas.width) * 4 + 3] = 255;

            //   data[(x + (y + 1) * canvas.width) * 4 + 0] = r * 255;
            //   data[(x + (y + 1) * canvas.width) * 4 + 1] = (r + g) * 200;
            //   data[(x + (y + 1) * canvas.width) * 4 + 2] = 50;
            //   data[(x + (y + 1) * canvas.width) * 4 + 3] = 255;

            //   data[((x + 1) + (y + 1) * canvas.width) * 4 + 0] = r * 255;
            //   data[((x + 1) + (y + 1) * canvas.width) * 4 + 1] = (r + g) * 200;
            //   data[((x + 1) + (y + 1) * canvas.width) * 4 + 2] = 50;
            //   data[((x + 1) + (y + 1) * canvas.width) * 4 + 3] = 255;
          }
      }
      t+=1;
      context.putImageData(imageData, 0, 0);
      requestAnimationFrame(drawPlasma);
    }

    function drawToArea(xStart, yStart, w, h, r, g, b, a) {
        for (let x = xStart; x < x + w; x++) {
            for (let y = yStart; y < yStart + h; y++) {
                //console.log(r, g, b, a);
                data[(x + y * canvas.width) * 4 + 0] = r;
                data[(x + y * canvas.width) * 4 + 1] = g;
                data[(x + y * canvas.width) * 4 + 2] = b;
                data[(x + y * canvas.width) * 4 + 3] = a;
            }
        }
    }
    
    drawPlasma();
}
