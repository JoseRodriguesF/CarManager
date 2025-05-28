# CarManager

CarManager é um aplicativo móvel desenvolvido com React Native e Expo para gerenciamento de uma coleção de carros, integrado com um backend Spring Boot e MongoDB.

## 🚀 Funcionalidades

- **Visualização de Carros**: Lista todos os carros cadastrados em cards informativos
- **Cadastro de Carros**: Adicione novos carros à sua coleção
- **Detalhes do Carro**: Visualize informações detalhadas de cada carro
- **Edição de Carros**: Modifique informações dos carros cadastrados
- **Exclusão de Carros**: Remova carros da sua coleção
- **Interface Moderna**: Design elegante com gradientes e animações suaves
- **Navegação Intuitiva**: Sistema de navegação fluido entre as telas
- **Upload de Imagens**: Suporte para upload de fotos dos carros
- **Busca por Marca**: Filtragem de carros por marca

## 🛠️ Tecnologias Utilizadas

### Frontend
- React Native
- Expo
- React Navigation
- Axios para requisições HTTP
- Expo Linear Gradient
- React Native Gesture Handler
- React Native Reanimated

### Backend
- Spring Boot
- MongoDB
- Swagger/OpenAPI para documentação
- Jakarta Validation
- Lombok

## 📱 Telas do Aplicativo

1. **Home**: Tela principal que exibe a lista de carros cadastrados
2. **RegisterCar**: Tela para cadastro de novos carros
3. **CarDetail**: Tela que mostra os detalhes de um carro específico
4. **EditarCar**: Tela para edição das informações de um carro

## 🔄 Integração com Backend

### API Deployada
A API está hospedada no Render e pode ser acessada em:
```
https://carmanager-jftp.onrender.com/api/carros
```

### Endpoints da API

- `GET /api/carros`: Lista todos os carros
- `GET /api/carros/{id}`: Busca carro por ID
- `GET /api/carros/marca/{marca}`: Busca carros por marca
- `POST /api/carros`: Cadastra novo carro
- `PUT /api/carros/{id}`: Atualiza carro existente
- `DELETE /api/carros/{id}`: Remove carro

### Modelo de Dados

```java
public class Carro {
    private String id;
    private String modelo;
    private String marca;
    private int ano_fabricacao;
    private int quilometragem;
    private double valor;
    private Binary foto;
}
```

## ⚠️ Tratamento de Erros

O sistema implementa tratamento de erros robusto com os seguintes códigos HTTP:

- **200**: Sucesso na operação
- **201**: Recurso criado com sucesso
- **204**: Nenhum conteúdo encontrado
- **400**: Requisição inválida
- **404**: Recurso não encontrado
- **500**: Erro interno do servidor

### Validações Implementadas

- Campos obrigatórios (modelo, marca, ano, quilometragem, valor)
- Validação de tipos de dados
- Tratamento de arquivos de imagem
- Validação de IDs

## 🚀 Como Executar

1. Clone o repositório
2. Instale as dependências do frontend:
```bash
npm install
```
3. Configure o backend:
   - Instale o MongoDB
   - Configure as credenciais no `application.properties`
4. Inicie o aplicativo:
```bash
npm start
```

## 📦 Scripts Disponíveis

- `npm start`: Inicia o servidor de desenvolvimento
- `npm run android`: Inicia o aplicativo no Android
- `npm run ios`: Inicia o aplicativo no iOS
- `npm run web`: Inicia o aplicativo na versão web

## 🎨 Interface

O aplicativo possui uma interface moderna com:
- Gradientes elegantes
- Cards informativos
- Botões flutuantes
- Modais de confirmação
- Animações suaves
- Design responsivo

## 🔄 Atualizações em Tempo Real

O aplicativo atualiza automaticamente a lista de carros quando:
- Um novo carro é cadastrado
- Um carro é editado
- Um carro é excluído
- A tela principal é acessada

## 📚 Documentação da API

A documentação completa da API está disponível através do Swagger UI em:
```
https://carmanager-jftp.onrender.com/swagger-ui.html
```
