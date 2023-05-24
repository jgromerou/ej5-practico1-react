import { Button, ListGroup } from 'react-bootstrap';

const ItemTarea = ({ tarea, borrarTarea }) => {
  return (
    <div>
      <ListGroup.Item className="d-flex justify-content-between">
        {tarea}
        <Button variant="danger" onClick={() => borrarTarea(tarea)}>
          Borrar
        </Button>
      </ListGroup.Item>
    </div>
  );
};

export default ItemTarea;
