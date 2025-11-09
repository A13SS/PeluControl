import '../styles/Busqueda.css';

function Busqueda({ value, onChange }) {
  return (
    <input className="busquedaInput"
      type="text"
      placeholder="Buscar cliente por nombre o teléfono: "
      value={value}
      onChange={onChange}
    />
  );
}

export default Busqueda