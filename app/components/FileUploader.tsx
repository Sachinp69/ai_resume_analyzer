// import { format } from 'path';
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'

interface FileUploaderProps {
    onFileSelect? : (file : File | null)=> void;
}

export const FileUploader = ({onFileSelect} : FileUploaderProps) => {

    const onDrop = useCallback((acceptedFiles : File[] )=> {
        const file = acceptedFiles[0] || null;
        onFileSelect?.(file);

    }, [onFileSelect])

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'application/pdf': ['.pdf']
        },
        maxSize: 20 * 1024 * 1024 // 20MB
    })
    
    const file = acceptedFiles[0];

    const formatSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
    }

    return (
        <div className='w-full gradient-border min-h-30'  >
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className='space-y-4 cursor-pointer'>

                    {file ? (
                        <div className='uploader-selected-file px-9' onClick={(e)=>{e.stopPropagation()}} > 
                            <img src='/images/pdf.png' alt='pdf' className='size-10' />
                            <div className='flex items-center space-x-3'>
                                <div>                
                                    <p className='text-sm text-gray-800 font-medium truncate max-w-xs'>
                                        {file.name}
                                    </p>
                                    <p className='text-sm text-gray-500' >
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <button className='p-2 cursor-pointer' onClick={(e)=>{
                                onFileSelect?.(null)
                                console.log('remove button is clicked');
                            }}>
                                <img src='/icons/cross.svg' alt='remove' className='w-4 h-4' />    
                            </button>                     
                        </div>
                    ) : (
                        <div>
                            <div className='mx-auto h-16 w-16 flex items-center justify-center mb-3' >
                                <img src='icons/info.svg' alt='upload' className='size-20'/>
                            </div>
                            <p className='text-lg text-gray-500' >
                                <span className='font-semibold'>
                                    Click To Upload
                                </span> or Drag and Drop
                            </p>
                            <p className='text-lg text-gray-500' >PDF (max size : 20MB)</p>
                        </div>
                    )}
                
                </div>
            </div>
        </div>
    )
}
