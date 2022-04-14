export interface IDelivery {
  id: number,
  product_id: number,
  product_name: string,
  amount: number,
  delivery_date: string,
  comment?: string
}