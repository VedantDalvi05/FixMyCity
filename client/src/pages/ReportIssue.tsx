import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PhotoUpload from '@/components/PhotoUpload';
import { MapPin, Navigation, WifiOff } from 'lucide-react';
import { getResolutionETA } from '@/lib/mockData';
import { isOnline, savePendingReport, useOnlineStatus } from '@/lib/offlineQueue';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/authContext';
import { submitIssue } from '@/lib/apiHelpers';
import type { Issue } from '@/lib/mockData';

export default function ReportIssue() {
  const [, setLocation] = useLocation();
  const [category, setCategory] = useState<Issue['category'] | ''>('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [detecting, setDetecting] = useState(false);
  const [online, setOnline] = useState(isOnline());
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const cleanup = useOnlineStatus((status) => {
      setOnline(status);
      if (status) {
        toast({
          title: 'Back online',
          description: 'You can now submit reports normally',
        });
      }
    });
    return cleanup;
  }, [toast]);

  const detectLocation = () => {
    setDetecting(true);
    // Mock GPS detection
    setTimeout(() => {
      setAddress('123 Main St, Airoli, Navi Mumbai, Maharashtra 400708');
      setDetecting(false);
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to submit a report.',
        variant: 'destructive'
      });
      return;
    }

    setSubmitting(true);

    try {
      if (!online) {
        // Save to offline queue
        const photoPromises = photos.map(file => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
        });

        const base64Photos = await Promise.all(photoPromises);
        savePendingReport({
          category: category as Issue['category'],
          description,
          photos: base64Photos,
          address
        });

        toast({
          title: 'Saved offline',
          description: "You're offline. Your report has been saved and will be submitted when you're back online.",
          variant: 'default'
        });
        setLocation('/my-reports');
        return;
      }

      // Online submission via API
      const photoPromises = photos.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });

      const base64Photos = await Promise.all(photoPromises);

      const submittedIssue = await submitIssue({
        category: category as Issue['category'],
        description,
        address,
        photos: base64Photos,
        reporterId: user.id,
        reporterName: user.username,
        reporterContact: user.username // Using username as contact for now
      });

      toast({
        title: 'Report submitted',
        description: `Your ticket ID is: ${submittedIssue.id}`,
      });
      setLocation('/my-reports');
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: 'Submission failed',
        description: 'Failed to submit report. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Report an Issue</h1>
          <p className="text-muted-foreground">Help us improve our city by reporting civic issues</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Issue Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={(val) => setCategory(val as Issue['category'])} required>
                  <SelectTrigger data-testid="select-category">
                    <SelectValue placeholder="Select issue category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="potholes">Potholes</SelectItem>
                    <SelectItem value="garbage">Garbage</SelectItem>
                    <SelectItem value="streetlight">Streetlight</SelectItem>
                    <SelectItem value="drainage">Drainage</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {category && (
                  <p className="text-sm text-muted-foreground mt-2" data-testid="text-eta">
                    {getResolutionETA(category as Issue['category'])}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue in detail..."
                  rows={4}
                  data-testid="input-description"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Photos (Optional, max 3)</Label>
                <PhotoUpload onPhotosChange={setPhotos} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Location *</Label>
                <div className="flex gap-2">
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter address or detect GPS"
                    data-testid="input-address"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={detectLocation}
                    disabled={detecting}
                    data-testid="button-detect-location"
                  >
                    {detecting ? (
                      <Navigation className="w-4 h-4 animate-pulse" />
                    ) : (
                      <MapPin className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {!online && (
                <div className="flex items-center gap-2 text-sm bg-warning/10 text-warning p-3 rounded-lg">
                  <WifiOff className="w-4 h-4" />
                  <span>You're offline. Report will be saved and submitted when connection is restored.</span>
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLocation('/my-reports')}
                  className="flex-1"
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  data-testid="button-submit-report"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : (online ? 'Submit Report' : 'Save Offline')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
