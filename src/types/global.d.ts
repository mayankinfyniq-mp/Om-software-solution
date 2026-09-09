declare global {
  interface Window {
    /** Set to true once the preloader has finished and dispatched "om:enter". */
    __omEnter?: boolean;
  }
}

export {};
