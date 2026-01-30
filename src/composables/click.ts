// globalClickListener.ts
export class GlobalClickListener {
  private static instance: GlobalClickListener
  private callbacks: Set<(event: MouseEvent) => void> = new Set()

  private constructor() {
    document.addEventListener('click', this.handleClick.bind(this))
  }

  public static getInstance(): GlobalClickListener {
    if (!GlobalClickListener.instance) {
      GlobalClickListener.instance = new GlobalClickListener()
    }
    return GlobalClickListener.instance
  }

  private handleClick(event: MouseEvent): void {
    this.callbacks.forEach((callback) => callback(event))
  }

  public register(callback: (event: MouseEvent) => void): void {
    this.callbacks.add(callback)
  }

  public unregister(callback: (event: MouseEvent) => void): void {
    this.callbacks.delete(callback)
  }

  public destroy(): void {
    document.removeEventListener('click', this.handleClick)
    this.callbacks.clear()
    GlobalClickListener.instance = null!
  }
}

// 使用示例
// import { GlobalClickListener } from './globalClickListener';
// const listener = GlobalClickListener.getInstance();
// listener.register((event) => {
//   console.log('点击事件:', event.target);
// });
