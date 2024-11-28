import ContentstackAppSDK from "@contentstack/app-sdk";
import type { GenericObjectType } from "@contentstack/app-sdk/dist/src/types/common.types";
import type UiLocation from "@contentstack/app-sdk/dist/src/uiLocation";

export type MarketplaceAppContextType = {
  appSdk: UiLocation | null;
  appConfig: GenericObjectType | null;
};

export default defineNuxtPlugin(async () => {
  const appSdk = await ContentstackAppSDK.init();
  const appConfig = await appSdk.getConfig();

  const marketplaceAppContext: MarketplaceAppContextType = {
    appSdk,
    appConfig
  }

  return {
    provide: {
      ...marketplaceAppContext
    },
  };
});