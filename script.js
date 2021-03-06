let menu = document.querySelector('#burger-menu');
let logo = document.querySelector('#logo');
let navigation = document.querySelector('#categoriesTemplate');
let navmenu = document.querySelector('.desktopmenu');
let body = document.querySelector('body');
let closeIcon = document.querySelector('.closelogin');
let logInButton = document.querySelector('.btnlogin');
let loginoverlay = document.querySelector('#loginoverlay');


  logInButton.addEventListener("click", showLogIn);

function showLogIn() {
loginoverlay.classList.toggle('show');
closeIcon.addEventListener("click", hideLogIn);
}

function hideLogIn() {
  loginoverlay.classList.toggle('show');
}

function openMenu() {
  menu.classList.toggle('open');
  navmenu.classList.toggle('active');
  body.classList.toggle('overflow');
  if (logo.style.display == 'none') {
    logo.style.display = 'block';
  } else {
    logo.style.display = 'none';
  }
}

function getAllEvents() {
  fetch("http://artingineer.dk/wordpress/wp-json/wp/v2/events?_embed")
    .then(res => res.json())
    .then(showEvents);
}


function getAllEventsByTag(id) {
  fetch("http://artingineer.dk/wordpress/wp-json/wp/v2/events?_embed&categories=" + id)
    .then(res => res.json())
    .then(showEvents);
}

function getSingleEventById(myId) {
  console.log(myId);
  fetch("http://artingineer.dk/wordpress/wp-json/wp/v2/events/" + myId + "/?_embed")
    .then(res => res.json())
    .then(showSingleEvent);
}

function getMenue() {
  fetch("http://artingineer.dk/wordpress/wp-json/wp/v2/categories").then(e => e.json())
    .then(showMenue);
}

function showMenue(tags) {
  console.log(tags);
  let lt = navigation.content;
  tags.forEach(function(tag) {
    let clone = lt.cloneNode(true);
    clone.querySelector("a").textContent = tag.name;
    clone.querySelector("a").setAttribute("href", "index1.html?tagid=" + tag.id);
    navigation.appendChild(clone);
  });
}

function showSingleEvent(json) {

  // console.log(json);
  document.querySelector("#single h1").textContent = json.title.rendered;
  document.querySelector("#single .price span").textContent = json.acf.event_price;
  document.querySelector("#single .content").innerHTML = json.content.rendered;
  let img = document.querySelector("#single img");
  console.log(json._embedded["wp:featuredmedia"][0].media_details.sizes);
  //img.setAttribute("src", json._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large.source_url);

}


function showEvents(data) {
  let list = document.querySelector("#list");
  let template = document.querySelector("#eventTemplate").content;


  data.forEach(function(theEvent) {
    console.log(theEvent);
    let clone = template.cloneNode(true);
    let title = clone.querySelector("h1");
    let excerpt = clone.querySelector(".excerpt");
    let price = clone.querySelector(".price span");
    let img = clone.querySelector("img");
    let link = clone.querySelector("button.read-more");


    title.textContent = theEvent.title.rendered;
    excerpt.textContent = theEvent.acf.vdescription;
    price.textContent = theEvent.acf.event_price;
    img.setAttribute("src",theEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
    link.setAttribute("href", "event.html?id=" + theEvent.id);

    list.appendChild(clone);
  });
}

let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");
let tagid = searchParams.get("tagid");
//console.log(id);

getMenue();

if (id) {
  getSingleEventById(id);
}
if (tagid) {
  getAllEventsByTag(tagid)
} else {
  getAllEvents();
}
