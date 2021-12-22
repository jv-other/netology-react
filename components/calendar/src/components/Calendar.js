
const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

// Текущая дата
const DateMaterial = ({ date }) => {
  const vals = [].concat(
    date.toLocaleDateString("ru-ru", { weekday: "long" }),
    date.toLocaleDateString("ru-ru", { day: "numeric", month: "long" }).split(" "),
    date.getFullYear()
  );
  const data = ["day", "day-num", "month", "year"]
    .reduce((acc, key, i) => Object.assign(acc, { [key]: vals[i] }), {});

  return (
    <div className="ui-datepicker-material-header">
      <div className="ui-datepicker-material-day">{capitalize(data["day"])}</div>
      <div className="ui-datepicker-material-date">
        {
          ["day-num", "month", "year"].map(
            key => <div key={key} className={"ui-datepicker-material-" + key}>{data[key]}</div>
          )
        }
      </div>
    </div>
  );
};

// Заголовок месяц год
const DateTitle = ({ date }) => {
  const data = {
    month: capitalize(date.toLocaleDateString("ru-ru", { month: "long" })),
    year: date.getFullYear()
  };

  return (
    <div className="ui-datepicker-header">
      <div className="ui-datepicker-title">
        <span className="ui-datepicker-month">{data.month}</span>
        &nbsp;
        <span className="ui-datepicker-year">{data.year}</span>
      </div>
    </div>
  );
};

// Таблица дней
const DaysTable = ({ date }) => {

  const colGroup = num => (
    <col key={num} className={[5, 6].includes(num) ? "ui-datepicker-week-end" : null} />
  );

  const weekDay = (num) => {
    const date = new Date();
    date.setDate(date.getDate() - date.getDay() + num + 1);

    return (
      <th
        key={num}
        scope="col"
        title={capitalize(date.toLocaleDateString("ru-ru", { weekday: "long" }))}
      >
        {capitalize(date.toLocaleDateString("ru-ru", { weekday: "short" }))}
      </th>
    );
  };

  const dayClassName = day => (date.getMonth() != day.getMonth())
    ? "ui-datepicker-other-month"
    : (date.getDate() == day.getDate() ? "ui-datepicker-today" : null);

  const dayCell = day => (
    <td key={day.getDate()} className={dayClassName(day)}>{day.getDate()}</td>
  );

  const weekRow = date => (
    <tr key={date.toISOString().slice(0, 10)}>
      {[...Array(7).keys()].map(n => dayCell(new Date(date.setDate(date.getDate() + 1))))}
    </tr>
  );

  const i = new Date(date);
  i.setDate(0);
  i.setDate(i.getDate() - i.getDay());

  const dayIterator = () => ({
    next: () => (date > i) || (date.getMonth() == i.getMonth())
      ? { done: false, value: weekRow(i) } : { done: true }
  });

  return (
    <table className="ui-datepicker-calendar">
      <colgroup>{[...Array(7).keys()].map(colGroup)}</colgroup>
      <thead><tr>{[...Array(7).keys()].map(weekDay)}</tr></thead>
      <tbody>
        {[...{ [Symbol.iterator]: dayIterator }]}
      </tbody>
    </table>
  );
};

/**
 * Календарь
 * 
 * @param date текущая дата 
 */
const Calendar = ({ date }) => (
  <div className="ui-datepicker">
    <DateMaterial date={date} />
    <DateTitle date={date} />
    <DaysTable date={date} />
  </div>
);

export default Calendar;