import {Curtains, Plane} from './src/index.mjs';

let activeTexture = 0;
let currentTexture = 0;
let transitionTimer = 0;
let timer = 0;
let isRunning = 0;

window.addEventListener("load", () => {
  // set up our WebGL context and append the canvas to our wrapper
  const curtains = new Curtains({
    container: "canvas",
    alpha: true,
    pixelRatio:2 // limit pixel ratio for performance
  });

  // get our plane element
  const contentTitle = document.querySelector(".frame__content-title")
  const planeElements = [...document.getElementsByClassName("plane")];
  const navElements = [...document.getElementsByClassName("js-nav")];
  const duration = planeElements[0].getAttribute("data-duration") || 2;
  // set our initial parameters (basic uniforms)
  const params = {
    widthSegments: "50%",
    heightSegments: "50vh",
    vertexShaderID: "vert",
    fragmentShaderID: "frag",
    uniforms: {
      transitionTimer: {
        name: "uTransitionTimer",
        type: "1f",
        value: 0,
      },
      fadeIn: {
        name: "uFadeIn",
        type: "1f",
        value: 0,
      },
      timer: {
        name: "uTimer",
        type: "1f",
        value: 0,
      },
      to: {
        name: "uTo",
        type: "1f",
        value: 0,
      },
      from: {
        name: "uFrom",
        type: "1f",
        value: 0,
      },
    },
  };

  const multiTexturesPlane = new Plane(curtains, planeElements[0], params);

  // set up our basic methods
  multiTexturesPlane
    .onReady(() => {
      // display the button

      document.body.classList.add("curtains-ready");
      let length = multiTexturesPlane.videos.length;

      // planeElements[0].addEventListener("click", () => {
      //   gsap.to(multiTexturesPlane.uniforms.transitionTimer, {
      //     duration: duration,
      //     value: currentTexture + 1,
      //     easing: 'power2.in',
      //     onStart: () => {
      //       multiTexturesPlane.videos[(currentTexture + 1) % length].play();
      //       currentTexture = currentTexture + 1;
      //     },
      //     onComplete: () => {
      //       multiTexturesPlane.videos[
      //         (currentTexture + length - 1) % length
      //       ].pause();
      //       multiTexturesPlane.videos[
      //         (currentTexture + length + 1) % length
      //       ].pause();
      //     },
      //   });
      // });

      navElements.forEach(nav=>{
        nav.addEventListener('click',(event)=>{
          let to = event.target.getAttribute('data-nav');
          if(isRunning || to==currentTexture) return;
          var elems = document.querySelectorAll(".frame__switch-item");
          [].forEach.call(elems, function(el) {
              el.classList.remove("frame__switch-item--current");
          });
          event.target.classList.add('frame__switch-item--current')
          isRunning = true
          
          multiTexturesPlane.uniforms.to.value = to;

          let fake = {progress:0}
          gsap.to(fake, {
            duration: duration,
            progress:  1,
            easing: 'power2.in',
            onStart: () => {
            //   multiTexturesPlane.videos[to].play();
              currentTexture = to;
                gsap.to(contentTitle, {
                    duration: 1,
                    y:"150%",
                    // opacity:0
                })
                gsap.to(".frame__content-text", {
                    duration: .3,
                    y:"50%",
                    opacity:0
                })
                gsap.to(".frame__switch", {
                    duration: .3,
                    y:"50%",
                    opacity:0
                    // opacity:0
                })
                gsap.to(".ourDiv", {
                    duration: 1,
                    x:"0"
                })         
            },
            onUpdate:()=>{
              if(fake.progress===1){
                multiTexturesPlane.uniforms.from.value = to;
              }
              multiTexturesPlane.uniforms.transitionTimer.value = fake.progress
            },
            onComplete: () => {
              multiTexturesPlane.uniforms.from.value = to;
              multiTexturesPlane.videos[
                (currentTexture + length - 1) % length
              ].pause();
              multiTexturesPlane.videos[
                (currentTexture + length + 1) % length
              ].pause();
              isRunning = false;
            },
          });

        })
      })
      let DURATION = 10000
      const skipButton = document.querySelector('.skipButton')
      skipButton.addEventListener('click', () => {
        setTimeout(() => {
          window.location.assign(`https://museumdemo10.netlify.app/index/index.html`)
        }, 2000)
      })
      setTimeout(() => {
        window.location.assign(`https://museumdemo10.netlify.app/index/index.html`)
      }, DURATION)
      // click to play the videos
          // fade out animation

          gsap.to(multiTexturesPlane.uniforms.fadeIn,{
            duration: 1,
            value: 1
          })

          // play all videos to force uploading the first frame of each texture
          multiTexturesPlane.playVideos();

          // wait a tick and pause the rest of videos (the ones that are hidden)
          curtains.nextRender(() => {
            // multiTexturesPlane.videos[1].pause();
            // multiTexturesPlane.videos[2].pause();
          });
        false

    })
    .onRender(() => {
      timer += 0.001;
      multiTexturesPlane.uniforms.timer.value = timer;
    });
});
