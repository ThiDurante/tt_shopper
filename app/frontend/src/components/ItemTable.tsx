import React from 'react'

export default function ItemTable({ products }: any) {
  return (
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>Preço antigo</th>
          <th>Novo preço</th>
          <th>Pode ser Atualizado</th>
          <th>Erro</th>
        </tr>
      </thead>
      <tbody>
        {products.map((item: any) => (
          <tr key={item.product_code}>
            <td>{item.product_code}</td>
            <td>{item.name}</td>
            <td>{item.oldPrice}</td>
            <td>{item.new_price}</td>
            <td>{item.updated ? 'Sim' : 'Não'}</td>
            <td>{item.error ? item.error : 'Não'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
