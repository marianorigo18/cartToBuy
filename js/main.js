/* 
  1. 
    Agregue la funcionalidad al botón 'Agregar Producto' 
    Ese botón debe agregar el producto al carrito y actualizar la vista 
    Igualmente, debe almacenar en el storage el carrito para el usuario actual
    
   2. 
    Modifique el programa, para que una vez se carguen la página, se precargue el carrito existente, en caso de haber alguno
*/
let carritoDeCompra = [];
function init() {
  escribirBienvenida();
  mostrarMenu();
  escribirMensaje();
  recuperar();
}

function escribirBienvenida() {
  const myH1 = document.createElement("h1");
  myH1.innerHTML = "Bienvenido";
  document.body.appendChild(myH1);
}

function mostrarMenu() {
  categorias.forEach((categoria) => {
    const myBtn = document.createElement("button");
    myBtn.setAttribute("class", "styledBtn");
    myBtn.setAttribute("id", `${categoria.id}`);
    myBtn.innerHTML = categoria.nombre;
    //Add Event
    document.body.appendChild(myBtn);
  });
}

function escribirMensaje() {
  const nodoMensaje = document.createElement("p");
  nodoMensaje.innerHTML = "Por favor, selecciona una categoría para continuar:";
  document.body.appendChild(nodoMensaje);
  botonera();
}

function botonera() {
  let div = document.createElement("div");
  document.body.appendChild(div);
  let div2 = document.createElement("div");
  div2.setAttribute("id", "elementos");
  document.body.appendChild(div2);
  let botones = document.getElementsByClassName("styledBtn");

  for (const boton of botones) {
    boton.addEventListener("click", () => {
      div.innerHTML = "";
      let category = categorias.find((item) => item.id == boton.id);
      div.innerHTML = `<h2>${category.nombre}</h2>`;
      let galeria = productos.filter(
        (producto) => producto.categoria == boton.id
      );
      renederProductos(galeria);
    });
  }
}

function renederProductos(array) {
  const div = document.getElementById("elementos");
  div.innerHTML = "";
  array.map((element) => {
    let id = element.id;
    let nombre = element.nombre;
    let precio = element.precio;
    let stock = element.stock;
    let hayNoHay;
    if (stock > 0) {
      hayNoHay = `<div class="actions">
      <button class="add" id=${id}>add</button>
      </div>`;
    } else {
      hayNoHay = `<div class="actions">
      No Disponible!
      </div>`;
    }
    div.innerHTML += `
          <div class="item">
              <div class="title">${nombre}</div>
              <div class="price">${precio}</div>
              <div class="qty">${stock} units</div>
              ${hayNoHay}
          </div>`;
  });
  agregarAlCarrito();
}

function agregarAlCarrito() {
  let btnadd = document.getElementsByClassName("add");
  for (const botones of btnadd) {
    botones.addEventListener('click',()=>{
      let producto = productos.find((item) => item.id == botones.id);
    carritoDeCompra.push(producto);
      mostrarCarrito(producto);
      totalCarrito()
      localStorage.setItem('carrito', JSON.stringify(carritoDeCompra))
    })
    
  }
}

function totalCarrito(){
  const total = document.getElementById('total')
  total.innerText = carritoDeCompra.reduce((acc,el)=> acc + el.precio,0)
}

function mostrarCarrito(producto){
  const carrito = document.getElementById('carrito')
let li = document.createElement('li')
li.innerHTML += `${producto.nombre} ${producto.precio}`
carrito.appendChild(li)
}

function recuperar() {
  let recuperoLS = JSON.parse(localStorage.getItem('carrito'))
  if(recuperoLS){
    recuperoLS.forEach(item=>{
      mostrarCarrito(item)
      carritoDeCompra.push(item)
      totalCarrito()
    })
  }
}

init()