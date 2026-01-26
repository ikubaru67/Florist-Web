import { useState, useEffect } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { ImageEditor } from './ImageEditor';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  additionalImages: string[];
  category: string;
  occasion: string;
  stock: number;
  isAvailable: boolean;
  availableAreas: string[];
}

interface ProductFormPageProps {
  product: Product | null;
  onSave: (product: any) => void;
  onBack: () => void;
  categories: string[];
  occasions: string[];
  deliveryAreas: string[];
}

export function ProductFormPage({ product, onSave, onBack, categories, occasions, deliveryAreas }: ProductFormPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    additionalImages: [] as string[],
    category: '',
    occasion: '',
    stock: 0,
    isAvailable: true,
    availableAreas: [] as string[]
  });

  const [editingImage, setEditingImage] = useState<{ type: 'main' | 'additional'; index?: number } | null>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        image: product.image,
        additionalImages: product.additionalImages || [],
        category: product.category,
        occasion: product.occasion,
        stock: product.stock || 0,
        isAvailable: product.isAvailable !== undefined ? product.isAvailable : true,
        availableAreas: product.availableAreas || []
      });
    }
  }, [product]);

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

  const handleAddImage = () => {
    if (formData.additionalImages.length < 4) {
      setFormData({ ...formData, additionalImages: [...formData.additionalImages, ''] });
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = formData.additionalImages.filter((_, i) => i !== index);
    setFormData({ ...formData, additionalImages: newImages });
  };

  const handleEditImage = (type: 'main' | 'additional', index?: number) => {
    setEditingImage({ type, index });
  };

  const handleSaveImage = (url: string) => {
    if (editingImage) {
      if (editingImage.type === 'main') {
        setFormData({ ...formData, image: url });
      } else if (editingImage.type === 'additional' && editingImage.index !== undefined) {
        const newImages = formData.additionalImages.map((i, idx) =>
          idx === editingImage.index ? url : i
        );
        setFormData({ ...formData, additionalImages: newImages });
      }
      setEditingImage(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="min-w-0">
              <h1 className="text-gray-900">
                {product ? 'Edit Product' : 'Add New Product'}
              </h1>
              <p className="text-gray-600 text-sm mt-0.5">
                {product ? 'Update product information' : 'Fill in the details to create a new product'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
              <div className="mb-6">
                <h2 className="text-gray-900">Basic Information</h2>
                <p className="text-gray-500 text-sm mt-1">Enter the main details about your product</p>
              </div>
              
              <div className="space-y-6">
                {/* Product Name */}
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2.5">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    placeholder="e.g. Pink Rose Bouquet"
                  />
                </div>

                {/* Price, Category, Occasion */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="price" className="block text-gray-700 mb-2.5">
                      Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="price"
                      type="text"
                      required
                      value={formData.price}
                      onChange={(e) => handleChange('price', e.target.value)}
                      className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                      placeholder="Rp 450.000"
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-gray-700 mb-2.5">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      required
                      value={formData.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                      className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-gray-900"
                    >
                      <option value="" className="text-gray-400">Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="occasion" className="block text-gray-700 mb-2.5">
                      Occasion <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="occasion"
                      required
                      value={formData.occasion}
                      onChange={(e) => handleChange('occasion', e.target.value)}
                      className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-gray-900"
                    >
                      <option value="" className="text-gray-400">Select occasion</option>
                      {occasions.map((occasion) => (
                        <option key={occasion} value={occasion}>
                          {occasion}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Stock and Availability */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="stock" className="block text-gray-700 mb-2.5">
                      Stock Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="stock"
                      type="number"
                      required
                      min="0"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                      placeholder="0"
                    />
                    <p className="text-gray-500 text-sm mt-2">Number of items available in stock</p>
                  </div>

                  <div>
                    <label htmlFor="availability" className="block text-gray-700 mb-2.5">
                      Visibility Status
                    </label>
                    <div className="flex items-center gap-3 h-[54px]">
                      <label className="flex items-center gap-3 cursor-pointer flex-1 px-4 py-3 bg-white border-2 border-gray-300 rounded-xl hover:border-emerald-300 transition-all">
                        <input
                          type="checkbox"
                          checked={formData.isAvailable}
                          onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                          className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 focus:ring-2"
                        />
                        <span className="text-gray-900">
                          {formData.isAvailable ? 'Visible to customers' : 'Hidden from customers'}
                        </span>
                      </label>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">Control product visibility in the store</p>
                  </div>
                </div>

                {/* Delivery Areas */}
                <div>
                  <label className="block text-gray-700 mb-2.5">
                    Delivery Areas <span className="text-red-500">*</span>
                  </label>
                  <p className="text-gray-500 text-sm mb-3">Select which areas this product can be delivered to</p>
                  {deliveryAreas.length === 0 ? (
                    <div className="px-4 py-6 bg-amber-50 border border-amber-200 rounded-xl text-center">
                      <p className="text-amber-700 text-sm">No delivery areas configured. Please add delivery areas in Settings first.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {deliveryAreas.map((area) => {
                        const isChecked = formData.availableAreas.includes(area);
                        return (
                          <label
                            key={area}
                            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                              isChecked
                                ? 'bg-emerald-50 border-emerald-300 hover:border-emerald-400'
                                : 'bg-white border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFormData({
                                    ...formData,
                                    availableAreas: [...formData.availableAreas, area]
                                  });
                                } else {
                                  setFormData({
                                    ...formData,
                                    availableAreas: formData.availableAreas.filter(a => a !== area)
                                  });
                                }
                              }}
                              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 focus:ring-2 flex-shrink-0"
                            />
                            <span className={`text-sm ${isChecked ? 'text-emerald-900' : 'text-gray-700'}`}>
                              {area}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                  {formData.availableAreas.length > 0 && (
                    <p className="text-emerald-600 text-sm mt-2">
                      ✓ Available in {formData.availableAreas.length} area{formData.availableAreas.length !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Main Image */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
              <div className="mb-6">
                <h2 className="text-gray-900">Main Image</h2>
                <p className="text-gray-500 text-sm mt-1">This will be the primary image displayed for your product</p>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label htmlFor="image" className="block text-gray-700 mb-2.5">
                    Image URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="image"
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) => handleChange('image', e.target.value)}
                    className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                {formData.image && (
                  <div className="rounded-xl overflow-hidden bg-gray-50 border-2 border-gray-200 shadow-sm">
                    <div className="aspect-[4/3] w-full max-w-2xl mx-auto">
                      <ImageWithFallback
                        src={formData.image}
                        alt="Main preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                
                <button
                  type="button"
                  onClick={() => handleEditImage('main')}
                  className="w-full px-6 py-4 bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-700 rounded-xl hover:from-emerald-100 hover:to-teal-100 transition-all flex items-center justify-center gap-3 border-2 border-emerald-200 hover:border-emerald-300 group"
                >
                  <Edit2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Edit Image</span>
                </button>
              </div>
            </div>

            {/* Additional Images */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
              <div className="mb-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-gray-900">Additional Images</h2>
                    <p className="text-gray-500 text-sm mt-1">Add up to 4 extra images (optional)</p>
                  </div>
                  {formData.additionalImages.length > 0 && (
                    <span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm border border-emerald-200 inline-flex items-center gap-2 flex-shrink-0">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      {formData.additionalImages.length} / 4
                    </span>
                  )}
                </div>
              </div>
              
              <div className="space-y-5">
                {formData.additionalImages.length === 0 ? (
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="w-full px-6 py-8 bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-700 rounded-xl hover:from-emerald-100 hover:to-teal-100 transition-all flex flex-col items-center justify-center gap-3 border-2 border-dashed border-emerald-300 hover:border-emerald-400 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                      <Plus className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Add Your First Image</p>
                      <p className="text-sm text-emerald-600 mt-1">Click to add an additional product image</p>
                    </div>
                  </button>
                ) : (
                  <>
                    {formData.additionalImages.map((img, index) => (
                      <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 overflow-hidden">
                        <div className="p-5 space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="flex-1">
                              <label className="block text-gray-700 mb-2.5">
                                Image {index + 1} URL
                              </label>
                              <input
                                type="url"
                                value={img}
                                onChange={(e) => {
                                  const newImages = formData.additionalImages.map((i, idx) =>
                                    idx === index ? e.target.value : i
                                  );
                                  setFormData({ ...formData, additionalImages: newImages });
                                }}
                                className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                                placeholder={`https://example.com/image-${index + 1}.jpg`}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="mt-9 w-11 h-11 flex items-center justify-center rounded-xl hover:bg-red-50 text-red-600 hover:text-red-700 transition-all border border-transparent hover:border-red-200 flex-shrink-0"
                              title="Remove image"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                          
                          {img && (
                            <div className="rounded-lg overflow-hidden bg-gray-50 border border-gray-200 shadow-sm">
                              <div className="aspect-[4/3] w-full max-w-md">
                                <ImageWithFallback
                                  src={img}
                                  alt={`Additional ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          )}
                          
                          <button
                            type="button"
                            onClick={() => handleEditImage('additional', index)}
                            className="w-full px-6 py-4 bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-700 rounded-xl hover:from-emerald-100 hover:to-teal-100 transition-all flex items-center justify-center gap-3 border-2 border-emerald-200 hover:border-emerald-300 group"
                          >
                            <Edit2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span>Edit Image</span>
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {formData.additionalImages.length < 4 && (
                      <button
                        type="button"
                        onClick={handleAddImage}
                        className="w-full px-6 py-4 bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-700 rounded-xl hover:from-emerald-100 hover:to-teal-100 transition-all flex items-center justify-center gap-3 border-2 border-emerald-200 hover:border-emerald-300 group"
                      >
                        <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>Add Another Image</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Action Buttons - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 px-6 py-4 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all border-2 border-gray-300 hover:border-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-xl hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 hover:from-emerald-600 hover:to-teal-700"
            >
              <Save className="w-5 h-5" />
              <span>{product ? 'Update Product' : 'Add Product'}</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Image Editor */}
      {editingImage && (
        <ImageEditor
          imageUrl={editingImage.type === 'main' ? formData.image : formData.additionalImages[editingImage.index!] || ''}
          onSave={handleSaveImage}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
}