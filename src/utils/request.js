/**
 * Mock Request Interceptor for mpaas-angular-sdk
 * Intercepts any request call and resolves from mock data.
 * ZERO Network calls.
 */

import {
  MOCK_MENU,
  MOCK_EVENTS,
  MOCK_RUNNING_EVENTS,
  MOCK_FAVORITE_EVENTS,
  MOCK_TEMPLATES,
  MOCK_TEMPLATE_DETAILS,
  MOCK_STORES,
  MOCK_STORE_CATEGORIES,
  MOCK_PRODUCTS,
  MOCK_PRODUCT_DETAILS,
  MOCK_ORDERS,
  MOCK_ECOMMERCE_ORDERS,
  MOCK_PERSONAL_DATA,
  MOCK_EVENT_CATEGORY_TICKETS,
  MOCK_EVENT_TICKETS,
  MOCK_LOV,
  MOCK_TNC,
  MOCK_LIMIT,
  MOCK_POSTAL_CODES
} from '../mock/mockData.js';

export default function request({ url, method = 'GET', data = null, headers = null }, that = null) {
  return new Promise((resolve) => {
    console.info('[MOCK REQUEST]', method, url, data);

    let mockResponse = { data: {}, statusCode: 200 };

    if (!url) {
      mockResponse = { data: {}, statusCode: 200 };
    } else if (url.includes('/lifestyle/v1/menu')) {
      mockResponse = MOCK_MENU;
    } else if (url.includes('/lifestyle/v1/all-running-events')) {
      mockResponse = MOCK_RUNNING_EVENTS;
    } else if (url.includes('/lifestyle/v1/favorite-events')) {
      mockResponse = MOCK_FAVORITE_EVENTS;
    } else if (url.includes('/lifestyle/v1/all-events')) {
      mockResponse = MOCK_EVENTS;
    } else if (url.includes('/api/v1/stores/categories')) {
      mockResponse = MOCK_STORE_CATEGORIES;
    } else if (url.includes('/api/v1/stores')) {
      mockResponse = MOCK_STORES;
    } else if (url.includes('/api/v1/products/')) {
      const pid = url.split('/api/v1/products/')[1].split('?')[0];
      const prod = MOCK_PRODUCT_DETAILS[pid] || (MOCK_PRODUCTS.data && MOCK_PRODUCTS.data.find(p => p.id === pid)) || (MOCK_PRODUCTS.data && MOCK_PRODUCTS.data[0]);
      mockResponse = { success: true, data: prod };
    } else if (url.includes('/api/v1/products')) {
      mockResponse = MOCK_PRODUCTS;
    } else if (url.includes('/api/v1/templates/')) {
      const tid = url.split('/api/v1/templates/')[1].split('?')[0];
      const normId = tid.replace('template-', '');
      const schema = MOCK_TEMPLATE_DETAILS[tid] || MOCK_TEMPLATE_DETAILS[normId] || MOCK_TEMPLATE_DETAILS['1'];
      mockResponse = { data: schema, statusCode: 200, success: true };
    } else if (url.includes('/api/v1/templates')) {
      mockResponse = MOCK_TEMPLATES;
    } else if (url.includes('/api/v1/ecommerce/orders/') && url.includes('/pay')) {
      mockResponse = { success: true, message: 'Pembayaran berhasil', data: { status: 'PAID' } };
    } else if (url.includes('/api/v1/ecommerce/orders/') && url.includes('/returns')) {
      mockResponse = { success: true, message: 'Pengajuan retur berhasil dikirim', data: { returnStatus: 'REQUESTED' } };
    } else if (url.includes('/api/v1/ecommerce/orders/')) {
      const oid = url.split('/api/v1/ecommerce/orders/')[1].split('?')[0];
      const ord = (MOCK_ECOMMERCE_ORDERS.data && MOCK_ECOMMERCE_ORDERS.data.find(o => o.id === oid)) || (MOCK_ECOMMERCE_ORDERS.data && MOCK_ECOMMERCE_ORDERS.data[0]);
      mockResponse = { success: true, data: ord };
    } else if (url.includes('/api/v1/ecommerce/orders')) {
      if (method === 'POST') {
        const orderId = 'ECOM-' + Date.now();
        const newOrder = {
          id: orderId,
          orderNumber: 'INV-' + Date.now().toString().slice(-8),
          status: 'PENDING',
          items: (data && data.items) || [],
          shippingCost: (data && data.shippingCost) || 15000,
          totalAmount: (data && data.totalAmount) || 250000
        };
        mockResponse = { success: true, data: newOrder };
      } else {
        mockResponse = MOCK_ECOMMERCE_ORDERS;
      }
    } else if (url.includes('/api/orders/') && url.includes('/complete-payment')) {
      mockResponse = { success: true, message: 'Pembayaran berhasil' };
    } else if (url.includes('/api/orders/')) {
      const oid = url.split('/api/orders/')[1].split('?')[0];
      const ord = (MOCK_ORDERS.data && MOCK_ORDERS.data.find(o => o.id === oid)) || (MOCK_ORDERS.data && MOCK_ORDERS.data[0]);
      mockResponse = { success: true, data: ord, statusCode: 200 };
    } else if (url.includes('/api/orders')) {
      mockResponse = MOCK_ORDERS;
    } else if (url.includes('/lifestyle-javajazz/v1/personal-data')) {
      mockResponse = MOCK_PERSONAL_DATA;
    } else if (url.includes('/lifestyle-javajazz/v1/category-ticket')) {
      const m = url.match(/id=([^&]+)/);
      const eid = m ? m[1] : 'run-001';
      mockResponse = MOCK_EVENT_CATEGORY_TICKETS[eid] || MOCK_EVENT_CATEGORY_TICKETS['run-001'] || Object.values(MOCK_EVENT_CATEGORY_TICKETS)[0];
    } else if (url.includes('/lifestyle-javajazz/v1/tickets')) {
      const m = url.match(/id=([^&]+)/);
      const eid = m ? m[1] : 'run-001';
      mockResponse = MOCK_EVENT_TICKETS[eid] || MOCK_EVENT_TICKETS['run-001'] || Object.values(MOCK_EVENT_TICKETS)[0];
    } else if (url.includes('/content/v1/tnc')) {
      mockResponse = MOCK_TNC;
    } else if (url.includes('/reference/v1/lov')) {
      mockResponse = MOCK_LOV;
    } else if (url.includes('/limit/v1/transaction-limit')) {
      mockResponse = MOCK_LIMIT;
    } else if (url.includes('/lifestyle-javajazz/v1/subdistrict-postcode')) {
      mockResponse = MOCK_POSTAL_CODES;
    } else if (url.includes('/bill-payment/v1/biller/preparation')) {
      mockResponse = {
        data: {
          billerCode: "01",
          billKey1Label: "Kode Pembayaran",
          billAmount: (data && data.amount) || 250000,
          completionTime: new Date().toISOString(),
          billerName: "Wondr Event & UMKM",
          transactionId: "TRX-" + Date.now(),
          referenceId: "REF-" + Date.now()
        },
        statusCode: 200
      };
    } else {
      mockResponse = { data: {}, statusCode: 200, success: true };
    }

    setTimeout(() => {
      console.info('[MOCK RESPONSE]', url, mockResponse);
      if (that && that.setData) {
        that.setData({ isLoading: false });
      }
      resolve(JSON.parse(JSON.stringify(mockResponse)));
    }, 50);
  });
}
