export interface IProduct{
   id: number | string;
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