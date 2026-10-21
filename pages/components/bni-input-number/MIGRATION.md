# bni-input-keyboard — Legacy to New API Migration Guide

## Overview

The new API removes manual string parsing, clipboard management, and focus workarounds from the page layer. The component now handles all of these internally and returns clean typed values via callbacks.

---

## 1. Props

### Type

| Legacy | New |
|--------|-----|
| `type="amountWithClear"` | `type="multi-currency"` |
| `type="amountType"` | `type="amount"` |

Both legacy values still work via internal mapping, but prefer the new names in new code.

### Currency / prefix

| Legacy | New |
|--------|-----|
| `prefixIconText="Rp"` | `currency="Rp"` |
| `currencyType="Rp"` | **Remove** — prop no longer exists |

### Keyboard

| Legacy | New |
|--------|-----|
| `keyboardButtonText={{label}}` | `KB_ctaLabel={{label}}` |
| `textDoneTop` | `KB_ctaPosition="top"` |
| `closeMask` | `KB_allowDismissTap` |

### State / validation

| Legacy | New |
|--------|-----|
| `error={{true}}` | `state="error"` |
| `success={{true}}` | `state="success"` |
| `error={{false}}` | `state="default"` |

The old `error` prop accepts a boolean or string (e.g. `'errorMin'`, `'errorSof'`). The new `state` prop is always a string enum: `"default"` \| `"error"` \| `"success"`.

### Element IDs

| Legacy | New |
|--------|-----|
| `idLabel="..."` | `assignedId="{{ { label: '...' } }}"` |
| `idValue="..."` | `assignedId="{{ { value: '...' } }}"` |
| `idMessage="..."` | `assignedId="{{ { caption: '...' } }}"` |
| `idMessageIcon="..."` | `assignedId="{{ { iconError: '...' } }}"` |
| `idClearIcon="..."` | `assignedId="{{ { clearButton: '...' } }}"` |

Multiple IDs can be combined into one `assignedId` object.

### inputValue

| Legacy | New |
|--------|-----|
| `inputValue={{amountString}}` (formatted string) | `inputValue={{amount}}` (number) |

The old pattern fed a formatted string back to prevent the keyboard from closing (a component bug). That bug is fixed — pass the numeric value directly.

### Remove entirely

These props are no longer supported and should be removed:

- `currencyType`
- `isCaptionVisible` — hide the caption by passing an empty `caption` instead
- `counter`
- `clearIcon`
- `captionPlaceholder`
- `pixel`
- `inputFocusStatus` — was never a valid prop (correct name is `isFocused`, but no longer needed)
- `antdKeyboard` — use `KB_type="numeric"` instead

---

## 2. Callbacks

### onChange

**Legacy** — receives a formatted string, page parses manually:
```js
// AXML
onChange="onChange"

// JS
onChange(value) {
  const digits = value.replace(/\./g, '')
  const parsed = parseInt(digits, 10)
  this.setData({
    amount: parsed,
    amountString: parsed.toLocaleString('id-ID'),
  })
}
```

**New** — receives a typed object, no parsing needed:
```js
// AXML
onChange="onChange"

// JS
onChange({ value, valueString }) {
  // value   → Number (already parsed)
  // valueString → String (already formatted)
  this.setData({ amount: value })
}
```

---

### onPaste

**Legacy** — page reads clipboard manually:
```js
onPaste() {
  my.getClipboard({
    success: ({ text }) => {
      this.onChange(text)
    }
  })
}
```

**New** — component reads and processes clipboard, then calls back with the result:
```js
onPaste({ value, valueString }) {
  this.setData({ amount: value })
  // run any additional validation here if needed
}
```

---

### onFocus / onClose / onClear

| Callback | Legacy signature | New signature |
|----------|-----------------|---------------|
| `onFocus` | `onFocus()` — no args | `onFocus({ value, valueString })` |
| `onClose` | `onClose()` — no args | `onClose({ value, valueString, isFocused })` |
| `onClear` | `onClear()` — no args | `onClear({ value: 0, valueString: '' })` |

Old `onClear` implementations often called `this.onChange("")` to re-trigger validation. With the new API, reset your state directly:
```js
// Legacy
onClear() {
  this.onChange("")
}

// New
onClear({ value, valueString }) {
  this.setData({
    amount: 0,
    error: false,
    buttonDisabled: true,
  })
}
```

---

## 3. Page structure

### Remove the outer `<view onTap="onBlurXxx">` wrapper

The old pattern used a full-page tap listener to detect taps outside the input, manually toggling `isFocus` and checking `e.target.id`:

```xml
<!-- Legacy -->
<view onTap="onBlur">
  <bni-input-keyboard isFocused={{isFocus}} ... />
</view>
```

```js
// Legacy
onBlur(e) {
  if (e.target && e.target.id) {
    if (e.target.id.includes('input')) {
      this.setData({ isFocus: true })
    } else {
      this.setData({ isFocus: false })
    }
  }
}
```

This entire pattern is no longer needed. The component manages keyboard open/close internally. Use `KB_allowDismissTap` if you want tapping outside to close the keyboard:

```xml
<!-- New -->
<bni-input-keyboard
  KB_allowDismissTap
  onClose="onClose"
  ...
/>
```

