'use client'
import AutocompleteSearchBar from "@/components/autocompleteSearchBar"
import { Table } from '@mantine/core';

export default function Page() {

    const shoppingListElements = [
        {name: 'Honeycrisp Apple', price: 1.99},
        {name: 'Peanut Butter', price: 1.99},
        {name: 'Potato Kettle Chips', price: 1.99}
    ]

    const rows = shoppingListElements.map((element) => (
        <Table.Tr key={element.name}>
          <Table.Td>{element.name}</Table.Td>
          <Table.Td>{element.price}</Table.Td>
          <Table.Td><input placeholder="1"></input></Table.Td>
        </Table.Tr>
    ));

    return (
    <div className="container mx-auto px-4 md:px-12 md:pt-6">
        <AutocompleteSearchBar />

        <div className="text-3xl text-green font-manrope font-bold pt-10">
            Shopping List
        </div>

        <Table>     
            <Table.Thead>
            <Table.Tr>
            <Table.Th>Item(s)</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Quantity</Table.Th>
            <Table.Th>Subtotal</Table.Th>
            </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>


    </div>
  )
}
