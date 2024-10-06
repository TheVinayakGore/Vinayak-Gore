declare module 'react-simple-typewriter' {
    interface UseTypewriterOptions {
      words: string[];
      loop?: boolean;
      typeSpeed?: number;
      deleteSpeed?: number;
      delaySpeed?: number;
    }
  
    export function useTypewriter(options: UseTypewriterOptions): [string];
  }