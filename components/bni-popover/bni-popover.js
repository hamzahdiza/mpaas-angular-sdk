let localActivePopoverInstance = null;

const getActivePopoverInstance = () => {
  if (typeof my !== 'undefined' && my && my.__bniActivePopoverInstance) {
    return my.__bniActivePopoverInstance;
  }
  return localActivePopoverInstance;
};

const setActivePopoverInstance = (inst) => {
  if (typeof my !== 'undefined' && my) {
    my.__bniActivePopoverInstance = inst;
  }
  localActivePopoverInstance = inst;
};

Component({
  mixins: [],
  data: {
    internalVisible: false,
    effectiveColor: '',
    computedContentStyle: '',
    computedRootStyle: '',
    computedContentClassName: '',
  },
  props: {
    /**
     * Konten teks utama yang ditampilkan di dalam popover/tooltip.
     * Contoh: "Harga beli obligasi berdasarkan kuota saat ini."
     */
    content: String(''),

    /**
     * Posisi munculnya popover terhadap elemen pemicu (trigger).
     * Nilai yang diterima:
     * - 'top' | 'top-left' | 'top-right'
     * - 'bottom' | 'bottom-left' | 'bottom-right'
     * - 'left' | 'left-top' | 'left-bottom'
     * - 'right' | 'right-top' | 'right-bottom'
     * Default: 'bottom'
     */
    placement: String('bottom'),

    /**
     * Mengaktifkan mode Controlled jika diisi true.
     * - controlled: false (default): Mode Uncontrolled (otomatis buka/tutup saat trigger / mask ditekan).
     * - controlled: true: Keterlihatan popover dikontrol langsung oleh page melalui prop `visible`.
     * Default: false
     */
    controlled: Boolean(false),

    /**
     * Status keterlihatan popover saat mode controlled: true.
     * Default: false
     */
    visible: Boolean(false),

    /**
     * Warna background kontainer popover.
     * Warna panah (arrow) akan otomatis sinkron mengikuti warna ini.
     * Contoh: "#DADADA", "#404040", "#71DBD3", "var(--functional-bw-tones-pale-gray, #DADADA)"
     */
    backgroundColor: String(''),

    /**
     * Alias untuk `backgroundColor`.
     */
    color: String(''),

    /**
     * Warna teks di dalam popover.
     * Jika tidak diisi namun background bernilai terang (misal #DADADA atau #FFFFFF),
     * warna teks otomatis diatur ke gelap (#0E0E0E).
     * Contoh: "#0E0E0E", "#FFFFFF", "black"
     */
    textColor: String(''),

    /**
     * Kustomisasi warna panah (arrow) jika ingin berbeda dari warna background.
     * Default: otomatis mengikuti `backgroundColor` atau `color`.
     */
    arrowColor: String(''),

    /**
     * Jarak pergeseran horizontal kontainer popover (dalam pixel / string).
     * Digunakan ketika posisi 'top' atau 'bottom' ingin digeser ke kanan/kiri
     * menjauhi tepi layar HP agar tidak terpotong, sementara panah tetap menunjuk trigger.
     * Contoh: 50, 65, "50px", "65px"
     */
    contentOffset: null,

    /**
     * Jarak pergeseran panah (arrow) secara horizontal / vertikal.
     * - Nilai positif (misal: 20 atau "20px"): menggeser panah ke kanan (atau ke bawah).
     * - Nilai negatif (misal: -20 atau "-20px"): menggeser panah ke kiri (atau ke atas).
     * Contoh: 20, -30, "20px", "-15px"
     */
    arrowOffset: null,

    /**
     * Batas lebar maksimum kontainer popover.
     * Mencegah popover terlalu lebar melebihi batas layar handphone.
     * Contoh: 280, 295, "280px"
     */
    maxWidth: null,

    /**
     * Otomatis membalikkan posisi popover (misal dari top ke bottom) jika terhalang
     * oleh batas atas atau batas bawah layar handphone.
     * Default: true
     */
    autoAdjustOverflow: Boolean(true),

    /**
     * Menampilkan mask transparan di belakang popover saat terbuka.
     * Ketika mask ditekan (klik di luar popover), popover akan otomatis tertutup.
     * Default: true
     */
    showMask: Boolean(true),

    /**
     * Nama class CSS tambahan untuk elemen mask popover.
     */
    maskClassName: String(''),

    /**
     * Inline style tambahan untuk elemen mask popover.
     */
    maskStyle: String(''),

    /**
     * Mengaktifkan custom content menggunakan named slot `<view slot="content">`.
     * Cocok untuk popover dengan struktur layout kompleks, gambar, atau multi-line HTML.
     * Default: false
     */
    useSlotContent: Boolean(false),

    /**
     * Mengaktifkan mode ukuran berbasis pixel (px) sesuai standar BNI library.
     * Default: false
     */
    pixel: Boolean(false),

    /**
     * Inline style tambahan untuk kontainer konten popover.
     * Contoh: "padding: 16px; border-radius: 12px;"
     */
    contentStyle: String(''),

    /**
     * Nama class CSS tambahan untuk kontainer konten popover.
     * Contoh: "custom-popover-content"
     */
    contentClassName: String(''),

    /**
     * Nama class CSS tambahan untuk pembungkus (wrapper) komponen popover.
     */
    className: String(''),

    /**
     * Inline style tambahan untuk pembungkus (wrapper) komponen popover.
     */
    style: String(''),

    /**
     * Fungsi callback yang dipanggil saat status keterlihatan popover berubah.
     * Menerima parameter: (visible: boolean, event: object)
     */
    onVisibleChange: () => {},
  },
  onInit() {
    this.initVisibility(this.props);
    this.updateStyles(this.props);
  },
  didMount() {
    this.initVisibility(this.props);
    this.updateStyles(this.props);
  },
  didUpdate(prevProps) {
    if (prevProps) {
      if (this.props.controlled && prevProps.visible !== this.props.visible) {
        this.setData({
          internalVisible: Boolean(this.props.visible),
        });
      }
      this.updateStyles(this.props);
    }
  },
  didUnmount() {
    if (getActivePopoverInstance() === this) {
      setActivePopoverInstance(null);
    }
  },
  methods: {
    isLightColor(colorStr) {
      if (!colorStr || typeof colorStr !== 'string') return false;
      const c = colorStr.toLowerCase().trim();
      if (c === '#fff' || c === '#ffffff' || c === 'white') return true;
      if (
        c.includes('dadada') ||
        c.includes('f0f0f0') ||
        c.includes('f7f7f7') ||
        c.includes('pale-gray') ||
        c.includes('snow-white')
      )
        return true;
      if (c.startsWith('#')) {
        const hex = c.replace('#', '');
        if (hex.length === 6) {
          const r = parseInt(hex.substring(0, 2), 16);
          const g = parseInt(hex.substring(2, 4), 16);
          const b = parseInt(hex.substring(4, 6), 16);
          const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
          return luminance > 160;
        }
      }
      return false;
    },

    formatPx(val) {
      if (val === undefined || val === null || val === '') return '';
      if (typeof val === 'number') return `${val}px`;
      if (typeof val === 'string') {
        const trimmed = val.trim();
        if (trimmed !== '' && !isNaN(Number(trimmed))) {
          return `${trimmed}px`;
        }
        return trimmed;
      }
      return String(val);
    },

    getWindowWidth() {
      if (typeof my !== 'undefined' && my && typeof my.getSystemInfoSync === 'function') {
        const info = my.getSystemInfoSync();
        if (info && typeof info.windowWidth === 'number' && info.windowWidth > 0) {
          return info.windowWidth;
        }
      }
      if (
        typeof window !== 'undefined' &&
        window &&
        typeof window.innerWidth === 'number' &&
        window.innerWidth > 0
      ) {
        return window.innerWidth;
      }
      return 390;
    },

    parseNumeric(val) {
      if (val === undefined || val === null || val === '') return null;
      if (typeof val === 'number') return val;
      if (typeof val === 'string') {
        const num = parseFloat(val);
        return isNaN(num) ? null : num;
      }
      return null;
    },

    computeStyles(props = {}) {
      let effectiveColor = props.backgroundColor || props.color || '';
      let effectiveTextColor = props.textColor || '';
      let effectiveArrowColor = props.arrowColor || '';

      if (
        props.contentClassName &&
        props.contentClassName.includes('custom-popover-content') &&
        !effectiveColor
      ) {
        effectiveColor = '#DADADA';
      }

      if (effectiveColor && !effectiveTextColor) {
        if (this.isLightColor(effectiveColor)) {
          effectiveTextColor = '#0E0E0E';
        }
      }

      if (effectiveColor && !effectiveArrowColor) {
        effectiveArrowColor = effectiveColor;
      }

      const styleParts = [];
      if (props.contentStyle) {
        styleParts.push(props.contentStyle);
      }
      if (effectiveTextColor) {
        styleParts.push(`color: ${effectiveTextColor}`);
      }
      if (effectiveColor) {
        styleParts.push(`background-color: ${effectiveColor}`);
      }

      const winWidth = this.getWindowWidth();

      if (
        props.maxWidth !== undefined &&
        props.maxWidth !== null &&
        props.maxWidth !== ''
      ) {
        const mw = this.formatPx(props.maxWidth);
        if (mw) {
          const mwNum = this.parseNumeric(props.maxWidth);
          let effectiveMw = mw;

          // Automatically clamp maxWidth on screens <= 375px (e.g. 375px, 360px, 320px)
          if (mwNum !== null && winWidth <= 375) {
            let maxSafe = 280;
            if (winWidth <= 320) {
              maxSafe = 245;
            } else if (winWidth <= 360) {
              maxSafe = 265;
            }
            if (mwNum > maxSafe) {
              effectiveMw = `${maxSafe}px`;
            }
          }

          styleParts.push(`max-width: ${effectiveMw} !important`);
        }
      }

      if (
        props.contentOffset !== undefined &&
        props.contentOffset !== null &&
        props.contentOffset !== ''
      ) {
        const offset = this.formatPx(props.contentOffset);
        if (offset) {
          const offsetNum = this.parseNumeric(props.contentOffset);
          let effectiveOffset = offset;

          // Automatically adjust & scale contentOffset proportionally on smaller screens (< 390px)
          // Reference design screen width is 390px (e.g. iPhone 12/13/14)
          if (offsetNum !== null && winWidth < 390) {
            const factor = winWidth / 390;
            const scaled = Math.round(offsetNum * factor);
            effectiveOffset = `${scaled}px`;
          }

          styleParts.push(`position: relative; left: ${effectiveOffset}`);
        }
      }

      const computedContentStyle = styleParts.join('; ');

      const rootStyleParts = [];
      if (props.style) {
        rootStyleParts.push(props.style);
      }
      if (
        props.contentOffset !== undefined &&
        props.contentOffset !== null &&
        props.contentOffset !== ''
      ) {
        const offset = this.formatPx(props.contentOffset);
        if (offset) {
          rootStyleParts.push(`--bni-popover-raw-offset: ${offset}`);
        }
      }
      if (
        props.arrowOffset !== undefined &&
        props.arrowOffset !== null &&
        props.arrowOffset !== ''
      ) {
        const aOffset = this.formatPx(props.arrowOffset);
        if (aOffset) {
          rootStyleParts.push(`--popover-arrow-offset: ${aOffset}`);
        }
      }
      const computedRootStyle = rootStyleParts.join('; ');

      const baseTypographyClass = props.pixel ? 'txt-body2-px' : 'txt-body2';
      const computedContentClassName = props.contentClassName
        ? `${baseTypographyClass} ${props.contentClassName}`
        : baseTypographyClass;

      return {
        effectiveColor: effectiveArrowColor || effectiveColor,
        computedContentStyle,
        computedRootStyle,
        computedContentClassName,
      };
    },

    updateStyles(props = {}) {
      const {
        effectiveColor,
        computedContentStyle,
        computedRootStyle,
        computedContentClassName,
      } = this.computeStyles(props);
      if (
        effectiveColor !== this.data.effectiveColor ||
        computedContentStyle !== this.data.computedContentStyle ||
        computedRootStyle !== this.data.computedRootStyle ||
        computedContentClassName !== this.data.computedContentClassName
      ) {
        this.setData({
          effectiveColor,
          computedContentStyle,
          computedRootStyle,
          computedContentClassName,
        });
      }
    },

    initVisibility(props = {}) {
      const isControlled = Boolean(props.controlled);
      const isVisible = isControlled ? Boolean(props.visible) : false;
      this.setData({
        internalVisible: isVisible,
      });
      if (isVisible) {
        const active = getActivePopoverInstance();
        if (active && active !== this) {
          active.closeFromOutside();
        }
        setActivePopoverInstance(this);
      }
    },

    closeFromOutside() {
      if (!this.props.controlled) {
        this.setData({
          internalVisible: false,
        });
      }
      if (typeof this.props.onVisibleChange === 'function') {
        this.props.onVisibleChange(false, { type: 'outsideClose' });
      }
    },

    handleMaskTap(e) {
      if (!this.props.controlled) {
        this.setData({
          internalVisible: false,
        });
        if (getActivePopoverInstance() === this) {
          setActivePopoverInstance(null);
        }
      }
      if (typeof this.props.onVisibleChange === 'function') {
        this.props.onVisibleChange(false, e);
      }
    },

    handleVisibleChange(visible, e) {
      if (!this.props.controlled) {
        this.setData({
          internalVisible: visible,
        });
        if (visible) {
          const active = getActivePopoverInstance();
          if (active && active !== this) {
            active.closeFromOutside();
          }
          setActivePopoverInstance(this);
        } else if (getActivePopoverInstance() === this) {
          setActivePopoverInstance(null);
        }
      }
      if (typeof this.props.onVisibleChange === 'function') {
        this.props.onVisibleChange(visible, e);
      }
    },
  },
});
