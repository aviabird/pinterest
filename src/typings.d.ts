// Typings reference file, you can add your own global typings here
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html
declare module 'phoenix_js' {
  class Socket {
    constructor(endPoint: any, opts: any) 
    connect(): void;
    disconnect(callback: any, code: any, reason: any): void;
    onOpen(callback: any): void;
    onError(callback: any): void;
    onClose(callback: any): void;
    channel(topic: any, chanParams?: {}): any;
  }
}