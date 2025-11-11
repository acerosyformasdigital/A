
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Product } from './types';
import { generateProducts } from './services/geminiService';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import Spinner from './components/Spinner';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedProducts = await generateProducts();
      setProducts(generatedProducts);
    } catch (err) {
      setError('Failed to generate products. Please check your API key and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map(p => p.category));
    return ['All', ...Array.from(uniqueCategories)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter(product =>
        selectedCategory === 'All' || product.category === selectedCategory
      )
      .filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [products, selectedCategory, searchTerm]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };
  
  const handleTryAgain = () => {
    fetchProducts();
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <header className="bg-white shadow-md sticky top-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              <span className="text-indigo-600">Gemini</span> Catalog
            </h1>
            <div className="w-full sm:w-auto sm:max-w-xs">
              <SearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="lg:flex lg:gap-8">
          <aside className="lg:w-1/4 xl:w-1/5 mb-6 lg:mb-0">
             <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
          </aside>
          
          <div className="lg:w-3/4 xl:w-4/5">
            {isLoading && (
              <div className="flex justify-center items-center h-96">
                <Spinner />
              </div>
            )}
            {error && (
              <div className="flex flex-col items-center justify-center h-96 bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-700 font-semibold text-lg">{error}</p>
                 <button 
                    onClick={handleTryAgain}
                    className="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    Try Again
                  </button>
              </div>
            )}
            {!isLoading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} onClick={handleProductClick} />
                  ))
                ) : (
                  <div className="col-span-full flex items-center justify-center h-64 bg-white rounded-lg shadow-sm">
                     <p className="text-gray-500 text-xl">No products found.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;
