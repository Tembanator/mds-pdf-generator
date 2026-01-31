import { ChevronDown, BellRing, Calendar, School } from "lucide-react";
import { SettingsData } from "@/Lib/types";

interface SettingsFormProps {
  settings: SettingsData;
  // This function expects a specific key from our data and a string value
  onUpdate: (field: keyof SettingsData, value: string) => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ settings, onUpdate }) => {
  const classrooms = [
    "1A",
    "1B",
    "1C",
    "1D",
    "1E",
    "2A",
    "2B",
    "2C",
    "2D",
    "2E",
    "3A",
    "3B",
    "3C",
    "3D",
    "3E",
    "4A",
    "4B",
    "4C",
    "4D",
    "5A",
    "5B",
    "5C",
    "5D",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
      {/* Date Picker */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
          <Calendar className="w-3 h-3" /> Date
        </label>
        <input
          type="date"
          value={settings.selectedDate}
          onChange={(e) => onUpdate("selectedDate", e.target.value)}
          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </div>

      {/* Classroom Dropdown */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
          <School className="w-3 h-3" /> Classroom
        </label>
        <div className="relative">
          <select
            value={settings.classroom}
            onChange={(e) => onUpdate("classroom", e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select Room...</option>
            {classrooms.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Reminder Count Dropdown */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
          <BellRing className="w-3 h-3" /> Reminders
        </label>
        <div className="relative">
          <select
            value={settings.reminders}
            onChange={(e) => onUpdate("reminders", e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default SettingsForm;
