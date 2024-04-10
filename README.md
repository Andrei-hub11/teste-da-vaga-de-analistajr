![Screenshot 2024-04-10 at 00-48-06 Teste de Vaga de Aanalist Jr](https://github.com/Andrei-hub11/teste-da-vaga-de-analistajr/assets/83555334/0c3f1f5a-77d4-455d-9210-4198c8516a3f)

![Screenshot 2024-04-09 at 23-43-54 Teste de Vaga de Aanalist Jr](https://github.com/Andrei-hub11/teste-da-vaga-de-analistajr/assets/83555334/d5f6c3d0-3c6e-490e-a04e-b75166272721)

![Screenshot 2024-04-09 at 23-48-13 Teste de Vaga de Aanalist Jr](https://github.com/Andrei-hub11/teste-da-vaga-de-analistajr/assets/83555334/1a775dfe-5238-42fe-b0cc-34a4c251e6f5)

![Screenshot 2024-04-10 at 00-50-01 Teste de Vaga de Aanalist Jr](https://github.com/Andrei-hub11/teste-da-vaga-de-analistajr/assets/83555334/3ce1db21-9781-4b34-8c5c-0e0973722af1)

# Endpoints:

### Obtém Todos Objetos de Empresa

- URL: /api/v1/companies
- Método HTTP: GET
- Cabeçalho de Autenticação: Não é necessário autenticação.
- Corpo da Solicitação (JSON):

- Resposta de Sucesso (200 OK):

```
[
    {
        "Id": "ecbbe988-9b6f-4c54-9a5c-3827c9c4f7e3",
        "FantasyName": "stringaaaaaaaaaa22222111bbbb",
        "CNPJ": "11930090211111",
        "CorporateReason": "stringaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "RegistrationDate": "2024-04-09T23:06:57",
        "Status": true
    },
]
```

- Resposta de Erro (500 Internal Server Error):

```
{
  "Message": "Ocorreu um erro durante a busca das empresas.",
  "Error": "Mensagem de erro específica"
}
```

### Adiciona Nova Empresa

- URL: /api/v1/create-company
- Método HTTP: POST
- Cabeçalho de Autenticação: Não é necessário autenticação.
- Corpo da Solicitação (JSON):

```
{
  "FantasyName": "stringaaaaaaaaaa22222111",
  "CNPJ": "11930090211111",
  "CorporateReason": "stringaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "RegistrationDate": "2024-04-08T13:44:51.305Z",
  "Status": false
}
```

- Resposta de Sucesso (200 OK):

```
{
    "Id": "cbce7cf8-1481-40d4-9464-f24499c5d744",
    "FantasyName": "stringaaaaaaaaaa22222111",
    "CNPJ": "11930090211111",
    "CorporateReason": "stringaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "RegistrationDate": "2024-04-08T13:44:51.305Z",
    "Status": false
}
```

- Resposta de Erro (400 Bad Request):

```
{
"Message": "Os campos não foram corretamente preenchidos",
"Errors": ["Erro 1", "Erro 2", ...]
}
```

- Resposta de Erro (500 Internal Server Error):

```
{
"Message": "Ocorreu um erro durante a adição da empresa.",
"Error": "Mensagem de erro específica"
}
```

### Atualiza Registro de Empresa

- URL: /api/v1/update-company
- Método HTTP: PUT
- Cabeçalho de Autenticação: Não é necessário autenticação.
- Corpo da Solicitação (JSON):

```
{
    "Id": "2d886757-b60b-4847-988f-229de4266748",
    "FantasyName": "stringaaaaaaaaaaaaaa",
    "CNPJ": "11930090211111",
    "CorporateReason": "stringaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "RegistrationDate": "2024-04-08T13:44:51.305Z",
    "Status": true
}
```

- Resposta de Sucesso (200 OK):

```
true
```

- Resposta de Erro (400 Bad Request):

```
{
"Message": "Os campos não foram corretamente preenchidos",
"Errors": ["Erro 1", "Erro 2", ...]
}
```

- Resposta de Erro (500 Internal Server Error):

```
{
"Message": "Ocorreu um erro durante a atualização da empresa.",
"Error": "Mensagem de erro específica"
}
```

### Deleta Registro de Empresa

- URL: /api/v1/delete-company/{companyId}
- Método HTTP: PUT
- Cabeçalho de Autenticação: Não é necessário autenticação.
- Parâmetro de Rota (Path Parameter):
  companyId (string): Id do objeto

- Resposta de Sucesso (200 OK):

```
true
```

- Resposta de Erro (500 Internal Server Error):

```
{
"Message": "Ocorreu um erro durante a exclusão da empresa.",
"Error": "Mensagem de erro específica"
}
```

