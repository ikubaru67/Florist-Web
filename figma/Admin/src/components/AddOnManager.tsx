import { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';

export interface AddOn {
  id: number;
  name: string;
  price: string;
}

interface AddOnManagerProps {
  addOns: AddOn[];
  onAddOnsChange: (addOns: AddOn[]) => void;
}

export function AddOnManager({ addOns, onAddOnsChange }: AddOnManagerProps) {
  const [newAddOnName, setNewAddOnName] = useState('');
  const [newAddOnPrice, setNewAddOnPrice] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');

  // Ensure addOns is always an array
  const safeAddOns = addOns || [];

  const handleAdd = () => {
    if (newAddOnName.trim() && newAddOnPrice.trim()) {
      const newAddOn: AddOn = {
        id: Math.max(0, ...safeAddOns.map(a => a.id)) + 1,
        name: newAddOnName.trim(),
        price: newAddOnPrice.trim()
      };
      onAddOnsChange([...safeAddOns, newAddOn]);
      setNewAddOnName('');
      setNewAddOnPrice('');
    }
  };

  const handleRemove = (id: number) => {
    onAddOnsChange(safeAddOns.filter(addon => addon.id !== id));
  };

  const handleStartEdit = (addon: AddOn) => {
    setEditingId(addon.id);
    setEditName(addon.name);
    setEditPrice(addon.price);
  };

  const handleSaveEdit = () => {
    if (editingId !== null && editName.trim() && editPrice.trim()) {
      onAddOnsChange(
        safeAddOns.map(addon =>
          addon.id === editingId
            ? { ...addon, name: editName.trim(), price: editPrice.trim() }
            : addon
        )
      );
      setEditingId(null);
      setEditName('');
      setEditPrice('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditPrice('');
  };

  return (
    <div className="space-y-4">
      {/* Add New Add-On */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={newAddOnName}
          onChange={(e) => setNewAddOnName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add-on name (e.g. Greeting Card)"
          className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm hover:border-emerald-300"
        />
        <input
          type="text"
          value={newAddOnPrice}
          onChange={(e) => setNewAddOnPrice(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Price (e.g. Rp 25.000)"
          className="flex-1 sm:w-48 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm hover:border-emerald-300"
        />
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>

      {/* Add-Ons List */}
      {safeAddOns.length > 0 && (
        <div className="space-y-2">
          {safeAddOns.map((addon) => (
            <div
              key={addon.id}
              className="flex items-center gap-3 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-emerald-200 transition-all group"
            >
              {editingId === addon.id ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm"
                  />
                  <input
                    type="text"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className="w-32 px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm"
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="w-9 h-9 flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors flex-shrink-0"
                    title="Save"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="w-9 h-9 flex items-center justify-center bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors flex-shrink-0"
                    title="Cancel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <div className="flex-1">
                    <p className="text-gray-900">{addon.name}</p>
                  </div>
                  <div className="text-emerald-700 px-3 py-1 bg-emerald-50 rounded-lg border border-emerald-200">
                    {addon.price}
                  </div>
                  <button
                    onClick={() => handleStartEdit(addon)}
                    className="w-9 h-9 flex items-center justify-center hover:bg-emerald-50 text-emerald-600 rounded-lg transition-all opacity-0 group-hover:opacity-100 flex-shrink-0"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleRemove(addon.id)}
                    className="w-9 h-9 flex items-center justify-center hover:bg-red-50 text-red-600 rounded-lg transition-all opacity-0 group-hover:opacity-100 flex-shrink-0"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {safeAddOns.length === 0 && (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-sm">No add-ons yet. Add your first add-on above!</p>
        </div>
      )}
    </div>
  );
}