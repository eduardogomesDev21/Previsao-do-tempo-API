🌦️ Dashboard de Previsão do Tempo

Um dashboard moderno de previsão do tempo desenvolvido com Python (Flask) no back-end e HTML, CSS e JavaScript no front-end.
A aplicação permite buscar o clima de qualquer cidade e visualizar temperatura atual, vento e previsão para as próximas horas.

Os dados meteorológicos são obtidos gratuitamente através da API da Open‑Meteo API, que não exige cadastro ou chave de API.

🖼️ Demonstração
<img width="1329" height="612" alt="image" src="https://github.com/user-attachments/assets/cb822a9a-5932-4cbf-ad85-3e66bb935f7a" />


O dashboard apresenta:

🌡️ Temperatura atual da cidade

🌬️ Velocidade do vento

☁️ Condição climática

⏱️ Previsão das próximas 12 horas

🎨 Mudança automática do tema visual conforme o clima

Exemplo:

☀️ Ensolarado → fundo claro

☁️ Nublado → tons neutros

🌧️ Chuvoso → tema escuro com chuva

🧠 Como o projeto funciona

A aplicação segue uma arquitetura simples:

Usuário → Frontend (HTML + JS)
              ↓
        Requisição HTTP
              ↓
        Backend Flask
              ↓
   API de clima (Open-Meteo)
              ↓
      Dados processados
              ↓
        Dashboard atualizado
⚙️ Back-end (Python + Flask)

O back-end é responsável por:

Receber a cidade digitada pelo usuário

Buscar as coordenadas geográficas da cidade

Consultar os dados de clima

Retornar os dados em JSON para o front-end

Etapas do processo
1️⃣ Geocoding (converter cidade em coordenadas)

O sistema usa a API de geocoding da Open-Meteo para obter:

latitude

longitude

nome da cidade

2️⃣ Consulta de clima

Com as coordenadas, o servidor consulta:

temperatura atual

velocidade do vento

código da condição climática

previsão horária

3️⃣ Resposta para o front-end

O Flask retorna um JSON com estrutura semelhante a:

{
  "city": "São Paulo",
  "current": {
    "temperature_2m": 24,
    "wind_speed_10m": 12,
    "weather_code": 2
  },
  "hourly": {
    "time": [...],
    "temperature_2m": [...],
    "weather_code": [...]
  }
}

Endpoint principal:

/weather?city=NomeDaCidade
🎨 Front-end

O front-end é responsável por:

interface do dashboard

requisições para o Flask

renderização dinâmica dos dados

animações e mudanças de tema

Tecnologias utilizadas:

HTML5

CSS3

JavaScript (Vanilla JS)

Phosphor Icons

🔄 Atualização dinâmica do clima

O JavaScript faz:

1️⃣ Captura da cidade digitada
2️⃣ Envio da requisição para o Flask

fetch(`/weather?city=${encodeURIComponent(city)}`)

3️⃣ Recebimento do JSON
4️⃣ Atualização do dashboard com:

temperatura

vento

condição climática

previsão das próximas horas

🌈 Sistema de temas dinâmicos

Cada código meteorológico (WMO) é mapeado para:

descrição

ícone

tema visual

Exemplo:

0: { desc: 'Céu Limpo', icon: 'ph-sun', bg: 'sunny' }
61: { desc: 'Chuva Leve', icon: 'ph-cloud-rain', bg: 'rainy' }

Isso permite que o fundo do site mude automaticamente de acordo com o clima.

📁 Estrutura do projeto
weather-dashboard/
│
├── back.py
│
├── templates/
│   └── front.html
│
├── static/
│   ├── script.js
│   └── style.css
│
└── README.md
🚀 Como executar o projeto
1️⃣ Instalar dependências
pip install flask requests
2️⃣ Rodar o servidor
python back.py

O servidor será iniciado em:

http://localhost:5001
3️⃣ Abrir no navegador

Acesse:

http://127.0.0.1:5001

Digite uma cidade e veja a previsão do tempo em tempo real.

📡 API utilizada

Este projeto utiliza a API pública:

🌍 Open‑Meteo API

🔎 Geocoding API da Open-Meteo

Vantagens:

gratuita

sem necessidade de cadastro

sem chave de API

dados meteorológicos confiáveis

🛠️ Tecnologias utilizadas

🐍 Python

⚡ Flask

🌐 HTML5

🎨 CSS3

🧠 JavaScript

☁️ Open-Meteo API

🎯 Phosphor Icons

💡 Possíveis melhorias futuras

📅 Previsão para 7 dias

📍 Geolocalização automática do usuário

🌙 Modo dark/light

📊 Gráficos de temperatura

📱 Melhor responsividade para mobile
