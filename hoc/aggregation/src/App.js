import React from "react";
import PropTypes from "prop-types";

import MonthTable from "./components/MonthTable/MonthTable";
import YearTable from "./components/YearTable/YearTable";
import SortTable from "./components/SortTable/SortTable";

import * as Handlers from "./utils/dataHandlers";

import "./App.css";

// Компонент с обработкой данных для MonthTable
const WithDataHandlerMonthTable = Handlers.withDataHandler(MonthTable, Handlers.withHandlerChain([
  Handlers.withHandler(Handlers.mapHandler, item => [new Date(item.date).getMonth(), item.amount]),
  Handlers.withHandler(Handlers.aggHandler, (a, b) => (a || 0) + b),
  Handlers.withHandler(Handlers.arrHandler, "month", "amount"),
  Handlers.withHandler(Handlers.mapHandler, item => ({ ...item, month: parseInt(item.month) })),
  Handlers.withHandler(Handlers.sortHandler, "month"),
  Handlers.withHandler(Handlers.mapHandler, item =>
    ({ ...item, month: new Date(`2000-${item.month + 1}-01`).toLocaleString("en", { month: "short" }) }))
]));

// Компонент с обработкой данных для YearTable
const WithDataHandlerYearTable = Handlers.withDataHandler(YearTable, Handlers.withHandlerChain([
  Handlers.withHandler(Handlers.mapHandler, item => [new Date(item.date).getFullYear(), item.amount]),
  Handlers.withHandler(Handlers.aggHandler, (a, b) => (a || 0) + b),
  Handlers.withHandler(Handlers.arrHandler, "year", "amount"),
  Handlers.withHandler(Handlers.mapHandler, item => ({ ...item, year: parseInt(item.year) })),
  Handlers.withHandler(Handlers.sortHandler, "year")
]));

// Компонент с обработкой данных для SortTable
const WithDataHandlerSortTable =
  Handlers.withDataHandler(SortTable, Handlers.withHandler(Handlers.sortHandler, "date"));

export default class App extends React.Component {
  state = {
    list: []
  };

  componentDidMount() {
    window.fetch(process.env.REACT_APP_DATA_URL)
      .then(response => response.json())
      .then(data => this.setState(data));
  }

  render() {
    const { list } = this.state;
    return (
      <div id="app">
        <WithDataHandlerMonthTable list={list} />
        <WithDataHandlerYearTable list={list} />
        <WithDataHandlerSortTable list={list} />
      </div>
    );
  }
}