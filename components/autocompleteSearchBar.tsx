'use client';
import { useState, useEffect, useRef } from "react";
import ProductList from "./productList";
import SearchInput from "./searchInput";

interface ShoppingItem {
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

interface AutocompleteSearchBarProps {
  name: string, 
  price: string
}

type Product = {
  name: string;
};

const AutocompleteSearchBar: React.FC<AutocompleteSearchBarProps> = ({onAddToShoppingList}) => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(-1);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({query})
    };

    fetch('/api/search', options)
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data.data);
      })

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
    if (event.key === "ArrowUp") {
      setSelectedProductIndex((prevIndex) =>
        prevIndex === -1 ? searchResults.length - 1 : prevIndex - 1
      );
    } else if (event.key === "ArrowDown") {
      setSelectedProductIndex((prevIndex) =>
        prevIndex === searchResults.length - 1 ? -1 : prevIndex + 1
      );
    } else if (event.key === "Enter") {
      if (selectedProductIndex !== -1) {
        const selectedProduct = searchResults[selectedProductIndex];
        alert(`You selected ${selectedProduct.name}`);
        setQuery("");
        setSelectedProductIndex(-1);
        setSearchResults([]);
      }
    }
  };

  const handleProductClick = () => {
    //alert(`You selected ${product.name}`);
    alert(`You selected ${query}`)
    if (query) {
      onAddToShoppingList({
        name: query, 
        price: "1.99" // TODO: add price of item here
      });
    }

    setQuery("");
    setSelectedProductIndex(-1);
  };

  const scrollActiveProductIntoView = (index: number) => {
    const activeProduct = document.getElementById(`product-${index}`);
    if (activeProduct) {
      activeProduct.scrollIntoView({
        block: "nearest",
        inline: "start",
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (selectedProductIndex !== -1) {
      scrollActiveProductIntoView(selectedProductIndex);
    }
  }, [selectedProductIndex]);

  return (
    <div className="flex flex-col mt-10 mx-auto relative items-center">
      <div className="flex flex-row space-x-2 w-full">
        <SearchInput
          value={query}
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
          inputRef={inputRef}
          placeholder="Enter product..."
        />
  
        <button
          className="bg-green w-36 text-white mx-10 py-3 rounded-md text-lg"
          onClick={() => handleProductClick()}
        >
          + Add
        </button>
      </div>
      {query !== "" && searchResults.length > 0 && (
        <ProductList
          products={searchResults}
          selectedProductIndex={selectedProductIndex}
          handleProductClick={handleProductClick}
        />
      )}
    </div>
  );
};

export default AutocompleteSearchBar;