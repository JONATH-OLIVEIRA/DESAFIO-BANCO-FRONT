import React, {useState, useEffect} from 'react'
import './App.css';
import Tabela from './Tabela';

function App() {

const[transferencias,setTransferencias] = useState([]);

useEffect(()=>{

  fetch('http://localhost:8090/transferencia/')
  .then(retorno => retorno.json())
  .then(retorno_convertido => setTransferencias(retorno_convertido));
  
}, []);

  

  return (
        
    <div>
      <Tabela vetor={transferencias} />
    </div>
  );
}

export default App;

