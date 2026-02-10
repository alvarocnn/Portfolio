import React, { useState, useEffect } from 'react';
import "./procesed.css";
import { Link } from 'react-router-dom';

function PaletCompra(){
    const [paletCompra, setPaletCompra] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responsePending = await fetch('http://localhost:8081/joinPaletCompra');
                const pendingData = await responsePending.json();
                setPaletCompra(pendingData);
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
            <h1 style={{color:"white"}}>Palet compra</h1>
            <Link to="/" style={{ marginLeft: '50px' }}>
                <p style={{ color: 'white' }}>Atras</p>
            </Link>
            {isLoading ? ( 
                <div className="loader"></div>
            ) : (
                <ul>
                    {paletCompra
                        
                        .sort((a, b) => a.Vista.localeCompare(b.Vista)) 
                        .map((item, index) => (
                            <li key={index} style={{ color: 'white', lineHeight: '2' }}>
                            <strong>Valores búsqueda:</strong> {item.ValoresBusqueda},<strong>Código artículo:</strong> {item.CodXArti},<strong>Códifo palet:</strong> {item.CodXPale},<strong>Lote:</strong> {item.LoteProv}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}
export default PaletCompra;