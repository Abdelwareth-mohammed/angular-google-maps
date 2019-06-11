import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { createDefaultTestModuleConfig, expectPositionEquals } from '../testing/utils';
import { GoogleMapsApiService } from '../core/api/google-maps-api.service';
import { GoogleMap } from './google-map';
import { Defaults } from '../core/config/defaults';
import { ZoomLevel } from './types/zoom-level.enum';
import { GoogleMapsMarker } from './overlays/marker/google-maps-marker';

const elementStub: any = document.createElement('div');

describe('GoogleMap', () =>
{
    let map: GoogleMap;
    let api: GoogleMapsApiService;
    let mapElement: ElementRef;
    let runOutsideAngularSpy: jasmine.Spy;

    beforeEach(() =>
    {
        TestBed.configureTestingModule(createDefaultTestModuleConfig());

        api = TestBed.get(GoogleMapsApiService);

        runOutsideAngularSpy = spyOn(api, 'runOutsideAngular').and.callFake((fn: () => void) => fn());

        mapElement = new ElementRef(elementStub);
        map = new GoogleMap(mapElement, api);
    });

    describe('basically', () =>
    {
        it('should create an instance', () => expect(map).toBeTruthy());

        it('should wait for api and create a native map outside of angular with default center and zoom', async () =>
        {
            await api.whenReady;

            const nativeMap = await map.native;

            expect(runOutsideAngularSpy).toHaveBeenCalledTimes(1);
            expect(nativeMap instanceof google.maps.Map).toBeTruthy();

            expect(nativeMap.getCenter().lat()).toBeCloseTo(Defaults.Center.lat, 6);
            expect(nativeMap.getCenter().lng()).toBeCloseTo(Defaults.Center.lng, 6);
            expect(nativeMap.getZoom()).toBe(Defaults.ZoomLevel);
        });

        it('should allow creation of the native map with specific center and zoom', async () =>
        {
            await api.whenReady;

            const customCenter = { lat: 10, lng: 10 };
            const customZoom = ZoomLevel.World;

            const customMap = new GoogleMap(mapElement, api, customCenter, customZoom);
            const nativeMap = await customMap.native;

            expectPositionEquals(await nativeMap.getCenter(), customCenter);
            expect(nativeMap.getZoom()).toBe(customZoom);
        });

        it('should wait for the api and return the native map when calling the `native` getter', async () => expect(await map.native).toBeDefined());
    });

    describe('upon calling get functions', () =>
    {
        it('should wait for api and retrieve the map\'s center', async () => expect(await map.getCenter() instanceof google.maps.LatLng).toBeTruthy());
        it('should wait for api and retrieve the map\'s zoom', async () => expect(await map.getZoom()).toBeGreaterThanOrEqual(0));
    });

    describe('upon calling set functions', () =>
    {
        beforeEach(() => runOutsideAngularSpy.calls.reset());

        it('should wait for api and set the map\'s center outside of angular', async () =>
        {
            const center = { lat: 10, lng: 10 };

            map.setCenter(center);

            expect(runOutsideAngularSpy).toHaveBeenCalledTimes(1);

            expectPositionEquals(await map.getCenter(), center);
        });

        it('should wait for api and set the map\'s zoom outside of angular', async () =>
        {
            const zoom = ZoomLevel.LandmassOrContinent;

            map.setZoom(zoom);

            expect(runOutsideAngularSpy).toHaveBeenCalledTimes(1);
            expect(await map.getZoom()).toBe(zoom);
        });
    });

    describe('overlay management', () =>
    {
        beforeEach(() => runOutsideAngularSpy.calls.reset());

        it('should create a marker associated with the map outside angular when calling `createMarker()`', async () =>
        {
            const options: google.maps.ReadonlyMarkerOptions = {
                position: Defaults.Center
            };

            const marker = await map.createMarker(options);

            expect(runOutsideAngularSpy).toHaveBeenCalledTimes(2); // Once by createMarker(), once by the inherited GoogleMapsDrawableOverlay calling setContainingMap()
            expect(marker instanceof GoogleMapsMarker).toBeTruthy();
        });
    });
});
