document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const weatherDashboard = document.getElementById('weather-dashboard');
    const loading = document.getElementById('loading');
    const errorMessage = document.getElementById('error-message');
    const appBody = document.getElementById('app-body');
    const datetimeEl = document.getElementById('current-datetime');

    // Atualiza a data e hora atual
    const updateDateTime = () => {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        let formatted = now.toLocaleDateString('pt-BR', options);
        // Capitalizar a primeira letra
        formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
        datetimeEl.textContent = formatted;
    };
    updateDateTime();
    setInterval(updateDateTime, 60000);

    // Mapeamento de códigos WMO da Open-Meteo para ícones, descrições e temas
    const weatherCodes = {
        0: { desc: 'Céu Limpo', icon: 'ph-sun', bg: 'sunny' },
        1: { desc: 'Principalmente Claro', icon: 'ph-sun', bg: 'sunny' },
        2: { desc: 'Parcialmente Nublado', icon: 'ph-cloud-sun', bg: 'cloudy' },
        3: { desc: 'Nublado', icon: 'ph-cloud', bg: 'cloudy' },
        45: { desc: 'Neblina', icon: 'ph-cloud-fog', bg: 'cloudy' },
        48: { desc: 'Névoa Gelada', icon: 'ph-cloud-fog', bg: 'cloudy' },
        51: { desc: 'Garoa Leve', icon: 'ph-cloud-rain', bg: 'rainy' },
        53: { desc: 'Garoa Moderada', icon: 'ph-cloud-rain', bg: 'rainy' },
        55: { desc: 'Garoa Densa', icon: 'ph-cloud-rain', bg: 'rainy' },
        61: { desc: 'Chuva Leve', icon: 'ph-cloud-rain', bg: 'rainy' },
        63: { desc: 'Chuva Moderada', icon: 'ph-cloud-rain', bg: 'rainy' },
        65: { desc: 'Chuva Forte', icon: 'ph-cloud-lightning', bg: 'rainy' },
        71: { desc: 'Neve Leve', icon: 'ph-snowflake', bg: 'cloudy' },
        73: { desc: 'Neve Moderada', icon: 'ph-snowflake', bg: 'cloudy' },
        75: { desc: 'Neve Forte', icon: 'ph-snowflake', bg: 'cloudy' },
        80: { desc: 'Pancadas de Chuva Leve', icon: 'ph-cloud-rain', bg: 'rainy' },
        81: { desc: 'Pancadas de Chuva', icon: 'ph-cloud-rain', bg: 'rainy' },
        82: { desc: 'Pancadas de Chuva Forte', icon: 'ph-cloud-lightning', bg: 'rainy' },
        95: { desc: 'Tempestade', icon: 'ph-cloud-lightning', bg: 'rainy' },
        96: { desc: 'Tempestade com Granizo', icon: 'ph-cloud-lightning', bg: 'rainy' },
        99: { desc: 'Tempestade Forte com Granizo', icon: 'ph-cloud-lightning', bg: 'rainy' }
    };

    const getWeatherInfo = (code) => {
        return weatherCodes[code] || { desc: 'Desconhecido', icon: 'ph-cloud', bg: 'cloudy' };
    };

    const fetchWeather = async () => {
        const city = cityInput.value.trim();
        if (!city) return;

        // Resetar interface
        weatherDashboard.classList.add('hidden');
        errorMessage.classList.add('hidden');
        loading.classList.remove('hidden');

        try {
            const response = await fetch(`/weather?city=${encodeURIComponent(city)}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao buscar dados do clima');
            }

            updateDashboard(data);
        } catch (error) {
            errorMessage.textContent = error.message;
            errorMessage.classList.remove('hidden');
        } finally {
            loading.classList.add('hidden');
        }
    };

    const updateDashboard = (data) => {
        // Clima atual
        const currentCode = data.current.weather_code;
        const weatherInfo = getWeatherInfo(currentCode);

        // Atualizar papel de parede e cores baseados no clima
        appBody.className = weatherInfo.bg;

        // Preencher Dashboard com dados
        document.getElementById('city-name').textContent = data.city;
        document.getElementById('current-temp').textContent = Math.round(data.current.temperature_2m);
        document.getElementById('current-wind').textContent = data.current.wind_speed_10m;
        document.getElementById('current-condition').textContent = weatherInfo.desc;
        
        const currentIcon = document.getElementById('current-icon');
        currentIcon.className = `ph ${weatherInfo.icon} weather-icon-large`;

        // Processar Previsão das próximas horas
        const hourlyContainer = document.getElementById('hourly-forecast');
        hourlyContainer.innerHTML = '';

        const now = new Date();
        const currentHour = now.getHours();
        
        // Encontrar o indice baseado no tempo atual
        let startIndex = 0;
        for (let i = 0; i < data.hourly.time.length; i++) {
            const timeDate = new Date(data.hourly.time[i]);
            if ((timeDate.getHours() >= currentHour && timeDate.getDate() === now.getDate()) || timeDate > now) {
                startIndex = i;
                break;
            }
        }

        // Mostrar as próximas 12 horas
        for (let i = startIndex; i < startIndex + 12 && i < data.hourly.time.length; i++) {
            const timeDate = new Date(data.hourly.time[i]);
            const hourStr = timeDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            const temp = Math.round(data.hourly.temperature_2m[i]);
            const code = data.hourly.weather_code[i];
            const info = getWeatherInfo(code);

            const card = document.createElement('div');
            card.className = 'hourly-card';
            card.innerHTML = `
                <div class="hourly-time">${i === startIndex ? 'Agora' : hourStr}</div>
                <i class="ph ${info.icon} hourly-icon"></i>
                <div class="hourly-temp">${temp}°C</div>
            `;
            hourlyContainer.appendChild(card);
        }

        // Mostrar o dashboard animado
        weatherDashboard.classList.remove('hidden');
    };

    searchBtn.addEventListener('click', fetchWeather);
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') fetchWeather();
    });
});
