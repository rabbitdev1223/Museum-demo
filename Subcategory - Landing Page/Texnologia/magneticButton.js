const clickHandler = () => {
    console.log('clicked')
}

let mousepos = {x:0, y:0}

document.addEventListener('mousemove', (e) => {
    mousepos.x = e.pageX
    mousepos.y = e.pageY
});

const button = document.querySelectorAll('.button')
const text = document.querySelector('.button__text');
const textinner = document.querySelector('.button__text-inner');
const deco = document.querySelector('.button__deco');
const filler = document.querySelector('.button__deco-filler');

let renderedStyles = {
    tx: {previous: 0, current: 0, amt: 0.1},
    ty: {previous: 0, current: 0, amt: 0.1},
    scale: {previous: 1, current: 1, amt: 0.2}
};
let state = { hover: false }

const calcWinsize = () => {
    return {width: window.innerWidth, height: window.innerHeight};
};

let winsize = calcWinsize();
window.addEventListener('resize', () => winsize = calcWinsize());;

let rect;
let distanceToTrigger;

const lerp = (a, b, n) => (1 - n) * a + n * b;

const calculateSizePosition = () => {
    // size/position
    button.forEach(b => {
        rect = b.getBoundingClientRect();
    });
    // the movement will take place when the distance from the mouse to the center of the button is lower than this value
    distanceToTrigger = rect.width * 2;
    // console.log(rect)

}
const initEvents = () =>  {
    const onResize = () => calculateSizePosition();
    window.addEventListener('resize', onResize);
}

const distance = (x1,y1,x2,y2) => {
    var a = x1 - x2;
    var b = y1 - y2;
    return Math.hypot(a,b);
}



const render = () => {
    // calculate the distance from the mouse to the center of the button
    const distanceMouseButton = distance(mousepos.x + window.scrollX , mousepos.y - window.scrollY, rect.left - rect.width/2, rect.top + rect.height/2);
    // new values for the translations and scale
    // console.log(window.scrollY)
    let x = 0;
    let y = 0;
    // console.log(distanceMouseButton)
    if ( distanceMouseButton < distanceToTrigger ) {
        if ( !state.hover ) {
            enter();
        }
        x = (mousepos.x + window.scrollX - (rect.left + rect.width/3))*.3;
        y = (mousepos.y - window.scrollY - (rect.top + rect.height/3))*.3;
    }
    else if ( state.hover ) {
        leave();
    }

    renderedStyles['tx'].current = x;
    renderedStyles['ty'].current = y;
    for (const key in renderedStyles ) {
        renderedStyles[key].previous = lerp(renderedStyles[key].previous, renderedStyles[key].current, renderedStyles[key].amt);
    }

    // console.log(renderedStyles['tx'].previous)
    // console.log(renderedStyles['ty'].previous)
    
    button.forEach(b => {
        b.style.transform = `translate3d(${renderedStyles['tx'].previous}px, ${renderedStyles['ty'].previous}px, 0)`;
    });

    text.style.transform = `translate3d(${-renderedStyles['tx'].previous*0.2}px, ${-renderedStyles['ty'].previous*0.2}px, 0)`;
    deco.style.transform = `scale(${renderedStyles['scale'].previous})`;

    requestAnimationFrame(() => render());
}

const enter = () => {
    state.hover = true;

    button.forEach(b => {
        b.classList.add('button--hover');        
    });
    renderedStyles['scale'].current = 1.3;
        
    gsap.killTweensOf(filler);
    gsap.killTweensOf(textinner);
    gsap.killTweensOf(document.body);
    gsap.timeline()
    .to(filler, 0.5, {
        ease: 'Power3.easeOut',
        startAt: {y: '75%'},
        y: '0%'
    }, 0)
    .to(textinner, 0.4, {
        ease: 'Expo.easeOut',
        scale: 0.8
    }, 0);
}

const leave = () => {
    state.hover = false;

    button.forEach(b => {
        b.classList.remove('button--hover');
    });
    
    renderedStyles['scale'].current = 1;
    
    gsap.killTweensOf(document.body);
    gsap.killTweensOf(filler);
    gsap.timeline()
    .to(filler, 0.4, {
        ease: 'Power3.easeOut',
        y: '-75%'
    }, 0)
    .to(textinner, 0.4, {
        ease: 'Expo.easeOut',
        scale: 1
    }, 0);
}

calculateSizePosition();
// init events
initEvents();
// loop fn
requestAnimationFrame(() => render());
