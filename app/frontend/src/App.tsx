import React, { FormEvent, useState } from 'react';
import Papa, { ParseResult } from 'papaparse';

type Data = {
  codigo: string;
  novo_preco: string;
};


function App() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);


  const parseCSV = (file: File) => {
    Papa.parse(file, {
      header: true,
      download: true,
      skipEmptyLines: true,
      delimiter: ',',
      complete: handleParseComplete
      ,
    });
  };

  const handleParseComplete = async (results: ParseResult<Data>) => {
    const result = await uploadFile(results.data)
    console.log(result);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setFile(e.target.files[0]);
  }

  const handleValidate = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      return alert('Por favor, selecione um arquivo');
    }
    try {
      parseCSV(file);
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }

  };

  const uploadFile = async (parsedValue: any) => {
    const response = await fetch('http://localhost:3001/updateprice', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(parsedValue),
    });
    const data = await response.json();
    return data
  };

  return (
    <div className="main-container">
      <h1>Atualização de preços</h1>
      <p>Como utilizar:</p>
      <p>
        Carregue um arquivo CSV com o código do produto a ser reajustado e o
        novo valor
      </p>
      <p>
        Clique em <strong>VALIDAR</strong>
      </p>
      <p>O sistema se encarregará de checar se tudo está ok</p>
      <form onSubmit={handleValidate}>
        <input
          type="file"
          name="novo_preço"
          accept=".csv"
          onChange={handleFileChange}
        />
        <button type="submit">VALIDAR</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
