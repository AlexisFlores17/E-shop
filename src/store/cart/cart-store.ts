import type { CartProduct } from "@/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[];

    addProductToCart: (product: CartProduct) => void;
    getTotalItems: () => number;
    updateProductQuantity: (product: CartProduct , quantity:number) => void;
    removeProduct: (product : CartProduct)=> void
}

export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            cart: [],

            // Method
            getTotalItems: ()=> {
                const {cart} = get();

                return cart.reduce( (total,item)=>{
                    return total + item.quantity;
                },0)
            },

            addProductToCart: (product: CartProduct) => {
                const { cart } = get();
                // 1. Revisar si el producto existe en el carrito con la talla seleccionada

                const productInCart = cart.some(
                (item) => item.id === product.id && item.size === product.size
                );

                if (!productInCart) {
                set({ cart: [...cart, product] });
                return;
                }

                // 2. Se que el producto existe por talla, incrementar

                const updatedCartProducts = cart.map((item) => {
                if (item.id === product.id && item.size === product.size) {
                    return { ...item, quantity: item.quantity + product.quantity };
                }

                return item;
                });

                set({ cart: updatedCartProducts });
            },

            
            updateProductQuantity: (product: CartProduct , quantity:number)=>{

                const {cart} = get();

                const updateCartProducts = cart.map((item)=>{
                    if( item.id === product.id && item.size === product.size){
                        return { ...item, quantity:quantity }
                    }

                    return item;
                })

                set({cart: updateCartProducts});
            },

            removeProduct: (product:CartProduct) =>{
                const {cart} = get();

                const updateCartProducts = cart.filter( 
                    item => item.id !== product.id || item.size !== product.size
                )

                set({cart:updateCartProducts})
            }
        }),

        {
            name: "shopping-cart"
        }
    )
);
