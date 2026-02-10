
import React from 'react';
import {Route,Routes} from "react-router-dom";
import './App.css';
import Inicio from './screens/Inicio';
import Procesed from './screens/bigDivs/procesed';
import Error from './screens/bigDivs/error';
import Pending from './screens/bigDivs/pending';
import AlbaranCompra from "./screens/smallDivs/albaranCompra" 
import CambioEstadoOF from './screens/smallDivs/cambioEstadoOF';
import AlbaranTraspaso from "./screens/smallDivs/AlbaranTraspaso";
import Consumo from './screens/smallDivs/consumo';
import OrdenesFormula from './screens/smallDivs/ordenesFormula';
import OrdenesSecuenciadas from './screens/smallDivs/ordenesSecuenciadas';
import OrdenesSecuenciadasLin from './screens/smallDivs/ordenesSecuenciadasLin';
import OrdenesSecuenciadasRuta from './screens/smallDivs/ordenesSecuenciadasRuta';
import PaletCompra from './screens/smallDivs/paletCompra';
import PedidosCompra from './screens/smallDivs/pedidosCompra';
import PedidosCompraLin from './screens/smallDivs/pedidosCompraLin';
import Producciones from './screens/smallDivs/producciones';
import MovimientosRegularizacion from './screens/smallDivs/movimientosRegularizacion';
import BusquedaProducciones from './screens/busqueda/busquedaProducciones';
import BusquedaAlbaranCompra from './screens/busqueda/busquedaAlbaranCompra';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Inicio/>} />
      <Route path='/busqueda/busquedaProducciones' element={<BusquedaProducciones/>}/>
      <Route path='/busqueda/busquedaAlbaranCompra' element={<BusquedaAlbaranCompra/>}/>
      <Route path='/bigDivs/procesed' element={<Procesed/>}/>
      <Route path='/bigDivs/error' element={<Error/>}/>
      <Route path='/bigDivs/pending' element={<Pending/>}/>
      <Route path='/smallDivs/albaranCompra' element={<AlbaranCompra/>}/>
      <Route path='/smallDivs/albaranTranspaso' element={<AlbaranTraspaso/>}/>
      <Route path='/smallDivs/cambioEstadoOF' element={<CambioEstadoOF/>}/>
      <Route path='/smallDivs/consumo' element={<Consumo/>}/>
      <Route path='/smallDivs/ordenesFormula' element={<OrdenesFormula/>}/>
      <Route path='/smallDivs/ordenesSecuenciadas' element={<OrdenesSecuenciadas/>}/>
      <Route path='/smallDivs/ordenesSecuenciadasLin' element={<OrdenesSecuenciadasLin/>}/>
      <Route path='/smallDivs/ordenesSecuenciadasRuta' element={<OrdenesSecuenciadasRuta/>}/>
      <Route path='/smallDivs/paletCompra' element={<PaletCompra/>}/>
      <Route path='/smallDivs/pedidosCompra' element={<PedidosCompra/>}/>
      <Route path='/smallDivs/pedidosCompraLin' element={<PedidosCompraLin/>}/>
      <Route path='/smallDivs/producciones' element={<Producciones/>}/>
      <Route path='/smallDivs/movimientosRegularizacion' element={<MovimientosRegularizacion/>}/>
      
    </Routes>
  );
}
export default App;
