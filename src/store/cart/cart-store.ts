import type { CartProduct } from "@/interfaces/product.interface";
import { create } from "zustand";


interface State {
    cart: CartProduct[]

    // addProductToCart
    // updateProductQuantity
    // removeProduct
}



export const useCartStore = create<State>()( 
    (set) =>({
    
        cart:[]
    })
)