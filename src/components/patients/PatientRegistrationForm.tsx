'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface PatientFormData {
  name: string;
  email: string;
  phone: string;
  isWhatsApp: boolean;
  profilePicture?: File;
  profilePictureUrl?: string;
  country: string;
  city: string;
  acceptTerms: boolean;
}

interface Props {
  initialData?: PatientFormData;
  verifiedEmail?: string;
  isEditing?: boolean;
}

export default function PatientRegistrationForm({ initialData, verifiedEmail, isEditing = false }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState(initialData?.profilePictureUrl || '');

  const [formData, setFormData] = useState<PatientFormData>({
    name: initialData?.name || '',
    email: verifiedEmail || initialData?.email || '',
    phone: initialData?.phone || '',
    isWhatsApp: initialData?.isWhatsApp || false,
    country: initialData?.country || '',
    city: initialData?.city || '',
    acceptTerms: initialData?.acceptTerms || false,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, profilePicture: file }));
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'profilePicture') {
          submitData.append(key, value.toString());
        }
      });
      if (formData.profilePicture) {
        submitData.append('profilePicture', formData.profilePicture);
      }

      // Check for existing email/phone
      const checkResponse = await fetch('/api/patients/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone,
          excludeId: isEditing ? initialData?.email : undefined
        }),
      });

      const checkData = await checkResponse.json();
      if (checkData.exists) {
        throw new Error('A patient with this email or phone number already exists');
      }

      // Submit form
      const endpoint = isEditing
        ? `/api/patients/${initialData?.email}`
        : '/api/patients/register';

      const response = await fetch(endpoint, {
        method: isEditing ? 'PUT' : 'POST',
        body: submitData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      router.push('/users/patients');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[600px] mx-auto my-8">
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Patient' : 'Complete Registration'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name *
            </label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <Input value={formData.email} disabled />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone Number *
            </label>
            <Input
              id="phone"
              required
              value={formData.phone}
              onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
            <div className="flex items-center space-x-2 mt-1">
              <Checkbox
                id="isWhatsApp"
                checked={formData.isWhatsApp}
                onCheckedChange={(checked) =>
                  setFormData(prev => ({ ...prev, isWhatsApp: checked as boolean }))
                }
              />
              <label htmlFor="isWhatsApp" className="text-sm">
                This is my WhatsApp number
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Profile Picture</label>
            <div className="flex items-center space-x-4">
              {previewUrl && (
                <Image
                  src={previewUrl}
                  alt="Profile preview"
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                />
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Country *</label>
              <Select
                value={formData.country}
                onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  {/* Add more countries as needed */}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="city" className="text-sm font-medium">
                City *
              </label>
              <Input
                id="city"
                required
                value={formData.city}
                onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              required={!isEditing}
              checked={formData.acceptTerms}
              onCheckedChange={(checked) =>
                setFormData(prev => ({ ...prev, acceptTerms: checked as boolean }))
              }
            />
            <label htmlFor="terms" className="text-sm">
              I accept the privacy policy and terms and conditions of Medchoice One
            </label>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Processing...' : isEditing ? 'Save Changes' : 'Accept Invitation'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 