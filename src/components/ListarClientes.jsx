import { clientesIniciales } from '../data/clientes';
import Busqueda from './Busqueda';
import MuestraCliente from './MuestraCliente';
import NoResultados from './NoResultados';
import { useState } from 'react';
import '../styles/ListarClientes.css';


function ListarClientes() {
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('nombre'); //se cambia a telefono tambien, ahora esta por defecto en nombre
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(3);  //los iniciales antes de añadir nuevos clientes

  const filtrados = clientesIniciales.filter(cliente =>
    cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    cliente.telefono.includes(busqueda)
  )
    .sort((clienteA, clienteB) => {
      const valorDeClienteA = clienteA[orden].toString().toLowerCase();
      const valorDeClienteB = clienteB[orden].toString().toLowerCase();

      //ClienteA va antes que ClienteB
      if (valorDeClienteA < valorDeClienteB) {
        return -1;
      }
      //ClienteB va antes que clienteA
      if (valorDeClienteA > valorDeClienteB) {
        return 1;
      }

      //Valores iguales
      return 0;
    });

  //Necesitamos Math.ceil para que redondee hacia arriba, porque aunque sobre 1 cliente, necesita una página para el solo
  const totalPaginas = Math.ceil(filtrados.length / porPagina);
  //Para saber la posicion del array en la que empieza la pagina que viene
  const inicio = (pagina - 1) * porPagina;
  //Extraer solo los clientes de la pagina actual
  const clientesMostrados = filtrados.slice(inicio, inicio + porPagina);

  //En caso de que se cambie el orden de nombre a telefono o viceversa, me redirije a la pagina 1(la reinicia), para empezar ahi la nueva ordenación
  const cambiarOrden = (campo) => {
    setOrden(campo);
    setPagina(1);
  };

  //En caso de que se intente salir del rango de páginas, con esta función nunca podrá salirse del rango de paginas que tenemos
  const irPagina = (num) => {
    if (num >= 1 && num <= totalPaginas) {
      setPagina(num);
    }
  };

  //Con esta función podemos cambiar el número de clientes por página
  const cambiarPorPagina = (e) => {
    const nuevoValor = Number(e.target.value);
    setPorPagina(nuevoValor);
    setPagina(1); // Reiniciamos a la primera página al cambiar el tamaño
  };

  return (
    <div className="listarClientesContainer">
      <h2 className="listarClientesTitulo"><strong>Clientes</strong></h2>
      <Busqueda
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {/*Botones para ordenar*/}
      <div className="listarClientesControles">
        <button className="listarClientesBoton" onClick={() => cambiarOrden('nombre')}>Ordenar por Nombre</button>
        <button className="listarClientesBoton" onClick={() => cambiarOrden('telefono')}>Ordenar por Teléfono</button>
    
        {/*Selector de clientes por página*/}
        <label className="listarClientesEtiqueta">
          Mostrar:
          <select className="listarClientesSelectPagina" value={porPagina} onChange={cambiarPorPagina}>
            <option value={1}>1</option>
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>15</option>
          </select>
          clientes por página
        </label>
      </div>

      <div className="listarClientesLista">
        {clientesMostrados.length > 0 ?
        (clientesMostrados.map(cliente => <MuestraCliente key={cliente.id} cliente={cliente} />)) : (<NoResultados />)}
      </div>


      {/*Paginación*/}
      {totalPaginas > 1 && (
        <div className="listarClientesPaginacion">
          <button className="listarClientesBoton" onClick={() => irPagina(pagina - 1)} disabled={pagina === 1}>
            Anterior
          </button>
          <span>Página {pagina} de {totalPaginas}</span>
          <button className="listarClientesBoton" onClick={() => irPagina(pagina + 1)} disabled={pagina === totalPaginas}>
            Siguiente
          </button>
        </div>
      )}
    </div>

  );
}

export default ListarClientes