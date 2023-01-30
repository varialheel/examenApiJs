let alllogs = [];

const nuevaCelda = (dato) => {
  let nuevacelda = document.createElement("TD");
  nuevacelda.append(dato);
  return nuevacelda;
};

const createLink = (datalink) => {
  const link = document.createElement("A");
  link.href = datalink;
  link.textContent = datalink;
  link.target = "_blank";
  link.classList.add("tablastock__link");
  return link;
};

const showLogs = () => {
  // Mostramos el stock
  tablastock_body.innerHTML = "";
  let fragment = document.createDocumentFragment();
  alllogs.map((log) => {
    let nuevafila = document.createElement("TR");
    nuevafila.append(nuevaCelda(log.user));
    // Creamos un link cuando es un get
    nuevafila.append(nuevaCelda(log.action));
    if (log.method == "GET") {
      let link = createLink(log.path);
      nuevafila.append(nuevaCelda(link));
    } else {
      nuevafila.append(nuevaCelda(log.path));
    }
    nuevafila.append(nuevaCelda(log.date));
    fragment.append(nuevafila);
  });
  tablastock_body.append(fragment);
};

const sortByUser = (a, b) => {
  return a.user == b.user ? 0 : a.user > b.user ? 1 : -1;
};

// Realizamos la peticion al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  alllogs = JSON.parse(localStorage.getItem("logs"));

  alllogs = alllogs.sort(sortByUser);
  showLogs();
});