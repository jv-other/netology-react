
/**
 * @typedef {object} Product
 */
export type Product = {

  /** Идентификатор */
  id?: string;

  /** Название */
  title: string;

  /** Описание */
  description: string;

  /** Цена */
  price: number;

  /** Скидка */
  discount?: number;

  /** Ссылка на изображение */
  imageUrl: string;

};

/**
 * @typedef {object} ProductsState 
 */
export type ProductsState = {
  products: Product[]
};

/**
 * @typedef {object} ProductProps
 */
export type ProductProps = {

  item: Product

};