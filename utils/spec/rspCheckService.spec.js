import { describe, it, expect, beforeEach, vi } from 'vitest';
import { rspCheckService } from '../rspCheckService';

const my = {};
vi.stubGlobal('my', my);

describe('rspCheckService', () => {
  beforeEach(() => {
    my.call = vi.fn();
  });

  it('should return an object with correct boolean statuses for given services', async () => {
    my.call.mockImplementation((_eventName, { serviceName }, callback) => {
      if (serviceName === "app.config.wealth.rsp.feature.service.key") {
        callback(true);
      } else if (serviceName === "app.config.wealth.rsp.modify.feature.service.key") {
        callback(false);
      } else if (serviceName === "app.config.wealth.rsp.cancel.feature.service.key") {
        callback(null);
      }
    });

    const servicesToCheck = [
      "app.config.wealth.rsp.feature.service.key",
      "app.config.wealth.rsp.modify.feature.service.key",
      "app.config.wealth.rsp.cancel.feature.service.key",
    ];

    const featureFlags = await rspCheckService(servicesToCheck);

    expect(featureFlags).toEqual({
      rspFeatureOn: true,
      rspModifyFeatureOn: false,
      rspCancelFeatureOn: false,
    });

    expect(my.call).toHaveBeenCalledTimes(3);
  });

  it('should return an empty object if the input array is empty', async () => {
    const result = await rspCheckService([]);
    expect(result).toEqual({});
    expect(my.call).not.toHaveBeenCalled();
  });

  it('should return an empty object for invalid inputs like null or undefined', async () => {
    const resultNull = await rspCheckService(null);
    expect(resultNull).toEqual({});

    const resultUndefined = await rspCheckService(undefined);
    expect(resultUndefined).toEqual({});
  });

  it('should ignore service names that are not in the serviceKeyMap', async () => {
    my.call.mockImplementation((_eventName, { serviceName }, callback) => {
      if (serviceName === "app.config.wealth.rsp.feature.service.key") {
        callback(true);
      } else {
        callback(true);
      }
    });

    const servicesToCheck = [
      "app.config.wealth.rsp.feature.service.key",
      "some.unknown.service.key",
    ];

    const featureFlags = await rspCheckService(servicesToCheck);

    expect(featureFlags).toEqual({
      rspFeatureOn: true,
    });
    expect(featureFlags).not.toHaveProperty('some.unknown.service.key');
  });

  it('should handle a case where all services are enabled', async () => {
    my.call.mockImplementation((_eventName, _payload, callback) => {
      callback(true);
    });

    const servicesToCheck = [
      "app.config.wealth.rsp.feature.service.key",
      "app.config.wealth.rsp.modify.feature.service.key",
    ];

    const featureFlags = await rspCheckService(servicesToCheck);

    expect(featureFlags).toEqual({
      rspFeatureOn: true,
      rspModifyFeatureOn: true,
    });
  });

  it('should correctly build a partial error object if input contains mixed valid and invalid service names', async () => {
    const errorMessage = "Simulated API error";
    my.call.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    const servicesToCheck = [
      "app.config.wealth.rsp.modify.feature.service.key",
      "this.is.a.fake.service.key"
    ];

    const featureFlags = await rspCheckService(servicesToCheck);

    expect(featureFlags).toEqual({
      rspModifyFeatureOn: false,
    });
    expect(featureFlags).not.toHaveProperty('this.is.a.fake.service.key');
  });
});