import { assert } from "chai";
import { CacheService } from "../../src/service/CacheService";
import { setTimeout } from "timers/promises";

describe('01.01.00 - CacheService', () => {
    const cacheValue: string = "Hello, i'm Mocha."
    const cacheKeyName: string = "CacheService.Test"

    beforeEach(() => {
        CacheService.getInstance().cleanCache();
    });

    it('01.01.01 => Add data to the cache', (done) => {

        let state: boolean = CacheService.getInstance().setCache<string>(cacheKeyName, cacheValue);
        assert.isTrue(state);

        done();
    });

    it('01.01.02 => Add data to the cache and read the cache value', (done) => {

        let state: boolean = CacheService.getInstance().setCache<string>(cacheKeyName, cacheValue);
        assert.isTrue(state);

        let dataValue: string | undefined = CacheService.getInstance().getCache<string>(cacheKeyName);
        assert.equal(cacheValue, dataValue);

        done();
    });

    it('01.01.02 => Add data to cache and check key exists.', (done) => {

        let state: boolean = CacheService.getInstance().setCache<string>(cacheKeyName, cacheValue);
        assert.isTrue(state);

        let keyExists: boolean = CacheService.getInstance().checkIfExists(cacheKeyName);
        assert.equal(keyExists, true);

        done();
    });

    it('01.01.03 => Add data to cache and validate with an invalid key.', (done) => {

        let state: boolean = CacheService.getInstance().setCache<string>(cacheKeyName, cacheValue);
        assert.isTrue(state);

        let keyExists: boolean = CacheService.getInstance().checkIfExists("Toto");
        assert.equal(keyExists, false);

        done();
    });

    it('01.01.04 => Add data on cache and wait for expiration.', async () => {

        let state: boolean = CacheService.getInstance().setCache<string>(cacheKeyName, cacheValue, 3);
        assert.isTrue(state);

        // wait 5 secs
        await setTimeout(5000).then(() => {
            let dataValue: string | undefined = CacheService.getInstance().getCache<string>(cacheKeyName);
            assert.isUndefined(dataValue);
        });

    }).timeout(10000);

    it('01.01.05 => Add multi data on cache and get keylist', (done) => {

        let state1: boolean = CacheService.getInstance().setCache<string>("Key-1", cacheValue);
        let state2: boolean = CacheService.getInstance().setCache<string>("Key-2", cacheValue);
        assert.isTrue(state1);
        assert.isTrue(state2);

        let keyList: Array<string> = CacheService.getInstance().getKeyList();
        assert.ok(keyList);
        assert.equal(keyList.length, 2);

        done();
    });

    it('01.01.06 => Add multi data on cache and remove a key', (done) => {

        let state1: boolean = CacheService.getInstance().setCache<string>("Key-1", cacheValue);
        let state2: boolean = CacheService.getInstance().setCache<string>("Key-2", cacheValue);
        let state3: boolean = CacheService.getInstance().setCache<string>("Key-3", cacheValue);
        assert.isTrue(state1);
        assert.isTrue(state2);
        assert.isTrue(state3);

        let keyList: Array<string> = CacheService.getInstance().getKeyList();
        assert.ok(keyList);
        assert.equal(keyList.length, 3);

        let nbRemoveKey: number = CacheService.getInstance().removeCache("Key-1");
        keyList = CacheService.getInstance().getKeyList();
        assert.equal(nbRemoveKey, 1);
        assert.equal(keyList.length, 2);

        done();
    });

    it('01.01.07 => Add multi data on cache and clean the cache content', (done) => {

        let state1: boolean = CacheService.getInstance().setCache<string>("Key-1", cacheValue);
        let state2: boolean = CacheService.getInstance().setCache<string>("Key-2", cacheValue);
        assert.isTrue(state1);
        assert.isTrue(state2);

        CacheService.getInstance().cleanCache();

        let keyList: Array<string> = CacheService.getInstance().getKeyList();
        assert.equal(keyList.length, 0);

        done();
    });

    it('01.01.08 => Add data to the cache and check remaining delay', (done) => {

        let state: boolean = CacheService.getInstance().setCache<string>(cacheKeyName, cacheValue, 10);
        assert.isTrue(state);

        let delay: number | undefined = CacheService.getInstance().getDelayBeforeExpiration(cacheKeyName);
        assert.notEqual(delay, 10);

        done();
    });

}); // END : 'Test CacheService'
