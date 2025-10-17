import PhotoUpload from '../PhotoUpload';

export default function PhotoUploadExample() {
  return (
    <div className="max-w-md">
      <PhotoUpload 
        maxPhotos={3}
        onPhotosChange={(photos) => console.log('Photos changed:', photos.length)}
      />
    </div>
  );
}
