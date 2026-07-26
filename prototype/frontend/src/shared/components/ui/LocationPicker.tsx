import { useState } from "react";
import { MapPin, Loader2, Map } from "lucide-react";

export interface LocationData {
  latitude: number | null;
  longitude: number | null;
  address: string;
  govLevel: string;
}

interface LocationPickerProps {
  value: LocationData;
  onChange: (data: LocationData) => void;
}

export default function LocationPicker({ value, onChange }: LocationPickerProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualMode, setManualMode] = useState(false);

  const handleGetCurrentLocation = () => {
    setLoading(true);
    setError(null);
    setManualMode(false);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      setManualMode(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, we would reverse-geocode these coordinates to get address and govLevel.
        // For the prototype, we'll assign some mock data based on successful location grab.
        onChange({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          address: "123 Main St, Local District", // Mock address
          govLevel: "Ward 42", // Mock govLevel
        });
        setLoading(false);
      },
      (err) => {
        setError("Unable to retrieve your location. Please enter it manually.");
        setLoading(false);
        setManualMode(true);
      }
    );
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      address: e.target.value,
    });
  };

  const handleGovLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      govLevel: e.target.value,
    });
  };

  return (
    <div className="pt-4 mt-4 border-t border-[var(--color-border)]">
      <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
        <Map size={16} /> Location
      </h3>
      
      {error && (
        <p className="text-xs text-[var(--color-error)] mb-3">{error}</p>
      )}

      {(!value.latitude || manualMode) ? (
        <div className="space-y-3 mb-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1">Address / Landmark</label>
              <input
                value={value.address}
                onChange={handleAddressChange}
                className="w-full p-2.5 text-sm border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]"
                placeholder="e.g. Ward 4 High St"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-secondary)] mb-1">Government Level</label>
              <input
                value={value.govLevel}
                onChange={handleGovLevelChange}
                className="w-full p-2.5 text-sm border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]"
                placeholder="e.g. Ward 42"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-3 p-3 bg-[var(--color-bg-subtle)] rounded-lg flex items-start gap-2">
          <MapPin size={16} className="text-[var(--color-brand)] mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-bold text-[var(--color-text-primary)]">{value.address}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">Lat: {value.latitude?.toFixed(4)}, Lng: {value.longitude?.toFixed(4)} • {value.govLevel}</p>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleGetCurrentLocation}
        disabled={loading}
        className="flex items-center gap-1.5 text-[var(--color-brand)] font-semibold hover:opacity-80 transition-opacity text-xs disabled:opacity-50"
      >
        {loading ? <Loader2 size={14} className="animate-spin" /> : <MapPin size={14} />}
        {loading ? "Detecting Location..." : "Use Current Location"}
      </button>
    </div>
  );
}
