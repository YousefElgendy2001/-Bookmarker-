var siteNameInput = document.getElementById("siteNameInput");
var siteUrlInput = document.getElementById("siteUrlInput");
var siteData = document.getElementById("siteData");
var submite = document.querySelector('.submite')

var productList = [];


var regex = {
  siteNameInput: {
    value : /^[a-z0-9_-]{3,15}$/,
    status:false
  },
  siteUrlInput:
  
  {
    value :  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
    status:false
  },
  
  
 
}





if (localStorage.getItem("productList") != null) {
  productList = JSON.parse(localStorage.getItem("productList"));
  displayProuducts(productList);
}

function Submitproduct() {
  var product = {
    name: siteNameInput.value,
    url: siteUrlInput.value,
  };
  productList.push(product);
  localStorage.setItem("productList", JSON.stringify(productList));
  displayProuducts(productList);
  clearForm();
  submite.disabled = true;
}

function displayProuducts(list) {
  var blackbox = "";
  for (var i = 0; i < list.length; i++) {
    blackbox += `

      
     <div class=" col-md-12 d-flex justify-content-center align-items-center">
              <tr>
                <td>${i + 1}</td>
<td><h5 class="d-inline-block " id="${list[i].name}" >${list[i].name}</h5></td>
<td> <a class="btn btn-success  " target="_blank"  href="${list[i].url }"><span><i class="fa-solid fa-eye pe-2"></i></span>Visit</a></td>
<td>   <button class="btn btn-danger  " onclick='deletesite(${i})'><span><i class="fa-solid fa-trash-can pe-2"></i></span>Delete</button></td> 
              </tr>



  `;
  }

  document.getElementById("siteData").innerHTML = blackbox;
}
function clearForm() {
  siteNameInput.value = " ";
  siteUrlInput.value = " ";

  siteNameInput.classList.remove('is-valid', 'is-invalid')
  siteUrlInput.classList.remove('is-valid', 'is-invalid')

}
function deletesite(index) {
  productList.splice(index, 1);
  displayProuducts(productList);
  localStorage.setItem("productList", JSON.stringify(productList));
}




function validatSiteName(e){
 
  if(regex[e.id].value.test(e.value)) {
    e.classList.add('is-valid')
    e.classList.remove('is-invalid')
    regex[e.id].status = true
    
  } else {
    e.classList.add('is-invalid')
    e.classList.remove('is-valid')
    regex[e.id].status = false

    
  }
  checkValidation()
}

function checkValidation() {
  if (regex.siteNameInput.status && regex.siteUrlInput.status) {
    submite.disabled = false;
  }else{
    submite.disabled = true;

  }
}

