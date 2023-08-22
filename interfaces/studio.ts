export interface IStudioCategory {
  id: number;
  created_at: string;
  name: string;
}

export interface IStudio {
  id: number;
  created_at: string;
  name: string;
  short_description: string;
  timezone: string;
  location: string;
  rate_per_hour: number;
  capacity: number;
  tags: string;
  description: string;
  thumbnail_url: string;
  status: string;
  is_active: boolean;
  floor: string;
  slugs: string;
  category_id: number;
  category?: IStudioCategory;
  gallery_image_urls: string[];
  featured_image_urls: string[];
}
