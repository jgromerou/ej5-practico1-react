const URLTareas = import.meta.env.VITE_API_TAREAS;

export const obtenerListaTareas = async () => {
  try {
    const respuesta = await fetch(URLTareas);
    const listaTareas = await respuesta.json();
    return listaTareas;
  } catch (error) {
    console.log(error);
  }
};
