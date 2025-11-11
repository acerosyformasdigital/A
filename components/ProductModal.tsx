
import React from 'react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
        onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row animate-fade-in-up"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <div className="md:w-1/2">
            <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-64 md:h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
            />
        </div>
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
            <div className="flex-grow">
                <div className="flex justify-between items-start">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
                     <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">{product.category}</span>
                <p className="text-gray-600 mt-4 text-base leading-relaxed">
                {product.description}
                </p>
            </div>
            <div className="mt-6 flex justify-between items-center">
                <p className="text-4xl font-extrabold text-gray-900">${product.price.toFixed(2)}</p>
                <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform hover:scale-105">
                    Add to Cart
                </button>
            </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-up {
            0% {
                opacity: 0;
                transform: translateY(20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ProductModal;
