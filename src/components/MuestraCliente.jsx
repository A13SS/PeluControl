function MuestraCliente({ cliente }) {
  return (
    <div >
      <strong>{cliente.nombre}</strong> — {cliente.telefono}
    </div>
  );
}

export default MuestraCliente