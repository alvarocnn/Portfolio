import React, { useState, useEffect } from 'react';
import "./procesed.css";
import { Link } from 'react-router-dom';

function Consumo(){
    const [consumos, setConsumos] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responsePending = await fetch('http://localhost:8081/joinConsumos');
                const pendingData = await responsePending.json();
                setConsumos(pendingData);
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
            <h1 style={{color:"white"}}>Consumos</h1>
            <Link to="/" style={{ marginLeft: '50px' }}>
                <p style={{ color: 'white' }}>Atras</p>
            </Link>
            {isLoading ? ( 
                <div className="loader"></div>
            ) : (
                <ul>
                    {consumos
                        .filter(item => item.Vista === "Consumos")
                        .sort((a, b) => a.Vista.localeCompare(b.Vista)) 
                        .map((item, index) => (
                            <li key={index} style={{ color: 'white', lineHeight: '2' }}>
                            <strong>Valores búsqueda:</strong> {item.CodConsu},<strong>Código artículo:</strong> {item.CodXArti},<strong>Códifo palet:</strong> {item.CodXPale},<strong>Lote:</strong> {item.Lote},<strong>Numero OF:</strong> {item.NumeroOF},<strong>Código máquina:</strong> {item.CodMaqui}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}
export default Consumo;