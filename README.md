# Contentstack minimal custom app starter for NuxtJS

## Setup

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Provided composables

### useAppSdk

`const appSdk = useAppSdk();`

### useAppLocation

`const { locationName, location } = useAppLocation();`

### useAppConfig

`const appConfig = useAppConfig();`

### useCustomField

`const { customField, setFieldData, loading } = useCustomField();`

### useEntry

`const { entryData, loading } = useEntry();`

### useFrame

`const frame = useFrame();`

### useSdkDataByPath

`const stackKey = useSdkDataByPath('stack._data.api_key', '');`

## Read more

https://www.contentstack.com/docs/developers/developer-hub
