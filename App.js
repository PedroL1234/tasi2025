import React, { useState } from 'react';
import './App.css'; 
import axios from 'axios';

const FormularioEndereco = () => {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const buscarEndereco = async (cep) => {
    if (cep.length === 8) {
      try {
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (resposta.data.erro) {
          alert('CEP não encontrado!');
          return;
        }
        setEndereco(resposta.data.logradouro);
        setBairro(resposta.data.bairro);
        setCidade(resposta.data.localidade);
        setEstado(resposta.data.uf);
      } catch (error) {
        console.error("Erro ao buscar o endereço:", error);
        alert('Erro ao buscar o endereço. Tente novamente.');
      }
    }
  };

  const handleCepBlur = () => {
    buscarEndereco(cep);
  };

  return (
    <div>
      <h2>Formulario de Endereço</h2>
      <form>
        <div>
          <label>CEP:</label>
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            onBlur={handleCepBlur}
            maxLength={8}
          />
        </div>
        <div>
          <label>Endereço:</label>
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            disabled
          />
        </div>
        <div>
          <label>Bairro:</label>
          <input
            type="text"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            disabled
          />
        </div>
        <div>
          <label>Cidade:</label>
          <input
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            disabled
          />
        </div>
        <div>
          <label>Estado:</label>
          <input
            type="text"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            disabled
          />
        </div>
      </form>
    </div>
  );
};

export default FormularioEndereco;
