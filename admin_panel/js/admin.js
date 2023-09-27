window.onload = () => {
  collapseFunc();
  dynamicRequestFunc();
};

let allCategoryData = [];
let allBrandData = [];
let allProductData = [];
let dy_link = "";
let thumb = "";
let front = "";
let back = "";
let right = "";
let left = "";
let brand_logo = "";

//start toggler function
const togglerFunc = () => {
  let togglerBtn = document.querySelector(".toggler-btn");
  let sideNav = document.querySelector(".side-nav");
  let page = document.querySelector(".page");
  togglerBtn.onclick = () => {
    let open = sideNav.classList.contains("side-nav-open");
    if (open) {
      sideNav.classList.remove("side-nav-open");
      sideNav.classList.add("side-nav-close");
      page.classList.remove("page-open");
      page.classList.add("page-close");
    } else {
      sideNav.classList.add("side-nav-open");
      sideNav.classList.remove("side-nav-close");
      page.classList.add("page-open");
      page.classList.remove("page-close");
    }
  };
};

//Start Collapse Coding
const collapseFunc = () => {
  let collapseBtn = document.querySelector(".collapse-btn");
  collapseBtn.onclick = function () {
    const ul = this.nextElementSibling;
    ul.classList.toggle("show");
  };
};

//dynamic request coding

const dynamicRequestFunc = () => {
    let activeItem = document.querySelector(".active");
    let activeLink = activeItem.getAttribute("access-link");
    dynamicAjaxFunc(activeLink);
    let allCollapseItem = document.querySelectorAll(".collapse-item");
    for (let item of allCollapseItem) {
      item.onclick = (e) => {
        for (let item of allCollapseItem) {
          item.classList.remove("active");
        }
        let link = e.target.getAttribute("access-link");
        dynamicAjaxFunc(link);
        item.classList.add("active");
      };
    }
  };

  const dynamicAjaxFunc = (link) => {
    dy_link = link;
    let page = document.querySelector(".page");
    let ajax = new XMLHttpRequest();
    ajax.open("POST", link, true);
    ajax.send();
  
    //get response
    ajax.onload = () => {
      let response = ajax.response;
      page.innerHTML = response;
      
       if (link == "dynamic/cat_design.html") {
        createCategoryFunc();
      }  else if (link == "dynamic/brand_design.html") {
        createBrandFunc();
      }else if (link == "dynamic/product_design.html") {
        createProductFunc();
      }  else if (link == "dynamic/branding_design.html") {
        createBrandingFunc();
      }   
      togglerFunc();
    };
    
  };

  // Start create category coding

