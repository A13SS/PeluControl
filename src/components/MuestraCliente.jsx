import '../styles/MuestraCliente.css';

function MuestraCliente({ cliente }) {
  return (
    <div className="clienteItem">
      <strong>{cliente.nombre} — {cliente.telefono}</strong>
    </div>
  );
}

export default MuestraCliente