import { describe, it, expect } from 'vitest';
import { getInstance } from '../../configTest/utils';
describe('bni-chip props', function () {
  it('type is filled with "filled" value', function () {
    var type = "small";
    var instance = getInstance('bni-chip', {
      type: type
    });
    expect(instance.getData().type).toBe("small");
  });
  it('updates color in didUpdate lifecycle method', function () {
    var initialProps = {
      backgroundColor: "#EBBC44"
    };
    var instance = getInstance('bni-chip', initialProps);
    var newProps = {
      backgroundColor: "#D65C5C"
    };
    instance.setProps(newProps);
    expect(instance.getData().backgroundColor).toBe("#D65C5C");
  });
  it('no update  in didUpdate lifecycle method', function () {
    var initialProps = {
      backgroundColor: "#D65C5C"
    };
    var instance = getInstance('bni-chip', initialProps);
    var newProps = {
      backgroundColor: "#D65C5C"
    };
    instance.setProps(newProps);
    expect(instance.getData().color).toBe(initialProps.color);
  });
  it('type filled with true', function () {
    var type = "medium";
    var instance = getInstance('bni-chip', {
      type: type
    });
    expect(instance.getData().type).toBe("medium");
  });
  it('type filled with text', function () {
    var type = "medium";
    var instance = getInstance('bni-chip', {
      type: type
    });
    expect(instance.getData().type).toBe("medium");
  });
});