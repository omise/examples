export const loadScript = (src: string) =>
  new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.body.appendChild(script);
  });

export const unloadScript = (src: string) => {
  const scriptTag = document.querySelector(`script[src="${src}"]`);
  if (scriptTag) document.body.removeChild(scriptTag);
};
