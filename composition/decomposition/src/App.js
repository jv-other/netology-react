import React from "react";

// компоненты
import Widget from "./components/common/Widget/Widget";
import Banner from "./components/page/Banner/Banner";
import Services from "./components/page/Services/Services";
import Search from "./components/page/Search/Search";

// виджеты
import News from "./components/widgets/News/News";
import Stocks from "./components/widgets/Stocks/Stocks";
import Weather from "./components/widgets/Weather/Weather";
import SimpleListWidget from "./components/widgets/SimpleListWidget/SimpleListWidget";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// пример данных для виджетов
import APP_DATA from "./app-data.json";


function App() {
  return (
    <div className="container container-md">
      <div className="row">
        <div className="col">
          {/* Новости */}
          <News />
          {/* Котировки */}
          <Stocks />
        </div>
        {/* Баннер */}
        <Banner url="#" className="col col-4 align-self-end">
          <img src="logo192.png" alt="Работа над ошибками" />
          <h3 style={{ color: "#0d6efd" }}>Работа над ошибками</h3>
          <p>Смотрите на Яндекс и запоминайте</p>
        </Banner>
      </div>
      <div className="row">
        {/* Сервисы */}
        <Services />
      </div>
      <div className="row">
        {/* Поиск */}
        <Search />
      </div>
      <div className="row">
        {/* Баннер */}
        <Banner url="http://exmple.com">
          <div
            className="banner-img"
            style={{
              backgroundImage: "url(https://storage.mds.yandex.net/get-bstor/5483380/" +
                "59e5bcdd-0214-464f-932e-caaf6c3f7a5b.jpeg)"
            }}
          ></div>
        </Banner>
      </div>
      {/* Виджеты */}
      <div className="row">
        {/* Погода */}
        <Weather />
        {/* Карты */}
        <Widget url="#" title="Карта Германии">
          Расписания
        </Widget>

        {/* Остальные виджеты, в последующем могут быть выделены в отдельные компоненты */}
        {APP_DATA.map((item, index) => (
          <SimpleListWidget key={index} url="#" title={item.title} items={item.items} />
        ))}
      </div>
    </div>
  );
}

export default App;
