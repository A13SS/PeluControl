import { clientesIniciales } from '../data/clientes';
import Busqueda from './Busqueda';
import MuestraCliente from './MuestraCliente';
import NoResultados from './NoResultados';
import { useState } from 'react';

function ListarClientes() {
  const [busqueda, setBusqueda] = useState('');

  const filtrados = clientesIniciales.filter(cliente =>
    cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    cliente.telefono.includes(busqueda)
  );

  return (
    <div>
      <h2>Clientes</h2>
      <Busqueda
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      {filtrados.length > 0 ? (
        filtrados.map(cliente => <MuestraCliente key={cliente.id} cliente={cliente} />)
      ) : (
        <NoResultados />
      )}
    </div>
  );
}

export default ListarClientes