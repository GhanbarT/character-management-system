/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client';

import { Button } from '@/components/animate-ui/components/buttons/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/animate-ui/components/radix/dialog';
import { FileUpload } from '@/components/file-upload';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { type Character, type CreateCharacterInput, CreateCharacterSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

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

interface CharacterFormProps {
  character?: Character | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateCharacterInput) => void;
}

export function CharacterForm({ character, open, onOpenChange, onSubmit }: CharacterFormProps) {
  const t = useTranslations();
  const [works, setWorks] = useState<string[]>(character?.works || []);
  const [newWork, setNewWork] = useState('');
  const [textFiles, setTextFiles] = useState<File[]>(
    character?.textResources?.map((name) => ({ name }) as File) || [],
  );
  const [audioFiles, setAudioFiles] = useState<File[]>(
    character?.audioResources?.map((name) => ({ name }) as File) || [],
  );
  const [, setImageFiles] = useState<File[]>([]);

  const form = useForm<CreateCharacterInput>({
    resolver: zodResolver(CreateCharacterSchema),
    defaultValues: {
      name: character?.name || '',
      gender: character?.gender,
      birthDate: character?.birthDate || '',
      deathDate: character?.deathDate || '',
      fieldOfActivity: character?.fieldOfActivity,
      status: character?.status,
      biography: character?.biography || '',
      works: character?.works || [],
      avatar: character?.avatar || '',
      textResources: character?.textResources || [],
      audioResources: character?.audioResources || [],
    },
  });

  // Effect to reset form when character prop or open state changes
  useEffect(() => {
    if (open) {
      form.reset({
        name: character?.name || '',
        gender: character?.gender ?? 'Male',
        birthDate: character?.birthDate || '',
        deathDate: character?.deathDate || '',
        fieldOfActivity: character?.fieldOfActivity ?? 'Poet',
        status:
          character?.status === 'Active' || character?.status === 'Inactive'
            ? character.status
            : 'Active',
        biography: character?.biography || '',
        works: character?.works || [],
        avatar: character?.avatar || '',
        textResources: character?.textResources || [],
        audioResources: character?.audioResources || [],
      });
      setWorks(character?.works || []);
      setTextFiles(character?.textResources?.map((name) => ({ name }) as File) || []);
      setAudioFiles(character?.audioResources?.map((name) => ({ name }) as File) || []);
      setImageFiles([]);
    } else {
      setWorks([]);
      setTextFiles([]);
      setAudioFiles([]);
      setImageFiles([]);
    }
  }, [character, open, form]);

  const handleSubmit = (data: CreateCharacterInput) => {
    const formData = {
      ...data,
      works,
      textResources: textFiles.map((f) => f.name),
      audioResources: audioFiles.map((f) => f.name),
    };

    onSubmit(formData);
    toast.success(
      <ToastContent
        type="success"
        title={t('messages.operationSuccessTitle')}
        message={t('messages.characterSavedDescription', { name: data.name })}
      />,
    );
    onOpenChange(false);
  };

  const addWork = () => {
    if (newWork.trim() && !works.includes(newWork.trim())) {
      setWorks([...works, newWork.trim()]);
      setNewWork('');
    }
  };

  const removeWork = (work: string) => {
    setWorks(works.filter((w) => w !== work));
  };

  const genderOptions = [
    { value: 'Male', label: t('characters.male') },
    { value: 'Female', label: t('characters.female') },
  ];

  const fieldOptions = [
    { value: 'Poet', label: t('fields.poet') },
    { value: 'Writer', label: t('fields.writer') },
    { value: 'Astronomer', label: t('fields.astronomer') },
    { value: 'Philosopher', label: t('fields.philosopher') },
    { value: 'Mystic', label: t('fields.mystic') },
    { value: 'Historian', label: t('fields.historian') },
  ];

  const statusOptions = [
    { value: 'Active', label: t('characters.active') },
    { value: 'Inactive', label: t('characters.inactive') },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-full max-w-xl overflow-y-auto p-4 sm:p-6 md:max-w-3xl lg:max-w-5xl">
        <DialogHeader>
          <DialogTitle className="font-playfair">
            {character ? t('characters.editCharacter') : t('characters.addNewCharacter')}
          </DialogTitle>
          <DialogDescription>{t('auth.enterCharacterInfo')}</DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('characters.basicInformation')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">{t('characters.name')}</Label>
                  <Input
                    id="name"
                    {...form.register('name')}
                    placeholder={t('characters.fullNamePlaceholder')}
                  />
                  {form.formState.errors.name && (
                    <p className="text-destructive mt-1 text-sm">
                      {t(form.formState.errors.name.message as string)}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="gender">{t('characters.gender')}</Label>
                  <Select
                    value={form.watch('gender')}
                    onValueChange={(value) => form.setValue('gender', value as 'Male' | 'Female')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('characters.selectGender')} />
                    </SelectTrigger>
                    <SelectContent>
                      {genderOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.gender && (
                    <p className="text-destructive mt-1 text-sm">
                      {t('characters.genderRequired')}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="fieldOfActivity">{t('characters.fieldOfActivity')}</Label>
                  <Select
                    value={form.watch('fieldOfActivity')}
                    onValueChange={(value) =>
                      form.setValue('fieldOfActivity', value as Character['fieldOfActivity'])
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('characters.selectFieldOfActivity')} />
                    </SelectTrigger>
                    <SelectContent>
                      {fieldOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.fieldOfActivity && (
                    <p className="text-destructive mt-1 text-sm">
                      {t('characters.fieldOfActivityRequired')}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="status">{t('characters.status')}</Label>
                  <Select
                    value={form.watch('status')}
                    onValueChange={(value) =>
                      form.setValue('status', value as 'Active' | 'Inactive')
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('characters.selectStatus')} />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {/* Status usually has a default so error is less likely, but included for completeness */}
                  {form.formState.errors.status && (
                    <p className="text-destructive mt-1 text-sm">
                      {t(form.formState.errors.status.message as string)}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('characters.dateAndBiography')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="birthDate">{t('characters.birthDate')}</Label>
                  <Input
                    id="birthDate"
                    {...form.register('birthDate')}
                    placeholder={t('characters.birthDatePlaceholder')}
                  />
                  {form.formState.errors.birthDate && (
                    <p className="text-destructive mt-1 text-sm">
                      {t(form.formState.errors.birthDate.message as string)}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="deathDate">{t('characters.deathDate')}</Label>
                  <Input
                    id="deathDate"
                    {...form.register('deathDate')}
                    placeholder={t('characters.deathDatePlaceholder')}
                  />
                </div>

                <div>
                  <Label htmlFor="biography">{t('characters.biography')}</Label>
                  <Textarea
                    id="biography"
                    {...form.register('biography')}
                    placeholder={t('characters.biographyPlaceholder')}
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="avatar">{t('characters.imageURL')}</Label>
                  <Input
                    id="avatar"
                    {...form.register('avatar')}
                    placeholder={t('characters.imageURLPlaceholder')}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('characters.works')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newWork}
                  onChange={(e) => setNewWork(e.target.value)}
                  placeholder={t('characters.newWorkName')}
                />
                <Button type="button" onClick={addWork}>
                  {t('navigation.add')}
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {works.map((work, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {work}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeWork(work)} />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <FileUpload
              type="text"
              accept={{
                'application/pdf': ['.pdf'],
                'application/msword': ['.doc'],
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
                  '.docx',
                ],
                'text/plain': ['.txt'],
              }}
              maxFiles={5}
              maxSize={10 * 1024 * 1024}
              onFilesChange={setTextFiles}
              existingFiles={character?.textResources || []}
            />

            <FileUpload
              type="audio"
              accept={{
                'audio/mpeg': ['.mp3'],
                'audio/wav': ['.wav'],
                'audio/ogg': ['.ogg'],
              }}
              maxFiles={3}
              maxSize={50 * 1024 * 1024}
              onFilesChange={setAudioFiles}
              existingFiles={character?.audioResources || []}
            />

            {/* Image upload section removed as per the change description */}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t('navigation.cancel')}
            </Button>
            <Button type="submit">{character ? t('navigation.edit') : t('navigation.add')}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