const createCategoryFunc = () => {
    allCategoryData = getAllData("allCategoryData");
    let categoryForm = document.querySelector(".category-form");
    let inputBoxEl = document.querySelector(".input-box");
    let addFieldBtn = document.querySelector(".add-field-btn");
    //start add filed cosing
    addFieldBtn.onclick = () => {
      inputBoxEl.innerHTML += `
      <div>
                   <i style="cursor:pointer" class="fa fa-trash del-btn float-end mb-2"></i>
               <input type="text" required class="form-control mb-3" placeholder="Category">
               </div>
                  `;
  
      let allDelBtn = inputBoxEl.querySelectorAll(".del-btn");
      for (let btn of allDelBtn) {
        btn.onclick = function () {
          this.parentElement.remove();
        };
      }
    };
  
    //start add category coding
    categoryForm.onsubmit = (e) => {
      e.preventDefault();
      let allInput = categoryForm.querySelectorAll("input");
      for (let input of allInput) {
        allCategoryData.push({
          category: input.value,
        });
      }
      insertData("allCategoryData", JSON.stringify(allCategoryData));
      insertMsg();
      readCategoryData();
      categoryForm.reset();
    };
  
    readCategoryData();
  };

  const readCategoryData = () => {
    let categoryList = document.querySelector(".category-list");
    categoryList.innerHTML = "";
    allCategoryData.forEach((data, index) => {
      categoryList.innerHTML += `  
       <tr index="${index}">
                      <td>${index + 1}</td>
                      <td>${data.category}</td>
                      <td>
                          <button class="btn edit-btn btn-primary px-2 p-1">
                              <i class="fa fa-edit"></i>
                          </button>
                          <button class="btn save-btn d-none btn-primary px-2 p-1">
                              <i class="fa fa-save"></i>
                          </button>
                          <button class="btn del-btn btn-danger px-2 p-1">
                              <i class="fa fa-trash"></i>
                          </button>
                      </td>
                  </tr>
       `;
    });
  
    //start delete category coding
  
    let allDelbtn = categoryList.querySelectorAll(".del-btn");
    for (let btn of allDelbtn) {
      btn.onclick = () => {
        let parent = btn.parentElement.parentElement;
        let index = parent.getAttribute("index");
        allCategoryData.splice(index, 1);
        delAndupdateFunc(
          "allCategoryData",
          JSON.stringify(allCategoryData),
          dy_link,
          "Deleted"
        );
        /*   localStorage.setItem("allCategoryData",JSON.stringify(allCategoryData)); */
      };
    }
  
    //category update coding
  
    let allEditBtn = categoryList.querySelectorAll(".edit-btn");
    for (let btn of allEditBtn) {
      btn.onclick = () => {
        let parent = btn.parentElement.parentElement;
        let index = parent.getAttribute("index");
        let allTd = parent.querySelectorAll("td");
        let saveBtn = parent.querySelector(".save-btn");
        allTd[1].contentEditable = true;
        allTd[1].focus();
        btn.classList.add("d-none");
        saveBtn.classList.remove("d-none");
        saveBtn.onclick = function () {
          let category = allTd[1].innerHTML;
          allCategoryData[index] = {
            category: category,
          };
          delAndupdateFunc(
            "allCategoryData",
            JSON.stringify(allCategoryData),
            dy_link,
            "Updated"
          );
          /* localStorage.setItem("allCategoryData",JSON.stringify(allCategoryData));
          readCategoryData(); */
        };
      };
    }
  };
  //start create brand coding

const createBrandFunc = () => {
    allCategoryData = getAllData("allCategoryData");
    allBrandData = getAllData("allBrandData");
    /*  if(localStorage.getItem("allCategoryData")!=null){
          allCategoryData = JSON.parse(localStorage.getItem("allCategoryData"));
       } */
    let brandForm = document.querySelector(".brand-form");
    let inputBox = brandForm.querySelector(".input-box");
    let allBtn = brandForm.querySelectorAll("button");
    let catSelect = brandForm.querySelector("select");
    let catListSelect = document.querySelector(".cat-list-select");
    for (let data of allCategoryData) {
      catSelect.innerHTML += `
          <option>${data.category}</option>
          `;
      catListSelect.innerHTML += `
          <option>${data.category}</option>
          `;
    }
    //add dynamic input field
  
    allBtn[0].onclick = () => {
      inputBox.innerHTML += `
          <div>
          <i class="fa fa-trash del-btn mb-2 float-end"></i>
          <input type="text" class="form-control mb-3" placeholder="Brand">
          </div>
                      `;
  
      //Delete Dynamic input Element
  
      let allDelBtn = inputBox.querySelectorAll(".del-btn");
      for (let btn of allDelBtn) {
        btn.onclick = () => {
          btn.parentElement.remove();
        };
      }
    };
    //add Brand coding
  
    brandForm.onsubmit = (e) => {
      e.preventDefault();
      let allInput = brandForm.querySelectorAll("input");
      if (catSelect.value != "choose category") {
        for (let input of allInput) {
          allBrandData.push({
            category: catSelect.value,
            brand: input.value,
          });
        }
        insertData("allBrandData", JSON.stringify(allBrandData));
        insertMsg();
        brandForm.reset();
      } else {
        swal("Select category", "Please select category first", "warning");
      }
    };
  
    // get brand data
  
    catListSelect.onchange = () => {
      let id = 0;
      let filterBrand = [];
      if (catListSelect.value != "choose category") {
        for (let brand of allBrandData) {
          if (brand.category == catListSelect.value) {
            brand["id"] = id;
            filterBrand.push(brand);
          }
          id++;
        }
        readBrandFunc(filterBrand);
      } else {
        swal("Select category", "Please select category first", "warning");
      }
    };
  };

  //read band coding 
