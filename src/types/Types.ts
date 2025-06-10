export interface IProduct{
   id: string;
   name:string;
   price:number;
   description:string;
   image:string;
   filter:string
}

export interface ICartItem extends IProduct {
  cartQty: number;
}
export interface IFilter {
  category:string,
  id:string | number;
}

export interface IProductFormValues {
  name: string;
  description: string;
  price: number;
  image:string;
  filter: string;
}

export interface IAddProduct{
   name: string;
  description: string;
  price: number;
  image: string;
  filter: string;
  id: number | string;
}