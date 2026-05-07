/**
 * Utility to resolve asset paths for GitHub Pages and Cloud Storage.
 */

const isProd = process.env.NODE_ENV === 'production';
const BASE_PATH = isProd ? '/Hospital-Device-Ecom-Web-3D' : '';

// Toggle this to use a Cloud Storage provider (e.g., Cloudinary, Supabase Storage)
// If empty, it uses the local public folder with the correct BASE_PATH
const CLOUD_STORAGE_URL = ''; 

/**
 * Resolves the correct path for an asset.
 * @param path The relative path to the asset (e.g., '/image.png')
 * @returns The resolved URL or path
 */
export const getAssetPath = (path: string): string => {
  if (!path) return '';
  
  // If path is already an absolute URL, return it
  if (path.startsWith('http')) return path;

  // If Cloud Storage is configured, use it
  if (CLOUD_STORAGE_URL) {
    return `${CLOUD_STORAGE_URL}${path.startsWith('/') ? path : '/' + path}`;
  }

  // Fallback to local assets with BASE_PATH for GitHub Pages
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${cleanPath}`;
};
