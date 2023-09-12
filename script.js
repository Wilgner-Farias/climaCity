// Requisições da API

document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let inputCidade = document.querySelector('#searchInput').value;
    
    if(inputCidade !== '') {
        showWarning('Carregando...');
        
        let api = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(inputCidade)}&appid=e7490140274160e6d669f2c92c812d2f&units=metric&lang=pt_br`;
        
        let resultado = await fetch(api);
        let json = await resultado.json();

        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        } else {
            showWarning('Não encontramos essa localização.');
        }
    }
});


// Substituindo as informações

function showInfo(json) {
    showWarning('');

    document.querySelector('.resultado').style.display = 'block';

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
}

// Exibir mensagem

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}