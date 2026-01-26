import { useState } from 'react';
import { X, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  additionalImages: string[];
  category: string;
  occasion: string;
}

interface ProductFormProps {
  product: Product | null;
  onSave: (product: any) => void;
  onCancel: () => void;
  categories: string[];
  occasions: string[];
}

export function ProductForm({ product, onSave, onCancel, categories, occasions }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || '',
    image: product?.image || '',
    additionalImages: product?.additionalImages || [],
    category: product?.category || '',
    occasion: product?.occasion || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (product) {
      onSave({ ...product, ...formData });
    } else {
      onSave(formData);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.additionalImages.length < 4) {
      setFormData({ ...formData, additionalImages: [...formData.additionalImages, ''] });
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = formData.additionalImages.filter((_, i) => i !== index);
    setFormData({ ...formData, additionalImages: newImages });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-900">
          {product ? 'Edit Product' : 'Add New Product'}
        </h3>
        <button
          onClick={onCancel}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div className="md:col-span-2">
            <label htmlFor="name" className="block text-gray-700 mb-2.5">
              Product Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm hover:border-emerald-300"
              placeholder="e.g. Pink Rose Bouquet"
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-gray-700 mb-2.5">
              Price
            </label>
            <input
              id="price"
              type="text"
              required
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm hover:border-emerald-300"
              placeholder="e.g. Rp 450.000"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-gray-700 mb-2.5">
              Category
            </label>
            <select
              id="category"
              required
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm hover:border-emerald-300"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Occasion */}
          <div>
            <label htmlFor="occasion" className="block text-gray-700 mb-2.5">
              Occasion
            </label>
            <select
              id="occasion"
              required
              value={formData.occasion}
              onChange={(e) => handleChange('occasion', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm hover:border-emerald-300"
            >
              <option value="">Select an occasion</option>
              {occasions.map((occasion) => (
                <option key={occasion} value={occasion}>
                  {occasion}
                </option>
              ))}
            </select>
          </div>

          {/* Image URL */}
          <div className="md:col-span-2">
            <label htmlFor="image" className="block text-gray-700 mb-2.5">
              Image URL
            </label>
            <input
              id="image"
              type="url"
              required
              value={formData.image}
              onChange={(e) => handleChange('image', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm hover:border-emerald-300"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Image Preview */}
          {formData.image && (
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2.5">
                Image Preview
              </label>
              <div className="aspect-video w-full max-w-md rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200">
                <ImageWithFallback
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Additional Images */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-2.5">
              <label className="block text-gray-700">
                Additional Images (Optional)
              </label>
              <span className="text-gray-500 text-sm">
                {formData.additionalImages.length} / 4
              </span>
            </div>
            <div className="space-y-3">
              {formData.additionalImages.map((img, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-1">
                    <input
                      type="url"
                      value={img}
                      onChange={(e) => {
                        const newImages = formData.additionalImages.map((i, idx) =>
                          idx === index ? e.target.value : i
                        );
                        setFormData({ ...formData, additionalImages: newImages });
                      }}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm hover:border-emerald-300"
                      placeholder={`Image ${index + 1} URL`}
                    />
                    {img && (
                      <div className="mt-2 aspect-video w-full max-w-xs rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200">
                        <ImageWithFallback
                          src={img}
                          alt={`Additional ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-600 transition-colors flex-shrink-0 mt-0.5"
                    title="Remove image"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              {formData.additionalImages.length < 4 && (
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="w-full px-4 py-3 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Additional Image ({4 - formData.additionalImages.length} remaining)</span>
                </button>
              )}
              {formData.additionalImages.length === 0 && (
                <p className="text-gray-500 text-sm">
                  Add up to 4 additional images to showcase your product from different angles.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
          >
            {product ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
}