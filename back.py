from flask import Flask, render_template, request, jsonify
import requests
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('front.html')

@app.route('/weather')
def get_weather():
    city = request.args.get('city')
    if not city:
        return jsonify({'error': 'Cidade não fornecida'}), 400

    # Goecoding API from Open-Meteo
    geocode_url = f"https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1&language=pt"
    try:
        geo_response = requests.get(geocode_url)
        geo_data = geo_response.json()

        if 'results' not in geo_data or len(geo_data['results']) == 0:
            return jsonify({'error': 'Cidade não encontrada'}), 404

        location = geo_data['results'][0]
        lat = location['latitude']
        lon = location['longitude']
        city_name = location['name']

        # Weather API from Open-Meteo
        weather_url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,wind_speed_10m,weather_code&hourly=temperature_2m,weather_code&timezone=auto&forecast_days=2"
        weather_response = requests.get(weather_url)
        weather_data = weather_response.json()

        return jsonify({
            'city': city_name,
            'current': weather_data['current'],
            'hourly': {
                'time': weather_data['hourly']['time'],
                'temperature_2m': weather_data['hourly']['temperature_2m'],
                'weather_code': weather_data['hourly']['weather_code']
            }
        })

    except Exception as e:
        return jsonify({'error': 'Erro ao buscar dados do clima'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
