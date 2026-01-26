import { Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

interface ProductSelectorProps {
  selectedProducts: number[];
  onProductToggle: (productId: number) => void;
  products: Product[];
}

export function ProductSelector({ selectedProducts, onProductToggle, products }: ProductSelectorProps) {
  return (
    <div className="space-y-2">
      {products.map((product) => {
        const isSelected = selectedProducts.includes(product.id);
        
        return (
          <button
            key={product.id}
            onClick={() => onProductToggle(product.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
              isSelected
                ? 'bg-emerald-50 border-emerald-500'
                : 'bg-white border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
            }`}
          >
            <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="text-gray-900 truncate">{product.name}</div>
              <div className="text-gray-500 text-sm">{product.price}</div>
            </div>

            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
              isSelected
                ? 'bg-emerald-500 border-emerald-500'
                : 'border-gray-300'
            }`}>
              {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
            </div>
          </button>
        );
      })}
    </div>
  );
}