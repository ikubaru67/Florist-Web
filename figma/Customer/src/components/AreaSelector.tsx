import { useState, useEffect } from 'react';
import { MapPin, X, Check } from 'lucide-react';

export interface Area {
  id: string;
  name: string;
  city: string;
  postalCodes: string[];
}

// Daftar area yang dilayani
export const AVAILABLE_AREAS: Area[] = [
  {
    id: 'jakarta-pusat',
    name: 'Jakarta Pusat',
    city: 'Jakarta',
    postalCodes: ['10110', '10120', '10130', '10140', '10150']
  },
  {
    id: 'jakarta-selatan',
    name: 'Jakarta Selatan',
    city: 'Jakarta',
    postalCodes: ['12110', '12120', '12130', '12140', '12150']
  },
  {
    id: 'jakarta-utara',
    name: 'Jakarta Utara',
    city: 'Jakarta',
    postalCodes: ['14110', '14120', '14130', '14140', '14150']
  },
  {
    id: 'jakarta-barat',
    name: 'Jakarta Barat',
    city: 'Jakarta',
    postalCodes: ['11110', '11120', '11130', '11140', '11150']
  },
  {
    id: 'jakarta-timur',
    name: 'Jakarta Timur',
    city: 'Jakarta',
    postalCodes: ['13110', '13120', '13130', '13140', '13150']
  },
  {
    id: 'tangerang',
    name: 'Tangerang',
    city: 'Tangerang',
    postalCodes: ['15110', '15120', '15130', '15140', '15150']
  },
  {
    id: 'bekasi',
    name: 'Bekasi',
    city: 'Bekasi',
    postalCodes: ['17110', '17120', '17130', '17140', '17150']
  },
  {
    id: 'depok',
    name: 'Depok',
    city: 'Depok',
    postalCodes: ['16410', '16420', '16430', '16440', '16450']
  },
  {
    id: 'bogor',
    name: 'Bogor',
    city: 'Bogor',
    postalCodes: ['16110', '16120', '16130', '16140', '16150']
  },
  {
    id: 'bandung',
    name: 'Bandung',
    city: 'Bandung',
    postalCodes: ['40110', '40120', '40130', '40140', '40150']
  },
  {
    id: 'surabaya',
    name: 'Surabaya',
    city: 'Surabaya',
    postalCodes: ['60110', '60120', '60130', '60140', '60150']
  },
  {
    id: 'yogyakarta',
    name: 'Yogyakarta',
    city: 'Yogyakarta',
    postalCodes: ['55110', '55120', '55130', '55140', '55150']
  }
];

interface AreaSelectorProps {
  selectedArea: string | null;
  onAreaChange: (areaId: string | null) => void;
  showModal?: boolean;
  onCloseModal?: () => void;
}

export function AreaSelector({ selectedArea, onAreaChange, showModal, onCloseModal }: AreaSelectorProps) {
  const [isModalOpen, setIsModalOpen] = useState(showModal || false);
  const selectedAreaData = AVAILABLE_AREAS.find(area => area.id === selectedArea);

  useEffect(() => {
    if (showModal !== undefined) {
      setIsModalOpen(showModal);
    }
  }, [showModal]);

  const handleAreaSelect = (areaId: string) => {
    onAreaChange(areaId);
    setIsModalOpen(false);
    if (onCloseModal) {
      onCloseModal();
    }
  };

  const handleClearArea = () => {
    onAreaChange(null);
  };

  // Group areas by city
  const areasByCity = AVAILABLE_AREAS.reduce((acc, area) => {
    if (!acc[area.city]) {
      acc[area.city] = [];
    }
    acc[area.city].push(area);
    return acc;
  }, {} as Record<string, Area[]>);

  return (
    <>
      {/* Area Display Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#064232] rounded-lg hover:bg-[#FFF5F2] transition-colors"
      >
        <MapPin className="w-5 h-5 text-[#064232]" />
        <div className="text-left">
          <div className="text-xs text-gray-500">Delivery Area</div>
          <div className="text-sm text-[#064232]">
            {selectedAreaData ? selectedAreaData.name : 'Select Area'}
          </div>
        </div>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-[#064232] text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6" />
                <div>
                  <h2 className="text-2xl" style={{ fontFamily: 'Merriweather, serif' }}>
                    Select Delivery Area
                  </h2>
                  <p className="text-sm text-green-100 mt-1">
                    Choose your area to see available products
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  if (onCloseModal) onCloseModal();
                }}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              {/* Current Selection */}
              {selectedAreaData && (
                <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Current Area:</div>
                      <div className="text-lg text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>
                        {selectedAreaData.name}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleClearArea}
                    className="text-sm text-red-600 hover:text-red-700 px-4 py-2 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              )}

              {/* Area List by City */}
              <div className="space-y-6">
                {Object.entries(areasByCity).map(([city, areas]) => (
                  <div key={city}>
                    <h3 className="text-lg text-[#064232] mb-3 pb-2 border-b border-gray-200" style={{ fontFamily: 'Merriweather, serif' }}>
                      {city}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {areas.map(area => (
                        <button
                          key={area.id}
                          onClick={() => handleAreaSelect(area.id)}
                          className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                            selectedArea === area.id
                              ? 'border-[#064232] bg-[#FFF5F2]'
                              : 'border-gray-200 hover:border-[#568F87]'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-[#064232] mb-1">
                                {area.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                Postal: {area.postalCodes.slice(0, 2).join(', ')}...
                              </div>
                            </div>
                            {selectedArea === area.id && (
                              <Check className="w-5 h-5 text-[#064232]" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Info Note */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  💡 <strong>Note:</strong> Product availability varies by area. Some products may not be available in your selected area.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
