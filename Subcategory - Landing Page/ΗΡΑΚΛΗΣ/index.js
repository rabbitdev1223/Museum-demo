const pt_page = document.querySelector('.pt-page')


const gsapLanding = gsap.to('.gsap-landing', 
    {
        delay:1,
        opacity: 1,
        ease:"Expo.easeInOut",
        duration:1,
        y:'0%',
        stagger: 0.05,
    })

const transitionPage = gsap.timeline().to('.transition-page', 
    {
        delay:1,
        opacity:0,
        duration:1,
    }
).set('.transition-page', {
    zIndex:-1
})

const previousClickHandler = () => {
    gsapLanding.reverse()
    setTimeout(() => {
        transitionPage.reverse()
    }, 700)
    setTimeout(() => {
      history.back()
    }, 2000)
}