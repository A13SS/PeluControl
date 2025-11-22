import Busqueda from './Busqueda';
import MuestraCliente from './MuestraCliente';
import NoResultados from './NoResultados';
import { useState, useEffect} from 'react';
import '../styles/ListarClientes.css';

const clientesIniciales = [
  { id: 1, nombre: "Laura González", telefono: "644123123" },
  { id: 2, nombre: "Carlos Ruiz", telefono: "655321321" },
  { id: 3, nombre: "Marta Pérez", telefono: "699112233" },
  { id: 4, nombre: "Ale Fernandez", telefono: "654235678" },
  { id: 5, nombre: "Juan Pabón", telefono: "698560438" },
  { id: 6, nombre: "David Jiménez", telefono: "645607943" },
  { id: 7, nombre: "Gerónimo Molero", telefono: "630485960" },
  { id: 8, nombre: "Iris Castro", telefono: "670589703" },
  { id: 9, nombre: "Patricia Chico", telefono: "63045670" },
  { id: 10, nombre: "Silvia Chico", telefono: "620586970" },
];

function ListarClientes() {
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('nombre'); //se cambia a telefono tambien, ahora esta por defecto en nombre
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(3);  //los iniciales antes de añadir nuevos clientes

  const [clientes, setClientes] = useState([]);      //Reemplazará a clientesIniciales después de cargar
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);



  useEffect(() => {
    const timer = setTimeout(() => {
      //Si no hay error, se cargan los clientes
      setClientes(clientesIniciales);
      setCargando(false);
    }, 2000);

    //Limpieza del timer si el componente se desmonta
    return () => clearTimeout(timer);
  }, []);

  const forzarError = () => {
    setError(true);
    setCargando(false);
  };

  if (cargando) {
    return (<div className="listarClientesCargando">Cargando clientes...
      <button
        className="listarClientesBoton"
        onClick={forzarError}
      >
        Simular error de carga
      </button>
    </div>
    );
  }

  if (error) {
    return <div className="listarClientesError">Error al cargar los datos</div>;
  }

  const filtrados = clientes.filter(cliente =>
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