const readBrandFunc = (filterBrand) => {
    console.log(filterBrand);
    let brandList = document.querySelector(".brand-list");
    brandList.innerHTML = "";
    filterBrand.forEach((brand, index) => {
      brandList.innerHTML += `
          <tr id ="${brand.id}" index = "${index}">
              <td>${index + 1}</td>
              <td>${brand.category}</td>
              <td>${brand.brand}</td>
              <td>
                  <button class="btn edit-btn btn-primary px-2 p-1">
                      <i class="fa fa-edit"></i>
                  </button>
                  <button class="btn save-btn d-none btn-primary px-2 p-1">
                      <i class="fa fa-save"></i>
                  </button>
                  <button class="btn del-btn btn-danger px-2 p-1">
                      <i class="fa fa-trash"></i>
                  </button>
              </td>
          </tr>
          `;
    });
    //start delete brand coding
    let allDelBtn = brandList.querySelectorAll(".del-btn");
    for (let btn of allDelBtn) {
      btn.onclick = () => {
        let parent = btn.parentElement.parentElement;
        let index = parent.getAttribute("index");
        let id = parent.getAttribute("id");
        allBrandData.splice(id, 1);
        filterBrand.splice(index, 1);
        delAndupdateFunc(
          "allBrandData",
          JSON.stringify(allBrandData),
          dy_link,
          "Deleted",
          filterBrand
        );
      };
    }
  
    //start update brand coding
    let allEditBtn = brandList.querySelectorAll(".edit-btn");
    for (let btn of allEditBtn) {
      btn.onclick = () => {
        let parent = btn.parentElement.parentElement;
        let id = parent.getAttribute("id");
        let index = parent.getAttribute("index");
        let allTd = parent.querySelectorAll("td");
        let saveBtn = parent.querySelector(".save-btn");
        allTd[2].contentEditable = true;
        allTd[2].focus();
        btn.classList.add("d-none");
        saveBtn.classList.remove("d-none");
        saveBtn.onclick = function () {
          let category = allTd[1].innerHTML;
          let brand = allTd[2].innerHTML;
          allBrandData[id] = {
            category: category,
            brand: brand,
          };
          filterBrand[index] = {
            category: category,
            brand: brand,
            id: id,
          };
          delAndupdateFunc(
            "allBrandData",
            JSON.stringify(allBrandData),
            dy_link,
            "Updated",
            filterBrand
          );
        };
      };
    }
  };
  //start create product cosing
