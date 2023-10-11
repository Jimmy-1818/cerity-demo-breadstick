const hamburger = document.getElementsByClassName("hamburger")
var menu_mobile = document.getElementsByClassName("mobile-nav")[0]
var desktop_nav = document.getElementsByClassName("desktop-nav")[0]
const opacity = document.getElementsByClassName("opacity")[0]

const bottom_btn = document.getElementsByClassName("bottom-btn")[0]
const control_next = document.getElementsByClassName("carousel-control-next")
const module_overflow = document.getElementsByClassName("module-overflow")
var carousel = document.getElementsByClassName("carousel")
const indicators = document.getElementsByClassName("carousel-indicators")

const nearest_threshold = 70

const logo_image = document.getElementById('logo_svg_image')



function change_logo_dark(){
  if (logo_image.getAttribute('xlink:href') != 'images/logo_certify_on_light.svg' && !menu_mobile.classList.contains('show-mobile')){
    logo_image.setAttribute('xlink:href', 'images/logo_certify_on_light.svg')
  }
}

function change_logo_light(){
  if (logo_image.getAttribute('xlink:href') != 'images/logo_certify_on_dark.svg'){
    logo_image.setAttribute('xlink:href', 'images/logo_certify_on_dark.svg')
  }
}


function hamburger_click(){
  var desktop_nav = document.getElementsByClassName("desktop-nav")[0]
  
  //CLOSING
  var in_pop_up = steps_container.classList.contains('show_from_left') || info_container.classList.contains('show_from_left') 
  if (hamburger[0].classList.contains("show") && !in_pop_up){
    navbar_width_scroll_control()
    if (window.scrollY == 0){
      desktop_nav.classList.remove("desktop_nav_shadow")
      desktop_nav.classList.remove("desktop_nav_dark")
    }
    else{
      desktop_nav.classList.add("desktop_nav_shadow")
    }
  }
  //OPENING
  else{
    change_logo_light()
    desktop_nav.classList.remove("desktop_nav_shadow")
    desktop_nav.classList.add("desktop_nav_dark")
  }
  var desktop_nav = document.getElementsByClassName("desktop-nav")[0]
  if (desktop_nav.classList.contains("navbar-hide")){
    desktop_nav.classList.remove("navbar-hide")
  }
  menu_mobile = document.getElementsByClassName("mobile-nav")[0]
  var desktop_nav = document.getElementsByClassName("desktop-nav")[0]
  hamburger[0].classList.toggle("show")
  menu_mobile.classList.toggle("show-mobile")
  desktop_nav.classList.toggle("mobile_nav_immediate_shadow")
  opacity.classList.toggle("show-opacity")
  if ((!menu_mobile.classList.contains("show-mobile")) && (current_index()[1] < nearest_threshold)) {
    desktop_nav.classList.add("navbar-hide")
  }
};


// Get a list of lists of titles
var titles_text = []
for (var i = 0; i < document.getElementsByClassName("carousel-inner").length; i++) {
  var current_titles = []
  for (var i2 = 0; i2 < document.getElementsByClassName("carousel-inner")[i].getElementsByClassName("carousel-item").length; i2++) {
    var current_title = document.getElementsByClassName("carousel-inner")[i].getElementsByClassName("carousel-item")[i2].querySelector("h1").innerHTML
    current_titles.push(current_title)
  };
  titles_text.push(current_titles)
};


// A function that returns the current carousel index and its distance
function current_index(){
  //margin between title and top page
  const margin_top = 50

  var titles_distances = []
  for (var i = 0; i < carousel.length; i++) {
    var current_distance = carousel[i].getBoundingClientRect().top - margin_top
    titles_distances.push(Math.abs(Math.round(current_distance)));
  }
  var nearest_distance = (Math.min.apply(Math, titles_distances))
  var current_index = titles_distances.indexOf(nearest_distance)
  var values_return = [current_index, nearest_distance]  
  return values_return
};

var lastSctollY = window.scrollY;
window.addEventListener("scroll", navbar_width_scroll_control)


