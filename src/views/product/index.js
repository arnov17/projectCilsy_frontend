// chosen tabs details
const openTabs = (event, paramContent) => {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    console.log(tabcontent)
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    console.log(tablinks)
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(paramContent).style.display = "block";
    console.log(event.currentTarget.className)
    event.currentTarget.className += " active";
  }

// show the full-image
let modal = document.getElementById("myModal");

let img = document.getElementById("myImg");
let modalImg = document.getElementById("img01");

img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
}

let span = document.getElementsByClassName("close")[0];

span.onclick = function() { 
  modal.style.display = "none";
}

document.onkeydown = function (e) {
  if(e.keyCode === 27) {
    modal.style.display = "none";
  } 
} 