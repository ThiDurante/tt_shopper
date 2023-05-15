//@ts-nocheck

describe('App testes', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('Verificando se a pagina carrega', () => {
    cy.get('h1').should('have.length', 2);
    cy.get('h1').last().should('have.text', 'Atualização de Preços');
  });
  it('Verificando se o botão de atualizar está desabilitado', () => {
    cy.get('button').should('have.length', 1);
  });
  it('Verifica se o botão que existe é o validar', () => {
    cy.get('button').should('have.text', 'VALIDAR');
  });
  it('Verifica se há um input para arquivos', () => {
    cy.get('input')
      .should('have.length', 1)
      .should('have.attr', 'type', 'file');
  });
  it('Verifica se o input de arquivo está vazio', () => {
    cy.get('input').should('have.value', '');
  });
  it('Verifica se o input de arquivo aceita apenas arquivos .csv', () => {
    cy.get('input').should('have.attr', 'accept', '.csv');
  });
});

describe('Testes de upload de arquivo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('Verifica se ao inserir um arquivo inválido, o botão de atualizar continua desabilitado', () => {
    cy.get('input').attachFile(
      '3_atualizacao_preco_exemplo_faltando_preço.csv'
    );
    const button = cy.get('button').should('have.text', 'VALIDAR');
    button.click();
    cy.get('button').should('have.length', 1);
  });
  it('Verifica se ao inserir um arquivo inválido, os devidos erros aparecem', () => {
    cy.get('input').attachFile(
      '3_atualizacao_preco_exemplo_faltando_preço.csv'
    );
    const button = cy.get('button').should('have.text', 'VALIDAR');
    button.click();
    cy.get('tr').should('have.length', 9);
    const erros = cy.get('[data-cy=error]');
    erros.should('have.length', 8);
    erros
      .first()
      .should('have.text', 'novo preço está faltando, preço menor que custo');
  });
  it('Verifica se ao inserir um arquivo válido, o botão de atualizar aparece', () => {
    cy.get('input').attachFile('1_atualizacao_preco_exemplo_tudook');
    const button = cy.get('button').should('have.text', 'VALIDAR');
    button.click();
    cy.get('button').should('have.length', 2);
  });
  it('Verifica se ao clicar em atualizar é feita uma requisição post para a API', () => {
    cy.intercept('POST', 'http://localhost:3001/updateprice', {
      statusCode: 200,
      body: {
        message: 'Resposta mock Cypress',
      },
    });
    cy.get('input').attachFile('1_atualizacao_preco_exemplo_tudook');
    const button = cy.get('button').should('have.text', 'VALIDAR');
    button.click();
    cy.get('button').should('have.length', 2);
    const buttonAtualizar = cy
      .get('button')
      .last()
      .should('have.text', 'ATUALIZAR');
    buttonAtualizar.click();
  });
});
