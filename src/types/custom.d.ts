declare module '@portabletext/react' {
    import { ReactNode } from 'react';
  
    export interface PortableTextProps {
      value: any[];
      components?: any;
    }
  
    export const PortableText: React.FC<PortableTextProps>;
  }