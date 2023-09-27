//get all Branding data
const brandingData = getAllData("allBrandingData");
console.log(brandingData);

//creating dynamic navbar

const dynamicNavbarFunc = () =>{
    let allCategory = getAllData("allCategoryData");
 let dynamicBox = document.querySelector(".dynamic-box");
 let footerCategory = document.querySelector(".footer-category");
 for(let category of allCategory)
 {
    dynamicBox.innerHTML += `
    <li class="nav-item mx-1">
    <a href="#" class="nav-link text-dark fw-bold">${category.category}</a>
</li>
`;
    footerCategory.innerHTML += `
    <li class="nav-item mx-1">
    <a href="#" class="nav-link text-white fw-bold">${category.category}</a>
</li>
`;
 }
 dynamicBox.innerHTML +=`<div class="btn-group">
 <button class="btn">
     <i class="fa fa-shopping-cart"></i>
 </button>
 <button class="btn">
     <i class="fa fa-search"></i>
 </button>
 <button class="btn">
     <i class="fa fa-user"></i>
 </button>
</div>
`;
}

const dynamicRequest = (element,pageRequest) =>{
    const ajax = new XMLHttpRequest();
    ajax.open("POST",pageRequest,true);
    ajax.send();

    //get response

    ajax.onload = () =>{
        element.innerHTML = ajax.response;
        dynamicNavbarFunc();
       
    }
}