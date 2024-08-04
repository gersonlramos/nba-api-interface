# **Avaliação das Sprints 2 e 3 - Programa de Bolsas Compass UOL / AWS - Turma JUNHO/2024**

## Desenvolvedores

- [Gerson Ramos](https://github.com/gersonlramos)
- [Iuri Souza](https://github.com/souiuri)
- [Monique da Silva Borges](https://github.com/niqueborges)

# Projeto NBA API

*Sistema em JavaScript/NodeJS que produz uma interface para consulta de API pública.*

## Estrutura do Projeto

- `index.html`: Contém a estrutura HTML do sistema.
- `team.html`: Página de exibição de detalhes e estatísticas de um time.
- `script.js`: Script para manipular a interface do usuário e interagir com a API.
- `team.js`: Script específico para lidar com a página de detalhes do time.
- `style.css`: Contém a estilização do sistema.
- `index.js`: Código de servidor Node.js que gerencia as requisições para a API.
- `routes/nbaRoutes.js`: Define as rotas para acesso à API NBA.
- `Dockerfile`: Define como construir a imagem Docker da aplicação.
- `docker-compose.yml`: Facilita o gerenciamento dos contêineres Docker.
- `README.md`: Este arquivo contém informações sobre o projeto, como usá-lo e sua estrutura.

## Tecnologias Utilizadas

- HTML
- CSS
- JavaScript/NodeJS
- Docker
- AWS

## Funcionalidades

- Consulta de dados da API pública da NBA.
- Exibição dos dados em uma interface simples e interativa.
- Dockerização da aplicação para fácil implantação.
- Implementação de API utilizando Node.js.

## Como Usar

1. **Iniciar a Aplicação**:
   - Acesse a aplicação no navegador usando o endereço [NBA-API-grupo-5](http://44.211.161.65/).

2. **Escolher um Time**:
   - Na página principal, selecione um time na lista de times disponíveis.

3. **Verificar Estatísticas do Time**:
   - Ao escolher um time, você será direcionado para uma página que exibe as estatísticas da temporada selecionada.
   - Você pode alterar a temporada usando o menu suspenso para ver as estatísticas de anos diferentes.

4. **Botão de Voltar**:
   - Utilize o botão de voltar para retornar à página de seleção de times.

5. **Demonstração**:
   - Veja a demonstração abaixo para uma visão geral de como usar a aplicação.

   ![Demonstração da Aplicação](src/imagens/como_usar_a_api.gif)

## Etapas do Projeto

1. **Planejamento e Design**:
   - Definição das funcionalidades principais e planejamento da interface do usuário.
   - Criação de wireframes para mapear o fluxo da aplicação.

2. **Desenvolvimento da API**:
   - Implementação da API em Node.js para consumir dados da API pública da NBA.
   - Criação das rotas necessárias para servir os dados ao cliente.

3. **Desenvolvimento Frontend**:
   - Criação da interface do usuário utilizando HTML, CSS e JavaScript.
   - Implementação das interações com a API via RapidAPI

4. **Dockerização e Implantação**:
   - Configuração de `Dockerfile` e `docker-compose.yml` para contêineres Docker.
   - Implantação da aplicação na instância EC2 da AWS.

5. **Teste e Validação**:
   - Testes funcionais e de usabilidade para garantir a experiência do usuário.
   - Ajustes baseados no feedback dos testes.

## Dificuldades

- **CORS**: Configuração de CORS para permitir requisições de origens diferentes.
- **Permissões de EC2**: Problemas de permissão durante a configuração e operação da instância EC2.
- **Depuração de Erros**: Integração com a API da NBA e depuração de erros nas rotas.
- **Configuração de Rede**: Configuração correta das regras de segurança na AWS para permitir o acesso público.

## Licença

Este projeto é licenciado sob a Licença MIT. Veja o arquivo [LICENSE](src/LICENSE) para mais detalhes.

<p align="center">
 <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
 <img alt="CSS" src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white">
 <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
 <img alt="Node.js" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
 <img alt="AWS" src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white">
 <img alt="Docker" src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white">
</p>
