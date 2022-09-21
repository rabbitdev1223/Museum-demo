const hoverImg1 = document.querySelectorAll(".hover-img")
const hoverImg2 = document.querySelectorAll(".hover-img2")
const hoverImg3 = document.querySelectorAll(".hover-img3")
const hoverImg4 = document.querySelectorAll(".hover-img4")
const hoverImg5 = document.querySelectorAll(".hover-img5")

hoverImg1.forEach(function(hoverImg){
  hoverImg.addEventListener("mouseover", function() {
      hoverImg.classList.add("clickedHoverImg")
  })
  hoverImg.addEventListener("mouseout", function() {
      hoverImg.classList.remove("clickedHoverImg")
  })
})
hoverImg2.forEach(function(hoverImg){
  hoverImg.addEventListener("mouseover", function() {
      hoverImg.classList.add("clickedHoverImg")
  })
  hoverImg.addEventListener("mouseout", function() {
    hoverImg.classList.remove("clickedHoverImg")
})
})
hoverImg3.forEach(function(hoverImg){
  hoverImg.addEventListener("mouseover", function() {
      hoverImg.classList.add("clickedHoverImg")
  })
  hoverImg.addEventListener("mouseout", function() {
    hoverImg.classList.remove("clickedHoverImg")
})
})
hoverImg4.forEach(function(hoverImg){
  hoverImg.addEventListener("mouseover", function() {
      hoverImg.classList.add("clickedHoverImg")
  })
  hoverImg.addEventListener("mouseout", function() {
    hoverImg.classList.remove("clickedHoverImg")
})
})
hoverImg5.forEach(function(hoverImg){
  hoverImg.addEventListener("mouseover", function() {
      hoverImg.classList.add("clickedHoverImg")
  })
  hoverImg.addEventListener("mouseout", function() {
    hoverImg.classList.remove("clickedHoverImg")
})
})

