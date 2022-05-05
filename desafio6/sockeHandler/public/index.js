const socket = io();

// Chat functions
socket.on("mensage_back", (data) => {
  socket.emit("message_client", "Estoy conectado, soy el cliente!");
  renderChat(data);
});

const renderChat = (data) => {
  let html = `
    <div id="overf" class="form-group">
      <select multiple class="form-control">
        ${data.map(x => {
          return `<option> <p><strong>${x.nombre}:</strong> ${x.msn}</p> </option>`
        })}
      </select>
    </div>`

  document.querySelector("#caja").innerHTML = html;
  setTimeout(() =>
  document
    .querySelector("#overf")
    .scrollTo(0, document.querySelector("#overf").scrollHeight)
);

};

document.addEventListener("keypress", sendMsg);

function sendMsg(e) {
  if (
    document.querySelector("#msn").value === "" ||
    document.querySelector("#msn").value
  ) {
    return false;
  }
  if (e.keyCode === 13) addMessage();
}

const addMessage = () => {
  let dataObj = {
    nombre: document.querySelector("#nb").value,
    msn: document.querySelector("#msn").value,
  };
  socket.emit("dataMsn", dataObj);
  document.querySelector("#msn").value = "";
  document.querySelector("#msn").focus();
  return false;
};

socket.on("productlist_back", (data) => {
  renderProd(data);
  socket.emit("productlist_client", "Estoy leyendo el listado de productos!");
});

const renderProd = (data) => {

  const html = `
  <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">titulo</th>
      <th scope="col">precio</th>
      <th scope="col">foto</th>
    </tr>
  </thead>
  <tbody>
  ${data
      .map((prod) => {
        return ` 
          <tr >
            <td scope="row">
                                   
            </td>
            <td scope="row">
              <span>${prod.title}</span>
            </td>
            <td scope="row">
              <span>${prod.price}</span>
            </td>
            <td scope="row">
              <img src=${prod.thumbnail} alt ="foto"/>
            </td>
                                
            </tr> `;
      })}  
  </tbody>
</table>`
  if (data.length > 0) document.querySelector("#table").innerHTML = html;
  if (data.length === 0)
    document.querySelector("#table").innerHTML = htmlnoitems;
};

const addProducto = () => {
  let dataObj = {
    title: document.querySelector("#title").value,
    price: document.querySelector("#price").value,
    imageurl: document.querySelector("#thumbnail").value,
  };
  socket.emit("addProds", dataObj);
  document.querySelector("#title").value = "";
  document.querySelector("#price").value = "";
  document.querySelector("#thumbnail").value = "";
  return false;
};

