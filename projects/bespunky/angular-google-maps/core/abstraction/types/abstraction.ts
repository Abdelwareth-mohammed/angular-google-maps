import { ElementRef } from '@angular/core';

import { IGoogleMapsNativeObjectWrapper         } from '../base/i-google-maps-native-object-wrapper';
import { IGoogleMapsNativeObjectEmittingWrapper } from '../base/i-google-maps-native-object-emitting-wrapper';
import { IGoogleMapsNativeObject                } from '../native/i-google-maps-native-object';
import { FunctionsPartial                       } from './utils';

export type Native                                      = IGoogleMapsNativeObject;
export type NativeObjectFactory<TNative extends Native> = (...nativeArgs: any[]) => TNative;

export type Wrapper        <TNative extends Native = Native> = IGoogleMapsNativeObjectWrapper<TNative>;
export type EmittingWrapper<TNative extends Native = Native> = IGoogleMapsNativeObjectEmittingWrapper<TNative>;

/** Represents functions which can be used to instantiate a native Google Maps object wrapper. */
export type WrapperObjectFactory        <TWrapper extends Wrapper        , TOptions = any> = (element: ElementRef, options?: TOptions) => TWrapper;
/** Represents functions which can be used to instantiate a native Google Maps object wrapper which emits events. */
export type EmittingWrapperObjectFactory<TWrapper extends EmittingWrapper, TOptions = any> = (element: ElementRef, options?: TOptions) => TWrapper;

/**
 * Extracts a type containing only the functions properties of the native type, omitting the functions specified for exclusion.
 * Use this to declare an intellisense extension to a wrapper class. Remember to decorate the wrapper with @NativeObjectWrapper and inherit `GoogleMapsNativeObjectWrapper` or `GoogleMapsNativeObjectEmittingWrapper` to actually add
 * implementations to the delegated functions.
 * 
 * @example
 * // Add all native map functions to map wrapper intellisense (notice how this is an interface with the same name of the wrapper class).
 * export interface GoogleMap extends WrappedNativeFunctions<google.maps.Map, 'getMapTypeId' | 'setMapTypeId'>;
 */
export type WrappedNativeFunctions<TNative extends Object, TExcluded extends keyof FunctionsPartial<TNative> = never> = Omit<FunctionsPartial<TNative>, keyof Pick<TNative, TExcluded>>;

export type NativeOf<TWrapper> = TWrapper extends Wrapper<infer TNative> ? TNative : never;
