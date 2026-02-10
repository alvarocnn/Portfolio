import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
function BusquedaPaletCompra() {
  const location = useLocation();
  const searchTerm = location.state?.searchTerm;
  const [isLoading, setLoading] = useState(true);
  const [busquedaPaletCompra, setBusquedaPaletCompra] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePending = await fetch('http://localhost:8081/busquedaPaletCompra');
        const pendingData = await responsePending.json();
        setBusquedaPaletCompra(pendingData);
        setLoading(false);

      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (

    <div className='fondo'>
      <h1 style={{ color: "whitesmoke" }}>Resultados de búsqueda para "{searchTerm}" </h1>
      <Link to="/" style={{ marginLeft: '50px' }}>
        <p style={{ color: 'white' }}>Atras</p>
      </Link>
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <ul>
          {busquedaPaletCompra
            .filter(item => Number(item.ValoresBusqueda) === Number(searchTerm))
            .map((item, index) => (
              <div key={index} style={{ color: 'white', lineHeight: '2' }}>
                <strong>Valores de Producción:</strong>
                <ul>
                  <li><strong>Valores de Búsqueda:</strong> {item?.ValoresBusqueda !== null && item?.ValoresBusqueda !== undefined ? ' (ok)' : ' (null)'}</li>
                  <li><strong>RSSSCC:</strong> {item?.RSSSCC !== null && item?.RSSSCC !== undefined ? ' (ok)' : ' (null)'}</li>
                  
                </ul>
              </div>
            ))}

        </ul>
      )}
    </div>
  );
}
export default BusquedaPaletCompra;