"use client";

import { QuantitySelector, SizeSelector } from '@/components'
import { Product } from '@/interfaces'
import React, { useState } from 'react'
import { Size } from '../../../../../interfaces/product.interface';

interface Props {
    product:Product
}

export const AddToCart = ({product}:Props) => {

    const [size, setSize] = useState<Size| undefined >()
    const [quantity, setQuantity] = useState<number>(1)

    const addToCart = ()=>{
        if (!size) return;
        console.log(size,quantity)
    }

    return (
        <>
        {/*Selector de tallas*/}
        <SizeSelector
            selectedSize={size}
            availableSizes={product.sizes}
            onSizeChanged={setSize}
        />
        {/*Selector de Cantidad*/}
        <QuantitySelector  quantity={quantity} onQuantityChanged={setQuantity}  />
        {/*Button*/}

        <button onClick={addToCart} className="btn-primary my-5">Agregar al carrito</button>
        
        </>
    )
}
