'use client'
import AutocompleteSearchBar from "@/components/autocompleteSearchBar"
import { Table } from '@mantine/core';
import { useState, useEffect, useRef } from "react";
import { Divider } from '@mantine/core';

interface ShoppingItem {
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
}

export default function Page() {
    const shoppingListElements = [
        { name: 'Honeycrisp Apple', price: 1.99 },
        { name: 'Peanut Butter', price: 1.99 },
        { name: 'Potato Kettle Chips', price: 1.99 }
    ];

    const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(
        shoppingListElements.map((element) => ({
        name: element.name,
        price: element.price,
        quantity: 1,
        subtotal: element.price,
        }))
    );

    const [modalStates, setModalStates] = useState<boolean[]>(new Array(shoppingList.length).fill(false));

    const handleToggleModal = (index: number) => {
        const newModalStates = [...modalStates];
        newModalStates[index] = !newModalStates[index];
        setModalStates(newModalStates);
    };

    const handleDeleteItem = (index: number) => {
        const updatedShoppingList = [...shoppingList];
        updatedShoppingList.splice(index, 1);
        setShoppingList(updatedShoppingList);
    };

    const rows = shoppingList.map((item, index) => (
        <Table.Tr key={item.name}>
            <Table.Td>{item.name}</Table.Td>
            <Table.Td>${item.price.toFixed(2)}</Table.Td>
            <Table.Td>
                <input
                    type="number"
                    className="w-10 flex text-center"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(e, index)}
                />
            </Table.Td>
            <Table.Td>
                <div className="flex items-center space-x-4 relative">
                <span>${item.subtotal.toFixed(2)}</span>

                <button onClick={() => handleToggleModal(index)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 3C9 3.27614 9.22386 3.5 9.5 3.5C9.77614 3.5 10 3.27614 10 3C10 2.72386 9.77614 2.5 9.5 2.5C9.22386 2.5 9 2.72386 9 3Z" fill="black" stroke="black" stroke-width="0.75" stroke-miterlimit="10"/>
                    <path d="M9 10C9 10.2761 9.22386 10.5 9.5 10.5C9.77614 10.5 10 10.2761 10 10C10 9.72386 9.77614 9.5 9.5 9.5C9.22386 9.5 9 9.72386 9 10Z" fill="black" stroke="black" stroke-width="0.75" stroke-miterlimit="10"/>
                    <path d="M9 17C9 17.2761 9.22386 17.5 9.5 17.5C9.77614 17.5 10 17.2761 10 17C10 16.7239 9.77614 16.5 9.5 16.5C9.22386 16.5 9 16.7239 9 17Z" fill="black" stroke="black" stroke-width="0.75" stroke-miterlimit="10"/>
                </svg>
                </button>

                {modalStates[index] && (
                    <div className="absolute z-20 bg-white px-6 py-3 border-light-gray border-2 rounded-md flex flex-col right-0 md:right-20 top-7">
                        <button className="flex justify-center" onClick={() => handleDeleteItem(index)}>
                            <span className="flex flex-row space-x-3">
                            <span className="font-manrope">Delete Item</span>
                            <svg width="20" height="20" viewBox="0 0 37 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30.793 8.14919L29.1514 32.7723C29.0077 34.929 28.9358 36.0073 28.47 36.8249C28.0599 37.5448 27.4413 38.1235 26.6958 38.4848C25.849 38.8952 24.7683 38.8952 22.6068 38.8952H14.3824C12.2209 38.8952 11.1402 38.8952 10.2934 38.4848C9.54786 38.1235 8.9293 37.5448 8.51921 36.8249C8.05341 36.0073 7.98152 34.929 7.83774 32.7723L6.1962 8.14919M2.09674 8.14919H34.8924M26.6935 8.14919L26.1388 6.48496C25.6012 4.87219 25.3324 4.0658 24.8338 3.46962C24.3936 2.94315 23.8282 2.53564 23.1895 2.28445C22.4662 2 21.6162 2 19.9162 2H17.073C15.3729 2 14.5229 2 13.7997 2.28445C13.161 2.53564 12.5956 2.94315 12.1554 3.46962C11.6568 4.0658 11.388 4.87219 10.8504 6.48496L10.2957 8.14919M22.594 16.3481V30.6962M14.3951 16.3481V30.6962" stroke="#69C34A" stroke-width="2.45968" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            </span>
                        </button>
                    </div>
                )}

                </div>
            </Table.Td>
        </Table.Tr>
    ));

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newQuantity = parseInt(e.target.value);
        if (isNaN(newQuantity) || newQuantity < 1) return;

        const updatedShoppingList = [...shoppingList];
        updatedShoppingList[index].quantity = newQuantity;
        updatedShoppingList[index].subtotal = newQuantity * updatedShoppingList[index].price;

        setShoppingList(updatedShoppingList);
    };

    useEffect(() => {
        let total = shoppingList.reduce((acc, item) => acc + item.subtotal, 0);
        let tax = total * 0.0725
        total += totalTax
        setTotalAmount(total);
        setTotalTax(tax);
    }, [shoppingList]);

    const [totalTax, setTotalTax] = useState<number>(0);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    return (
        <div className="container mx-auto px-4 md:px-12 md:pt-2">
            <AutocompleteSearchBar />

            <div className="text-3xl text-green font-manrope font-bold pt-10 pb-10">
                Shopping List
            </div>

            <Table>
                <Table.Thead className="bg-light-green">
                    <Table.Tr>
                        <Table.Th>Item(s)</Table.Th>
                        <Table.Th>Price</Table.Th>
                        <Table.Th>Quantity</Table.Th>
                        <Table.Th>Subtotal</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>

            <Divider my="sm" />

            <div className="flex justify-end">
                <div className="flex flex-col text-right">
                    <div className="space-x-20">
                        <span>Tax (7.25%)</span>
                        <span>${totalTax.toFixed(2)}</span>
                    </div>

                    <div className="space-x-20">
                        <span>Total Amount</span>
                        <span>${totalAmount.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}