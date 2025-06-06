export interface IProduct{
   id: number | string;
   name:string;
   price:number;
   description:string;
   image:string;
}

export interface ICartItem extends IProduct {
  cartQty: number;
}