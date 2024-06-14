// src/app/layouts/GoogleMapsLoader.tsx
import { useEffect, useState, ReactNode } from "react";
import LoadingDoor from "@/app/components/loaders/door/LoadingDoor";
import { loadGoogleMapsScript } from "@/app/utils/googleMapsLoader";

interface GoogleMapsLoaderProps {
  children: ReactNode;
}

const GoogleMapsLoader: React.FC<GoogleMapsLoaderProps> = ({ children }) => {
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  useEffect(() => {
    loadGoogleMapsScript()
      .then(() => {
        setGoogleMapsLoaded(true);
      })
      .catch((error) => {
        console.error("Error loading Google Maps script:", error);
      });
  }, []);

  return <>{googleMapsLoaded ? children : <div className="flexCenter">
    <LoadingDoor size={30} />
    </div>}</>;
};

export default GoogleMapsLoader;
