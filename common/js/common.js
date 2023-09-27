const insertData = (table_name,data) =>{
    localStorage.setItem(table_name,data)
}

const getAllData = (table_name) =>{
    if(localStorage.getItem(table_name) != null)
    {
        let data =JSON.parse(localStorage.getItem(table_name));
        return data;
    }
    else{
        return [];
    }
}

const insertMsg = () =>{
    
    swal("Success","Data inserted","success");
}

const delAndupdateFunc = (table_name,data,link,message,filterData) =>{
   return new Promise ((resolve,reject)=>{
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            insertData(table_name,data);
            if(link == "dynamic/cat_design.html")
            {
                readCategoryData();
            }
            else if(link == "dynamic/brand_design.html")
            {
                readBrandFunc(filterData);
            }
            else if(link == "dynamic/product_design.html")
            {
                readProductFunc(filterData);
                resolve(true);
            }
            
            
            
          swal("Poof! Your imaginary file has been "+message+"!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
   })
}