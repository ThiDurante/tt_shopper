import React, { FormEvent, useEffect, useState } from 'react';
import Papa, { ParseResult } from 'papaparse';
import ItemTable from './components/ItemTable';
import './CSS/App.css'
import Header from './components/Header';

type Data = {
  codigo: string;
  novo_preco: string;
};

type UpdatePriceResponseI = {
  product_code: string;
  name: string;
  new_price: string;
  oldPrice: string;
  updated: boolean;
  error: string;
}


function App() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validatedData, setValidatedData] = useState<UpdatePriceResponseI[] | null>(null);
  const [readyToUpload, setReadyToUpload] = useState<boolean>(false);

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

  useEffect(() => {
    checkIfReady();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validatedData])

  const handleParseComplete = async (results: ParseResult<Data>) => {
    const result = await uploadFile(results.data)
    setValidatedData(result);
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
      setError(error.message);
    }
  };

  const checkIfReady = () => {
    if (validatedData) {
      const ready = validatedData.every((item) => item.updated);
      setReadyToUpload(ready);
    }
  }

  const handleReady = async () => {
    try {
      await fetch('http://localhost:3001/updateprice', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify(validatedData),
      });
    } catch (error: any) {
      setError(error.message);
    }
    window.location.reload();
  }

  const uploadFile = async (parsedValue: any) => {
    const response = await fetch('http://localhost:3001/validate', {
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
      <Header />
      <div className="content">
        <h1>Atualização de preços</h1>
        <p>Como utilizar:</p>
        <p>
          Carregue um arquivo CSV com o código do produto a ser reajustado e o
          novo valor
        </p>
        <p>
          Clique em <strong>VALIDAR</strong>
        </p>
        <p>Se estiver tudo ok, o botão de Atualizar aparecerá</p>
        <p>Confirme suas alterações e clique nele para atualizar os preços</p>
        <form className="form" onSubmit={handleValidate}>
          <input
            type="file"
            name="novo_preço"
            accept=".csv"
            onChange={handleFileChange}

          />
          <button type="submit">VALIDAR</button>
        </form>
        {validatedData && <ItemTable products={validatedData} />}
        {readyToUpload && (
          <button className="atualizar-btn" type="button" onClick={handleReady}>
            ATUALIZAR
          </button>
        )}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default App;