const createProductFunc = () => {
    allCategoryData = getAllData("allCategoryData");
    allBrandData = getAllData("allBrandData");
    allProductData = getAllData("allProductData");
    let productForm = document.querySelector(".product-form");
    let allSelect = productForm.querySelectorAll("select");
    let allInput = productForm.querySelectorAll("input");
    let textareaEL = productForm.querySelector("textarea");
    let catListSelect = document.querySelector(".cat-list-select");
    let brandListSelect = document.querySelector(".brand-list-select");
  
    //read category for  and list
    for (let category of allCategoryData) {
      allSelect[0].innerHTML += `
      <option>${category.category}</option>
      `;
      catListSelect.innerHTML += `
      <option>${category.category}</option>
      `;
    }
  
    //read brand for product page in start choose brand
    allSelect[0].onchange = () => {
      allSelect[1].innerHTML =
        "<option value='choose brand'>Choose Brand</option>";
      if (allSelect[0].value != "choose category") {
        let filterBrand = allBrandData.filter(
          (brand) => brand.category == allSelect[0].value
        );
        for (let brand of filterBrand) {
          allSelect[1].innerHTML += `
          <option>${brand.brand}</option> 
          `;
        }
      } else {
        swal("Choose Category !", "please select category first", "warning");
      }
    };
    // read brand for product page for list
    catListSelect.onchange = () => {
      brandListSelect.innerHTML =
        "<option value='choose brand'>Choose Brand</option>";
      if (catListSelect.value != "choose category") {
        let filterBrand = allBrandData.filter(
          (brand) => brand.category == catListSelect.value
        );
        for (let brand of filterBrand) {
          brandListSelect.innerHTML += `
          <option>${brand.brand}</option> 
          `;
        }
      } else {
        swal("Choose Category !", "please select category first", "warning");
      }
    };
  
    //read image Binary
    let fReader = new FileReader();
    //Read thumb
    allInput[3].onchange = () => {
      //the below line shows file load hua k nhi
      fReader.onload = (e) => {
        thumb = e.target.result;
      };
      fReader.readAsDataURL(allInput[3].files[0]);
    };
    //Read front
    allInput[4].onchange = () => {
      //the below line shows file load hua k nhi
      fReader.onload = (e) => {
        front = e.target.result;
      };
      fReader.readAsDataURL(allInput[4].files[0]);
    };
    //Read back
    allInput[5].onchange = () => {
      //the below line shows file load hua k nhi
      fReader.onload = (e) => {
        back = e.target.result;
      };
      fReader.readAsDataURL(allInput[5].files[0]);
    };
    //Read right
    allInput[6].onchange = () => {
      //the below line shows file load hua k nhi
      fReader.onload = (e) => {
        right = e.target.result;
      };
      fReader.readAsDataURL(allInput[6].files[0]);
    };
    //Read left
    allInput[7].onchange = () => {
      //the below line shows file load hua k nhi
      fReader.onload = (e) => {
        left = e.target.result;
        console.log(left);
      };
      fReader.readAsDataURL(allInput[7].files[0]);
    };
  
    //create Product coding
    productForm.onsubmit = (e) => {
      e.preventDefault();
      if (allSelect[1].value != "choose brand") {
        allProductData.push({
          category: allSelect[0].value,
          brand: allSelect[1].value,
          title: allInput[0].value,
          description: textareaEL.value,
          price: allInput[1].value,
          quantity: allInput[2].value,
          thumb: thumb != "" ? thumb : "../common/images/portfolio-2.jpg",
          front: front != "" ? front : "../common/images/portfolio-2.jpg",
          back: back != "" ? back : "../common/images/portfolio-2.jpg",
          right: right != "" ? right : "../common/images/portfolio-2.jpg",
          left: left != "" ? left : "../common/images/portfolio-2.jpg",
        });
        insertData("allProductData", JSON.stringify(allProductData));
        swal("Data inserted", "Check product list", "success");
      } else {
        swal("Select brand", "Please select brand first", "warning");
      }
    };
  
    //read product
    brandListSelect.onchange = function () {
      let id = 0;
      let filterProduct = [];
      if (this.value != "choose brand") {
        for (let product of allProductData) {
          if (
            product.category == catListSelect.value &&
            product.brand == this.value
          ) {
            product["id"] = id;
            filterProduct.push(product);
          }
          id++;
        }
        readProductFunc(filterProduct);
      } else {
        swal("Select brand", "Please select brand first", "warning");
      }
    };
  };
  //read Product Coding

