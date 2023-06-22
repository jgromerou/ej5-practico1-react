import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import ListaTareas from './ListaTareas';
import { obtenerListaTareas, consultaAgregarTarea } from './helpers/queries';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const FormularioTarea = () => {
  const [listaTareas, setListaTareas] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    obtenerListaTareas().then((respuesta) => {
      setListaTareas(respuesta);
    });
  }, []);

  const onSubmit = (datos) => {
    console.log('tarea', datos);
    consultaAgregarTarea(datos).then((respuestaCreado) => {
      if (respuestaCreado && respuestaCreado.status === 201) {
        Swal.fire(
          'Receta creada',
          `La tarea ${datos.nombreTarea} fue creada correctamente`,
          'success'
        );
        //actualizar la lista de tareas
        obtenerListaTareas().then((respuesta) => setListaTareas(respuesta));
        reset();
      } else {
        Swal.fire(
          'Ocurrio un error',
          `La tarea ${datos.inputTarea} no fue creada, intentelo mas tarde`,
          'error'
        );
      }
    });
  };

  //borrar todas las tareas del local storage
  //  const borrarLocalstorage = () => {
  //   setListaTareas([]);
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
                value: /^[A-Za-z\s]+$/,
                message: 'Por favor, ingrese solo letras y espacios.',
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
      </Form>
      <ListaTareas
        listaTareas={listaTareas}
        setListaTareas={setListaTareas}
      ></ListaTareas>
    </section>
  );
};

export default FormularioTarea;
