import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './inicio.css';


function Inicio() {

    const margin = { marginLeft: '30px' };
    const [triggerPending, setTriggerPending] = useState([]);
    const [triggerError, setTriggerError] = useState([]);
    const [triggerProcessed, setTriggerProcessed] = useState([]);

    const [inputDate, setInputDate] = useState('');

    const getTodayString = () => {
        return new Date().toISOString().split('T')[0].split('-').reverse().join('/');
    };

    const handleKeyDownDate = async (event) => {
        if (event.key === 'Enter') {
            const dateToSearch = inputDate.trim() ? inputDate : getTodayString();

             await fetch('http://localhost:8081/date', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ inputDate: dateToSearch })
            }).catch(error => {
                alert('Hubo un error al buscar la información.');
            });

            window.location.reload();
        }
    };

    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {

            if (!inputValue.trim()) {
                event.preventDefault();
                alert("Para buscar introduzca un valor búsqueda valido.")
            } else {
                const selectedOption = document.getElementById('buscador').value;
                navigate(`/busqueda/${selectedOption}`, { state: { searchTerm: inputValue } });
            }

        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responsePending = await fetch('http://localhost:8081/pending');
                const pendingData = await responsePending.json();
                setTriggerPending(pendingData);

                const responseError = await fetch('http://localhost:8081/error');
                const errorData = await responseError.json();
                setTriggerError(errorData);

                const responseProcessed = await fetch('http://localhost:8081/procesed');
                const processedData = await responseProcessed.json();
                setTriggerProcessed(processedData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

        const intervalId = setInterval(() => {
            fetchData();
        }, 25000); //segundos que tarda en reniciar la página

        return () => clearInterval(intervalId);
    }, []);
    const filterTriggerError = (triggerData, vista) => {
        return triggerData.filter((trigger) => trigger.Vista === vista);
    };
    const filterTriggerCountByError = (triggerData, name) => {
        return filterTriggerError(triggerData, name).length;
    };
    const filterTriggersByName = (triggerData, name) => {
        return triggerData.filter((trigger) => trigger.Vista === name);
    };
    const getTriggerCountByName = (triggerData, name) => {
        return filterTriggersByName(triggerData, name).length;
    };
    const getPriorityByTriggerName = (triggerData, name) => {
        const filteredTriggers = triggerData.filter((trigger) => trigger.Vista === name);
        console.log(filteredTriggers)
        if (filteredTriggers.length > 0) {
            return filteredTriggers[0].prioridad;
        } else {
            return null; // Si no se encuentra ningún disparador con ese nombre, devuelve null
        }
    };

    const colorPending = triggerPending.length > 0 ? "#FF0000" : "#49FF00";
    const colorError = triggerError.length > 0 ? "#FF0000" : "#49FF00";
    const colorLetterPending = triggerPending.length > 0 ? "#ffffff" : "#000000";
    const colorErrorLetterError = triggerError.length > 0 ? "#ffffff" : "#000000";

    return (
        <div>
            <div className="contenedor">
                <p className="titulo">Seguimiento integración</p>
                <div class="input-container2">
                    <input class="input-field2" type="text" value={inputDate} onChange={(event) => setInputDate(event.target.value)}
                        onKeyDown={handleKeyDownDate} />
                    <label for="input-field2" class="input-label2">Fecha: DD/MM/YYYY </label>
                    <span class="input-highlight2"></span>
                </div>
                <div class="select-container">
                    <select id="buscador" name="buscador">
                        <option value="busquedaAlbaranCompra">Albaran Compra</option>
                        <option value="busquedaAlbaranTraspaso">Albaran Traspaso</option>
                        <option value="busquedaCambioEstadoOF">Cambio Estado OF</option>
                        <option value="busquedaConsumos">Consumos</option>
                        <option value="busquedaOrdenesFormula">Ordenes Formula</option>
                        <option value="busquedaOrdenesSecuenciadas">Ordenes Secuenciadas</option>
                        <option value="busquedaOrdenesSecuenciadasLin">Ordenes Secuenciadas Lin</option>
                        <option value="busquedaOrdenesSecuenciadasRuta">Ordenes Secuenciadas Ruta</option>
                        <option value="busquedaPaletCompra">Palet Compra</option>
                        <option value="busquedaPedidosCompra">Pedidos Compra</option>
                        <option value="busquedaPedidosCompraLin">Pedidos Compra Lin</option>
                        <option value="busquedaProducciones">Producciones</option>
                        <option value="busquedaMovimientosRegularizacion">Movimientos Regularización</option>
                    </select>

                    <div class="select-arrow">&#9662;</div>
                </div>
                <div class="input-container">
                    <input class="input-field" type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)}
                        onKeyDown={handleKeyDown} />
                    <label for="input-field" class="input-label"> Introduce el valor búsqueda </label>
                    <span class="input-highlight"></span>
                </div>

                <div className="contenedor-flex">
                    <div className="contenedor1" style={{ backgroundColor: colorPending }}>
                        <Link to="/bigDivs/pending">
                            <p className="letrasContenedorTitulo">Pendientes</p>
                            <p className="letrasContenedor" style={{ color: colorLetterPending }}>Cantidad: {triggerPending.length}</p>
                            <p className="letrasContenedor" style={{ color: colorLetterPending }}>Estado 1</p>
                        </Link>
                    </div>
                    <div className="contenedor2" style={{ backgroundColor: colorError }}>
                        <Link to="/bigDivs/error">
                            <p style={margin} className="letrasContenedorTitulo">Error</p>
                            <p className="letrasContenedor" style={{ color: colorErrorLetterError }}>Cantidad: {triggerError.length}</p>
                            <p className="letrasContenedor" style={{ color: colorErrorLetterError }}>Estado 3</p>
                        </Link>

                    </div>
                    <div className="contenedor3">
                        <Link to="/bigDivs/procesed">
                            <p className="letrasContenedorTitulo">Procesados</p>
                            <p className="letrasContenedor">Cantidad: {triggerProcessed.length}</p>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='contenedor'>
                <div className='contenedor-flex'>
                    <div className='contenedor-pequeño'><Link className='Link' to="/smallDivs/albaranCompra">Albaran compra: {getTriggerCountByName(triggerProcessed, "AlbaranCompra")} <br /> Prioridad: {getPriorityByTriggerName(triggerProcessed, "AlbaranCompra")} <p style={{color:"yellow"}}> Errores: {filterTriggerCountByError(triggerError,"AlbaranCompra")}</p></Link></div>
                    <div className='contenedor-pequeño'> <Link className='Link' to="/smallDivs/albaranTranspaso">Albaran traspaso: {getTriggerCountByName(triggerProcessed, "AlbaranTraspaso")} <br /> Prioridad: {getPriorityByTriggerName(triggerProcessed, "AlbaranTraspaso")}  <p style={{color:"yellow"}}>rrores: {filterTriggerCountByError(triggerError,"AlbaranTraspaso")}</p></Link></div>
                    <div className='contenedor-pequeño'> <Link className='Link' to="/smallDivs/cambioEstadoOF">Cambio estado OF: {getTriggerCountByName(triggerProcessed, "CambioEstadoOF")} <br /> Prioridad: {getPriorityByTriggerName(triggerProcessed, "CambioEstadoOF")} <p style={{color:"yellow"}}> Errores: {filterTriggerCountByError(triggerError,"CambioEstadoOF")}</p></Link></div>
                    <div className='contenedor-pequeño'><Link className='Link' to="/smallDivs/consumo"> Consumos: {getTriggerCountByName(triggerProcessed, "Consumos")} <br /> Prioridad: {getPriorityByTriggerName(triggerProcessed, "Consumos")} <p style={{color:"yellow"}}> Errores: {filterTriggerCountByError(triggerError,"Consumos")}</p></Link></div>
                    <div className='contenedor-pequeño'><Link className='Link' to="/smallDivs/ordenesFormula"> Ordenes formula: {getTriggerCountByName(triggerProcessed, "OrdenesFormula")} <br /> Prioridad: {getPriorityByTriggerName(triggerProcessed, "OrdenesFormula")} <p style={{color:"yellow"}}> Errores: {filterTriggerCountByError(triggerError,"OrdenesFormula")}</p></Link></div>
                    <div className='contenedor-pequeño'><Link className='Link' to="/smallDivs/ordenesSecuenciadas"> Ordenes secuenciadas: {getTriggerCountByName(triggerProcessed, "OrdenesSecuenciadas")} <br /> Prioridad: {getPriorityByTriggerName(triggerProcessed, "OrdenesSecuenciadas")} <p style={{color:"yellow"}}> Errores: {filterTriggerCountByError(triggerError,"OrdenesSecuenciadas")} </p></Link></div>
                    <div className='contenedor-pequeño'> <Link className='Link' to="/smallDivs/ordenesSecuenciadasLin">Ordenes secuenciadas <br />Lin: {getTriggerCountByName(triggerProcessed, "OrdenesSecuenciadasLin")} <br /> Prioridad: {getPriorityByTriggerName(triggerProcessed, "OrdenesSecuenciadasLin")} <p style={{color:"yellow"}}> Errores: {filterTriggerCountByError(triggerError,"OrdenesSecuenciadasLin")}</p></Link></div>
                    <div className='contenedor-pequeño'><Link className='Link' to="/smallDivs/ordenesSecuenciadasRuta"> Ordenes secuenciadas <br />ruta: {getTriggerCountByName(triggerProcessed, "OrdenesSecuenciadasRuta")} <br /> Prioridad: {getPriorityByTriggerName(triggerProcessed, "OrdenesSecuenciadasRuta")} <p style={{color:"yellow"}}> Errores: {filterTriggerCountByError(triggerError,"OrdenesSecuenciadasRuta")}</p></Link></div>
                    <div className='contenedor-pequeño'> <Link className='Link' to="/smallDivs/paletCompra">Palet compra: {getTriggerCountByName(triggerProcessed, "PaletCompra")} <br /> Prioridad: {getPriorityByTriggerName(triggerProcessed, "PaletCompra")} <p style={{color:"yellow"}}> Errores: {filterTriggerCountByError(triggerError,"PaletCompra")}</p></Link></div>
                    <div className='contenedor-pequeño'><Link className='Link' to="/smallDivs/pedidosCompra"> Pedidos compra: {getTriggerCountByName(triggerProcessed, "PedidosCompra")} <br /> Prioridad: {getPriorityByTriggerName(triggerProcessed, "PedidosCompra")} <p style={{color:"yellow"}}>Errores: {filterTriggerCountByError(triggerError,"PedidosCompra")}</p></Link></div>
                    <div className='contenedor-pequeño'><Link className='Link' to="/smallDivs/pedidosCompraLin"> Pedidos compra lin: {getTriggerCountByName(triggerProcessed, "PedidosCompraLin")} <br /> Prioridad: {getPriorityByTriggerName(triggerProcessed, "PedidosCompraLin")} <p style={{color:"yellow"}}> Errores: {filterTriggerCountByError(triggerError,"PedidosCompraLin")}</p></Link></div>
                    <div className='contenedor-pequeño'> <Link className='Link' to="/smallDivs/producciones">Producciones: {getTriggerCountByName(triggerProcessed, "Producciones")} <br /> Prioridad: {getPriorityByTriggerName(triggerProcessed, "Producciones")} <p style={{color:"yellow"}}> Errores: {filterTriggerCountByError(triggerError,"Producciones")}</p></Link></div>
                    <div className='contenedor-pequeño'> <Link className='Link' to="/smallDivs/movimientosRegularizacion">Movimientos <br /> regularizacion: {getTriggerCountByName(triggerProcessed, "MovimientosRegularizacion")} <br /> Prioridad: {getPriorityByTriggerName(triggerProcessed, "MovimientosRegularizacion")}  <p style={{color:"yellow"}}>Errores: {filterTriggerCountByError(triggerError,"MovimientosRegularizacion")}</p></Link></div>
                </div>
            </div>
        </div>
    );

}

export default Inicio;
