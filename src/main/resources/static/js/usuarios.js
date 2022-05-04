// Call the dataTables jQuery plugin
$(document).ready(function() {

    cargarUsuarios();

  $('#usuarios').DataTable();

  actualizarEmailDelUsuario()
});

const actualizarEmailDelUsuario = () => {
    document.getElementById('txt-email-usuario').outerHTML = localStorage.email;
}

const cargarUsuarios = async() => {
      const request = await fetch('api/usuarios', {
        method: 'GET',
        headers: getHeaders()
      });
      const usuarios = await request.json();

      let listadoHtml = '';

      for ( let usuario of usuarios ) {
        let usuarioHtml = `<tr>
                            <td>${usuario.id}</td>
                             <td>${usuario.nombre} ${usuario.apellido}</td>
                             <td>${usuario.email}</td>
                             <td>${usuario.telefono}</td>
                             <td>
                                 <a href="#" class="btn btn-danger btn-circle btn-sm" onclick="eliminarUsuario(${usuario.id})">
                                     <i class="fas fa-trash"></i>
                                 </a>
                             </td>
                       </tr>`;
        listadoHtml += usuarioHtml;
      }

      console.log(usuarios);



      document.querySelector('#usuarios tbody').outerHTML = listadoHtml;
}

const getHeaders = () => {
     return {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': localStorage.token
            }
}

const eliminarUsuario = async(id) => {

      if (!confirm("¿Desea eliminar este usuario?")) {
        return;
      }

      const request = await fetch(`api/usuarios/${ id }`, {
        method: 'DELETE',
        headers: getHeaders()
      });

    location.reload();
    console.log(id);
}