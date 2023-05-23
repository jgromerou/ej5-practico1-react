import { Button, ListGroup } from 'react-bootstrap';

const ItemTarea = ({ tarea }) => {
  return (
    <div>
      <ListGroup.Item className="d-flex justify-content-between">
        {tarea}
        <Button variant="danger">Borrar</Button>
      </ListGroup.Item>
    </div>
  );
};

export default ItemTarea;
