const form = document.querySelector("#search-form");
const input: HTMLInputElement | null =
  document.querySelector("#input-localizacao");

const sectionWeatherInfo = document.querySelector("#weather-info");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!input || !sectionWeatherInfo) return;

  const localizacao = input.value;

  if (localizacao.length < 3) {
    alert("O local precisa ter pelo menos 3 letras...");
    return;
  }
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=a3f62f009d8005c064e4d1e31d0de909&lang=pt_br&units=metric`
    );

    const data = await response.json();

    const infos = {
      temperatura: Math.round(data.main.temp).toFixed(0),
      local: data.name,
      icone: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    };

    sectionWeatherInfo.innerHTML = `
  <div class="weather-data">
    <h2>${infos.local}</h2>
    <span>${infos.temperatura}°C</span>
  </div>

  <img src="${infos.icone}">`;
  } catch (error) {
    console.log("Deu um erro na obtenção de dados da API: ", error);
  }
});
