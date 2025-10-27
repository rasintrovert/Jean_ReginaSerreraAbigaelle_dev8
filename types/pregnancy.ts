export interface Pregnancy {
  id: string;
  motherName: string;
  fatherName: string;
  lastMenstruationDate: string;
  expectedDueDate: string;
  location: string;
  address?: string;
  prenatalCare: boolean;
  hospitalName?: string;
  notes?: string;
  status: 'pending' | 'synced';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

