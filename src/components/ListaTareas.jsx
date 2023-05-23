import { ListGroup } from 'react-bootstrap';
import ItemTarea from './ItemTarea';
const ListaTareas = ({ listaTareas }) => {
  return (
    <ListGroup id="listgroup">
      {listaTareas.map((tarea, index) => (
        <ItemTarea key={index} tarea={tarea}></ItemTarea>
      ))}
    </ListGroup>
  );
};

export default ListaTareas;
