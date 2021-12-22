
// Описание товара
const Overview = ({ item }) => {
  const { brand, title, description, descriptionFull } = item;

  return (
    <>
      <h2>{brand}</h2>
      <h1>{title}</h1>
      <h3>{description}</h3>
      <div className="description">{descriptionFull}</div>
    </>
  );
}

// Цена товара
const Price = ({ item }) => {
  const { price, currency } = item;

  return (
    <div className="price">{currency}{price}</div>
  );
}

// Покупка
const Offer = ({ item, onPurchase }) => (
  <div className="purchase-info">
    <Price item={item} />
    <button onClick={() => onPurchase(item)}>Добавить в корзину</button>
  </div>
);

const defaultOnPurchaseHandler = item => console.log("Purchase: " + JSON.stringify(item));

/**
 * Компонент визуализации товара
 * 
 * @param item Данные товара 
 * @returns 
 */
const ShopItemFunc = ({ item, onPurchase = defaultOnPurchaseHandler }) => {
  return (
    <div className="main-content">
      <Overview item={item} />
      <div className="highlight-window mobile">
        <div className="highlight-overlay"></div>
      </div>
      <div className="divider"></div>
      <Offer item={item} onPurchase={onPurchase} />
    </div>
  );
};

export default ShopItemFunc;