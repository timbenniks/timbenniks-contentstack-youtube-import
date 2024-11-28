<script setup lang="ts">
const appSdk = useAppSdk();
const { location, locationName } = useAppLocation();
console.log(appSdk, location, locationName);
</script>

<template>
  <code>sidebar-widget</code>
</template>
