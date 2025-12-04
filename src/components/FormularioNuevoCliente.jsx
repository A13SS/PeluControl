import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../styles/FormularioNuevoCliente.css';

//Esquema de validación
const validacion = yup.object({
  nombre: yup.string().required("Nombre obligatorio"),
  telefono: yup.string()
    //Expresión para regular que sean solo dígitos
    .matches(/^\d+$/, "Sólo números")
    .min(9, "Mínimo 9 dígitos")
});

function FormularioNuevoCliente({ onGuardar, onCancel }) {
  //El register es una funcion para conectar un input con el formulario, handleSubmit es una funcion que envuelve la funcion de envio y solo ejecuta si los datos son validos,
  const {register, handleSubmit, reset, formState: { errors }} = useForm({resolver: yupResolver(validacion)});

  const onSubmit = (data) => {
    onGuardar(data); //Enviamos los datos al padre
    reset(); //Limpiamos el formulario
  };

  return (
    <form className="formulario" onSubmit={handleSubmit(onSubmit)}>

      {/*el operador ... se llama operador "spread" y es muy comodo de usar ya que nos simplifica el codigo como atributos del input las propiedades del objeto que expande,
      es decir, register("nombre") que devuelve un objeto con propiedades clave como el name, el onChange, el onBlur o el ref*/}
      <input className="placeholder" {...register("nombre")} placeholder="Nombre" />
      {errors.nombre && <span>{errors.nombre.message}</span>}

      <input className="placeholder" {...register("telefono")} placeholder="Teléfono" />
      {errors.telefono && <span>{errors.telefono.message}</span>}

      <button className="button" type="submit">Guardar</button>
      <button className="button" type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}

export default FormularioNuevoCliente