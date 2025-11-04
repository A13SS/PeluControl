function Busqueda({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Buscar cliente por nombre o teléfono: "
      value={value}
      onChange={onChange}
    />
  );
}

export default Busqueda