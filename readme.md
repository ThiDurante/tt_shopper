# tt_Shopper

Este foi um projeto full-stack para o teste técnico da Shopper.

O objetivo era construir uma aplicação para atualização de preços de uma empresa, onde deveriamos seguir algumas regras específicas.

O projeto conta com um backend em node/express, um front em ReactJS e um database MySql.
Testes foram feitos com Cypress no front end.

## Instalação

Temos duas maneiras para utilizar o projeto

<details>
1) Usando  [Docker](https://www.docker.com/)

```bash
  # clone o repositório
  # entre na pasta app
  cd tt_shopper/app
  # rode o script de Instalação de dependencias
  npm run install:app
  # caso tenha problemas de permissão neste passo use:
  chmod +x app_install.sh
  # repita o npm run
  # Após isso rode o comando
  docker compose up
```

Depois é só esperar o tempo de build (pode demorar um pouco dependendo do computador/internet)

O front end estará rodando em localhost:3000 (broswer)

A API em localhost:3001 (postman ou simular)

O banco de dado em localhost:3306 (workbench)

</details>
