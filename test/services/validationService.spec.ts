import { assert, expect } from "chai";
import { ValidationService } from "../../src";
// import { ValidationService } from "../../src/service/ValidationService";

describe('01.03.00 - ValidationService', () => {

    it('01.03.01 => Convert REGION to official PLATFORM REGION', (done) => {
        let testRegion: string[] = ['NA', 'EUW', 'EUNE', 'JP', 'KR', 'LA1', 'LA2', 'OC', 'TR', 'RU'];

        testRegion.forEach(region => {
            const realRegion: string = ValidationService.convertToRealRegion(region);
            const mappingRegion: string = ValidationService.regionDataMapping[region.toUpperCase()];

            assert.ok(realRegion);
            assert.ok(mappingRegion);
            assert.isNotEmpty(realRegion);
            assert.isNotEmpty(mappingRegion);

            assert.equal(realRegion, mappingRegion);
        });

        done();
    }).timeout(10000);

    it('01.03.02 => Convert REGION to official GLOBAL REGION', (done) => {
        let testRegion: string[] = ['NA', 'EUW', 'EUNE', 'JP', 'KR', 'LA1', 'LA2', 'OC', 'TR', 'RU'];

        testRegion.forEach(region => {
            const platformRegion: string = ValidationService.convertToRealRegion(region);
            const globalRegion: string = ValidationService.convertToGlobalRegion(platformRegion);

            const mappingRegion: string = ValidationService.globalRegionDataMapping[platformRegion.toUpperCase()];

            assert.ok(platformRegion);
            assert.ok(globalRegion);
            assert.ok(mappingRegion);

            assert.isNotEmpty(platformRegion);
            assert.isNotEmpty(globalRegion);
            assert.isNotEmpty(mappingRegion);

            assert.equal(globalRegion, mappingRegion);
        });

        done();
    }).timeout(10000);

    it('01.03.03 => Try convert REGION to official PLATFORM REGION with invalid input', (done) => {
        try {
            const returnData: string = ValidationService.convertToRealRegion('NA2');

            assert.fail(returnData);

        } catch (error: any) {
            assert.ok(error);
            assert.isNotNull(error);
            assert.isNotNull(error.message);
            expect(error.message).to.contain('is invalid.');
        }

        done();
    });

    it('01.03.04 => Try convert REGION to official PLATFORM REGION with empty input', (done) => {
        try {
            ValidationService.convertToRealRegion('');
        } catch (error: any) {
            assert.ok(error);
            assert.isNotNull(error);
            expect(error.message).to.contain('is mandatory.');
        }

        done();
    });

    it('01.03.05 => Convert REGION to official GLOBAL REGION', (done) => {
        try {
            const globalRegion: string = ValidationService.convertToGlobalRegion("NA2");

            assert.fail(globalRegion);
        } catch (error: any) {
            assert.ok(error);
            assert.isNotNull(error);
            assert.isNotNull(error.message);
            expect(error.message).to.contain('is invalid.');
        }

        done();
    }).timeout(10000);

    it('01.03.06 => Try convert REGION to official GLOBAL REGION with empty input', (done) => {
        try {
            ValidationService.convertToGlobalRegion('');

        } catch (error: any) {
            assert.ok(error);
            assert.isNotNull(error);
            expect(error.message).to.contain('is mandatory.');
        }
        
        done();
    });


}); // END : 'Test ValidationService'
