import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import ListaTareas from './ListaTareas';
import { obtenerListaTareas } from './helpers/queries';

const FormularioTarea = () => {
  const [inputTarea, setInputTarea] = useState('');
  const [listaTareas, setListaTareas] = useState([]);
  //borrar todas las tareas del local storage
  const borrarLocalstorage = () => {
    setListaTareas([]);
  };
  useEffect(() => {
    obtenerListaTareas().then((respuesta) => {
      setListaTareas(respuesta);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    agregarTarea(inputTarea);
  };

  const agregarTarea = (tarea) => {
    //se agrega nueva tarea a la lista de tareas
    setListaTareas([...listaTareas, tarea]);
    //limpiar el input Tarea
    setInputTarea('');
  };

  // const borrarTarea = (nombreTarea) => {
  //   let _listaTareas = listaTareas.filter((item) => item !== nombreTarea);
  //   setListaTareas(_listaTareas);
  // };

  return (
    <section>
      <Row>
        <Col className="d-flex justify-content-end">
          <Button
            className="my-3"
            variant="danger"
            onClick={() => borrarLocalstorage()}
          >
            Borrar Lista de Tareas
          </Button>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 d-flex" controlId="tarea">
          <Form.Control
            type="text"
            placeholder="Ingrese una tarea"
            value={inputTarea}
            onChange={(event) => setInputTarea(event.target.value)}
            className="me-1"
          />
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form.Group>
      </Form>
      <ListaTareas listaTareas={listaTareas}></ListaTareas>
    </section>
  );
};

export default FormularioTarea;
