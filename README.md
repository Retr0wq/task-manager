# Task Manager

Gerenciador de tarefas com autenticação JWT. 
Cada usuário possui suas próprias tarefas, isoladas por conta.

## Tecnologias

- **Back-end:** Node.js, Express, SQLite, JWT, bcrypt
- **Front-end:** React, TypeScript, Vite, Tailwind CSS, Axios

## Funcionalidades

- Cadastro e login com senha criptografada
- Autenticação via JWT
- CRUD completo de tarefas
- Rotas protegidas no front-end

## Como rodar localmente

### Back-end
```bash
cd server
npm install
npm run dev
```

Crie um arquivo `.env` em `server/` com:
```
PORT= 6767
JWT_SECRET= chave1324
```

### Front-end
```bash
cd client
npm install
npm run dev
```

Acesse `http://localhost:5173`