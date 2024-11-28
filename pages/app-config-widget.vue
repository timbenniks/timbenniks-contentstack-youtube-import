<script setup lang="ts">
const appSdk = useAppSdk();
const { location, locationName } = useAppLocation();
console.log(appSdk, location, locationName);
</script>

<template>
  <code>app-config-widget</code>
</template>
