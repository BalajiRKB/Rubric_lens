import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText, Image, CheckCircle, ArrowUpCircle } from 'lucide-react';
import { motion, AnimatePresence } from "motion/react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      onFileSelect(file);
      
      // Create preview for image files
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        // For non-image files like PDFs, clear image preview
        setPreview(null);
      }
    }
    setIsDragOver(false);
  }, [onFileSelect]);

  const onDragEnter = useCallback(() => {
    setIsDragOver(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter,
    onDragLeave,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB limit
  });

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setSelectedFile(null);
    onFileSelect(null as any);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {selectedFile ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {preview ? (
              // Image preview
              <div className="relative group glass-card p-6 overflow-hidden">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={clearSelection}
                  className="absolute top-4 right-4 p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full backdrop-blur-sm z-10 transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                </motion.button>
                
                <div className="relative rounded-xl overflow-hidden bg-neutral-800/50">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-80 w-full object-contain rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <Image className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white truncate max-w-48">{selectedFile.name}</p>
                      <p className="text-sm text-neutral-400">{formatFileSize(selectedFile.size)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Ready
                  </div>
                </div>
              </div>
            ) : (
              // PDF file display
              <div className="glass-card p-8">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={clearSelection}
                  className="absolute top-4 right-4 p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full backdrop-blur-sm z-10 transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                </motion.button>
                
                <div className="flex flex-col items-center text-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="p-6 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl mb-6 border border-red-500/30"
                  >
                    <FileText className="w-16 h-16 text-red-400" />
                  </motion.div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">{selectedFile.name}</h3>
                  <p className="text-neutral-400 mb-4">{formatFileSize(selectedFile.size)}</p>
                  
                  <div className="flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    PDF Document Ready for Analysis
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div
              {...getRootProps()}
              className={`relative overflow-hidden cursor-pointer transition-all duration-300 rounded-2xl border-2 border-dashed min-h-[280px] flex items-center justify-center
                ${isDragActive || isDragOver
                  ? 'border-cyan-500 bg-cyan-500/10 scale-[1.02]' 
                  : 'border-neutral-600 hover:border-cyan-500/60 bg-neutral-800/40 hover:bg-neutral-800/60'
                }
              `}
          >
            <input {...getInputProps()} />
            
            {/* Animated background */}
            <div className="absolute inset-0">
              <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)]"></div>
              {(isDragActive || isDragOver) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"
                />
              )}
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center px-6">
              <motion.div
                animate={isDragActive || isDragOver ? { 
                  scale: 1.1, 
                  rotate: [0, -10, 10, -10, 0],
                  y: -10 
                } : { scale: 1, rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-6 rounded-2xl mb-6 transition-all duration-300 ${
                  isDragActive || isDragOver 
                    ? 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-xl shadow-cyan-500/25' 
                    : 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30'
                }`}
              >
                {isDragActive || isDragOver ? (
                  <ArrowUpCircle className="w-12 h-12 text-white" />
                ) : (
                  <Upload className="w-12 h-12 text-cyan-400" />
                )}
              </motion.div>
              
              <motion.div
                animate={isDragActive || isDragOver ? { y: -5 } : { y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDragActive || isDragOver ? (
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-white mb-2">Drop your file here!</h3>
                    <p className="text-cyan-300">Release to upload your submission</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-white mb-3">Upload Your Submission</h3>
                    <p className="text-neutral-300 mb-4 leading-relaxed">
                      Drag and drop your file here, or <span className="text-cyan-400 font-medium">click to browse</span>
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-neutral-400">
                      <div className="flex items-center gap-2">
                        <Image className="w-4 h-4" />
                        <span>Images</span>
                      </div>
                      <div className="w-px h-4 bg-neutral-600"></div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>PDFs</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!selectedFile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-sm text-neutral-400"
        >
          Supports: JPG, PNG, GIF, WebP, PDF • Max size: 10MB
        </motion.div>
      )}
    </div>
  );
}