// Bottom h1 on button prev/next click (delayed)
const carousel_control = document.getElementsByClassName("carousel-control")
for (var i = 0; i < carousel_control.length; i++) {
  carousel_control[i].addEventListener("click", delayed_next_h1)
}

// Bottom h1 on indicators click (delayed)
const carousel_indicators = document.getElementsByClassName("carousel-indicators")
for (var i = 0; i < carousel_indicators.length; i++) {
  carousel_indicators[i].addEventListener("click", delayed_next_h1)
}

function delayed_next_h1(){
  setTimeout(set_next_h1, 650)
}

set_next_h1()
function set_next_h1(){
  //cci: current carousle index
  for (var cci = 0; cci < carousel.length; cci++){
    var module_title_bottom = document.getElementsByClassName("module-title-bottom")[cci]
    var current_i = current_index()[0]
    var items = document.getElementsByClassName("carousel-inner")[cci].getElementsByClassName("carousel-item")
    var arrow = document.getElementsByClassName("arrow")[cci]
    var alternative_next = document.getElementsByClassName("alternative-next")[cci]
    var arrow_img = arrow.getElementsByClassName("arrow-img")[0]
    var subscribe_img = arrow.getElementsByClassName("subscribe-img")[0]
    
    for (var i = 0; i < items.length; i++) {
      if (items[i].classList.contains("active")){
        var current_item_index = i
      }
    }
    var current_h1 = titles_text[cci][current_item_index]
    if (current_item_index < items.length - 1){
      var next_h1 = titles_text[cci][titles_text[cci].indexOf(current_h1) + 1]
      arrow_img.classList.add("display-block")
      subscribe_img.classList.remove("display-block")
      arrow.classList.remove("rotate-arrow")
      alternative_next.classList.remove("display-block")
      control_next[cci].classList.add("display-block")
    }
    else if (!(cci == document.getElementsByClassName("carousel-inner").length - 1 && current_item_index == items.length - 1)){
      var next_h1 = titles_text[cci + 1][0]

      arrow_img.classList.add("display-block")
      subscribe_img.classList.remove("display-block")
      arrow.classList.add("rotate-arrow")
      alternative_next.classList.add("display-block")
      control_next[cci].classList.remove("display-block")
    }
    else{
      var next_h1 = "Registrati"

      arrow_img.classList.remove("display-block")
      subscribe_img.classList.add("display-block")
      arrow.classList.remove("rotate-arrow")
      alternative_next.classList.remove("display-block")
      control_next[cci].classList.remove("display-block")
    }

    module_title_bottom.innerHTML = next_h1
  }
};



function alternative_next_click(current_btn){
  var inners = document.getElementsByClassName("carousel-inner")
  if (current_btn < inners.length - 1){
    var margin_top = 30
    var scroll_position = inners[current_btn + 1].getBoundingClientRect().top + window.scrollY - margin_top
    window.scrollTo({top: scroll_position, behavior: "smooth"})
  }
  else{
    window.open("subscribe", "_self")
  }
}

for (var i = 0; i < control_next.length; i++) {
  control_next[i].addEventListener("click", scroll_fix)
}
for (var i = 0; i < indicators.length; i++) {
  indicators[i].addEventListener("click", scroll_fix)
}


function scroll_fix(){
  var bottom_btns_copy = [].slice.call(document.getElementsByClassName("bottom-btn"))
  var carousels_copy = [].slice.call(carousel)
  if (this.parentNode.classList.contains("bottom-btn")){
    var cci = bottom_btns_copy.indexOf(this.parentNode)
  }
  else{
    var cci = carousels_copy.indexOf(this.parentNode)
  }
  //to use instead of current_i --> this.parent and finding the index
  var current_i = current_index()[0]
  var items = document.getElementsByClassName("carousel-inner")[cci].getElementsByClassName("carousel-item")
  for (var i = 0; i < items.length; i++) {
    if (items[i].classList.contains("active")){
      var current_item_index = i
    }
  }
  if (current_item_index < (items.length - 1) || this.classList.contains("carousel-indicators")){
    var inners = document.getElementsByClassName("carousel-inner")  
    var margin_top = 30
    var scroll_position = inners[cci].getBoundingClientRect().top + window.scrollY - margin_top
    window.scrollTo({top: scroll_position})
  }
}


