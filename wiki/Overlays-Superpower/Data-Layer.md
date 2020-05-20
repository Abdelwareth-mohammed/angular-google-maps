# Tools
| Package 📦  | `@bespunky/angular-google-maps/overlays` |
|--------------|------------------------------------------|
| Directive ⚙ | `<bs-google-maps-data/>`                 |
| Wrapper 🧬  | `GoogleMapsData`                         |

# Concepts
The data layer is [different to the rest of the overlays](/Overlays-Superpower#Data-Layer-vs.-Normal-Overlays). It doesn't do much on its own, and is meant to be used in conjunction with [geometry features](/Overlays-Superpower/Data-Layer/Geometry-Features).

You must either place geometry feature directives inside of the data directive or use the wrapper to create the features.

[Wrapper API](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Foverlays%2Fmodules%2Fdata%2Fgoogle-maps-data.ts&version=GBmaster) | [Directive API](https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps?path=%2Fprojects%2Fbespunky%2Fangular-google-maps%2Foverlays%2Fmodules%2Fdata%2Fdirective%2Fgoogle-maps-data.directive.ts&version=GBmaster)

## Feature Events
The native data layer object raises events for features it holds, which in turn means you'd have to find out which feature raised the event. `<bs-google-maps-data/>` and `<bs-google-maps-feature>` play nicely together to bridge this. See [Geometry Features](/Overlays-Superpower/Data-Layer/Geometry-Features).

## Feature Tracking
<small>[How do I access the wrapper?](/Programmatic-Control)</small>

The wrapper implements feature tracking automatically. Access tracked features using the `features` property:
```typescript
const data = ... // Fetch the data layer wrapper

const yourFeatures = data.features.list; // GoogleMapsFeature[]
```

# See Also

| Topic                             | Description                 |
|-----------------------------------|-----------------------------|
| [Geometry Types](/Geometry-Types) | Flexibility for geometries. |