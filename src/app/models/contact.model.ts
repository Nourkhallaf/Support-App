export interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
    content: string;
    captcha: string;
    status: 'submitted' | 'resolved' | 'not-applicable';  
    createdDate: string; 

  }
  