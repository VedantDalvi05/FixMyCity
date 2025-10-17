import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

interface BeforeAfterComparisonProps {
  beforePhoto: string;
  afterPhoto?: string | null;
  onAfterPhotoUpload?: (photo: File) => void;
  showUpload?: boolean;
}

export default function BeforeAfterComparison({ 
  beforePhoto, 
  afterPhoto, 
  onAfterPhotoUpload,
  showUpload = false 
}: BeforeAfterComparisonProps) {
  const [afterPreview, setAfterPreview] = useState<string | null>(afterPhoto || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAfterPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onAfterPhotoUpload?.(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Before & After Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Before Photo */}
          <div>
            <h4 className="text-sm font-medium mb-2 text-muted-foreground">Before</h4>
            <img 
              src={beforePhoto} 
              alt="Before" 
              className="w-full h-64 object-cover rounded-lg border"
            />
          </div>

          {/* After Photo */}
          <div>
            <h4 className="text-sm font-medium mb-2 text-muted-foreground">After</h4>
            {afterPreview ? (
              <img 
                src={afterPreview} 
                alt="After" 
                className="w-full h-64 object-cover rounded-lg border"
              />
            ) : showUpload ? (
              <div className="w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-4 bg-muted/20">
                <p className="text-sm text-muted-foreground text-center px-4">
                  Upload an 'after' photo to show the resolved issue
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  data-testid="input-after-photo"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  data-testid="button-upload-after-photo"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload After Photo
                </Button>
              </div>
            ) : (
              <div className="w-full h-64 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/20">
                <p className="text-sm text-muted-foreground">No after photo yet</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
