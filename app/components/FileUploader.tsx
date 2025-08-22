import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const formatSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${units[i]}`;
};

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}
const FileUploader = ({ onFileSelect }: FileUploaderProps) => {


  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file: File = acceptedFiles[0] || null;

    onFileSelect?.(file);

  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: 20 * 1024 * 1024
  })

  const file = acceptedFiles[0] || null;

  return (
    <div className='w-full gradient-border'>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="space-y-4 cursor-pointer">
          {file ? (
            <div className='uploader-selector-file flex items-center justify-between p-3' onClick={(e) => e.stopPropagation()}>
              <div className='flex items-center space-x-3'>
                <img src="/images/pdf.png" alt="pdf" className='size-10' />
                <div>
                  <p className="text-sm text-gray-700 font-medium truncate max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>
              <button>
                <img src="/icons/cross.svg" alt="remove" className='w-4 h-4' />
              </button>
            </div>
          ) : (
            <div>
              <div className='mx-auto w-16 h-16 flex items-center justify-center mb-2'>
                <img src="/icons/info.svg" alt="upload" className='size-20' />
              </div>
              <p className='text-lg text-gray-500 '>
                <span className='font-semibold'>
                  Click to Upload
                </span>
              </p>
              <p className='text-sm text-gray-500'>
                PDF (max {formatSize(20 * 1024 * 1024)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FileUploader;