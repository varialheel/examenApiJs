import Book from "./books.js";
// Select categorias
const select_categories = document.getElementById("select_categories");

// Select autores
const select_authors = document.getElementById("select_authors");
const books = document.getElementById("books");

// Botón crear libro
const btn_allbooks = document.getElementById("btn_allbooks");

// Modal
const modal_container = document.getElementById("modal_container");

const btn_newbook = document.getElementById("btn_newbook");
const btn_modal_aniadir = document.getElementById("btn_modal_aniadir");
const btn_modal_cancelar = document.getElementById("btn_modal_cancelar");

const modal_input_title = document.getElementById("modal_input_title");
const modal_input_author = document.getElementById("modal_input_author");
const modal_select_category = document.getElementById("modal_select_category");
const modal_input_content = document.getElementById("modal_input_content");

// Arrays para datos
let allbooks = [];
let allcategories = [];
let allauthors = [];
// Funcion borrar libro
const deleteBook = (id)=>{
  fetch(`http://localhost:3000/api/v1/books/${id}`, {
    method: 'DELETE',
})
    .then(response => {
        if (!response.status == 200) {
            console.log("No se ha podido realizar el borrado")
        } 
    })
    .catch(error => console.log(error));
}
// funcion crear log
const setLogLocalStorage = (action, path, method) => {
  let date = new Date();

  let formateddate =
    ("0" + date.getDate()).slice(-2) +
    "/" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    date.getFullYear() +
    " - " +
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2) +
    ":" +
    ("0" + date.getSeconds()).slice(-2);

  //  FALTA POR HACER la creación del objeto y guradarlo en localStorage

  let accion = {
    user:JSON.parse(localStorage.getItem("user")).userName,
    action:action,
    path:path,
    method:method,
    date:formateddate
  }

  let acciones = JSON.parse(localStorage.getItem("logs"))

  acciones.push(accion);
  localStorage.setItem("logs",JSON.stringify(acciones));
};
// Crear un libro
const createCardBook = (book) => {
  // articulo
  let card = document.createElement("ARTICLE");
  card.classList.add("book");

  // img
  let img = document.createElement("IMG");
  img.classList.add("book__img");
  img.src = book.cover;
  card.appendChild(img);

  // section
  let section = document.createElement("SECTION");
  section.classList.add("book__textos");
  card.appendChild(section);

  // span ttítulo
  let span = document.createElement("SPAN");
  span.classList.add("book__texto");
  span.textContent = "Título: ";
  section.appendChild(span);

  // span
  span = document.createElement("SPAN");
  span.textContent = book.title;
  section.appendChild(span);

  //br
  let br = document.createElement("BR");
  section.appendChild(br);

  // span autor
  span = document.createElement("SPAN");
  span.classList.add("book__texto");
  span.textContent = "Autor: ";
  section.appendChild(span);

  //span
  span = document.createElement("SPAN");
  span.textContent = book.author;
  section.appendChild(span);

  //br
  br = document.createElement("BR");
  section.appendChild(br);

  // span autor
  span = document.createElement("SPAN");
  span.classList.add("book__texto");
  span.textContent = "Categoría: ";
  section.appendChild(span);

  //span
  span = document.createElement("SPAN");
  span.textContent = book.category;
  section.appendChild(span);

  //br
  br = document.createElement("BR");
  section.appendChild(br);

  span = document.createElement("SPAN");
  span.classList.add("book__texto");
  span.textContent = "Descripción: ";
  section.appendChild(span);
  //br
  br = document.createElement("BR");
  section.appendChild(br);

  // section
  let sectioncontent = document.createElement("SECTION");
  section.classList.add("book__textos");
  card.appendChild(sectioncontent);

  // span content
  span = document.createElement("SPAN");
  span.textContent = book.content;
  section.appendChild(span);

  //button
  let button = document.createElement("BUTTON");
  button.classList.add("book__btnborrar");
  button.id = book.id;
  button.textContent = "Eliminar";
  // añadimos evento al boton de borrado
  button.addEventListener("click",()=>{
    deleteBook(book.id);
    setLogLocalStorage("Borrar libro",`http://localhost:3000/api/v1/books/${book.id}`,"DELETE")
    window.location.reload();
  })
  section.appendChild(button);

  return card;
};

