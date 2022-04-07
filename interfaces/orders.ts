export interface IOrder {
  id: number,
  name: string,
  address?: string,
  zip?: number,
  city?: string,
  country?: string,
  status?: string,
  status_id?: number,
  order_items?: Array<IOrderProduct>,
}

export interface ISpecifier {
  [key: string]: any;
};

export interface IOrderProduct {
  product_id: number;
  article_number: string;
  description?: string,
  name: string;
  amount: number;
  stock: number;
  location: string;
  price: number;
  specifiers?: ISpecifier[];
};
