import type { LocationType } from "@contentstack/app-sdk/dist/src/types";

type AppSdkLocation = {
  [K in LocationType]?: string | null;
};

interface AppSdk {
  location?: AppSdkLocation;
}

/**
 * Returns the location name (eg: CustomField) and the location instance from the SDK
 * based on active location
 * @return { locationName, location }
 */
export const useAppLocation = () => {
  const { $appSdk } = useNuxtApp() as { $appSdk: AppSdk };
  const locations = $appSdk?.location && (Object.keys($appSdk.location) as LocationType[]);

  let location = {};
  let locationName = "";

  if (!locations || !$appSdk?.location) {
    return { location, locationName };
  }

  for (const loc of locations) {
    const typedLoc = loc as LocationType;
    if (typedLoc in $appSdk.location &&
      $appSdk.location[typedLoc] !== undefined &&
      $appSdk.location[typedLoc] !== null &&
      $appSdk.location[typedLoc] !== "") {
      locationName = typedLoc;
      location = $appSdk.location[typedLoc];
      break;
    }
  }

  return { location, locationName };
}