// ------------------------------------------------------------------------------------------
// Cargar los libros
const loadLibros = (type,filter="")=>{
  let fragment = document.createDocumentFragment();
  if (type==="") {
    allbooks.forEach(element=>{
      fragment.appendChild(createCardBook(element))
    })
  } else if(type==="category") {
    allbooks.filter(book => book.category===filter).forEach(element=>{
      fragment.appendChild(createCardBook(element))
    })
  } else if(type==="authors") {
    allbooks.filter(book => book.author===filter).forEach(element=>{
      fragment.appendChild(createCardBook(element))
    })
  }
  books.appendChild(fragment)
}
// cargar los options de categorias 
const loadCategorySelect = ()=>{
  let fragment = document.createDocumentFragment();
  let option;
  allcategories.forEach(element=>{
    option = document.createElement("option")
    option.setAttribute("value",element.nicename);
    option.textContent = element.name
    fragment.appendChild(option)
  })
  return fragment;
}
// cargar los options de autores
const loadAuthorsSelect = ()=>{
  let fragment = document.createDocumentFragment();
  let option;
  allauthors.forEach(element=>{
    option = document.createElement("option")
    option.setAttribute("value",element);
    option.textContent = element
    fragment.appendChild(option)
  })
  select_authors.appendChild(fragment);
}
// cargar de url
const loadElement = async (url)=>{
  return fetch(url)
    .then(response => response.json())
    .then((json)=>json).catch(error=>{
      console.log(error)
  })
}
//carga de los resultados de la promesa
const getElements = async (type,url)=>{
let array=[];
let result = await loadElement(url);

if (type==="books") {
  result.forEach(element => {
    array.push(new Book(element.id,element.title,element.author,element.category,element.content,element.cover,element.url_download))
  });
} else {
  result.forEach(element => {
    array.push(element)
  });
}
return array;
}
// Carga de todos los datos de la página

const loadDatas = async ()=>{
  allbooks = await getElements("books","http://localhost:3000/api/v1/books/");
  allcategories = await getElements("","http://localhost:3000/api/v1/categories/");
  allauthors = await getElements("","http://localhost:3000/api/v1/authors/");
  modal_select_category.appendChild(loadCategorySelect())
  select_categories.appendChild(loadCategorySelect())
  loadAuthorsSelect()
  loadLibros("")
  
}
// añadir libro a la api
const addBook = (book)=>{
  fetch(`http://localhost:3000/api/v1/books/`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(book)
})
    .then(response => response.json())
    .then(response => {
    })
    .catch(error => console.log(error));
}
// borrar los libros de la pagina para poder mostrar los libros filtrados
const deleteBooksDiv = ()=>{
  while (books.childNodes.length>0) {
    books.removeChild(books.firstChild)
  }
}
// Eventos:
// evento para cargar los datos necesarios al cargar la pagina
document.addEventListener("DOMContentLoaded",()=>{
  loadDatas()

  if (!localStorage.getItem("logs")) {
    localStorage.setItem("logs",JSON.stringify([]))
  }
  setLogLocalStorage("Todos los libros","http://localhost:3000/api/v1/books/","GET")
})

// evento que comprueba cuando se quiere filtrar por categoria
select_categories.addEventListener("change",(event)=>{
  deleteBooksDiv()
  loadLibros("category",event.target.value)
  setLogLocalStorage("Consulta categoria",`http://localhost:3000/api/v1/books/category/${event.target.value}`,"GET")
})

// evento que comprueba cuando se quiere filtrar por categoria
select_authors.addEventListener("change",(event)=>{
  deleteBooksDiv()
  loadLibros("authors",event.target.value)
  setLogLocalStorage("Consulta autor",`http://localhost:3000/api/v1/books/author/${event.target.value}`,"GET")
})

// evento que comprueba cuando se quiere ver todos los libros
btn_allbooks.addEventListener("click",()=>{
  window.location.reload()
})

// evento que comprueba cuando se quiere añadir un libro
btn_newbook.addEventListener("click",()=>{
  modal_container.classList.toggle("modal__mostrar")
})

// evento que comprueba cuando se quiere cancelar la ventanta de añadir libro
btn_modal_cancelar.addEventListener("click",()=>{
  modal_input_title.value="";
  modal_input_author.value="";
  modal_input_content.value="";
  modal_container.classList.toggle("modal__mostrar")
})

// evento que comprueba cuando se quiere añadir un libro con los datos introducidos
btn_modal_aniadir.addEventListener("click",()=>{
  let book = {
    title:modal_input_title.value,
    author:modal_input_author.value,
    category:modal_select_category.value,
    content:modal_input_content.value,
    cover:"assets/images/fondo1.jpg"
  }
  addBook(book)
  setLogLocalStorage("Añadir libro",`http://localhost:3000/api/v1/books/`,"POST")
  window.location.reload()
})