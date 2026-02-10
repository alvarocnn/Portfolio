
import React, { useState, useEffect } from 'react';
import "./procesed.css";
import { Link } from 'react-router-dom';
function Producciones(){

    const [Producciones, setProducciones] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responsePending = await fetch('http://localhost:8081/joinProducciones');
                const pendingData = await responsePending.json();
                setProducciones(pendingData);
                setLoading(false); 
                
            } catch (error) {
               console.log(error);   
               setLoading(false);
            }
        };

        fetchData();
    }, []);
    
    return(

        <div className='fondo'>
            <h1 style={{color:"white"}}>Producciones </h1>
            <Link to="/" style={{ marginLeft: '50px' }}>
                <p style={{ color: 'white' }}>Atras</p>
            </Link>
            {isLoading ? ( 
                <div className="loader"></div>
            ) : (
                <ul>
                    {Producciones
                        .sort((a, b) => a.Vista.localeCompare(b.Vista)) 
                        .map((item, index) => (
                            <li key={index} style={{ color: 'white', lineHeight: '2' }}>
                            <strong>Valores Busqueda:</strong> {item.ValoresBusqueda},<strong>Código X artículo:</strong> {item.CodXArti},<strong>Código palet:</strong> {item.CodXPale},<strong>Lote:</strong> {item.LoteProv},
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}
export default Producciones;