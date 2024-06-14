/** @format */

// src/app/utils/googleMapsLoader.ts
let googleMapsScriptLoadingPromise: Promise<void> | null = null;

export const loadGoogleMapsScript = (): Promise<void> => {
  if (googleMapsScriptLoadingPromise) {
    return googleMapsScriptLoadingPromise;
  }

  googleMapsScriptLoadingPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector(
      'script[src*="maps.googleapis.com/maps/api/js"]'
    );

    if (existingScript) {
      if (existingScript.getAttribute("data-loaded") === "true") {
        resolve();
        return;
      } else {
        existingScript.addEventListener("load", () => resolve());
        existingScript.addEventListener("error", () => reject());
        return;
      }
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.setAttribute("data-loaded", "false");
    script.onload = () => {
      script.setAttribute("data-loaded", "true");
      resolve();
    };
    script.onerror = () => {
      reject(new Error("Failed to load Google Maps script"));
    };
    document.head.appendChild(script);
  });

  return googleMapsScriptLoadingPromise;
};
