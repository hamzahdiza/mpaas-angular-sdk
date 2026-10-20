/**
 * @component animated-guide
 * @description Coachmark overlay komponen dengan spotlight highlight dan tooltip.
 * Komponen ini mengelola query DOM, posisi highlight, dan scroll lock secara internal.
 *
 * @prop {boolean}  visible            - Tampilkan atau sembunyikan overlay coachmark
 * @prop {number}   step               - Nomor step saat ini (1-based). Set 0 untuk menyembunyikan.
 * @prop {number}   totalSteps         - Total jumlah step coachmark (default: 4)
 * @prop {string}   title              - Judul tooltip pada step aktif
 * @prop {string}   description        - Deskripsi tooltip pada step aktif
 * @prop {string}   primaryButtonName  - Label tombol lanjut (default: 'Lanjut')
 * @prop {string}   secondaryButtonName- Label tombol lewati (default: 'Lewati')
 * @prop {string}   selector           - CSS selector elemen yang akan di-highlight, contoh: '.lp-section'
 * @prop {boolean}  selectorAdjust     - Jika true, tambahkan kompensasi padding/margin untuk section card
 * @prop {string}   placement          - Posisi tooltip relatif terhadap highlight: 'top' | 'bottom'
 * @prop {Function} onHandleSubmitButton - Callback saat tombol lanjut ditekan
 * @prop {Function} onHandleBackButton   - Callback saat tombol lewati/kembali ditekan
 */
Component({
  data: {
    statusBarHeight: 0,
    highlightPosition: { top: 0, right: 0, width: 0, height: 0, left: 0 },
    placement: 'bottom',
    ready: false
  },
  props: {
    visible: false,
    step: 0,
    totalSteps: 4,
    title: '',
    description: '',
    primaryButtonName: 'Lanjut',
    secondaryButtonName: 'Lewati',
    // Selector string of the element to highlight, e.g. '.my-section'
    selector: '',
    // Whether to apply section-level rect adjustment (padding/margin compensation)
    selectorAdjust: false,
    // 'top' or 'bottom' — where to show the tooltip relative to the highlight
    placement: 'bottom',
    onHandleSubmitButton: () => {},
    onHandleBackButton: () => {}
  },
  didMount() {
    my.getSystemInfo({
      success: (res) => {
        this.setData({ statusBarHeight: res.statusBarHeight || 0 });
      }
    });
  },
  didUpdate(prevProps) {
    const selectorChanged = prevProps.selector !== this.props.selector;
    const stepChanged = prevProps.step !== this.props.step;
    const visibleChanged = prevProps.visible !== this.props.visible;

    if ((selectorChanged || stepChanged || visibleChanged) && this.props.visible && this.props.selector) {
      this._resolveHighlight();
    }

    // When hidden, unlock scroll
    if (prevProps.visible && !this.props.visible) {
      this._unlockScroll(false);
      this.setData({ ready: false });
    }
  },
  methods: {
    preventTouchMove() {
      return false;
    },

    onSubmit() {
      if (this.props.onHandleSubmitButton) {
        this.props.onHandleSubmitButton();
      }
    },

    onBack() {
      if (this.props.onHandleBackButton) {
        this.props.onHandleBackButton();
      }
    },

    // Internal: query the DOM for the selector and compute highlight position
    _resolveHighlight() {
      const selector = this.props.selector;
      if (!selector) return;

      this.setData({ ready: false });

      my.createSelectorQuery()
        .select(selector).boundingClientRect()
        .exec((ret) => {
          const rect = Array.isArray(ret[0]) ? ret[0][0] : ret[0];
          if (!rect) return;

          let adjustedRect = { ...rect };

          // Optional adjustment: compensate for section-level padding/margin
          if (this.props.selectorAdjust) {
            adjustedRect.left += 16;
            adjustedRect.width -= 32;
            adjustedRect.top -= 12;
            adjustedRect.height += 24;
          }

          this.setData({
            highlightPosition: {
              top: adjustedRect.top,
              left: adjustedRect.left,
              width: adjustedRect.width,
              height: adjustedRect.height
            },
            placement: this.props.placement || 'bottom',
            ready: true
          }, () => {
            this._lockScroll();
          });
        });
    },

    // Internal: lock the page scroll at current position
    _lockScroll() {
      my.createSelectorQuery().selectViewport().scrollOffset().exec((ret) => {
        if (ret && ret.length > 0) {
          const scrollRes = Array.isArray(ret[0]) ? ret[0][0] : ret[0];
          this._lockedScrollTop = scrollRes ? (scrollRes.scrollTop || 0) : 0;
          // No direct way to lock from component side — parent must handle scroll-view
          // We store the locked position so we can restore on unlock
        }
      });
    },

    // Internal: restore scroll to locked position
    _unlockScroll(restorePosition = true) {
      if (restorePosition && this._lockedScrollTop !== undefined) {
        my.pageScrollTo({ scrollTop: this._lockedScrollTop, duration: 0 });
      }
      this._lockedScrollTop = undefined;
    }
  }
});
