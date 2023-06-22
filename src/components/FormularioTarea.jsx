import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import ListaTareas from './ListaTareas';
import { obtenerListaTareas, consultaAgregarTarea } from './helpers/queries';
import { useForm } from 'react-hook-form';

const FormularioTarea = () => {
  const [inputTarea, setInputTarea] = useState('');
  const [listaTareas, setListaTareas] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  //borrar todas las tareas del local storage
  const borrarLocalstorage = () => {
    setListaTareas([]);
  };
  useEffect(() => {
    obtenerListaTareas().then((respuesta) => {
      setListaTareas(respuesta);
    });
  }, []);

  const onSubmit = (datos) => {
    console.log('tarea', datos);
    consultaAgregarTarea(datos).then((respuestaCreado) => {
      console.log(respuestaCreado);
      // if (respuestaCreado && respuestaCreado.status === 201) {
      //   Swal.fire(
      //     'Receta creada',
      //     `La tarea ${inputTarea} fue creada correctamente`,
      //     'success'
      //   );
      //   reset();
      // } else {
      //   Swal.fire(
      //     'Ocurrio un error',
      //     `La tarea ${inputTarea} no fue creada, intentelo mas tarde`,
      //     'error'
      //   );
      // }
    });
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-2">
          <Form.Control
            className="col-sm-9"
            type="text"
            placeholder="Ingrese un nombre de usuario"
            {...register('nombreTarea', {
              required: 'El Nombre de la Tarea es un dato obligatorio.',
              pattern: {
                value: /^[A-Za-z]+$/,
                message: 'Por favor, ingrese solo letras.',
              },
            })}
          />
          <Form.Text className="text-danger my-2 py-3">
            {errors.nombreTarea?.message}
          </Form.Text>
        </Form.Group>

        <Button
          className="col-12 col-sm-2 btn btn-dark btn-lg btn-block mb-2"
          type="submit"
        >
          Enviar
        </Button>

        {/* <Form.Group className="mb-3 d-flex" controlId="tarea">
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
        </Form.Group> */}
      </Form>
      <ListaTareas listaTareas={listaTareas}></ListaTareas>
    </section>
  );
};

export default FormularioTarea;
