import React from "react";

/**
 * Компонент визуализации товара
 */
class ShopItemClass extends React.Component {

  static defaultProps = {
    onPurchase: item => console.log("Purchase: " + JSON.stringify(item))
  }

  // Описание товара
  renderOverview(item) {
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
  renderPrice(item) {
    const { price, currency } = item;

    return (<div className="price">
      {currency}{price}
    </div>);
  }

  // Покупка
  renderOffer(item, onPurchase) {
    return (
      <div className="purchase-info">
        {this.renderPrice(item)}
        <button onClick={() => onPurchase(item)}>Добавить в корзину</button>
      </div>
    );
  }

  render() {
    return (
      <div className="main-content">
        {this.renderOverview(this.props.item)}
        <div className="highlight-window mobile">
          <div className="highlight-overlay"></div>
        </div>
        <div className="divider"></div>
        {this.renderOffer(this.props.item, this.props.onPurchase)}
      </div>
    );
  }

}

export default ShopItemClass;