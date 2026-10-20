import { describe, it, expect } from 'vitest';
import { getInstance } from '../../configTest/utils';
describe('progress', function () {
  var typesToTest = ['line', 'circle', 'steps'];
  typesToTest.forEach(function (type) {
    it("props - type: ".concat(type), function () {
      var initialProps = {
        type: type,
        percent: 50,
        backgroundColor: '#FF0000',
        foregroundColor: '#0000FF',
        warning: true
      };
      var instance = getInstance('bni-progress', initialProps);
      expect(instance.getData().type).toBe(initialProps.type);
      expect(instance.getData().type).toBeTypeOf('string');
    });
  });
  it('props - type: steps', function () {
    var initialProps = {
      type: 'steps',
      percent: 20
    };
    var newProps = {
      type: 'steps',
      percent: 30
    };
    var instance = getInstance('bni-progress', initialProps);
    instance.setProps(newProps);
    expect(instance.getData().type).toBe(initialProps.type);
    expect(instance.getData().type).toBeTypeOf('string');
  });
  it('props - type: String', function () {
    var initialProps = {
      type: 'line'
    };
    var instance = getInstance('bni-progress', initialProps);
    expect(instance.getData().type).toBe(initialProps.type);
    expect(instance.getData().type).toBeTypeOf('string');
  });
  it('props - type: no type provided', function () {
    var type = 'line';
    var instance = getInstance('bni-progress');
    expect(instance.getData().type).toBe(type);
    expect(instance.getData().type).toBeTypeOf('string');
  });
  it('props - percent: Number', function () {
    var initialProps = {
      percent: 0
    };
    var instance = getInstance('bni-progress', initialProps);
    expect(instance.getData().percent).toBe(initialProps.percent);
    expect(instance.getData().percent).toBeTypeOf('number');
  });
  it('props - backgroundColor: String', function () {
    var initialProps = {
      backgroundColor: '#ECF789'
    };
    var instance = getInstance('bni-progress', initialProps);
    expect(instance.getData().backgroundColor).toBe(initialProps.backgroundColor);
    expect(instance.getData().backgroundColor).toBeTypeOf('string');
  });
  it('props - foregroundColor: String', function () {
    var initialProps = {
      foregroundColor: '#68702A'
    };
    var instance = getInstance('bni-progress', initialProps);
    expect(instance.getData().foregroundColor).toBe(initialProps.foregroundColor);
    expect(instance.getData().foregroundColor).toBeTypeOf('string');
  });
  it('props - warning: Boolean', function () {
    var initialProps = {
      warning: false
    };
    var instance = getInstance('bni-progress', initialProps);
    expect(instance.getData().warning).toBe(initialProps.warning);
    expect(instance.getData().warning).toBeTypeOf('boolean');
  });
  it('Change state', function () {
    var firstType = "line";
    var instance = getInstance('bni-progress', {
      type: firstType
    });
    instance.setProps({
      type: "circle"
    });
    expect(instance.getData().type).toBe('circle');
  });
  it('props - type: custom-circle', function () {
    var type = "custom-circle";
    var instance = getInstance('bni-progress', {
      type: type
    });
    expect(instance.getData().type).toBe('custom-circle');
  });
  it('call method transformCircle with degree 40', function () {
    var instance = getInstance('bni-progress', {
      type: 'circle'
    });
    instance.callMethod('transformCircle', 40);
    expect(instance.getData().rightTransform).toBe('rotate(189deg)');
  });
  it('call method transformCircle with degree 80', function () {
    var instance = getInstance('bni-progress', {
      type: 'circle'
    });
    instance.callMethod('transformCircle', 80);
    expect(instance.getData().rightTransform).toBe('rotate(225deg)');
    expect(instance.getData().leftTransform).toBe('rotate(153deg)');
  });
  it('props - type: String', function () {
    var initialProps = {
      type: 'line'
    };
    var instance = getInstance('bni-progress', initialProps);
    expect(instance.getData().type).toBe(initialProps.type);
    expect(instance.getData().type).toBeTypeOf('string');
  });
});