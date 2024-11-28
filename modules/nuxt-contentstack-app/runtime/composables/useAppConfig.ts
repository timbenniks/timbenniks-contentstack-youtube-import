/**
 * Getter and setter hook for App config
 * @returns appConfig;
 *
 * Eg:
 * const appConfig = useAppConfig();
 */
export const useAppConfig = () => {
  const { $appConfig } = useNuxtApp();

  return $appConfig
}
