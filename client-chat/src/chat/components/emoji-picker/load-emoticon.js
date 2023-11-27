class LoadEmojiPack {
  constructor() {
    this.scripts = new Set();
    this.pack = new Map();
  }

  async inject(src) {
    if (this.scripts.has(src)) return;

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onerror = reject;
      script.onload = script.onreadystatechange = () => {
        this.scripts.add(src);
        resolve();
      };
      document.head.appendChild(script);
    });
  }

  async load(src, config) {
    if (this.pack.has(src)) return this.pack.get(src);
    try {
      await this.inject(src);
      const configData = await fetch(config).then((res) => res.json());
      this.pack.set(src, configData);
      return configData;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new LoadEmojiPack();
