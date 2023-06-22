import { ListGroup } from 'react-bootstrap';
import ItemTarea from './ItemTarea';
const ListaTareas = ({ listaTareas, borrarTarea }) => {
  return (
    <ListGroup id="listgroup">
      {listaTareas.map((tarea) => (
        <ItemTarea
          key={tarea.id}
          tarea={tarea.nombreTarea}
          borrarTarea={borrarTarea}
        ></ItemTarea>
      ))}
    </ListGroup>
  );
};

export default ListaTareas;
