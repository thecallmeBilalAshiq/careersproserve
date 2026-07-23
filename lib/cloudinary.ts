/**
 * Cloudinary File Uploader Helper
 * Handles uploading CV documents (.pdf, .docx) and Payment Screenshots (.png, .jpeg, .webp)
 */

export async function uploadToCloudinary(
  file: File, 
  folder: 'resumes' | 'screenshots' | 'general' = 'general'
): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'careers_pro_serve';

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', `careers_pro_serve/${folder}`);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      console.warn('Cloudinary upload response not ok, fallback to data URL');
      return await fileToDataUrl(file);
    }

    const data = await res.json();
    return data.secure_url || data.url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return await fileToDataUrl(file);
  }
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}
