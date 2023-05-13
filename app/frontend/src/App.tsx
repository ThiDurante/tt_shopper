import React, { FormEvent, useState } from 'react';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setFile(e.target.files[0]);
  };

  const handleValidate = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      return alert('Por favor, selecione um arquivo');
    }
    const response = await uploadFile(file);
    const data = await response.json();
    if (data.error) {
      return alert(data.error);
    }
  };

  const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append('csvFile', file, file.name);
    return fetch('http://127.0.0.1:3001/updateprice', {
      method: 'POST',
      body: formData,
    });
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
