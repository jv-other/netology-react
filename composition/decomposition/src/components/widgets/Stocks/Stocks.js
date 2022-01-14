import React from "react";
import Widget from "../../common/Widget/Widget";

import "./Stocks.css";

// набор данных для примера 
import STOCKS_DATA from "./stocks-data.json";

/**
 * Виджет - Котировки
 * 
 * @returns 
 */
const Stocks = () => (
  <Widget className="widget-stocks">
    <ul className="list-group list-group-horizontal">
      {STOCKS_DATA.slice(0, 3).map((item, index) => (
        <li key={index} className="stock-item list-group-item border-0">
          <span className="stock-item-name">{item.name}</span>
          &nbsp;
          <span className="stock-item-value">{item.value}</span>
          &nbsp;
          <span className="stock-item-delta">{item.delta}</span>
        </li>
      ))}
      <li key="show-more">
        <a href="#"><span>...</span></a>
      </li>
    </ul>
  </Widget>
);

export default Stocks;