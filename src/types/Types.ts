export interface IProduct{
   id: number | string;
   name:string;
   price:number;
   description:string;
   image:string;
}

export interface ICart{
   cartTotalAmount:number;
   cartTotalQty:number;
}

export interface ICartItem{
   id: number | string;
   name:string;
   price:number;
   image:string;
   cartQty:number;
}