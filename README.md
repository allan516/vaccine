# Vaccine - Sistema de Gerenciamento de Vacinas para Pets

## Sobre o Projeto

O **Vaccine** é uma API REST desenvolvida para gerenciar a vacinação de pets. Com ela, é possível criar, visualizar, atualizar e deletar registros de vacinas e pets, garantindo um histórico organizado e acessível.

## Funcionalidades

### Login

Todas as rotas são autenticadas

- `POST /login` - para logar o usuário

### Gerenciamento de Pets

- `POST /pet` - Cadastra um novo pet.
- `DELETE /pet/:id` - Remove um pet pelo ID.
- `PATCH /pet/:id` - Atualiza informações de um pet.
- `GET /pet` - Retorna a lista de todos os pets cadastrados.
- `GET /pet/:id` - Retorna um pet específico pelo ID.

### Gerenciamento de Vacinas

- `POST /pet/:id/vaccine` - Adiciona uma nova vacina para um pet.
- `DELETE /pet/:id/vaccine/:vaccineId` - Remove uma vacina de um pet.
- `PATCH /pet/:id/vaccine/:vaccineId` - Atualiza informações de uma vacina de um pet.
- `GET /pet/:id/vaccine` - Retorna todas as vacinas de um pet.

## Tecnologias Utilizadas

- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB** Com Mongoose e MongoDB Atlas
- **Jwt** para rotas protegidas
