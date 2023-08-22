export interface ICustomer {
  id: number;
  email: string;
  first_name: string;
  last_name?: string;
  phone?: string;
  address?: string;
  city?: string;
  user_id?: number;
  note?: string;
  status?: string;
  thumbnail_url?: string;
}
