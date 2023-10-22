'use client';
import { useState, useEffect, useRef } from 'react';
import ProductList from './productList';
import SearchInput from './searchInput';

interface ShoppingItem {
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

interface AutocompleteSearchBarProps {
  name: string;
  averagePrice: number;
  cheapestPrice: number;
  cheapestName: string;
}

type Product = {
  name: string;
  averagePrice: number;
  cheapestPrice: number;
  cheapestName: string;
};

type Props = {
  onAddToShoppingList: (product: Product) => void
};

export default function AutocompleteSearchBar({ onAddToShoppingList }: Props) {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(-1);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    };

    fetch('/api/search', options)
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data.data);
      });

    if (!query) {
      setSearchResults([]);
    }
  }, [query]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setSelectedProductIndex(-1);
    setSearchResults(
      products.filter((product) =>
        product.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      setSelectedProductIndex((prevIndex) =>
        prevIndex === -1 ? searchResults.length - 1 : prevIndex - 1
      );
    } else if (event.key === 'ArrowDown') {
      setSelectedProductIndex((prevIndex) =>
        prevIndex === searchResults.length - 1 ? -1 : prevIndex + 1
      );
    } else if (event.key === 'Enter') {
      if (selectedProductIndex !== -1) {
        const selectedProduct = searchResults[selectedProductIndex];
        alert(`You selected ${selectedProduct.name}`);
        setQuery('');
        setSelectedProductIndex(-1);
        setSearchResults([]);
      }
    }
  };

  const handleProductClick = async () => {
    //alert(`You selected ${product.name}`);
    alert(`You selected ${query}`);
    if (query) {
      let name = query;
      let average = 1;
      const options = {
        method: 'POST',
        body: JSON.stringify({
          term: name,
          locationId: localStorage.getItem('location'),
          limit: 50,
        }),
      };

      const response = await fetch('/api/kroger/price', options);
      const data = await response.json();
      average = data.data.average;
      const cheapest = data.data.lowest.price;
      const cheapestItem = data.data.lowest.item;
      onAddToShoppingList({
        name: name,
        averagePrice: average ? parseFloat(average.toFixed(2)) : 3.45,
        cheapestPrice: cheapest != Number.MAX_SAFE_INTEGER ?  parseFloat(cheapest.toFixed(2)) : 1.36,
        cheapestName: cheapestItem
      });
    }

    setQuery('');
    setSelectedProductIndex(-1);
  };

  const scrollActiveProductIntoView = (index: number) => {
    const activeProduct = document.getElementById(`product-${index}`);
    if (activeProduct) {
      activeProduct.scrollIntoView({
        block: 'nearest',
        inline: 'start',
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (selectedProductIndex !== -1) {
      scrollActiveProductIntoView(selectedProductIndex);
    }
  }, [selectedProductIndex]);

  return (
    <div className='flex flex-col mt-10 mx-auto relative items-center'>
      <div className='flex flex-row space-x-2 w-full'>
        <SearchInput
          value={query}
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
          inputRef={inputRef}
          placeholder='Enter product...'
        />

        <button
          className='bg-green w-36 text-white mx-10 py-3 rounded-md text-lg'
          onClick={() => handleProductClick()}
        >
          + Add
        </button>

        <button className='md:hidden bg-light-gray w-36 mx-10 py-3 rounded-md text-lg flex justify-center items-center'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z'
              stroke='black'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M3 16.8V9.2C3 8.0799 3 7.51984 3.21799 7.09202C3.40973 6.71569 3.71569 6.40973 4.09202 6.21799C4.51984 6 5.0799 6 6.2 6H7.25464C7.37758 6 7.43905 6 7.49576 5.9935C7.79166 5.95961 8.05705 5.79559 8.21969 5.54609C8.25086 5.49827 8.27836 5.44328 8.33333 5.33333C8.44329 5.11342 8.49827 5.00346 8.56062 4.90782C8.8859 4.40882 9.41668 4.08078 10.0085 4.01299C10.1219 4 10.2448 4 10.4907 4H13.5093C13.7552 4 13.8781 4 13.9915 4.01299C14.5833 4.08078 15.1141 4.40882 15.4394 4.90782C15.5017 5.00345 15.5567 5.11345 15.6667 5.33333C15.7216 5.44329 15.7491 5.49827 15.7803 5.54609C15.943 5.79559 16.2083 5.95961 16.5042 5.9935C16.561 6 16.6224 6 16.7454 6H17.8C18.9201 6 19.4802 6 19.908 6.21799C20.2843 6.40973 20.5903 6.71569 20.782 7.09202C21 7.51984 21 8.0799 21 9.2V16.8C21 17.9201 21 18.4802 20.782 18.908C20.5903 19.2843 20.2843 19.5903 19.908 19.782C19.4802 20 18.9201 20 17.8 20H6.2C5.0799 20 4.51984 20 4.09202 19.782C3.71569 19.5903 3.40973 19.2843 3.21799 18.908C3 18.4802 3 17.9201 3 16.8Z'
              stroke='black'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>
      {query !== '' && searchResults.length > 0 && (
        <ProductList
          products={searchResults}
          selectedProductIndex={selectedProductIndex}
          handleProductClick={handleProductClick}
        />
      )}
    </div>
  );
}
