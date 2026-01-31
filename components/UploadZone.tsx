import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { Upload, FileSpreadsheet, X } from "lucide-react";

type UploadZoneProps = {
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  fileName: string | null;
  setFileName: React.Dispatch<React.SetStateAction<string | null>>;
};

const UploadZone = ({
  data,
  setData,
  fileName,
  setFileName,
}: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result;
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      setData(json);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith(".xlsx") || file.name.endsWith(".csv"))) {
      processFile(file);
    }
  };

  return (
    <>
      {!fileName ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative group cursor-pointer border-2 border-dashed rounded-2xl p-12 transition-all duration-200
              flex flex-col items-center justify-center
              ${isDragging ? "border-blue-500 bg-blue-50" : "border-slate-300 bg-white hover:border-slate-400"}
              `}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".xlsx, .csv"
            onChange={(e) =>
              e.target.files?.[0] && processFile(e.target.files[0])
            }
          />
          <div className="p-4 bg-blue-50 rounded-full mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-lg font-medium">Click to upload or drag & drop</p>
          <p className="text-sm text-slate-400 mt-1">
            Excel or CSV files only (Max 5MB)
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* File Status Card */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm mb-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-50 rounded-lg">
                <FileSpreadsheet className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{fileName}</h3>
                <p className="text-xs text-slate-500">
                  {data.length} rows detected
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setFileName(null);
                setData([]);
              }}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadZone;
