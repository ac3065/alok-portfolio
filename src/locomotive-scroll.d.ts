declare module 'locomotive-scroll' {
  export interface LocomotiveScrollOptions {
    el?: HTMLElement | null;
    smooth?: boolean;
    multiplier?: number;
    class?: string;
    [key: string]: unknown; // Allows additional properties
  }

  export default class LocomotiveScroll {
    constructor(options?: LocomotiveScrollOptions);
    
    init(): void;
    destroy(): void;
    update(): void;
    scrollTo(
      target: string | number | HTMLElement, 
      options?: { offset?: number; duration?: number; easing?: [number, number, number, number] }
    ): void;
    
    on(event: 'scroll' | 'call' | string, callback: (args?: unknown) => void): void;
  }
}
