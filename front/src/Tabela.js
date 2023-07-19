import React, { useState, useEffect } from 'react';

function Tabela({ vetor }) {
  const [searchNome, setSearchNome] = useState('');
  const [searchStartDate, setSearchStartDate] = useState('');
  const [searchEndDate, setSearchEndDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setFilteredData(vetor?.content || []);
  }, [vetor]);

  const handleSearchNome = (e) => {
    const { value } = e.target;
    setSearchNome(value);
  };

  const handleSearchStartDate = (e) => {
    const { value } = e.target;
    setSearchStartDate(value);
  };

  const handleSearchEndDate = (e) => {
    const { value } = e.target;
    setSearchEndDate(value);
  };

  const filterData = () => {
    setIsSearching(true);

    let filtered = vetor?.content;

    if (searchNome) {
      filtered = filtered.filter((vete) =>
        vete.nome_operador_transacao.toLowerCase().includes(searchNome.toLowerCase())
      );
    }

    if (searchStartDate && searchEndDate) {
      filtered = filtered.filter((vete) => {
        const date = new Date(vete.data_transferencia);
        const startDateObj = new Date(searchStartDate);
        const endDateObj = new Date(searchEndDate);
        return date >= startDateObj && date <= endDateObj;
      });
    }

    setFilteredData(filtered || []);
    setIsSearching(false);
  };

  const handleSearchClick = () => {
    filterData();
  };

  const dataToRender = searchNome || searchStartDate || searchEndDate ? filteredData : vetor?.content;

  if (!dataToRender || dataToRender.length === 0) {
    return <p>Nenhum dado encontrado</p>;
  }

  const saldoTotal = dataToRender.reduce((total, vete) => total + vete.valor, 0);

  return (
    <div>
      <tr>
        <th>
          Data de Inicio : <input type="date" value={searchStartDate} onChange={handleSearchStartDate} placeholder="Data de início" />
        </th>
        <th>
          Data de Fim: <input type="date" value={searchEndDate} onChange={handleSearchEndDate} placeholder="Data de término" />
        </th>
        <th>
          Nome do Operador : <input type="text" value={searchNome} onChange={handleSearchNome} placeholder="Buscar por nome" />
        </th>
        <th>
         Pesquisar : 
         <button onClick={handleSearchClick} disabled={isSearching}>
          {isSearching ? 'Pesquisando...' : 'Pesquisar'}
      </button>
         </th>   

      </tr>
      <table className="table">
        <thead>
          <tr>
            <th>Saldo Total: {saldoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</th>
            <th>Saldo Período: {saldoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</th>
          </tr>
          <tr>
            <th>Data</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {dataToRender.map((vete) => (
            <tr key={vete.id}>
              <td>{vete.data_transferencia}</td>
              <td>{vete.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              <td>{vete.tipo}</td>
              <td>{vete.nome_operador_transacao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tabela;

