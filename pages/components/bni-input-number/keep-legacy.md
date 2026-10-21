# bni-input-keyboard — Keeping Legacy Usage Working

This guide covers how to ensure existing screens that use the **old/legacy API** continue to work correctly with the updated `bni-input-keyboard` component.

---

## Required AXML Changes

These two changes are **mandatory** for legacy usage to function:

### 1. Add the `legacy` prop

Without `legacy`, props like `prefixIconText`, `keyboardButtonText`, `closeMask`, and `error` (boolean/string) are all ignored by the component's template expressions.

```diff
  <bni-input-keyboard
+   legacy
    type="amountWithClear"
    prefixIconText="Rp"
    ...
  />
```

### 2. Replace `inputFocusStatus` with `isFocused`

`inputFocusStatus` was never a recognized prop. The correct prop name is `isFocused`.

```diff
  <bni-input-keyboard
-   inputFocusStatus={{isFocus}}
+   isFocused={{isFocus}}
    ...
  />
```

---

## Props That Work With `legacy=true`

These legacy props are actively supported via conditional expressions in the component template:

| Legacy Prop | New Equivalent | Component Expression |
|---|---|---|
| `type="amountWithClear"` | `type="multi-currency"` | `handleLegacyType()` remaps internally |
| `type="amountType"` | `type="amount"` | `handleLegacyType()` remaps internally |
| `prefixIconText="Rp"` | `currency="Rp"` | `(legacy && prefixIconText) \|\| currency` |
| `keyboardButtonText` | `KB_ctaLabel` | `(legacy && keyboardButtonText) \|\| KB_ctaLabel` |
| `textDoneTop` | `KB_ctaPosition="top"` | `(legacy && textDoneTop) ? 'top' : KB_ctaPosition` |
| `closeMask` | `KB_allowDismissTap` | `KB_allowDismissTap \|\| (legacy && closeMask)` |
| `error={{bool/string}}` | `state="error"` | `(legacy && error) \|\| state === 'error'` |
| `success={{bool}}` | `state="success"` | `(legacy && success) \|\| state === 'success'` |
| `idLabel` | `assignedId.label` | `idLabel \|\| (assignedId && assignedId.label)` |
| `idValue` | `assignedId.value` | `idValue \|\| (assignedId && assignedId.value)` |
| `idMessage` | `assignedId.caption` | `idMessage \|\| (assignedId && assignedId.caption)` |
| `idMessageIcon` | `assignedId.iconError` | `idMessageIcon \|\| (assignedId && assignedId.iconError)` |
| `inputValue` as string | `inputValue` as number | `typeof` check routes strings to `paste` handler |
| `onChange(valueString)` | `onChange({ value, valueString })` | `if (!legacy) result = {...}` else `result = valueString` |

---

## Props That Are Silently Ignored (No-Op)

These legacy props no longer have any effect. Passing them does not cause errors, but their intended behavior is gone:

| Prop | Note |
|---|---|
| `pixel` | Layout is no longer pixel-based |
| `currencyType` | Not referenced in template or logic |
| `counter` | Not referenced |
| `clearIcon` | Clear button uses internal CSS icon only |
| `captionPlaceholder` | Not referenced |
| `isCaptionVisible` | Caption is always rendered when `caption` has content |
| `antdKeyboard` | Use `KB_type="numeric"` instead |
| `idClearIcon` | Clear button has no assignable ID in template |
| `prefixText` | Not the same as `prefixIconText`, not referenced |
| `inputLabel` | Use `label` instead |

These can be left in place (no harm) or removed for cleanliness.

---

## JS Handlers — No Changes Needed

The existing legacy JS handler patterns continue to work with `legacy=true`:

### onChange

```js
// Legacy: receives formatted string — works with legacy=true
onChange(value) {
  const plainNumber = value.replace(/\./g, '')
  const parsed = parseInt(plainNumber, 10)
  this.setData({
    amount: parsed,
    amountString: parsed.toLocaleString('id-ID'),
  })
}
```

### onClear

```js
// Legacy: calls onChange with empty string — works fine
onClear() {
  this.onChange("")
}
```

### onPaste

```js
// Legacy: reads clipboard manually — redundant but not breaking
// The component already reads clipboard internally and calls
// onPaste({ value, valueString }) back, but the legacy handler
// ignores the argument and reads clipboard again.
onPaste() {
  my.getClipboard({
    success: ({ text }) => {
      this.onChange(text)
    },
  })
}
```

### onFocus / onClose / onBlur

```js
// Legacy: manual isFocus management — still works
// The component also manages focus internally, but the page-level
// isFocus state feeding back via isFocused prop is harmless
// (didUpdate overrides isFocused with internal state).
onFocus() {
  this.setData({ isFocus: true })
},
onClose() {
  this.setData({ isFocus: false })
},
// Outer <view onTap="onBlur"> pattern — redundant when closeMask is
// active, but harmless to keep.
onBlur(e) {
  if (e.target && e.target.id) {
    const isInput = e.target.id.includes('input')
    this.setData({ isFocus: isInput })
  } else {
    this.setData({ isFocus: false })
  }
}
```

---

## Checklist

- [ ] Add `legacy` prop to `<bni-input-keyboard>`
- [ ] Replace `inputFocusStatus` with `isFocused`
- [ ] Verify `prefixIconText` value displays correctly (shows "Rp")
- [ ] Verify `keyboardButtonText` value displays on keyboard CTA
- [ ] Verify `error` styling applies (border turns red on validation error)
- [ ] Verify `closeMask` dismisses keyboard on tap outside
- [ ] Verify `isFocused={{true}}` opens keyboard on page enter
- [ ] Verify `onChange` receives a formatted string (not an object)
- [ ] Optionally remove no-op props (`pixel`, `currencyType`, `counter`, `clearIcon`, `captionPlaceholder`, `isCaptionVisible`) for cleanliness
