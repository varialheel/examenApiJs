import Category from "./categories.js";
import Book from "./books.js";
import BooksCategory from "./books_category.js";
// ---------------------------------------------------------------------------------------------------
const tablastock_body = document.getElementById("tablastock_body");
let allcategories = [];
let allbooks = [];
let allbookscategory = [];
// ---------------------------------------------------------------------------------------------------
const createTd = (text)=>{
  let td = document.createElement("td");
  td.textContent=text
  return td;
}

// Funcion para mostrar los libros
const showBooks = ()=> {
  let fragment = document.createDocumentFragment();
  let tr;

  allbookscategory.forEach(element=>{
    tr = document.createElement("tr");
    tr.appendChild(createTd(element.book.title));
    tr.appendChild(createTd(element.book.author));

    if (element.category===null) {
      tr.appendChild(createTd("Sin categoria"));
    } else {
      tr.appendChild(createTd(element.category.name));
    }

    fragment.appendChild(tr)
  })
  tablastock_body.appendChild(fragment);
}

// carga de los elementos de una url
const loadElement = async (url)=>{
    return fetch(url)
      .then(response => response.json())
      .then((json)=>json).catch(error=>{
        console.log(error)
    })
}

// carga de los datos de una promesa
const getElements = async (type,url)=>{
  let array=[];
  let result = await loadElement(url);

  if (type==="books") {
    result.forEach(element => {
      array.push(new Book(element.id,element.title,element.author,element.category,element.content,element.cover,element.url_download))
    });
  } else if (type==="categories") {
    result.forEach(element => {
      array.push(new Category(element.id,element.name,element.nicename))
    });
  }
  return array;
}

// carga en el array de los libros con su categoria
const loadBooksCategory = async ()=>{
  allbooks = await getElements("books","http://localhost:3000/api/v1/books/");
  allcategories = await getElements("categories","http://localhost:3000/api/v1/categories/");
  let category;

  for (const iterator of allbooks) {
      category=allcategories.filter(categoria => categoria.nicename==iterator.category)
      if (category.length===0) {
        allbookscategory.push(new BooksCategory(iterator,null))
      } else {
        allbookscategory.push(new BooksCategory(iterator,category[0]))
      }
  }
  
  showBooks();
}
// ---------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded",()=>{
  loadBooksCategory()
})