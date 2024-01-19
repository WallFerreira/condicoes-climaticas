"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("#search-form");
const input = document.querySelector("#input-localizacao");
const sectionWeatherInfo = document.querySelector("#weather-info");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!input || !sectionWeatherInfo)
        return;
    const localizacao = input.value;
    if (localizacao.length < 3) {
        alert("O local precisa ter pelo menos 3 letras...");
        return;
    }
    try {
        const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=a3f62f009d8005c064e4d1e31d0de909&lang=pt_br&units=metric`);
        const data = yield response.json();
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
    }
    catch (error) {
        console.log("Deu um erro na obtenção de dados da API: ", error);
    }
}));
