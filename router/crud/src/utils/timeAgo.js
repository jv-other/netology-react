
const MINUTE_MS = 60 * 1000,
  HOUR_MS = 60 * MINUTE_MS,
  DAY_MS = 24 * HOUR_MS;

const MINUTES_AGO = "мин.",
  HOURS_AGO = "ч.",
  DAYS_AGO = "д.";

const UNITS_AGO = [
  // [ лимит, делитель, окончание ]
  [HOUR_MS, MINUTE_MS, MINUTES_AGO],
  [DAY_MS, HOUR_MS, HOURS_AGO],
  [Number.MAX_VALUE, DAY_MS, DAYS_AGO]
];


/**
 * Вычисляет сколько прошло времени с переданного значения даты
 * 
 * @param {number} value Количество миллисекунд с 1 января 1970 года 00:00:00
 * @returns {string} Значение прошедшего времени
 */
const timeAgo = (value) => {
  const difference = new Date().getTime() - value;
  const unitsAgo = UNITS_AGO.find(i => difference < i[0]).slice(1, 3);
  return [Math.floor(difference / unitsAgo[0]), unitsAgo[1]].join(" ");
};

export default timeAgo;