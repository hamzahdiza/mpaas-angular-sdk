import { describe, it, expect, vi } from 'vitest';
import { getInstance } from '../../configTest/utils';

describe('bni-popover', () => {
  it('initializes in uncontrolled mode by default', () => {
    const instance = getInstance('bni-popover', {
      content: 'Tooltip text',
      placement: 'bottom',
    });

    const data = instance.getData();
    expect(data.effectiveColor).toBe('');
    expect(data.computedContentStyle).toBe('');
  });

  it('triggers onVisibleChange when handleVisibleChange is called', () => {
    const onVisibleChange = vi.fn();
    const instance = getInstance('bni-popover', {
      onVisibleChange,
    });

    instance.callMethod('handleVisibleChange', true, { type: 'tap' });
    expect(onVisibleChange).toHaveBeenCalledWith(true, { type: 'tap' });

    instance.callMethod('handleVisibleChange', false, { type: 'tap' });
    expect(onVisibleChange).toHaveBeenCalledWith(false, { type: 'tap' });
  });

  it('computes effectiveColor and textColor for light background', () => {
    const instance = getInstance('bni-popover', {
      backgroundColor: '#DADADA',
      textColor: '#0E0E0E',
    });

    const data = instance.getData();
    expect(data.effectiveColor).toBe('#DADADA');
    expect(data.computedContentStyle).toContain('color: #0E0E0E');
    expect(data.computedContentStyle).toContain('background-color: #DADADA');
  });

  it('automatically sets textColor to #0E0E0E for light colors like #DADADA when textColor is omitted', () => {
    const instance = getInstance('bni-popover', {
      color: '#DADADA',
    });

    const data = instance.getData();
    expect(data.effectiveColor).toBe('#DADADA');
    expect(data.computedContentStyle).toContain('color: #0E0E0E');
  });

  it('supports contentOffset and maxWidth to shift popover box inside viewport', () => {
    const instance = getInstance('bni-popover', {
      contentOffset: 65,
      maxWidth: 295,
    });

    const data = instance.getData();
    expect(data.computedContentStyle).toContain('position: relative; left: 65px');
    expect(data.computedContentStyle).toContain('max-width: 295px');
  });

  it('automatically sets effectiveColor to #DADADA when contentClassName is custom-popover-content', () => {
    const instance = getInstance('bni-popover', {
      contentClassName: 'custom-popover-content',
    });

    const data = instance.getData();
    expect(data.effectiveColor).toBe('#DADADA');
    expect(data.computedContentStyle).toContain('color: #0E0E0E');
  });

  it('supports custom arrowColor independent from backgroundColor', () => {
    const instance = getInstance('bni-popover', {
      backgroundColor: '#0E0E0E',
      textColor: '#FFFFFF',
      arrowColor: '#71DBD3',
    });
    expect(instance.getData().effectiveColor).toBe('#71DBD3');
    expect(instance.getData().computedContentStyle).toContain('background-color: #0E0E0E');
    expect(instance.getData().computedContentStyle).toContain('color: #FFFFFF');
  });

  it('updates computed styles on props update via didUpdate', () => {
    const instance = getInstance('bni-popover', {
      backgroundColor: '#404040',
      textColor: '#FFFFFF',
    });

    expect(instance.getData().effectiveColor).toBe('#404040');

    instance.setProps({
      backgroundColor: '#DADADA',
      textColor: '#0E0E0E',
    });

    expect(instance.getData().effectiveColor).toBe('#DADADA');
    expect(instance.getData().computedContentStyle).toContain('color: #0E0E0E');
  });

  it('supports arrowOffset to set --popover-arrow-offset CSS variable', () => {
    const numInstance = getInstance('bni-popover', {
      arrowOffset: 60,
    });
    expect(numInstance.getData().computedRootStyle).toContain('--popover-arrow-offset: 60px');

    const strInstance = getInstance('bni-popover', {
      arrowOffset: '-25',
    });
    expect(strInstance.getData().computedRootStyle).toContain('--popover-arrow-offset: -25px');

    const unitInstance = getInstance('bni-popover', {
      arrowOffset: '40px',
    });
    expect(unitInstance.getData().computedRootStyle).toContain('--popover-arrow-offset: 40px');
  });

  it('applies txt-body2 by default and txt-body2-px when pixel is true', () => {
    const defaultInstance = getInstance('bni-popover', {});
    expect(defaultInstance.getData().computedContentClassName).toBe('txt-body2');

    const pixelInstance = getInstance('bni-popover', { pixel: true });
    expect(pixelInstance.getData().computedContentClassName).toBe('txt-body2-px');

    const customInstance = getInstance('bni-popover', {
      pixel: true,
      contentClassName: 'my-custom-class',
    });
    expect(customInstance.getData().computedContentClassName).toBe('txt-body2-px my-custom-class');
  });

  it('keeps maxWidth 327 and contentOffset 80 on screens > 374px (e.g. 390px)', () => {
    const mockMy = {
      getSystemInfoSync: () => ({ windowWidth: 390 }),
    };

    const instance = getInstance(
      'bni-popover',
      {
        maxWidth: 327,
        contentOffset: 80,
      },
      mockMy
    );

    const style = instance.getData().computedContentStyle;
    expect(style).toContain('max-width: 327px');
    expect(style).toContain('position: relative; left: 80px');
  });

  it('automatically clamps maxWidth and scales contentOffset proportionally on screens <= 360px', () => {
    const mockMy = {
      getSystemInfoSync: () => ({ windowWidth: 360 }),
    };

    const instance = getInstance(
      'bni-popover',
      {
        maxWidth: 327,
        contentOffset: 80,
      },
      mockMy
    );

    const style = instance.getData().computedContentStyle;
    expect(style).toContain('max-width: 265px');
    expect(style).toContain('position: relative; left: 74px');
  });

  it('automatically clamps maxWidth and scales contentOffset proportionally on screens <= 320px (iPhone SE 1)', () => {
    const mockMy = {
      getSystemInfoSync: () => ({ windowWidth: 320 }),
    };

    const instance = getInstance(
      'bni-popover',
      {
        maxWidth: 327,
        contentOffset: 125,
      },
      mockMy
    );

    const style = instance.getData().computedContentStyle;
    expect(style).toContain('max-width: 245px');
    // 125 scaled proportionally to 320px screen (125 * 320 / 390 = 103px)
    expect(style).toContain('position: relative; left: 103px');
  });

  it('closes popover and triggers onVisibleChange when handleMaskTap is called', () => {
    const onVisibleChange = vi.fn();
    const instance = getInstance('bni-popover', {
      onVisibleChange,
    });

    instance.callMethod('handleVisibleChange', true, { type: 'tap' });
    expect(instance.getData().internalVisible).toBe(true);

    instance.callMethod('handleMaskTap', { type: 'maskTap' });
    expect(instance.getData().internalVisible).toBe(false);
    expect(onVisibleChange).toHaveBeenCalledWith(false, { type: 'maskTap' });
  });

  it('automatically closes previous open popover when a new popover opens', () => {
    const onVisibleChange1 = vi.fn();
    const onVisibleChange2 = vi.fn();
    const sharedMy = { canIUse: () => true };

    const instance1 = getInstance('bni-popover', { onVisibleChange: onVisibleChange1 }, sharedMy);
    const instance2 = getInstance('bni-popover', { onVisibleChange: onVisibleChange2 }, sharedMy);

    instance1.callMethod('handleVisibleChange', true, { type: 'tap' });
    expect(instance1.getData().internalVisible).toBe(true);

    instance2.callMethod('handleVisibleChange', true, { type: 'tap' });
    expect(instance2.getData().internalVisible).toBe(true);
    expect(instance1.getData().internalVisible).toBe(false);
    expect(onVisibleChange1).toHaveBeenCalledWith(false, { type: 'outsideClose' });
  });
});

