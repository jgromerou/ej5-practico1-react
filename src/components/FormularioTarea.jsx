import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import ListaTareas from './ListaTareas';

const FormularioTarea = () => {
  let tareasDelLocalstorage =
    JSON.parse(localStorage.getItem('listaTareas')) || [];
  const [inputTarea, setInputTarea] = useState('');
  const [listaTareas, setListaTareas] = useState(tareasDelLocalstorage);

  useEffect(() => {
    localStorage.setItem('listaTareas', JSON.stringify(listaTareas));
  }, [listaTareas]);

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

  return (
    <section>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 d-flex" controlId="tarea">
          <Form.Control
            type="text"
            placeholder="Ingrese una tarea"
            value={inputTarea}
            onChange={(event) => setInputTarea(event.target.value)}
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
