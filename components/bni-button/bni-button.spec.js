import { describe, it, expect, vi } from 'vitest';
import { getInstance } from '../../configTest/utils';
describe('Button Function and Prop Checking', function () {
  it('Func onTap', function () {
    var onTap = vi.fn();
    var instance = getInstance('bni-button', {
      onTap: onTap
    });
    instance.callMethod('handleEvent');
    expect(onTap).toBeCalled();
  });
  it('Func onTap', function () {
    var onTapPrimaryButton = vi.fn();
    var instance = getInstance('bni-button', {
      onTapPrimaryButton: onTapPrimaryButton
    });
    instance.callMethod('handlePrimaryButton');
    expect(onTapPrimaryButton).toBeCalled();
  });
  it('Func onTap', function () {
    var onTapSecondaryButton = vi.fn();
    var instance = getInstance('bni-button', {
      onTapSecondaryButton: onTapSecondaryButton
    });
    instance.callMethod('handleSecondaryButton');
    expect(onTapSecondaryButton).toBeCalled();
  });
  it('Type of button', function () {
    var type = "primary";
    var instance = getInstance("bni-button", {
      type: type
    });
    expect(instance.getData().type).toBe("primary");
  });
  it('Disabled button', function () {
    var disabled = true;
    var instance = getInstance("bni-button", {
      disabled: disabled
    });
    expect(instance.getData().disabled).toBeTruthy();
  });
  it('Compact button', function () {
    var compact = true;
    var instance = getInstance("bni-button", {
      compact: compact
    });
    expect(instance.getData().compact).toBeTruthy();
  });
  it('Ghost button', function () {
    var ghost = true;
    var instance = getInstance("bni-button", {
      ghost: ghost
    });
    expect(instance.getData().ghost).toBeTruthy();
  });
  it("Change State", function () {
    var ghost = true;
    var instance = getInstance("bni-button", {
      ghost: ghost
    });
    instance.setProps({
      ghost: false
    });
    expect(instance.getData().ghost).toBeFalsy();
  });
});