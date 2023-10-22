'use client'
import AutocompleteSearchBar from "@/components/autocompleteSearchBar"
import { Table } from '@mantine/core';
import { useState, useEffect } from "react";
import LocationHeader from "@/components/locationHeader";
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

    // Step 1: Create a state variable to store the shopping list
    const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(
        shoppingListElements.map((element) => ({
            name: element.name,
            price: element.price,
            quantity: 1,
            subtotal: element.price,
        }))
    );

    // Step 2: Render the shopping list with input fields
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
            <Table.Td>${item.subtotal.toFixed(2)}</Table.Td>
        </Table.Tr>
    ));

    // Step 3: Handle quantity changes and calculate subtotals
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newQuantity = parseInt(e.target.value);
        if (isNaN(newQuantity) || newQuantity < 1) return;

        const updatedShoppingList = [...shoppingList];
        updatedShoppingList[index].quantity = newQuantity;
        updatedShoppingList[index].subtotal = newQuantity * updatedShoppingList[index].price;

        setShoppingList(updatedShoppingList);
    };

    useEffect(() => {
        // Step 4: Calculate the total amount based on the updated quantities
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