const readProductFunc = (filterProduct) => {
    let productForm = document.querySelector(".product-form");
    let allBtn = productForm.querySelectorAll("button");
    let allSelect = productForm.querySelectorAll("select");
    let allInput = productForm.querySelectorAll("input");
    let textareaEL = productForm.querySelector("textarea");
    let productList = document.querySelector(".product-list");
    let option = allSelect[1].querySelector("option");
    productList.innerHTML = "";
    filterProduct.forEach((product, index) => {
      productList.innerHTML += `
        <tr id = "${product.id}" index = "${index}">
        <td class="text-nowrap">${index + 1}</td>
        <td class="text-nowrap">${product.category}</td>
        <td class="text-nowrap">${product.brand}</td>
        <td class="text-nowrap">${product.title}</td>
        <td class="text-nowrap">${product.description}</td>
        <td class="text-nowrap">${product.price}</td>
        <td class="text-nowrap">${product.quantity}</td>
        <td class="text-nowrap">
            <img src="${product.thumb}" width="50" alt="">
        </td>
        <td class="text-nowrap">
            <img src="${product.front}" width="50" alt="">
        </td>
        <td class="text-nowrap">
            <img src="${product.back}" width="50" alt="">
        </td>
        <td class="text-nowrap">
            <img src="${product.right}" width="50" alt="">
        </td>
        <td class="text-nowrap">
            <img src="${product.left}" width="50" alt="">
        </td>
        <td class="text-nowrap">
            <button class="btn edit-btn btn-primary p-1 mx-2">
                <i class="fa fa-edit"></i>
            </button>
            <button class="btn save-btn d-none btn-primary p-1 mx-2">
                <i class="fa fa-save"></i>
            </button>
            <button class="btn del-btn btn-danger p-1 mx-2">
                <i class="fa fa-trash"></i>
            </button>
        </td>
  
    </tr>
        `;
    });
  
    // start delete product coding
    let allDelBtn = productList.querySelectorAll(".del-btn");
    for (let btn of allDelBtn) {
      btn.onclick = function () {
        let parent = btn.parentElement.parentElement;
        let id = parent.getAttribute("id");
        let index = parent.getAttribute("index");
        allProductData.splice(id, 1);
        filterProduct.splice(index, 1);
        delAndupdateFunc(
          "allProductData",
          JSON.stringify(allProductData),
          dy_link,
          "Deleted",
          filterProduct
        );
      };
    } //start product coding
  
    let allEditBtn = productList.querySelectorAll(".edit-btn");
    for (let btn of allEditBtn) {
      btn.onclick =  function () {
        let parent = btn.parentElement.parentElement;
        let id = parent.getAttribute("id");
        let index = parent.getAttribute("index");
        let allTd = parent.querySelectorAll("td");
        let allImg = parent.querySelectorAll("img");
        let category = allTd[1].innerHTML;
        let brand = allTd[2].innerHTML;
        let name = allTd[3].innerHTML;
        let description = allTd[4].innerHTML;
        let price = allTd[5].innerHTML;
        let quantity = allTd[6].innerHTML;
        thumb = allImg[0].src;
        front = allImg[1].src;
        back = allImg[2].src;
        right = allImg[3].src;
        left = allImg[4].src;
        allSelect[0].value = category;
        allSelect[0].disabled = true;
        option.value = brand;
        option.innerHTML = brand;
        allSelect[1].disabled = true;
        allInput[0].value = name;
        textareaEL.value = description;
        allInput[1].value = price;
        allInput[2].value = quantity;
        allBtn[0].classList.add("d-none");
        allBtn[1].classList.remove("d-none");
        //request for update
        allBtn[1].onclick = async function () {
            allProductData[id] = {
                category: allSelect[0].value,
                brand: allSelect[1].value,
                title: allInput[0].value,
                description: textareaEL.value,
                price: allInput[1].value,
                quantity: allInput[2].value,
                thumb: thumb != "" ? thumb : "../common/images/portfolio-2.jpg",
                front: front != "" ? front : "../common/images/portfolio-2.jpg",
                back: back != "" ? back : "../common/images/portfolio-2.jpg",
                right: right != "" ? right : "../common/images/portfolio-2.jpg",
                left: left != "" ? left : "../common/images/portfolio-2.jpg",
              }
              filterProduct[index] = {
                category: allSelect[0].value,
                brand: allSelect[1].value,
                title: allInput[0].value,
                description: textareaEL.value,
                price: allInput[1].value,
                quantity: allInput[2].value,
                thumb: thumb != "" ? thumb : "../common/images/portfolio-2.jpg",
                front: front != "" ? front : "../common/images/portfolio-2.jpg",
                back: back != "" ? back : "../common/images/portfolio-2.jpg",
                right: right != "" ? right : "../common/images/portfolio-2.jpg",
                left: left != "" ? left : "../common/images/portfolio-2.jpg",
              }
            const isUpdated = await delAndupdateFunc("allProductData",JSON.stringify(allProductData),
              dy_link,"UPDATED",filterProduct);
              if(isUpdated)
              {
                allBtn[0].classList.remove("d-none");
                allBtn[1].classList.add("d-none");
                productForm.reset("");
              }
        
        };
      };
    }
  };

  // Ctreate branding details coding

