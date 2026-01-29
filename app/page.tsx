"use client";

import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import {
  Upload,
  FileSpreadsheet,
  X,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  BellRing,
  Calendar,
  School,
} from "lucide-react";
import BulkSchoolLetters from "@/components/LetterPage";
import { PDFDownloadLink } from "@react-pdf/renderer";

export default function SpreadsheetPrototype() {
  const [data, setData] = useState<any[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [selectedDate, setSelectedDate] = useState("");
  const [classroom, setClassroom] = useState("");
  const [reminders, setReminders] = useState("1");

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
      console.log(json);
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
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Data Importer
          </h1>
          <p className="text-slate-500 mt-2">
            Upload your .xlsx or .csv files to preview and process data.
          </p>
        </header>

        {/* --- SETTINGS FORM --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          {/* Date Picker */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
              <Calendar className="w-3 h-3" /> Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
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
                value={classroom}
                onChange={(e) => setClassroom(e.target.value)}
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
                value={reminders}
                onChange={(e) => setReminders(e.target.value)}
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

        {/* Upload Zone */}
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
            <p className="text-lg font-medium">
              Click to upload or drag & drop
            </p>
            <p className="text-sm text-slate-400 mt-1">
              Excel or CSV files only (Max 5MB)
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* File Status Card */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
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

            {/* Live Preview Table */}
            {/* {data.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Preview (First 5 Rows)
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr>
                        {Object.keys(data[0]).map((key) => (
                          <th
                            key={key}
                            className="px-6 py-3 text-xs font-semibold text-slate-600 bg-slate-50/50 border-b"
                          >
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {data.slice(0, 5).map((row, i) => (
                        <tr
                          key={i}
                          className="hover:bg-slate-50/50 transition-colors"
                        >
                          {Object.values(row).map((val: any, j) => (
                            <td
                              key={j}
                              className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap"
                            >
                              {String(val)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-100">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all shadow-md active:scale-[0.98]">
                    Confirm and Sync {data.length} Records
                  </button>
                </div>
              </div>
            )} */}

            <PDFDownloadLink
              document={<BulkSchoolLetters learners={data} />}
              fileName="school_letters.pdf"
            >
              {({ loading }) =>
                loading ? "Loading document..." : "Download PDF"
              }
            </PDFDownloadLink>
          </div>
        )}
      </div>
    </div>
  );
}
