/** @format */

import { useRef, useState, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import {
  updatePropertyDetails,
  updatePropertyAddress,
} from "@/app/redux/features/listing/placeFormSlice";
import {
  updatePersonDetails,
  updatePersonAddress,
} from "@/app/redux/features/listing/personFormSlice";
import GoogleMapsLoader from "@/app/layouts/GoogleMapsLoader";
import Link from "next/link";

interface LocationInputProps {
  type?: string;
  label?: string;
  address?: string;
  placeholder: string;
  setSearchQuery?: (query: string) => void;
  hideBelowText?: boolean;
  searchSelectRef?: React.RefObject<HTMLInputElement>;
}

const LocationInput = ({
  type,
  label,
  address,
  placeholder,
  setSearchQuery,
  hideBelowText,
  searchSelectRef,
}: LocationInputProps) => {
  const dispatch = useDispatch();
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [hasError, setHasError] = useState(false);
  const [inputValue, setInputValue] = useState(address);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(address);
  }, [address]);

  const handleLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place) {
      const { governorate, city, formattedAddress, placeId, street } =
        getAddressDetails(place);

      if (governorate && city && formattedAddress && placeId) {
        setHasError(false);
        const newLocationDetails = {
          governorate,
          city,
          formattedAddress,
          placeId,
          street,
        };

        if (type === "place") {
          dispatch(
            updatePropertyDetails({ locationDetails: newLocationDetails })
          );
          dispatch(updatePropertyAddress(formattedAddress || place.name || ""));
        } else {
          dispatch(
            updatePersonDetails({ locationDetails: newLocationDetails })
          );
          dispatch(updatePersonAddress(formattedAddress || place.name || ""));
        }

        setInputValue(formattedAddress || place.name || "");
        if (setSearchQuery)
          setSearchQuery(formattedAddress || place.name || "");

        if (searchSelectRef && searchSelectRef.current) {
          searchSelectRef.current.focus();
        }
      } else {
        setHasError(true);
      }
    } else {
      setHasError(true);
    }
  };

  const getAddressDetails = (place: google.maps.places.PlaceResult) => {
    let governorate = "";
    let city = "";
    let street = "";
    let formattedAddress = place.formatted_address;
    let placeId = place.place_id;

    const addressComponents = place.address_components;

    if (
      addressComponents &&
      addressComponents[3] &&
      addressComponents[3].long_name === "Egypt"
    ) {
      governorate = addressComponents[2].long_name;
      city = addressComponents[1].long_name;
      street = addressComponents[0].long_name;
    } else if (
      addressComponents &&
      addressComponents[2] &&
      addressComponents[2].long_name === "Egypt"
    ) {
      governorate = addressComponents[1].long_name;
      city = addressComponents[0].long_name;
      street = place.name as string;
    } else if (
      addressComponents &&
      addressComponents[4] &&
      addressComponents[4].long_name === "Egypt"
    ) {
      governorate = addressComponents[3].long_name;
      city = addressComponents[2].long_name;
      street = addressComponents[0].long_name;
    } else if (
      addressComponents &&
      addressComponents[5] &&
      addressComponents[5].long_name === "Egypt"
    ) {
      governorate = addressComponents[4].long_name;
      city = addressComponents[3].long_name;
      street = addressComponents[1].long_name;
    } else if (
      addressComponents &&
      addressComponents[2] &&
      addressComponents[2].long_name === "Egypt"
    ) {
      governorate = addressComponents[1].long_name;
      city = addressComponents[0].long_name;
      street = place.name as string;
    }
    return { governorate, city, formattedAddress, placeId, street };
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  return (
    <GoogleMapsLoader>
      <div className="w-full">
        <label
          htmlFor={type}
          className="block text-lg font-medium text-gray-700 mb-2">
          {label}
        </label>
        <Autocomplete
          onLoad={handleLoad}
          onPlaceChanged={handlePlaceChanged}
          className="hide-autocomplete-loader"
          options={{
            componentRestrictions: { country: "eg" },
          }}>
          <input
            ref={inputRef}
            id={type}
            type="text"
            value={inputValue}
            placeholder={placeholder}
            className={`rounded-lg ${
              hasError ? "input-error border-red-500" : "border-teal-500 border"
            } w-full h-10 px-3 shadow-md text-sm outline-teal-500`}
            onContextMenu={handleContextMenu}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Autocomplete>
        {hasError && (
          <div className="text-xs text-red-500 mt-2 ml-2">
            <span>Incorrect address, please try again</span>
          </div>
        )}
        <Link href="#" className="text-xs text-teal-300 mt-2">
          {!hideBelowText ? "Having trouble finding your address?" : ""}
        </Link>
      </div>
    </GoogleMapsLoader>
  );
};

export default LocationInput;