Remove `isFocus` from page data entirely. Remove the `onBlur` (page-level) handler. The component's `onClose` callback is the correct hook for when the keyboard dismisses.

---

### Remove manual isFocus state management

**Legacy** — page tracks focus manually and echoes it back:
```js
// data
isFocus: Boolean(true)

// onFocus
onFocus() {
  this.setData({ isFocus: true, amountString: '' })
}

// onClose
onClose() {
  this.setData({ isFocus: false, amountString: '0' })
}
```
```xml
<bni-input-keyboard isFocused={{isFocus}} inputValue={{amountString}} />
```

**New** — component handles focus state internally:
```js
// no isFocus in data

onFocus({ value, valueString }) {
  // keyboard just opened — optional side effects only
},

onClose({ value, valueString }) {
  // keyboard just closed — run final validation if needed
  this.setData({
    error: value > 0 && value < this.data.minDeposit
  })
}
```
```xml
<bni-input-keyboard inputValue={{amount}} onFocus="onFocus" onClose="onClose" />
```

---

## 4. Full before/after example

### Before (dplk-gather-screen pattern)

```xml
<view onTap="onBlur">
  <bni-input-keyboard
    pixel
    inputFocusStatus={{isFocus}}
    type="amountWithClear"
    prefixIconText="Rp"
    currencyType="Rp"
    keyboardButtonText={{lang.done}}
    closeMask
    error={{amountError}}
    inputValue={{amountString}}
    caption={{amountErrorMessage}}
    idValue="screen-input"
    idMessage="screen-caption"
    idMessageIcon="screen-caption-icon"
    idClearIcon="screen-clear"
    onChange="onChange"
    onClear="onClear"
    onPaste="onPaste"
    onFocus="onFocus"
    onClose="onClose"
    counter={{false}}
    clearIcon="/assets/icons/ic_cancel.svg"
    captionPlaceholder={{true}}
    placeholder="0"
  />
</view>
```

```js
onChange(value) {
  const digits = value.replace(/\./g, '')
  const parsed = parseInt(digits, 10) || 0
  this.setData({
    amount: parsed,
    amountString: parsed.toLocaleString('id-ID'),
    amountError: parsed < this.data.minDeposit,
  })
},
onClear() { this.onChange('') },
onFocus() { this.setData({ isFocus: true, amountString: '' }) },
onClose() { this.setData({ isFocus: false, amountString: this.data.amountString || '0' }) },
onPaste() {
  my.getClipboard({ success: ({ text }) => { this.onChange(text) } })
},
onBlur(e) {
  const isInput = e.target && e.target.id && e.target.id.includes('input')
  this.setData({ isFocus: isInput })
},
```

### After

```xml
<bni-input-keyboard
  type="multi-currency"
  currency="Rp"
  KB_ctaLabel={{lang.done}}
  KB_allowDismissTap
  state="{{ amountError ? 'error' : 'default' }}"
  inputValue={{amount}}
  caption={{amountErrorMessage}}
  assignedId="{{ {
    value: 'screen-input',
    caption: 'screen-caption',
    iconError: 'screen-caption-icon',
    clearButton: 'screen-clear'
  } }}"
  KB_bottomLeftButton="thousand"
  language="id"
  placeholder="0"
  onChange="onChange"
  onClear="onClear"
  onPaste="onPaste"
  onClose="onClose"
/>
```

```js
onChange({ value, valueString }) {
  this.setData({
    amount: value,
    amountError: value > 0 && value < this.data.minDeposit,
  })
},
onClear({ value, valueString }) {
  this.setData({ amount: 0, amountError: false, buttonDisabled: true })
},
onClose({ value, valueString }) {
  this.setData({ amountError: value > 0 && value < this.data.minDeposit })
},
onPaste({ value, valueString }) {
  this.setData({
    amount: value,
    amountError: value > 0 && value < this.data.minDeposit,
  })
},
```

---

## 5. Migration checklist

- [ ] Replace `type="amountWithClear"` → `type="multi-currency"`, `type="amountType"` → `type="amount"`
- [ ] Replace `prefixIconText` → `currency`, remove `currencyType`
- [ ] Replace `keyboardButtonText` → `KB_ctaLabel`
- [ ] Replace `textDoneTop` → `KB_ctaPosition="top"`
- [ ] Replace `closeMask` → `KB_allowDismissTap`
- [ ] Replace `error={{bool}}` / `success={{bool}}` → `state="error"` / `state="success"` / `state="default"`
- [ ] Replace `idValue`, `idMessage`, etc. → `assignedId={{ { value, caption, iconError, clearButton } }}`
- [ ] Change `inputValue={{formattedString}}` → `inputValue={{numericValue}}`
- [ ] Update `onChange` to destructure `{ value, valueString }` — remove manual string parsing
- [ ] Update `onPaste` to receive `{ value, valueString }` — remove `my.getClipboard` call
- [ ] Update `onFocus`, `onClose`, `onClear` signatures to receive their respective objects
- [ ] Remove `<view onTap="onBlurXxx">` wrapper and the `onBlur` page handler
- [ ] Remove `isFocus` state and all manual focus echoing
- [ ] Remove `isFocused` / `inputFocusStatus` prop from the component binding
- [ ] Remove unsupported props: `pixel`, `counter`, `clearIcon`, `captionPlaceholder`, `isCaptionVisible`, `antdKeyboard`
