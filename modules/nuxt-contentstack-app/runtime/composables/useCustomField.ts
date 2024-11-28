/**
 * Getter and setter hook for custom field data
 * @returns an object { customField, setFieldData, loading };
 *
 * Eg:
 * const { customField, setFieldData, loading } = useCustomField();
 */

export const useCustomField = async () => {
  const { location } = useAppLocation();
  const loading = ref(false)

  //@ts-ignore
  const fieldData = await location?.field.getData();
  const customField = ref(fieldData)

  const setFieldData = async (data: any) => {
    loading.value = true;
    if (location && "field" in location) {
      //@ts-ignore
      await location?.field.setData(data);
    }

    customField.value = data;
    loading.value = false;
  };

  return { customField, setFieldData, loading }
}
