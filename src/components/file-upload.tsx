'use client';

import { RippleButton } from '@/components/animate-ui/components/buttons/ripple';
import { Progress } from '@/components/animate-ui/components/radix/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  AlertCircle,
  CheckCircle,
  Download,
  FileText,
  ImageIcon,
  Music,
  Upload,
  X,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

interface FileUploadProps {
  accept?: Record<string, string[]>;
  maxSize?: number;
  maxFiles?: number;
  onFilesChange?: (files: File[]) => void;
  existingFiles?: string[];
  type: 'text' | 'audio' | 'image';
  className?: string;
}

interface UploadedFile {
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  id: string;
}

// Helper component for rendering consistent toast content
interface ToastContentProps {
  type?: 'success' | 'error';
  title: string;
  message: string;
}

const ToastContent = ({ title, message }: ToastContentProps) => (
  <div className="flex items-start gap-3">
    <div className="grid gap-1">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-sm opacity-90">{message}</p>
    </div>
  </div>
);

export function FileUpload({
  accept = {
    'text/*': ['.txt', '.pdf', '.doc', '.docx'],
    'audio/*': ['.mp3', '.wav', '.ogg'],
    'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
  },
  maxSize = 10 * 1024 * 1024, // 10MB
  maxFiles = 5,
  onFilesChange,
  existingFiles = [],
  type,
  className,
}: FileUploadProps) {
  const t = useTranslations();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const simulateUpload = useCallback((file: File): Promise<void> => {
    return new Promise((resolve) => {
      const fileId = Math.random().toString(36).substring(2, 9);
      const newFile: UploadedFile = {
        file,
        progress: 0,
        status: 'uploading',
        id: fileId,
      };

      setUploadedFiles((prev) => [...prev, newFile]);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, progress: Math.min(f.progress + 10, 100) } : f,
          ),
        );
      }, 200);

      // Complete upload after 2 seconds
      setTimeout(() => {
        clearInterval(interval);
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === fileId
              ? {
                  ...f,
                  progress: 100,
                  status: 'success',
                }
              : f,
          ),
        );
        resolve();
      }, 2000);
    });
  }, []);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsDragActive(false);

      const currentFileCount = uploadedFiles.length;
      console.log(acceptedFiles.length);
      if (acceptedFiles.length + currentFileCount > maxFiles) {
        toast.error(
          <ToastContent
            type="error"
            title={t('upload.toasts.errorTitle')}
            message={t('upload.toasts.maxFilesError', { maxFiles })}
          />,
        );
        return;
      }

      for (const file of acceptedFiles) {
        if (file.size > maxSize) {
          toast.error(
            <ToastContent
              type="error"
              title={t('upload.toasts.errorTitle')}
              message={t('upload.toasts.maxSizeError', { fileName: file.name })}
            />,
          );
          continue;
        }

        try {
          await simulateUpload(file);
          toast.success(
            <ToastContent
              type="success"
              title={t('upload.toasts.successTitle')}
              message={t('upload.toasts.uploadSuccess', { fileName: file.name })}
            />,
          );
        } catch {
          toast.error(
            <ToastContent
              type="error"
              title={t('upload.toasts.errorTitle')}
              message={t('upload.toasts.uploadFailedError', { fileName: file.name })}
            />,
          );
        }
      }

      // Update parent component with the new list of files
      if (onFilesChange) {
        const allFiles = [...uploadedFiles.map((f) => f.file), ...acceptedFiles];
        onFilesChange(allFiles);
      }
    },
    [uploadedFiles, maxFiles, maxSize, simulateUpload, onFilesChange, t],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive: dropzoneActive,
  } = useDropzone({
    onDrop,
    accept,
    /*maxSize,
    maxFiles: maxFiles - uploadedFiles.length, // Only allow remaining files*/
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
    if (onFilesChange) {
      const remainingFiles = uploadedFiles.filter((f) => f.id !== fileId).map((f) => f.file);
      onFilesChange(remainingFiles);
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) {
      return <ImageIcon className="h-4 w-4" />;
    }
    if (['mp3', 'wav', 'ogg'].includes(extension || '')) {
      return <Music className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  const getTypeLabel = () => {
    return t(`upload.types.${type}`);
  };

  const getAcceptedFormats = () => {
    switch (type) {
      case 'text':
        return 'PDF, DOC, DOCX, TXT';
      case 'audio':
        return 'MP3, WAV, OGG';
      case 'image':
        return 'JPG, PNG, GIF';
      default:
        return t('upload.allFormats');
    }
  };

  const maxSizeMB = Math.round(maxSize / (1024 * 1024));

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {type === 'text' && <FileText className="h-5 w-5" />}
          {type === 'audio' && <Music className="h-5 w-5" />}
          {type === 'image' && <ImageIcon className="h-5 w-5" />}
          {t('upload.uploadFilesOfType', { type: getTypeLabel() })}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          {...getRootProps()}
          className={cn(
            'cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors',
            isDragActive || dropzoneActive
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-primary/50',
            uploadedFiles.length >= maxFiles && 'cursor-not-allowed opacity-50',
          )}
        >
          <input {...getInputProps()} disabled={uploadedFiles.length >= maxFiles} />
          <Upload className="text-muted-foreground mx-auto mb-4 h-12 w-12" />

          {isDragActive || dropzoneActive ? (
            <p className="text-primary font-medium">{t('upload.dragActive')}</p>
          ) : (
            <div className="space-y-2">
              <p className="font-medium">{t('upload.dragInactive')}</p>
              <p className="text-muted-foreground text-sm">
                {t('upload.allowedFormats', { formats: getAcceptedFormats() })}
              </p>
              <p className="text-muted-foreground text-xs">
                {t('upload.maxFilesDetails', { maxFiles, maxSizeMB })}
              </p>
            </div>
          )}
        </div>

        {existingFiles.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">{t('upload.existingFiles')}</h4>
            <div className="space-y-2">
              {existingFiles.map((fileName, index) => (
                <div
                  key={index}
                  className="bg-muted/50 flex items-center justify-between rounded-lg p-3"
                >
                  <div className="flex items-center gap-2">
                    {getFileIcon(fileName)}
                    <span className="text-sm font-medium">{fileName}</span>
                    <Badge variant="outline" className="text-xs">
                      {t('upload.status.existing')}
                    </Badge>
                  </div>
                  <RippleButton variant="ghost" size="sm" className="gap-1">
                    <Download className="h-3 w-3" />
                    {t('navigation.download')}
                  </RippleButton>
                </div>
              ))}
            </div>
          </div>
        )}

        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">{t('upload.uploadedFiles')}</h4>
            <div className="space-y-3">
              {uploadedFiles.map((uploadedFile) => (
                <div key={uploadedFile.id} className="space-y-2 rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex max-w-[70%] items-center gap-2">
                      {getFileIcon(uploadedFile.file.name)}
                      <span className="max-w-[70%] truncate text-sm font-medium">
                        {uploadedFile.file.name}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {(uploadedFile.file.size / (1024 * 1024)).toFixed(2)} MB
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      {uploadedFile.status === 'success' && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      {uploadedFile.status === 'error' && (
                        <AlertCircle className="text-destructive h-4 w-4" />
                      )}
                      <RippleButton
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(uploadedFile.id)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </RippleButton>
                    </div>
                  </div>

                  {uploadedFile.status === 'uploading' && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>{t('upload.status.uploading')}</span>
                        <span>{uploadedFile.progress}%</span>
                      </div>
                      <Progress value={uploadedFile.progress} className="h-2" />
                    </div>
                  )}

                  {uploadedFile.status === 'success' && (
                    <p className="text-xs text-green-600">{t('upload.status.success')}</p>
                  )}

                  {uploadedFile.status === 'error' && (
                    <p className="text-destructive text-xs">{t('upload.status.error')}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-muted-foreground flex items-center justify-between border-t pt-3 text-sm">
          <span>
            {t('upload.fileCount', {
              current: uploadedFiles.length + existingFiles.length,
              max: maxFiles,
            })}
          </span>
          <span>
            {t('upload.successCount', {
              count: uploadedFiles.filter((f) => f.status === 'success').length,
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
