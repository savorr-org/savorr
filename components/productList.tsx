type Product = {
    name: string;
  };
  
type ProductListProps = {
products: Product[];
selectedProductIndex: number;
handleProductClick: (product: Product) => void;
};
  
const ProductList: React.FC<ProductListProps> = ({
    products,
    selectedProductIndex,
    handleProductClick,
    }) => {
    return (
    <div className="bg-white border-light-gray border-2 max-h-96 overflow-y-scroll z-20 absolute top-14 w-10/12">
    {products.map((product, index) => (
        <div
        key={`product.name-${index}`}
        id={`product-${index}`}
        className={`py-2 px-4 flex items-center justify-between gap-8 cursor-pointer ${
            selectedProductIndex === index ? "" : ""
        }`}
        onClick={() => handleProductClick(product)}
        >
        <p className="font-md">{product.name}</p>
        </div>
    ))}
    </div>
);
};
  
export default ProductList;