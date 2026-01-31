"use client";

import SettingsForm from "@/components/SettingsForm";
import UploadZone from "@/components/UploadZone";
import { useState } from "react";
import { SettingsData } from "@/Lib/types";
import { PDFDownloadLink } from "@react-pdf/renderer";
import BulkSchoolLetters from "@/components/BulkSchoolLetters";
export default function SpreadsheetPrototype() {
  // Parent owns the state
  const [settings, setSettings] = useState<SettingsData>({
    selectedDate: "",
    classroom: "",
    reminders: "1",
  });

  const [data, setData] = useState<any[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);

  // A generic updater function using keyof to ensure type safety
  const handleUpdate = (field: keyof SettingsData, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  let isComplete = Object.values(settings).every((settings) => settings !== "");

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight">
            School Letters Generator
          </h1>
          <p className="text-slate-500 mt-2">Upload your spreadsheet.</p>
        </header>

        {/* --- SETTINGS FORM --- */}
        <SettingsForm settings={settings} onUpdate={handleUpdate} />
        {/* Upload Zone */}
        {isComplete ? (
          <UploadZone
            data={data}
            setData={setData}
            fileName={fileName}
            setFileName={setFileName}
          />
        ) : null}

        {data.length > 0 && (
          <PDFDownloadLink
            document={<BulkSchoolLetters learners={data} settings={settings} />}
            fileName={`School_Letters_${settings.classroom}.pdf`}
            className="
    inline-flex items-center justify-center
    px-6 py-3 rounded-xl
    bg-blue-500 text-white font-medium
    hover:bg-blue-600
    transition-colors
    disabled:opacity-50
  "
          >
            {({ loading }) =>
              loading ? "Loading document..." : "Download PDF"
            }
          </PDFDownloadLink>
        )}
      </div>
    </div>
  );
}
