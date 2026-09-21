import { getTemplateSchema } from "/src/public/api";

const TEMPLATE_CACHE = {};

const FALLBACK_TEMPLATES = {
  "template-1": {
    schemaVersion: "1.0",
    templateId: "template-1",
    templateName: "Clean Card Theme",
    category: "events",
    pageBackground: "#F5F5F5",
    headerSection: {
      headerConfig: {
        showBackButton: true,
        titleKey: "name",
        fallbackTitle: "Running Event Detail",
        background: "#ffffff",
        color: "#0E0E0E"
      },
      fields: [
        {
          key: "bannerUrl",
          type: "banner",
          background: "#fafafa",
          "border-radius": "16px",
          height: "210px",
          margin: "16px 20px 0 20px"
        }
      ]
    },
    contentSection: {
      fields: [
        {
          key: "name",
          type: "title-card",
          "font-weight": "700",
          "font-size": "18px",
          color: "#0E0E0E",
          background: "#ffffff",
          "border-radius": "16px",
          padding: "18px 20px",
          margin: "14px 20px 0 20px"
        },
        {
          key: "location",
          type: "location-card",
          icons: "location_on",
          iconColor: "#9B7EDC",
          background: "#ffffff",
          "border-radius": "16px",
          padding: "16px 20px",
          margin: "12px 20px 0 20px"
        },
        {
          key: "eventDate",
          type: "date-card",
          icons: "calendar_today",
          iconColor: "#9B7EDC",
          background: "#ffffff",
          "border-radius": "16px",
          padding: "16px 20px",
          margin: "12px 20px 0 20px"
        },
        {
          key: "description",
          type: "description",
          label: "Description",
          color: "#4E4E4E",
          background: "#ffffff",
          "border-radius": "16px",
          padding: "16px 20px",
          margin: "14px 20px 0 20px",
          expand: true,
          expandConfig: {
            collapsedLines: 4,
            expandLabel: "Lihat Detail",
            collapseLabel: "Tutup",
            "justify-content": "center",
            color: "#FF8736"
          }
        },
        {
          key: "divider-1",
          type: "divider",
          height: "1px",
          background: "#E5E7EB",
          margin: "14px 20px"
        },
        {
          key: "termsConditions",
          type: "termsConditions",
          label: "Terms & Conditions",
          background: "#ffffff",
          "border-radius": "16px",
          padding: "16px 20px",
          margin: "0 20px 16px 20px",
          color: "#4E4E4E"
        },
        {
          key: "ticketCategories",
          type: "ticket-card",
          label: "Pilihan Tiket",
          "padding-left": "20px",
          "padding-right": "20px",
          ticketConfig: {
            index: 0,
            cardConfig: {
              background: "#ffffff",
              border: "1px solid #ECECEC",
              "border-radius": "16px",
              padding: "16px 20px"
            },
            title: {
              key: "name",
              color: "#0E0E0E",
              "font-size": "15px"
            },
            priceLabel: {
              value: "Mulai dari",
              color: "#FF8736"
            },
            price: {
              key: "price",
              color: "#0E0E0E"
            }
          }
        }
      ]
    },
    ctaConfig: {
      label: "Beli Tiket",
      background: "#75D7D0",
      color: "#0E0E0E",
      "border-radius": "9999px",
      height: "56px"
    }
  },
  "template-2": {
    schemaVersion: "1.0",
    templateId: "template-2",
    templateName: "Navy Blue Overlapping Header Theme",
    category: "events",
    pageBackground: "#F5F5F5",
    headerSection: {
      headerConfig: {
        showBackButton: true,
        titleKey: "name",
        fallbackTitle: "Event Info",
        background: "#ffffff",
        color: "#0E0E0E"
      },
      fields: [
        {
          key: "bannerUrl",
          type: "banner",
          background: "#000000",
          "border-radius": "0px",
          height: "230px",
          margin: "0"
        }
      ]
    },
    contentSection: {
      fields: [
        {
          key: "headerBanner",
          type: "header-banner",
          background: "#0E3453",
          color: "#ffffff",
          padding: "18px 20px",
          margin: "-32px 16px 0 16px",
          "border-radius": "16px 16px 0 0",
          "font-size": "18px",
          "font-weight": "700"
        },
        {
          key: "location",
          type: "location-card",
          icons: "location_on",
          iconColor: "#9B7EDC",
          background: "#ffffff",
          "border-radius": "0 0 16px 16px",
          padding: "16px 20px",
          margin: "0 16px 14px 16px"
        },
        {
          key: "eventDate",
          type: "date-card",
          icons: "calendar_today",
          iconColor: "#9B7EDC",
          background: "#ffffff",
          "border-radius": "16px",
          padding: "16px 20px",
          margin: "0 16px 14px 16px"
        },
        {
          key: "description",
          type: "description",
          label: "Description",
          color: "#4E4E4E",
          background: "#ffffff",
          "border-radius": "16px",
          padding: "16px 20px",
          margin: "0 16px 14px 16px",
          expand: true,
          expandConfig: {
            collapsedLines: 4,
            expandLabel: "Lihat Detail",
            collapseLabel: "Tutup",
            "justify-content": "center",
            color: "#0E3453"
          }
        },
        {
          key: "termsConditions",
          type: "termsConditions",
          label: "Terms & Conditions",
          background: "#ffffff",
          "border-radius": "16px",
          padding: "16px 20px",
          margin: "0 16px 16px 16px",
          color: "#4E4E4E"
        },
        {
          key: "ticketCategories",
          type: "ticket-card",
          label: "Pilih Tiket",
          "padding-left": "16px",
          "padding-right": "16px",
          ticketConfig: {
            index: 0,
            cardConfig: {
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              "border-radius": "14px",
              padding: "16px"
            },
            title: {
              key: "name",
              color: "#0E3453"
            },
            priceLabel: {
              value: "Mulai dari",
              color: "#FF8736"
            },
            price: {
              key: "price",
              color: "#0E0E0E"
            }
          }
        }
      ]
    },
    ctaConfig: {
      label: "Beli Tiket",
      background: "#FF8736",
      color: "#FFFFFF",
      "border-radius": "9999px",
      height: "56px"
    }
  },
  "template-3": {
    schemaVersion: "1.0",
    templateId: "template-3",
    templateName: "Dark Slate Hero Theme",
    category: "events",
    pageBackground: "#F8FAFC",
    headerSection: {
      headerConfig: {
        showBackButton: true,
        titleKey: "name",
        fallbackTitle: "Event Details",
        background: "#ffffff",
        color: "#0F172A"
      },
      fields: [
        {
          key: "bannerUrl",
          type: "banner",
          background: "#0F172A",
          "border-radius": "0px",
          height: "250px",
          margin: "0",
          badge: {
            textKey: "category",
            fallbackText: "RUNNING EVENT",
            background: "#F97316",
            color: "#FFFFFF"
          }
        }
      ]
    },
    contentSection: {
      fields: [
        {
          key: "heroCard",
          type: "hero-card",
          background: "#ffffff",
          border: "1px solid #f1f5f9",
          "border-radius": "20px",
          padding: "20px",
          margin: "-60px 16px 16px 16px",
          customStyles: {
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
          },
          ticketConfig: {
            priceLabel: {
              value: "MULAI DARI",
              color: "#94A3B8"
            },
            price: {
              key: "price",
              color: "#EA580C"
            }
          }
        },
        {
          key: "location",
          type: "location-card",
          icons: "location_on",
          iconColor: "#EA580C",
          background: "#ffffff",
          border: "1px solid #f1f5f9",
          "border-radius": "16px",
          padding: "16px 20px",
          margin: "0 16px 14px 16px"
        },
        {
          key: "eventDate",
          type: "date-card",
          icons: "calendar_today",
          iconColor: "#EA580C",
          background: "#ffffff",
          border: "1px solid #f1f5f9",
          "border-radius": "16px",
          padding: "16px 20px",
          margin: "0 16px 14px 16px"
        },
        {
          key: "description",
          type: "description",
          label: "About This Event",
          color: "#334155",
          background: "#ffffff",
          border: "1px solid #f1f5f9",
          "border-radius": "16px",
          padding: "16px 20px",
          margin: "0 16px 14px 16px",
          expand: true,
          expandConfig: {
            collapsedLines: 4,
            expandLabel: "Lihat Selengkapnya",
            collapseLabel: "Tutup",
            color: "#EA580C"
          }
        },
        {
          key: "termsConditions",
          type: "termsConditions",
          label: "Syarat & Ketentuan",
          background: "#ffffff",
          border: "1px solid #f1f5f9",
          "border-radius": "16px",
          padding: "16px 20px",
          margin: "0 16px 16px 16px",
          color: "#334155"
        },
        {
          key: "ticketCategories",
          type: "ticket-card",
          label: "Pilihan Kategori Tiket",
          "padding-left": "16px",
          "padding-right": "16px",
          ticketConfig: {
            index: 0,
            cardConfig: {
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              "border-radius": "16px",
              padding: "18px"
            },
            title: {
              key: "name",
              color: "#0F172A"
            },
            priceLabel: {
              value: "Mulai dari",
              color: "#EA580C"
            },
            price: {
              key: "price",
              color: "#0F172A"
            }
          }
        }
      ]
    },
    ctaConfig: {
      label: "Beli Tiket Sekarang",
      background: "#0F172A",
      color: "#FFFFFF",
      "border-radius": "9999px",
      height: "56px"
    }
  },
  "template-4": {
    schemaVersion: "1.0",
    templateId: "template-4",
    templateName: "Crimson Maroon Theme",
    category: "events",
    pageBackground: "#FFFFFF",
    headerSection: {
      headerConfig: {
        showBackButton: true,
        titleKey: "name",
        fallbackTitle: "Event Info",
        background: "#ffffff",
        color: "#0E0E0E"
      },
      fields: [
        {
          key: "crimsonHeader",
          type: "header-banner",
          background: "linear-gradient(135deg, #9C0621 0%, #7A0419 100%)",
          color: "#ffffff",
          padding: "20px 20px 65px 20px",
          margin: "0",
          "font-size": "18px",
          "font-weight": "700"
        },
        {
          key: "bannerUrl",
          type: "banner",
          background: "#F5F5F5",
          "border-radius": "16px",
          height: "200px",
          margin: "-48px 20px 16px 20px",
          customStyles: {
            boxShadow: "0 12px 28px rgba(156, 6, 33, 0.18)"
          }
        }
      ]
    },
    contentSection: {
      fields: [
        {
          key: "location",
          type: "location-card",
          label: "Informasi Lokasi",
          icons: "location_on",
          iconColor: "#9C0621",
          background: "#ffffff",
          border: "1px solid #f1f5f9",
          "border-radius": "16px",
          padding: "16px 20px",
          margin: "0 20px 14px 20px"
        },
        {
          key: "eventDate",
          type: "date-card",
          label: "Jadwal Acara",
          icons: "calendar_today",
          iconColor: "#9C0621",
          background: "#ffffff",
          border: "1px solid #f1f5f9",
          "border-radius": "16px",
          padding: "16px 20px",
          margin: "0 20px 14px 20px"
        },
        {
          key: "description",
          type: "description",
          label: "Deskripsi Acara",
          color: "#334155",
          background: "#ffffff",
          border: "1px solid #f1f5f9",
          "border-radius": "16px",
          padding: "16px 20px",
          margin: "0 20px 14px 20px",
          expand: true,
          expandConfig: {
            collapsedLines: 4,
            expandLabel: "Lihat Detail",
            collapseLabel: "Tutup",
            color: "#9C0621"
          }
        },
        {
          key: "termsConditions",
          type: "termsConditions",
          label: "Ketentuan Acara",
          background: "#ffffff",
          border: "1px solid #f1f5f9",
          "border-radius": "16px",
          padding: "16px 20px",
          margin: "0 20px 16px 20px",
          color: "#334155"
        },
        {
          key: "ticketCategories",
          type: "ticket-card",
          label: "Pilihan Tiket",
          "padding-left": "20px",
          "padding-right": "20px",
          ticketConfig: {
            index: 0,
            cardConfig: {
              background: "#ffffff",
              border: "1px solid #fee2e2",
              "border-radius": "16px",
              padding: "18px"
            },
            title: {
              key: "name",
              color: "#9C0621"
            },
            priceLabel: {
              value: "Mulai dari",
              color: "#9C0621"
            },
            price: {
              key: "price",
              color: "#111827"
            }
          }
        }
      ]
    },
    ctaConfig: {
      label: "Beli Tiket",
      background: "#9C0621",
      color: "#FFFFFF",
      "border-radius": "9999px",
      height: "56px"
    }
  }
};

