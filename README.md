# 🏀 NBA API Interface

_Sistema moderno em JavaScript/NodeJS que produz uma interface para consulta de API pública da NBA com funcionalidades avançadas de comparação de jogadores e visualização de estatísticas._

## 👥 Desenvolvedores

- [Gerson Ramos](https://github.com/gersonlramos)

## ✨ Funcionalidades

- **🏀 Visualização de Times**: Consulta e exibição de informações detalhadas dos times da NBA
- **📊 Estatísticas Avançadas**: Visualização de estatísticas por temporada com gráficos e barras de progresso
- **👥 Perfis de Jogadores**: Informações detalhadas e estatísticas individuais dos jogadores
- **⚔️ Comparação de Jogadores**: Comparação lado a lado com indicadores visuais (verde/vermelho)
- **🌓 Tema Escuro/Claro**: Sistema de temas com transições suaves e cores vibrantes
- **📱 Design Responsivo**: Interface otimizada para desktop, tablet e mobile
- **🔒 Segurança**: Configuração segura com variáveis de ambiente

## 🏗️ Estrutura do Projeto

```
src/
├── server/                 # Backend application
│   ├── index.js           # Main server file
│   ├── config/            # Configuration files
│   │   └── config.js      # Application configuration
│   └── routes/            # API routes
│       └── nbaRoutes.js   # NBA API endpoints
├── public/                # Frontend static files
│   ├── index.html         # Homepage
│   ├── pages/             # Additional HTML pages
│   │   ├── team.html      # Team details page
│   │   └── compare.html   # Player comparison page
│   ├── css/               # Stylesheets
│   │   └── style.css      # Main stylesheet with theme system
│   ├── js/                # JavaScript files
│   │   ├── script.js      # Homepage functionality
│   │   ├── team.js        # Team page functionality
│   │   ├── compare.js     # Player comparison functionality
│   │   └── theme.js       # Theme management system
│   └── assets/            # Static assets
│       └── imagens/       # Images and logos
├── .env                   # Environment variables (not in git)
├── .env.example          # Environment variables template
├── package.json          # Dependencies and scripts
└── README.md            # Project documentation
```

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js, Express.js, Axios
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **API**: RapidAPI NBA API
- **Styling**: CSS Custom Properties, Flexbox, Grid
- **Security**: Environment Variables, dotenv
- **Deployment**: Docker, AWS EC2
- **Version Control**: Git, GitHub

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

<div align="center">
   <img src="src/public/assets/imagens/como_usar_a_api.gif" alt="NBA API Demo" width="800">
</div>

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

## 🚀 Instalação e Uso

### Desenvolvimento Local

1. **Clone o repositório**:

   ```bash
   git clone <repository-url>
   cd sprints-2-3-pb-aws-junho/src
   ```

2. **Configure as variáveis de ambiente**:

   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

3. **Instale as dependências**:

   ```bash
   npm install
   ```

4. **Inicie o servidor**:

   ```bash
   npm start
   ```

5. **Acesse a aplicação**:
   - Local: `http://localhost:3000`
   - Produção: [NBA-API-grupo-5](http://44.211.161.65/)

## 🔐 Configuração de Ambiente

### Por que usar .env.example?

O arquivo `.env.example` é uma **boa prática de segurança** que serve como:

1. **📋 Template**: Mostra quais variáveis são necessárias
2. **🔒 Segurança**: Não contém valores reais/sensíveis
3. **📚 Documentação**: Explica cada variável necessária
4. **🤝 Colaboração**: Facilita setup para novos desenvolvedores

### Configuração Necessária

```env
# Server Configuration
PORT=3000
HOST=localhost
NODE_ENV=development

# API Configuration (OBRIGATÓRIO)
RAPID_API_KEY=sua_chave_rapidapi_aqui
EC2_URL=http://sua-instancia-ec2/

# CORS Configuration
CORS_ORIGIN=*

# Logging Configuration
LOG_LEVEL=info
```

### ⚠️ Importante

- ✅ **Sempre copie** `.env.example` para `.env`
- ✅ **Nunca commit** o arquivo `.env` (já está no .gitignore)
- ✅ **Substitua os valores** pelos seus dados reais
- ✅ **RAPID_API_KEY é obrigatório** para funcionar

## 📡 API Endpoints

- `GET /api/nba/teams` - Lista todos os times da NBA
- `GET /api/nba/teams/:id` - Informações de um time específico
- `GET /api/nba/teams/:id/stats?season=YYYY` - Estatísticas do time por temporada
- `GET /api/nba/teams/:teamId/players?season=YYYY` - Jogadores do time por temporada
- `GET /api/nba/players/:playerId/stats?season=YYYY` - Estatísticas do jogador por temporada

## 🎨 Sistema de Temas

- **🌙 Tema Escuro**: Cores vibrantes (vermelho #ff4757, dourado #ffd700)
- **☀️ Tema Claro**: Cores profissionais da NBA
- **💾 Persistência**: Lembra a preferência do usuário
- **🖥️ Detecção Automática**: Respeita preferência do sistema operacional

## 📱 Design Responsivo

- **📱 Mobile**: 320px - 768px (layout em coluna única)
- **📟 Tablet**: 768px - 1024px (layout em duas colunas)
- **🖥️ Desktop**: 1024px+ (layout completo com múltiplas colunas)
