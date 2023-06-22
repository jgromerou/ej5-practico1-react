import { Button, ListGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { consultaBorrarTarea, obtenerListaTareas } from './helpers/queries';

const ItemTarea = ({ tarea, setListaTareas }) => {
  const borrarTarea = () => {
    Swal.fire({
      title: `¿Estás seguro de borrar la tarea ${tarea.nombreTarea}?`,
      text: 'No se puede revertir este paso',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        //borrar la tarea de la API
        consultaBorrarTarea(tarea.id).then((respuesta) => {
          console.log(respuesta);
          if (respuesta && respuesta.status === 200) {
            Swal.fire(
              'Tarea eliminada',
              `la tarea ${tarea.nombreTarea} fue eliminada correctamente`,
              'success'
            );
            //actualizar la lista de tareas.
            obtenerListaTareas().then((respuesta) => {
              setListaTareas(respuesta);
            });
          } else {
            Swal.fire(
              'Ocurrió un error',
              `Intente realizar esta operación nuevamente más tarde`,
              'error'
            );
          }
        });
      }
    });
  };
  return (
    <div>
      <ListGroup.Item className="d-flex justify-content-between">
        {tarea.nombreTarea}
        <Button variant="danger" onClick={() => borrarTarea(tarea)}>
          Borrar
        </Button>
      </ListGroup.Item>
    </div>
  );
};

export default ItemTarea;
