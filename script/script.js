
//COPY BUTTON
function copy_hash(htmlElement){
  if(!htmlElement){
    return
  }
  let elementText = htmlElement.innerText;

  let tempInput = document.createElement('input');
  tempInput.setAttribute('value', elementText);
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  tempInput.parentNode.removeChild(tempInput);
  alert("Hash copiato!")
}
document.querySelector('#copy-hash').onclick = function(){
  copy_hash(document.querySelector('#hash'))
}


const leftArrow = document.querySelectorAll('.scroll-left');
const rightArrow = document.querySelectorAll('.scroll-right');
const flex_container_steps = document.querySelectorAll('.flex_container_steps')
const margin = 2


//MENAGE ARROWS IN SLIDESHOW
function updateScrollArrows(DOM_object) {
  var container_width = DOM_object.clientWidth;
  var scroll_amount = DOM_object.scrollLeft;
  var overflowed_width = DOM_object.querySelector('.steps_container').clientWidth;
  var scroll_percentage = (scroll_amount / (overflowed_width - container_width)) * 100;
  var scroll_necessity = overflowed_width > (container_width +  2 * margin)
  var scroll_left = DOM_object.querySelector('.scroll-left')
  var scroll_right = DOM_object.querySelector('.scroll-right')
  
  if (scroll_necessity){
    
    if (scroll_percentage < 0 + margin) {
      scroll_left.classList.remove('scroll_show');
      scroll_right.classList.add('scroll_show');
    }
    else if (scroll_percentage > 100 - margin) {
      scroll_right.classList.remove('scroll_show');
      scroll_left.classList.add('scroll_show');
    }
    else {
      scroll_left.classList.add('scroll_show');
      scroll_right.classList.add('scroll_show');
    }
  }
  if ((!scroll_necessity) && (scroll_left.classList.contains('scroll_show') || scroll_right.classList.contains('scroll_show'))){
    scroll_right.classList.remove('scroll_show');
    scroll_left.classList.remove('scroll_show');
  }
  
};

function push_state(){
  // if (window.location.href == "http://127.0.0.1:5500/index.html"){
    var currentURL = window.location.href;
    var newURL = currentURL + '';
    var newState = { data: 'info' };
  
    history.pushState(newState, "info", newURL);  
  // }
}

//OPEN CONTAINER FROM SLIDESHOWS


//open then show only the right version by its ID
const steps_container = document.querySelector('.steps-container')
const back_btn_object_steps = document.querySelector('#back_btn2')
const step_version = steps_container.querySelectorAll('.step_version')
function open_steps(element_aimed){ 
  steps_container.classList.add('show_from_left')
  back_btn_object_steps.classList.add('show_from_left')
  var aimed_id = element_aimed.id
  step_version[aimed_id-1].classList.add('show_version')
 
  push_state()
  $(document.body).addClass('overflow-hidden');
  change_logo_light()
  desktop_nav.classList.remove("desktop_nav_shadow")
  desktop_nav.classList.add("desktop_nav_dark")
  desktop_nav.classList.remove("navbar-hide")
};


//open then scroll to element by its ID
const info_container = document.querySelector('.info-container')
const back_btn_object = document.querySelector('#back_btn')
function open_info(element_aimed){
  info_container.classList.add('show_from_left')
  back_btn_object.classList.add('show_from_left')
  var aimed_id = element_aimed.id
  var aimed_scroll_amount = info_container.querySelector(`.${aimed_id}`).offsetTop
  if (aimed_id != null){    
    setTimeout(function() {
      info_container.scrollTo({
        top: aimed_scroll_amount - 122,
        behavior: 'smooth'
      })
    }, 300);
  }

  push_state()
  $(document.body).addClass('overflow-hidden');
  change_logo_light()
  desktop_nav.classList.remove("desktop_nav_shadow")
  desktop_nav.classList.add("desktop_nav_dark")
  desktop_nav.classList.remove("navbar-hide")
};

function info_back_btn(){
  remove_show_from_left()
  history.back();
  navbar_width_scroll_control() 
}


function remove_show_from_left(){
  const show_from_left = document.querySelectorAll(".show_from_left");
  show_from_left.forEach(show_from_left_element => {
    show_from_left_element.classList.remove("show_from_left");
    $(document.body).removeClass('overflow-hidden');
  //hide all version of info-steps version
  setTimeout(function(){
    step_version.forEach(step_version => {
      step_version.classList.remove('show_version')
    })}, 100)
  }
)};

// throw the function once: LOADED, SCROLL slideshow, RESIZE vindow
document.addEventListener('DOMContentLoaded', function() {
  window.addEventListener("resize", function(){
    flex_container_steps.forEach(f_container_steps =>{
      updateScrollArrows(f_container_steps)
    });
  });
  flex_container_steps.forEach(f_container_steps => {
    updateScrollArrows(f_container_steps)
    f_container_steps.addEventListener('scroll', function(){
      updateScrollArrows(f_container_steps)});
    });
});
leftArrow.forEach(left_arrow => {
  left_arrow.addEventListener('click', function() {
    var contentContainer = this.parentElement
    var scrollAmount = contentContainer.clientWidth / 2;
    contentContainer.scrollTo({
      left: contentContainer.scrollLeft - scrollAmount,
      behavior: 'smooth'
    });
  });
});
rightArrow.forEach(right_arrow => {
  right_arrow.addEventListener('click', function() {
    var contentContainer = this.parentElement
    var scrollAmount = contentContainer.clientWidth / 2;
    contentContainer.scrollTo({
      left: contentContainer.scrollLeft + scrollAmount,
      behavior: 'smooth'
    });
  });
});



window.addEventListener("popstate", function(event) {
  remove_show_from_left()
  navbar_width_scroll_control() 
});
