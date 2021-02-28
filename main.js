let xml = new XMLHttpRequest();
xml.open('GET','https://raw.githubusercontent.com/borchicaD/json_menu/431734c66f1b00ec8e8c9065fe4cf573bfa86a0e/json.txt')
xml.onreadystatechange = function(){
if (xml.readyState == 4 && xml.status == 200){
  //got the data
  document.body.innerHTML = display(JSON.parse(xml.responseText),"main")
  setClicks()
  }
}

xml.send()

let text=``;

function display(data,className){
  //console.log(data);
  text += `<ul class="${className}">`
         data.forEach( mainList=> {
         (mainList.children.length > 0)  ? text += `<li class="arrow">${mainList.name}`
         : text += `<li class="not_active">${mainList.name}</li>`;
         if(mainList.children.length > 0) display(mainList.children[0],"nested")
         text += `</li>`;
       })

  text+= `</ul>`;

  return text;
}

function setClicks(){
  let arrows = document.querySelectorAll('.arrow');
  for (var i = 0; i < arrows.length; i++) {
    arrows[i].addEventListener('click', function (event){
      event.stopPropagation();
      //first to check if clickable
      if(!event.target.classList.contains('not_active')){
        //is list allready open
        if (event.target.classList.contains('arrow-down')){
          //open list hire
          let allNested = this.querySelectorAll('.nested');
          for (var i = 0; i < allNested.length; i++) {
               const nested = allNested[i];
               nested.classList.toggle('active');
               nested.classList.remove('arrow-down');
               nested.perentElement.classList.remove('active');
               nested.parentElement.classList.remove('arrow-down');
          }
        }else{
          // list is closed
          this.querySelector(".nested").classList.toggle('active');
          //change arrow style
          this.classList.toggle('arrow-down');
        }
      }
    })
  }
}