function end_page_carousel(next = "current"){
  var result = {last_in_page: false, last_in_items: false}

  if (next == "next"){var reach = 1} else {var reach = 0}
  var current_i = current_index()[0]
  
  if (current_i == carousel.length - 1 - reach){
    result["last_in_page"] = true
  }else{
    result["last_in_page"] = false
  }
  var items = document.getElementsByClassName("carousel-inner")[current_i].getElementsByClassName("carousel-item")
  for (var i = 0; i < items.length; i++) {if (items[i].classList.contains("active")){
      var current_item_index = i}}
  
  if (current_item_index == items.length - 1 - reach){
    result["last_in_items"] = true
  }else{
    result["last_in_items"] = false
  }

  return result
}


function bottom_btn_regulation(){
  var nearest_distance = current_index()[1]
  var current_i = current_index()[0]

  // When near a title bring up BOOTTOM BTN & not displayed INDICATORS 
  //& not displayed CONTROLS & controll SCROLL unlock
  if (nearest_distance < nearest_threshold){
    bottom_btn.classList.add("bottom-btn-up")
    for (var i = 0; i < indicators.length; i++) {
      module_overflow[i].classList.remove("overflow-hidden")
      indicators[i].classList.add("bottom-indicators-up")
      control_next[i].classList.remove("bottom-control-down")
    }
  }
  else{
    bottom_btn.classList.remove("bottom-btn-up")
    for (var i = 0; i < indicators.length; i++) {
      module_overflow[i].classList.add("overflow-hidden")
      indicators[i].classList.remove("bottom-indicators-up")
      control_next[i].classList.add("bottom-control-down")
    }
  }

  // Show just the nearest INDICATOR GROUP & CONTROLS 
  for (var i = 0; i < indicators.length; i++) {
    if (i == current_i){
      indicators[i].classList.add("display-block")
      if (!(end_page_carousel()["last_in_items"])){
        control_next[i].classList.add("display-block")
      }
    }
    else{
      indicators[i].classList.remove("display-block")
      control_next[i].classList.remove("display-block")
    }
  }
};





//for reloads with page scroll != 0
navbar_width_scroll_control()






function navbar_width_scroll_control(){
  const steps_container = document.querySelector('.steps-container')
  const info_container = document.querySelector('.info-container')
  var in_pop_up = steps_container.classList.contains('show_from_left') || info_container.classList.contains('show_from_left') 
  desktop_nav = document.getElementsByClassName("desktop-nav")[0]

  //ON TOP
  if (window.scrollY == 0 && !in_pop_up){
    setTimeout(() => {
      change_logo_dark()
    }, 100);
    if (hamburger[0].classList.contains("show")){
      desktop_nav.classList.remove("desktop_nav_shadow")
    }
    else{
      desktop_nav.classList.remove("desktop_nav_dark")
      desktop_nav.classList.remove("desktop_nav_shadow")
      desktop_nav.classList.remove("navbar-hide")
    }
    if(window.innerWidth >= 1024){
      desktop_nav.style.height = "73px"
    }
  }
  //SCROLL 
  else{      
    change_logo_light()
    desktop_nav.style.height = "62px"
    //SCROLL IN BASSO
    if ((lastSctollY < window.scrollY && !(menu_mobile.classList.contains("show-mobile")) && ($(window).width() < 1024)) && !in_pop_up) {
      desktop_nav = document.getElementsByClassName("desktop-nav")[0]
      desktop_nav.classList.add("navbar-hide")
    }
    else if (hamburger[0].classList.contains("show")){
      desktop_nav.classList.remove("desktop_nav_shadow")
      //SCROLL IN ALTO
    }else{
      desktop_nav.classList.add("desktop_nav_dark")
      desktop_nav.classList.add("desktop_nav_shadow")
      desktop_nav.classList.remove("navbar-hide")
    }
  }
  lastSctollY = window.scrollY
}

/////////////// TO SHOW/HIDE BOTTOM BTN/NAVBAR //////////////

