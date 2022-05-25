class Timer {
  private timeouts: Map<ReturnType<typeof setTimeout>, ((reason: any) => void)> = new Map();

  wait(time: number) {
    return new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        // Remove the timeout after it has been completed
        this.timeouts.delete(timeout);

        // Resolve the promise
        resolve();
      }, time)

      // Add the promise to the set of promises
      this.timeouts.set(timeout, reject)
    })
  }

  cancelAll() {
    // For all currently running timeouts...
    for (const [timeout, reject] of this.timeouts.entries()) {
      clearTimeout(timeout);
      reject(new Error("All timeouts has been cancelled."));
    }
  }
}

export { Timer }
