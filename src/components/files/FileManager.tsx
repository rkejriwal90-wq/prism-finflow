import React, { useState, useCallback } from 'react';
import { 
  Upload, FolderPlus, Search, Grid, List, Download, Eye, 
  Lock, Unlock, MoreVertical, FileText, Image, FileSpreadsheet,
  File, Trash2, Edit2, Copy, Move, Archive
} from 'lucide-react';

export function FileManager() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [isDragging, setIsDragging] = useState(false);
  
  const files = [
    {
      id: '1',
      name: 'Financial_Model_v3.xlsx',
      displayName: 'AcmeCorp_QuickScreen_FIN_Model_v3_2024-01-31.xlsx',
      type: 'spreadsheet',
      size: 2457600,
      locked: true,
      includeInAI: true,
      lastModified: new Date('2024-01-31'),
      version: 3
    },
    {
      id: '2',
      name: 'Q4_Financials.pdf',
      displayName: 'AcmeCorp_QuickScreen_FIN_Statements_Q4_2023.pdf',
      type: 'pdf',
      size: 4718592,
      locked: false,
      includeInAI: true,
      lastModified: new Date('2024-01-30'),
      version: 1
    }
  ];

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    console.log('Dropped files:', files);
    // Handle file upload here
  }, []);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'spreadsheet': return FileSpreadsheet;
      case 'pdf': return FileText;
      case 'image': return Image;
      default: return File;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">File Management</h1>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </button>
          <button className="inline-flex items-center px-4 py-2 border rounded-md hover:bg-gray-50">
            <FolderPlus className="h-4 w-4 mr-2" />
            New Folder
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm">
        <span className="text-gray-500">Path:</span>
        <span>/</span>
        <span>Clients</span>
        <span>/</span>
        <span>Acme Corp</span>
        <span>/</span>
        <span className="font-medium">D-2024-001</span>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search files..."
                className="pl-10 pr-4 py-2 border rounded-md text-sm"
              />
            </div>
            {selectedFiles.size > 0 && (
              <div className="flex items-center space-x-2 border-l pl-4">
                <span className="text-sm text-gray-500">
                  {selectedFiles.size} selected
                </span>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Download className="h-4 w-4" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Move className="h-4 w-4" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'}
        `}
      >
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-2">
          Drag files here or click to browse
        </p>
        <p className="text-sm text-gray-500">
          Maximum 50MB per file
        </p>
      </div>

      {/* File List */}
      {viewMode === 'list' ? (
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    className="rounded"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedFiles(new Set(files.map(f => f.id)));
                      } else {
                        setSelectedFiles(new Set());
                      }
                    }}
                  />
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Modified
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Version
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                  AI
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {files.map((file) => {
                const Icon = getFileIcon(file.type);
                return (
                  <tr key={file.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={selectedFiles.has(file.id)}
                        onChange={(e) => {
                          const newSelection = new Set(selectedFiles);
                          if (e.target.checked) {
                            newSelection.add(file.id);
                          } else {
                            newSelection.delete(file.id);
                          }
                          setSelectedFiles(newSelection);
                        }}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.displayName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatFileSize(file.size)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {file.lastModified.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      v{file.version}
                    </td>
                    <td className="px-6 py-4">
                      {file.locked ? (
                        <Lock className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Unlock className="h-4 w-4 text-green-500" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={file.includeInAI}
                        onChange={() => {}}
                      />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {files.map((file) => {
            const Icon = getFileIcon(file.type);
            return (
              <div
                key={file.id}
                className={`
                  bg-white rounded-lg border p-4 cursor-pointer hover:shadow-md
                  ${selectedFiles.has(file.id) ? 'ring-2 ring-blue-500' : ''}
                `}
                onClick={() => {
                  const newSelection = new Set(selectedFiles);
                  if (newSelection.has(file.id)) {
                    newSelection.delete(file.id);
                  } else {
                    newSelection.add(file.id);
                  }
                  setSelectedFiles(newSelection);
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className="h-8 w-8 text-gray-400" />
                  {file.locked && <Lock className="h-4 w-4 text-gray-400" />}
                </div>
                <p className="font-medium text-sm text-gray-900 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatFileSize(file.size)} • v{file.version}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FileManager;
