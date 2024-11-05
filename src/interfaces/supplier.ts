interface Supplier {
  id?: string;
  name: string;
  images?: string[];
  address?: {
    postalCode?: number;
    street?: string;
    city?: string;
    no?: number; // Exterior number
    neighborhood?: string;
  };
  contact?: {
    email?: string;
    phoneNumber?: string;
    socialMedia?: string[];
  };
  description?: string;
}

export type { Supplier };
