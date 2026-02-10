import React, { useState, useEffect } from 'react';
import "./procesed.css";
import { Link } from 'react-router-dom';

function OrdenesFormula(){
    const [ordenesFormula, setOrdenesFormula] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responsePending = await fetch('http://localhost:8081/joinOrdenesFormula');
                const pendingData = await responsePending.json();
                setOrdenesFormula(pendingData);
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
            <h1 style={{color:"white"}}>Ordenes formula</h1>
            <Link to="/" style={{ marginLeft: '50px' }}>
                <p style={{ color: 'white' }}>Atras</p>
            </Link>
            {isLoading ? ( 
                <div className="loader"></div>
            ) : (
                <ul>
                    {ordenesFormula
                        .filter(item => item.Vista === "OrdenesFormula")
                        .sort((a, b) => a.Vista.localeCompare(b.Vista)) 
                        .map((item, index) => (
                            <li key={index} style={{ color: 'white', lineHeight: '2' }}>
                            <strong>Vista:</strong> {item.Vista},<strong>Código Orfa:</strong> {item.CodOrfa},<strong>Código empresa:</strong> {item.T010codemp},<strong>Num lin:</strong> {item.T424numlin},<strong>Lote:</strong> {item.T424lote},<strong>Cod alm:</strong> {item.T311codalm}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}
export default OrdenesFormula;