const createBrandingFunc = () => {
    let brandingForm = document.querySelector(".branding-form");
    let allInput = brandingForm.querySelectorAll("INPUT");
    let allTextArea = brandingForm.querySelectorAll("TEXTAREA");
    let lengthCountTextArea = brandingForm.querySelectorAll(".textarea");
    let allBtn = brandingForm.querySelectorAll("button");
    let editBrandBtn = document.querySelector(".edit-branding-btn");
   
    // count text area length
    for (let textarea of lengthCountTextArea) {
      textarea.oninput = () => {
       let parent = textarea.parentElement;
        let span = parent.querySelector("span");
        let length = textarea.value.length;
        span.innerHTML = length;
      }
    }
    allInput[1].onchange = () => {
        let fReader = new FileReader();
        fReader.onload = (e) => {
          brand_logo = e.target.result;
        };
        fReader.readAsDataURL(allInput[1].files[0]);
      };
    
      //create store branding details
      brandingForm.onsubmit = (e) => {
        e.preventDefault();
        insertBrandingFunc();
        readBrandingFunc();
      };
    
      //reading branding data
      const readBrandingFunc = () => {
        let branding = getAllData("allBrandingData");
        if (branding.length > 0) {
          //already brand created
          editBrandBtn.classList.remove("d-none");
          allInput[0].value = branding[0].b_name;
          brand_logo = branding[0].b_logo;
          allInput[2].value = branding[0].b_domain;
          allInput[3].value = branding[0].b_email;
          allInput[4].value = branding[0].b_facebook;
          allInput[5].value = branding[0].b_twitter;
          allInput[6].value = branding[0].b_whatsapp;
          allInput[7].value = branding[0].b_instagram;
          allInput[8].value = branding[0].b_mobile;
          allTextArea[0].value = branding[0].b_address;
          allTextArea[1].value = branding[0].b_about;
          allTextArea[2].value = branding[0].b_privacy;
          allTextArea[3].value = branding[0].b_cookie;
          allTextArea[4].value = branding[0].b_terms;
          for (let input of allInput) {
            input.disabled = true;
          }
          for (let textarea of allTextArea) {
            textarea.disabled = true;
          }
          allBtn[0].classList.add("d-none");
          allBtn[1].classList.remove("d-none");
    
          editBrandBtn.onclick = () => {
            for (let input of allInput) {
              input.disabled = false;
            }
            for (let textarea of allTextArea) {
              textarea.disabled = false;
            }
            allBtn[1].disabled = false;
          };
          allBtn[1].disabled = true;
        } else {
          //no brand created, no need but leave it
        }
      };
      readBrandingFunc();
      const insertBrandingFunc = () => {
        let allBrandingData = [];
        allBrandingData.push({
          b_name: allInput[0].value,
          b_logo: brand_logo,
          b_domain: allInput[2].value,
          b_email: allInput[3].value,
          b_facebook: allInput[4].value,
          b_twitter: allInput[5].value,
          b_whatsapp: allInput[6].value,
          b_instagram: allInput[7].value,
          b_mobile: allInput[8].value,
          b_address: allTextArea[0].value,
          b_about: allTextArea[1].value,
          b_privacy: allTextArea[2].value,
          b_cookie: allTextArea[3].value,
          b_terms: allTextArea[4].value,
        });
        insertData("allBrandingData", JSON.stringify(allBrandingData));
        swal("Data Inserted", "Check branding table", "success");
      };
  
  };
  

  
 