
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div
      onClick={() => onClick(product)}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-colors duration-300"></div>
      </div>
      <div className="p-4">
        <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">{product.category}</span>
        <h3 className="text-lg font-semibold text-gray-800 mt-1 truncate" title={product.name}>
          {product.name}
        </h3>
        <p className="text-2xl font-bold text-gray-900 mt-2">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
