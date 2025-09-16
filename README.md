# 🏦 SystemBank - API Banco Digital
Uma API simples para sistema bancário, desenvolvida com Node.js, Express e MongoDB.
Projeto desenvolvido durante o estágio na Compass UOL.

## ✨ Funcionalidades

✅ Cadastro de clientes com validação de CPF e email

✅ Criação de contas correntes e poupança

✅ Consulta de saldo

✅ Realização de transações (crédito e débito)

✅ Transferência entre contas

✅ Extrato bancário


## 🛠️ Tecnologias Utilizadas

- Node.js - Runtime JavaScript
- Express.js - Framework web
- MongoDB - Banco de dados
- Mongoose - ODM para MongoDB
- dotenv - Gerenciamento de variáveis de ambiente

## 🚀 Como Executar
### Pré-requisitos

- Node.js
- MongoDB
- npm ou yarn

### Instalação
Clone o repositório:

```bash
    git clone https://github.com/wwwagnerfs/systembank.git
```

### Instale as dependências:

```bash
    npm install express mongoose dotenv nodemon
```

### Crie um arquivo .env na raiz do projeto:

```bash
    MONGO_URI=mongodb://localhost:xxxxx/seubancodedados
    PORT=xxxx
```

### Inicie o servidor:

```bash
    npm run dev
```


## 📡 Endpoints da API

### 👥 Clientes

- POST /api/customers - Criar novo cliente

- GET /api/customers - Listar todos os clientes

### 💳 Contas

- POST /api/customers/:customerId/accounts - Criar conta para cliente

- GET /api/accounts/:accountId/balance - Consultar saldo

### 💰 Transações

- POST /api/accounts/:accountId/transactions - Realizar transação

- GET /api/accounts/:accountId/statement - Obter extrato

- POST /api/transfer - Transferir entre contas

## 🗃️ Modelos de Dados

Cliente (Customer)

```bash
{
    _id: "cus_001",
  name: "Maria Silva",
  cpf: "12345678900",
  email: "maria.silva@email.com",
  accounts: ["acc_001", "acc_002"]
}
```

Conta (Account)

```bash
{
    _id: "acc_001",
  type: "checking",
  branch: "0001",
  number: "12345-6",
  balance: 2500.75,
  transactions: ["txn_001", "txn_002"]
}
```

Transação (Transaction)

```bash
{
    _id: "txn_001",
  date: "2025-09-09",
  description: "Deposit via wire transfer",
  amount: 1000.00,
  type: "credit",
}
```

## 🛡️ Validações Implementadas

✅ CPF válido

✅ Email válido

---

<p align="center">
  Desenvolvido por Wagner Fonseca  
  <br><br>
  <a href="https://github.com/wwwagnerfs">
    <img src="https://img.shields.io/badge/GitHub-000000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://linkedin.com/in/wwwagnerfs">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
</p>
