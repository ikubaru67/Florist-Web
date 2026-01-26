import { Settings, Save, Image as ImageIcon, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ImageEditor } from './ImageEditor';
import { TagManager } from './TagManager';
import { AddOnManager, AddOn } from './AddOnManager';

interface SettingsData {
  bannerBackgroundImage: string;
  defaultFilter: 'name' | 'latest' | 'best';
  highlightedSectionTitle: string;
  categories: string[];
  occasions: string[];
  deliveryAreas: string[];
  addOns: AddOn[];
}

interface SettingsPanelProps {
  settings: SettingsData;
  setSettings: (settings: SettingsData) => void;
}

export function SettingsPanel({ settings, setSettings }: SettingsPanelProps) {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (field: keyof SettingsData, value: string) => {
    setLocalSettings({ ...localSettings, [field]: value });
  };

  const handleSave = () => {
    setSettings(localSettings);
    alert('Settings saved successfully!');
  };

  const handleOpenEditor = () => {
    if (settings.bannerBackgroundImage) {
      setIsEditorOpen(true);
    }
  };

  const handleSaveEditedImage = (croppedImageUrl: string) => {
    setLocalSettings({ ...localSettings, bannerBackgroundImage: croppedImageUrl });
    setIsEditorOpen(false);
  };

  const handleCancelEditor = () => {
    setIsEditorOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Banner Settings */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <ImageIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-gray-900">Banner Settings</h2>
            <p className="text-gray-500 text-sm">Configure homepage banner appearance</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="bannerBg" className="block text-gray-700 mb-2.5">
              Banner Background Image URL
            </label>
            <input
              id="bannerBg"
              type="url"
              value={localSettings.bannerBackgroundImage}
              onChange={(e) => handleChange('bannerBackgroundImage', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm hover:border-emerald-300"
              placeholder="https://example.com/banner-image.jpg"
            />
            <p className="text-gray-500 text-sm mt-2">This image will be used as the background for your homepage banner</p>
          </div>

          {localSettings.bannerBackgroundImage && (
            <div>
              <label className="block text-gray-700 mb-2.5">
                Banner Preview
              </label>
              <div className="aspect-video w-full max-w-2xl rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 relative">
                <ImageWithFallback
                  src={localSettings.bannerBackgroundImage}
                  alt="Banner Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/60 via-teal-900/50 to-green-900/60 flex items-center justify-center">
                  <div className="text-white text-center">
                    <p className="text-sm opacity-90">Banner Preview</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleOpenEditor}
                className="mt-2 w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
              >
                <Settings className="w-5 h-5" />
                <span>Edit Image</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Display Settings */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-gray-900">Product Display Settings</h2>
            <p className="text-gray-500 text-sm">Manage categories, occasions, and display options</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Default Filter */}
          <div>
            <label className="block text-gray-700 mb-2.5">
              Default Product Sort
            </label>
            <select
              value={localSettings.defaultFilter}
              onChange={(e) => setLocalSettings({ ...localSettings, defaultFilter: e.target.value as 'name' | 'latest' | 'best' })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm hover:border-emerald-300"
            >
              <option value="name">Sort by Name (A-Z)</option>
              <option value="latest">Sort by Latest</option>
              <option value="best">Sort by Best (Price)</option>
            </select>
          </div>

          {/* Highlighted Section Title */}
          <div>
            <label htmlFor="highlightedTitle" className="block text-gray-700 mb-2.5">
              Highlighted Section Title
            </label>
            <input
              id="highlightedTitle"
              type="text"
              value={localSettings.highlightedSectionTitle}
              onChange={(e) => setLocalSettings({ ...localSettings, highlightedSectionTitle: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm hover:border-emerald-300"
              placeholder="e.g. Handpicked For You"
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block text-gray-700 mb-2.5">
              Product Categories
            </label>
            <TagManager
              tags={localSettings.categories}
              onTagsChange={(categories) => setLocalSettings({ ...localSettings, categories })}
              placeholder="Add a category (e.g. Romance, Seasonal)"
            />
          </div>

          {/* Occasions */}
          <div>
            <label className="block text-gray-700 mb-2.5">
              Product Occasions
            </label>
            <TagManager
              tags={localSettings.occasions}
              onTagsChange={(occasions) => setLocalSettings({ ...localSettings, occasions })}
              placeholder="Add an occasion (e.g. Birthday, Wedding)"
            />
          </div>

          {/* Delivery Areas */}
          <div>
            <label className="block text-gray-700 mb-2.5">
              Delivery Areas
            </label>
            <TagManager
              tags={localSettings.deliveryAreas}
              onTagsChange={(deliveryAreas) => setLocalSettings({ ...localSettings, deliveryAreas })}
              placeholder="Add a delivery area (e.g. City Center, Suburb)"
            />
          </div>

          {/* Add-Ons */}
          <div>
            <label className="block text-gray-700 mb-2.5">
              Product Add-Ons
            </label>
            <p className="text-gray-500 text-sm mb-3">Manage available add-ons that customers can select with their orders</p>
            <AddOnManager
              addOns={localSettings.addOns}
              onAddOnsChange={(addOns) => setLocalSettings({ ...localSettings, addOns })}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-6">
        <button
          onClick={handleSave}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
        >
          <Save className="w-5 h-5" />
          <span>Save Settings</span>
        </button>
      </div>

      {/* Image Editor */}
      {isEditorOpen && (
        <ImageEditor
          imageUrl={localSettings.bannerBackgroundImage}
          onSave={handleSaveEditedImage}
          onCancel={handleCancelEditor}
        />
      )}
    </div>
  );
}