/**
 * Getter and setter hook for entry data
 * @returns an Object { entryData, loading };
 *
 * Eg:
 * const { entryData, loading } = useEntry();
 */
export const useEntry = async () => {
  const { location } = useAppLocation();
  const entryData = ref();
  const loading = ref(true)

  if (Object.keys(entryData.value).length > 0 || location === null) {
    return false
  }

  if ('entry' in location) {
    //@ts-ignore
    const entry: { [key: string]: unknown } | undefined = await location?.entry?.getData();
    entryData.value = entry;
    loading.value = false
  }

  return { entryData, loading }
}
