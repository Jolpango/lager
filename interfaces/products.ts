export interface ISpecifier {
  [key: string]: any;
};

export interface IProduct {
  id: number;
  article_number: string;
  name: string;
  stock: number;
  location: string;
  price: number;
  specifiers: ISpecifier[];
};