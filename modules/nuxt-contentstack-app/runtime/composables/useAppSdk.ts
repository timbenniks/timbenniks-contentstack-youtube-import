/**
 * Getter and setter for appSdk instance.
 * To be used during Sdk initialisation
 * @returns appSdk;
 *
 * Eg:
 * const appSdk = useAppSdk();
 */
export const useAppSdk = () => {
  const { $appSdk } = useNuxtApp();

  return $appSdk
}
