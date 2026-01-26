import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface TagManagerProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
}

export function TagManager({ tags, onTagsChange, placeholder = 'Add tag' }: TagManagerProps) {
  const [inputValue, setInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAddTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      onTagsChange([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveTag = (index: number) => {
    onTagsChange(tags.filter((_, i) => i !== index));
  };

  const handleStartEdit = (index: number) => {
    setEditingIndex(index);
    setEditValue(tags[index]);
  };

  const handleSaveEdit = () => {
    if (editValue.trim() && editingIndex !== null) {
      const newTags = [...tags];
      newTags[editingIndex] = editValue.trim();
      onTagsChange(newTags);
      setEditingIndex(null);
      setEditValue('');
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: 'add' | 'edit') => {
    if (e.key === 'Enter') {
      if (action === 'add') {
        handleAddTag();
      } else {
        handleSaveEdit();
      }
    } else if (e.key === 'Escape' && action === 'edit') {
      handleCancelEdit();
    }
  };

  return (
    <div className="space-y-3">
      {/* Tag List */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="group flex items-center gap-2 px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
          >
            {editingIndex === index ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, 'edit')}
                  className="px-2 py-1 bg-white border border-emerald-300 rounded text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  autoFocus
                />
                <button
                  onClick={handleSaveEdit}
                  className="text-emerald-700 hover:text-emerald-900"
                  title="Save"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="text-red-600 hover:text-red-800"
                  title="Cancel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <span
                  onClick={() => handleStartEdit(index)}
                  className="cursor-pointer"
                >
                  {tag}
                </span>
                <button
                  onClick={() => handleRemoveTag(index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Add New Tag Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e, 'add')}
          className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm hover:border-emerald-300"
          placeholder={placeholder}
        />
        <button
          onClick={handleAddTag}
          className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add
        </button>
      </div>
    </div>
  );
}