Component({
  props: {
    templateConfig: null,
    eventData: {},
    onScreenChange: () => {}
  },

  data: {
    schema: null,
    headerFields: [],
    contentFields: [],
    ctaConfig: null,
    isDescExpanded: false,
    currentBannerIndex: 0,
    banners: [],
    formattedPrice: 'Rp 0',
    formattedNormalPrice: '',
    formattedDate: '',
    firstTicket: null,
    loading: false
  },

  didMount() {
    this.initComponent();
  },

  didUpdate(prevProps) {
    if (
      this.props.templateConfig !== prevProps.templateConfig ||
      this.props.eventData !== prevProps.eventData
    ) {
      this.initComponent();
    }
  },

  methods: {
    async initComponent() {
      const eventData = this.props.eventData || {};
      
      // Compute formatted date
      let formattedDate = eventData.formattedDate || '';
      if (!formattedDate && eventData.startDate) {
        try {
          formattedDate = new Date(eventData.startDate).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });
        } catch (e) {
          formattedDate = eventData.startDate;
        }
      }

      // Extract first ticket tier for CTA detail and price computation
      const rawCategories = eventData.categories || eventData.ticket_tiers || eventData.ticketGroups || eventData.tickets || [];
      const firstGroup = rawCategories.length > 0 ? rawCategories[0] : null;
      const firstTicket = firstGroup ? ((firstGroup.tickets && firstGroup.tickets.length > 0) ? firstGroup.tickets[0] : firstGroup) : null;

      // Compute price & normalPrice (harga coret)
      let price = Number(eventData.price !== undefined ? eventData.price : (firstTicket ? (firstTicket.price || firstTicket.ticket_price || 0) : 0));
      let normalPrice = Number(eventData.normalPrice || eventData.normal_price || eventData.maxPrice || eventData.max_price || eventData.originalPrice || eventData.original_price || eventData.ticket_normal_price || 0);

      const discountedPrice = (eventData.discountedPrice !== undefined && eventData.discountedPrice !== null) ? Number(eventData.discountedPrice) :
                              (eventData.discounted_price !== undefined && eventData.discounted_price !== null) ? Number(eventData.discounted_price) : null;

      if (discountedPrice !== null && discountedPrice < price && discountedPrice > 0) {
        normalPrice = price;
        price = discountedPrice;
      }

      if ((!normalPrice || normalPrice <= price) && firstTicket) {
        const ticketNormalPrice = Number(firstTicket.normalPrice || firstTicket.normal_price || firstTicket.maxPrice || firstTicket.max_price || firstTicket.originalPrice || firstTicket.original_price || firstTicket.ticket_normal_price || 0);
        const ticketDiscountedPrice = (firstTicket.discountedPrice !== undefined && firstTicket.discountedPrice !== null) ? Number(firstTicket.discountedPrice) :
                                      (firstTicket.discounted_price !== undefined && firstTicket.discounted_price !== null) ? Number(firstTicket.discounted_price) : null;
        const ticketPrice = Number(firstTicket.price !== undefined ? firstTicket.price : (firstTicket.ticket_price || price));

        if (ticketDiscountedPrice !== null && ticketDiscountedPrice < ticketPrice && ticketDiscountedPrice > 0) {
          price = ticketDiscountedPrice;
          normalPrice = ticketPrice;
        } else if (ticketNormalPrice > ticketPrice) {
          normalPrice = ticketNormalPrice;
        }
      }

      // Compute formatted price & strike-through normal price
      let formattedPrice = 'Rp ' + Number(price).toLocaleString('id-ID');
      let formattedNormalPrice = (normalPrice > price && normalPrice > 0) ? ('Rp ' + Number(normalPrice).toLocaleString('id-ID')) : '';

      // Compute banners list
      let banners = [];
      if (Array.isArray(eventData.banners) && eventData.banners.length > 0) {
        banners = eventData.banners;
      } else if (Array.isArray(eventData.banner_images) && eventData.banner_images.length > 0) {
        banners = eventData.banner_images;
      } else if (eventData.bannerUrl) {
        banners = [eventData.bannerUrl];
      }

      this.setData({
        formattedDate,
        formattedPrice,
        formattedNormalPrice,
        banners,
        firstTicket
      });

      // Extract template ID
      const rawId = this.props.templateId
        || eventData.templateId
        || eventData.selected_template
        || eventData.selectedTemplate
        || (eventData.templates && eventData.templates.index && eventData.templates.index.id)
        || 'template-1';
      const normId = String(rawId);
      const lookupId = FALLBACK_TEMPLATES[normId] ? normId : (FALLBACK_TEMPLATES[`template-${normId}`] ? `template-${normId}` : normId);

      // Load schema: Embedded eventData schema > Props override > Cache > Fallback > Remote API
      const embeddedSchema = this.props.templateConfig || eventData.templateConfig || eventData.templateSchema || eventData.sduiSchema;
      if (embeddedSchema && (embeddedSchema.headerSection || embeddedSchema.contentSection)) {
        TEMPLATE_CACHE[normId] = embeddedSchema;
        TEMPLATE_CACHE[lookupId] = embeddedSchema;
        this.setData({ isSchemaLoading: false });
        this.processSchema(embeddedSchema);
        return;
      }

      if (TEMPLATE_CACHE[normId] || TEMPLATE_CACHE[lookupId]) {
        const cached = TEMPLATE_CACHE[normId] || TEMPLATE_CACHE[lookupId];
        this.setData({ isSchemaLoading: false });
        this.processSchema(cached);
        return;
      }

      // Check if known fallback template is available immediately
      if (FALLBACK_TEMPLATES[lookupId]) {
        this.setData({ isSchemaLoading: false });
        this.processSchema(FALLBACK_TEMPLATES[lookupId]);
        return;
      }

      // If custom template not cached yet, show smooth loading state (NOT template-1)
      this.setData({ isSchemaLoading: true });

      // Fetch from Backend API
      try {
        const res = await getTemplateSchema(normId);
        if (res && res.data) {
          const apiSchema = res.data.data || res.data;
          if (apiSchema && (apiSchema.headerSection || apiSchema.contentSection)) {
            TEMPLATE_CACHE[normId] = apiSchema;
            this.setData({ isSchemaLoading: false });
            this.processSchema(apiSchema);
            return;
          }
        }
        // If API returned without valid sections, fallback cleanly
        this.setData({ isSchemaLoading: false });
        this.processSchema(FALLBACK_TEMPLATES['template-1']);
      } catch (err) {
        console.warn("[SDUI Renderer] Error fetching schema from backend, using fallback:", err);
        this.setData({ isSchemaLoading: false });
        this.processSchema(FALLBACK_TEMPLATES['template-1']);
      }
    },

    processSchema(rawSchema) {
      if (!rawSchema) return;

      const normalizeField = (field) => {
        const styles = [];

        if (field.background) styles.push(`background: ${field.background}`);
        if (field.color) styles.push(`color: ${field.color}`);
        if (field['border-radius']) styles.push(`border-radius: ${field['border-radius']}`);
        if (field.border) styles.push(`border: ${field.border}`);
        if (field.height) styles.push(`height: ${field.height}`);
        if (field.margin) styles.push(`margin: ${field.margin}`);
        if (field['margin-top']) styles.push(`margin-top: ${field['margin-top']}`);
        if (field['margin-bottom']) styles.push(`margin-bottom: ${field['margin-bottom']}`);
        if (field.padding) styles.push(`padding: ${field.padding}`);
        if (field['padding-left']) styles.push(`padding-left: ${field['padding-left']}`);
        if (field['padding-right']) styles.push(`padding-right: ${field['padding-right']}`);
        if (field['font-size']) styles.push(`font-size: ${field['font-size']}`);
        if (field['font-weight']) styles.push(`font-weight: ${field['font-weight']}`);

        if (field.customStyles && typeof field.customStyles === 'object') {
          Object.entries(field.customStyles).forEach(([key, val]) => {
            const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
            styles.push(`${cssKey}: ${val}`);
          });
        }

        return {
          ...field,
          computedStyle: styles.join('; ')
        };
      };

      const headerFields = ((rawSchema.headerSection && rawSchema.headerSection.fields) || []).map(normalizeField);
      const contentFields = ((rawSchema.contentSection && rawSchema.contentSection.fields) || []).map(normalizeField);
      
      let ctaStyle = '';
      if (rawSchema.ctaConfig) {
        const cta = rawSchema.ctaConfig;
        const ctaStyles = [];
        if (cta.background) ctaStyles.push(`background: ${cta.background}`);
        if (cta.color) ctaStyles.push(`color: ${cta.color}`);
        if (cta['border-radius']) ctaStyles.push(`border-radius: ${cta['border-radius']}`);
        if (cta.height) ctaStyles.push(`height: ${cta.height}`);
        ctaStyle = ctaStyles.join('; ');
      }

      this.setData({
        schema: rawSchema,
        headerFields,
        contentFields,
        ctaConfig: rawSchema.ctaConfig ? { ...rawSchema.ctaConfig, computedStyle: ctaStyle } : null
      });
    },

    toggleDescription() {
      this.setData({
        isDescExpanded: !this.data.isDescExpanded
      });
    },

    onBannerSwiperChange(e) {
      if (e && e.detail && e.detail.current !== undefined) {
        this.setData({
          currentBannerIndex: e.detail.current
        });
      }
    },

    onBannerIndicatorTap(e) {
      const { index } = e.currentTarget.dataset;
      if (index !== undefined) {
        this.setData({
          currentBannerIndex: index
        });
      }
    },

    handleCtaTap(e) {
      const ticket = this.data.firstTicket || this.props.eventData;
      if (typeof this.props.onScreenChange === 'function') {
        this.props.onScreenChange(ticket);
      }
    },

    handleCardTap(e) {
      const ticket = this.data.firstTicket || this.props.eventData;
      if (typeof this.props.onScreenChange === 'function') {
        this.props.onScreenChange(ticket);
      }
    }
  }
});
