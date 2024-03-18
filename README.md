# Payments Bank

Este projeto foi construido com **NodeJs, JavaScript, PostgreSQL, ReactJs e TypeScript.**

Link para o projeto: https://projeto-selecao-incentive-me.vercel.app/

## Índice

- [Instalação API](#instalação-api)
- [API Endpoints](#api-endpoints)
- [Instalação Frontend](#instalação-frontend)

## Instalação API

1. Clonar o repositório:

```bash
git clone https://github.com/thomasgsquinaia/projeto-selecao-incentive-me.git
```

2. Ir para o diretório ./backend e digitar:

```bash
npm install
```

3. Rodar o projeto:

```bash
npm run dev
```

4. Criar um arquivo .env como o de exemplo do projeto para rodar um banco PostgreSQL localmente.

## API Endpoints
A API fornece os seguintes endpoints:

**API PAGAMENTOS**
```markdown
GET /v1/payments - Lista pagamentos.
POST /v1/payments - Cria um pagamento - {nome, descrição, valor, saldo_id}.
PUT /v1/payments - Atualiza um pagamento - {id, name}.
DELETE /v1/payments/:id - Deleta um pagamento - {id}.
```

**API SALDOS**
```markdown
GET /v1/balance - Lista saldos.
POST /v1/balance - Cria um saldo - {nome, descrição, valor}.
PUT /v1/balance - Atualiza um saldo - {id, nome}.
DELETE /v1/balance/:id - Deleta um saldo - {id}.
```

## Instalação Frontend

1. Ir para o diretório ./frontend e digitar: 

```bash
$ npm install
```

2. Entre no arquivo Api.ts e altere a BASE_API para a (http://localhost:3001/v1) 


3. Rodar o projeto: 

```bash
$ npm run dev
```



## Sobre

Linkedin: https://www.linkedin.com/in/thomas-quinaia-82b5221b1/
