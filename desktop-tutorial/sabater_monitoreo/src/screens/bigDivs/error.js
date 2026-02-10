import React, { useState, useEffect } from 'react';
import "./procesed.css";
import { Link } from 'react-router-dom';

function Procesed() {
    const [triggerError, setTriggerError] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8081/error")
            .then(res => res.json())
            .then(triggerProcesedData => {
                setTriggerError(triggerProcesedData);
                setLoading(false); 
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ backgroundColor: "#202020", width: "100%", height: "100%"}}>
            <Link to="/" style={{ marginLeft: '50px' }}>
                <p style={{ color: 'white' }}>Atras</p>
            </Link>
            {isLoading ? ( 
                <div className="loader"></div>
            ) : (
                <ul>
                    {triggerError
                        .sort((a, b) => a.Vista.localeCompare(b.Vista)) 
                        .map((item, index) => (
                            <li key={index} style={{ color: 'white', lineHeight: '2' }}>
                            <strong>Vista:</strong> {item.Vista}, <strong>Valores búsqueda:</strong> {item.ValoresBusqueda}, <strong>Fecha modificación: </strong> {item.FecModif}, <strong>Operación: </strong> {item.Operacion}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}

export default Procesed;
