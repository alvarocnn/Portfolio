import React, { useState, useEffect } from 'react';
import "./procesed.css";
import { Link } from 'react-router-dom';

function CambioEstadoOF(){
    const [cambioEstadoOF, setcambioEstadoOF] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responsePending = await fetch('http://localhost:8081/joinCambioEstadoOF');
                const pendingData = await responsePending.json();
                setcambioEstadoOF(pendingData);
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
            <h1 style={{color:"white"}}>Cambio estado OF </h1>
            <Link to="/" style={{ marginLeft: '50px' }}>
                <p style={{ color: 'white' }}>Atras</p>
            </Link>
            {isLoading ? ( 
                <div className="loader"></div>
            ) : (
                <ul>
                    {cambioEstadoOF
                        .filter(item => item.Vista === "CambioEstadoOF")
                        .sort((a, b) => a.Vista.localeCompare(b.Vista)) 
                        .map((item, index) => (
                            <li key={index} style={{ color: 'white', lineHeight: '2' }}>
                            <strong>Valores búsqueda: </strong> {item.CodSec},<strong>Código orfab: </strong> {item.CodOrfab},<strong>Estado secuencia: </strong> {item.EstSecue}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}
export default CambioEstadoOF;