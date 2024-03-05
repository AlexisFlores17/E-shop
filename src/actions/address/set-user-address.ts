"use server";

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
    try {

        const newAddress = await createOrReplaceAddress(address, userId);
        return {
            ok: true,
            address: newAddress,
        };

    } catch (error) {
        console.log(error);
        return {
        ok: false,
        error: "No se pudo establecer la dirección del usuario.",
        };
    }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
    try {
        const storeAddress = await prisma.userAddress.findUnique({
            where: {
                userId: userId,
            },
            });

        const addressToSave = {
            address: address.address,
            address2: address.address2,
            firstName: address.firstName,
            lastName: address.lastName,
            phone: address.phone,
            postalCode: address.postalCode,
            userId: userId,
            countryId: address.country,
        };

        if (!storeAddress) {
            const newAddress = await prisma.userAddress.create({
                data: addressToSave,
            });
            return newAddress;
        }

        const updateAddress = await prisma.userAddress.update({
            where:{userId:userId,},
            data:addressToSave
        });

        return updateAddress;

    } catch (error) {
        console.log(error);
        throw new Error("No se pudo establecer la dirección del usuario.");
    }
};
