export type Gender = 'male' | 'female' | 'other';
export type CertificateStatus = 'pending' | 'verified' | 'approved' | 'issued' | 'rejected';

export interface Birth {
  id: string;
  // Informations enfant
  childLastName: string;
  childFirstName: string;
  birthDate: string;
  birthTime?: string;
  birthPlace: string;
  gender: Gender;
  birthWeight?: string;
  
  // Informations parents
  motherName: string;
  motherId?: string;
  motherNationality?: string;
  fatherName: string;
  fatherId?: string;
  fatherNationality?: string;
  
  // Témoins
  witness1Name: string;
  witness1Id?: string;
  witness2Name: string;
  witness2Id?: string;
  
  // Certificat
  certificateStatus: CertificateStatus;
  certificateNumber?: string;
  issuedDate?: string;
  issuedBy?: string;
  
  // Métadonnées
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  synced: boolean;
}

