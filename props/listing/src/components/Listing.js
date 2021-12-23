import React from "react";
import PropTypes from "prop-types";

const CURRENCIES_SYMBOLS = {
  "USD": "\u0024",
  "EUR": "\u20AC"
}
const QUANTITY_LEVELS = [[10, "low"], [20, "medium"], [Number.MAX_SAFE_INTEGER, "high"]];

const getItemPrice = (item) => {
  return item.price && item.currency_code && CURRENCIES_SYMBOLS[item.currency_code]
    ? (CURRENCIES_SYMBOLS[item.currency_code] + (item.price))
    : ([item.price || "Free", item.currency_code].join(" "));
};

const getItemQuantityLevel = (item) => {
  return QUANTITY_LEVELS.find(level => ((item.quantity || 0) <= level[0]))[1];
};

/**
 * Компонент визуализации предложения
 * 
 * @param item Данные предложения 
 * @returns 
 */
const ListItem = ({ item }) => (
  <div className="item">
    <div className="item-image">
      <a href={item.url || "#"}>
        <img src={item.MainImage && item.MainImage.url_570xN || "none.jpg"} />
      </a>
    </div>
    <div className="item-details">
      <p className="item-title">{item.title || "Not specified"}</p>
      <p className="item-price">{getItemPrice(item)}</p>
      <p className={"item-quantity level-" + getItemQuantityLevel(item)}>{item.quantity || 0} left</p>
    </div>
  </div>
);

ListItem.propTypes = {
  item: PropTypes.shape({
    listing_id: PropTypes.number.isRequired,
    url: PropTypes.string,
    MainImage: PropTypes.shape({
      url_570xN: PropTypes.string
    }),
    title: PropTypes.string,
    currency_code: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number
  })
};

/**
 * Список предложений
 * 
 * @param items Данные предложений 
 * @returns 
 */
const Listing = ({ items = [] }) => {

  return (
    <div className="item-list">
      {
        items.map(item => (
          <ListItem item={item} key={item.listing_id} />
        ))
      }
    </div>
  );
};

Listing.propTypes = {
  items: PropTypes.arrayOf(ListItem.propTypes.item)
}

export default Listing;