import type { CartProduct } from "@/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  addProductToCart: (product: CartProduct) => void;
  // updateProductQuantity
  // removeProduct
}

export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            cart: [],

            // Method

            addProductToCart: (product: CartProduct) => {
                const { cart } = get();
                console.log(cart);
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
        }),

        {
        name: "shopping-cart",
        }
    )
);
