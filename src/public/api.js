/**
 * Mock API Service for mpaas-angular-sdk
 * Zero External Network Calls. 100% Mock Data from Production Schemas.
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

// Helper to simulate short natural async delay (50ms)
function mockResolve(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(JSON.parse(JSON.stringify(data)));
    }, 50);
  });
}

// 1. Lifestyle Menu
export function lifeStyleMenu() {
  return mockResolve(MOCK_MENU);
}

// 2. Events & Lifestyle
export function getAllEvents() {
  return mockResolve(MOCK_EVENTS);
}

export function getAllRunning() {
  return mockResolve(MOCK_RUNNING_EVENTS);
}

export function getFavoriteEvents() {
  return mockResolve(MOCK_FAVORITE_EVENTS);
}

export function getAllRestaurants() {
  return mockResolve({ data: [], statusCode: 200 });
}

export function getAllCafes() {
  return mockResolve({ data: [], statusCode: 200 });
}

export function getAllHotels() {
  return mockResolve({ data: [], statusCode: 200 });
}

// 3. E-Commerce (UMKM) Stores
export function getUmkmStores() {
  return mockResolve(MOCK_STORES);
}

export function getUmkmStoreDetail(slugOrId) {
  const store = (MOCK_STORES.data && MOCK_STORES.data.find(s => s.id === slugOrId || s.slug === slugOrId)) || (MOCK_STORES.data && MOCK_STORES.data[0]) || {};
  return mockResolve({ success: true, data: store });
}

export function getUmkmCategories() {
  return mockResolve(MOCK_STORE_CATEGORIES);
}

export function getUmkmProducts(query) {
  return mockResolve(MOCK_PRODUCTS);
}

export function getUmkmProductDetail(productId) {
  const prod = MOCK_PRODUCT_DETAILS[productId] || (MOCK_PRODUCTS.data && MOCK_PRODUCTS.data.find(p => p.id === productId)) || (MOCK_PRODUCTS.data && MOCK_PRODUCTS.data[0]) || {};
  return mockResolve({ success: true, data: prod });
}

// 4. Server-Driven UI Templates
export function getAllTemplates() {
  return mockResolve(MOCK_TEMPLATES);
}

export function getTemplateSchema(templateId) {
  const normId = String(templateId).replace('template-', '');
  const schema = MOCK_TEMPLATE_DETAILS[templateId] || MOCK_TEMPLATE_DETAILS[normId] || MOCK_TEMPLATE_DETAILS['1'] || {};
  return mockResolve({ data: schema, statusCode: 200, success: true });
}

// 5. Personal Data & JavaJazz / Events
export function getPersonalData() {
  return mockResolve(MOCK_PERSONAL_DATA);
}

export function getJavaJazzLandingData(id) {
  const detail = MOCK_EVENT_CATEGORY_TICKETS[id] || MOCK_EVENT_CATEGORY_TICKETS['run-001'] || Object.values(MOCK_EVENT_CATEGORY_TICKETS)[0] || { dataProtected: {} };
  return mockResolve(detail);
}

export function getListTicket(params) {
  let eventId = 'run-001';
  if (typeof params === 'string') {
    const m = params.match(/id=([^&]+)/);
    if (m) eventId = m[1];
  } else if (params && params.id) {
    eventId = params.id;
  }
  const tix = MOCK_EVENT_TICKETS[eventId] || MOCK_EVENT_TICKETS['run-001'] || Object.values(MOCK_EVENT_TICKETS)[0] || { dataProtected: { regulerList: [] } };
  return mockResolve(tix);
}

export function getJavaJazzPendingOrder() {
  return mockResolve({ data: { count: 0, orderList: [] }, statusCode: 200 });
}

export function orderTickets(data) {
  return mockResolve({
    data: {
      orderId: "ORD-" + Date.now(),
      status: "SUCCESS",
      orderData: data
    },
    statusCode: 200
  });
}

// 6. Orders & Transaction History
export function createServiceOrder(payload) {
  const orderId = "ORD-" + Date.now();
  const orderNumber = "INV-" + Date.now().toString().slice(-8);
  const newOrder = {
    id: orderId,
    orderId,
    orderNumber,
    status: "completed",
    orderType: (payload && payload.orderType) || "event",
    serviceId: (payload && payload.serviceId) || "run-001",
    customerName: (payload && payload.customerName) || "Hamzah Diza",
    customerPhone: (payload && payload.customerPhone) || "081234567890",
    totalAmount: (payload && payload.totalAmount) || 250000,
    createdAt: new Date().toISOString()
  };
  if (MOCK_ORDERS && Array.isArray(MOCK_ORDERS.data)) {
    MOCK_ORDERS.data.unshift(newOrder);
  }
  return mockResolve({ data: newOrder, statusCode: 200, success: true });
}

export function getTransactionHistory(query) {
  return mockResolve(MOCK_ORDERS);
}

export function getTransactionHistories(query) {
  return mockResolve(MOCK_ORDERS);
}

export function getTransactionDetail(transactionId) {
  const ord = (MOCK_ORDERS.data && MOCK_ORDERS.data.find(o => o.id === transactionId || o.orderId === transactionId)) || (MOCK_ORDERS.data && MOCK_ORDERS.data[0]) || {};
  return mockResolve({ data: ord, statusCode: 200, success: true });
}

export function completeOrderAndDeductStock(orderId) {
  return mockResolve({
    success: true,
    message: "Pembayaran berhasil dan stok diperbarui"
  });
}

// 7. E-Commerce Orders
export function createEcommerceOrder(payload = {}) {
  const orderId = "ECOM-" + Date.now();
  const orderNumber = "INV-" + Date.now().toString().slice(-8);
  const items = payload.items || [];
  const subtotal = items.reduce((sum, it) => sum + ((it.price || 0) * (it.quantity || 1)), 0);
  const shipping = payload.shippingCost || 15000;
  const newOrder = {
    id: orderId,
    orderNumber,
    status: "PENDING",
    paymentStatus: "UNPAID",
    paymentMethod: payload.paymentMethod || "BNI Virtual Account",
    storeId: payload.storeId || "store-001",
    buyerName: payload.buyerName || "Hamzah Diza",
    buyerPhone: payload.buyerPhone || "081234567890",
    buyerAddress: payload.buyerAddress || {},
    items,
    shippingCost: shipping,
    totalAmount: subtotal + shipping + 1000,
    notes: payload.notes || "",
    createdAt: new Date().toISOString()
  };
  if (MOCK_ECOMMERCE_ORDERS && Array.isArray(MOCK_ECOMMERCE_ORDERS.data)) {
    MOCK_ECOMMERCE_ORDERS.data.unshift(newOrder);
  }
  return mockResolve({ success: true, data: newOrder });
}

export function getEcommerceOrders(query) {
  return mockResolve(MOCK_ECOMMERCE_ORDERS);
}

export function getEcommerceOrderDetail(orderId) {
  const ord = (MOCK_ECOMMERCE_ORDERS.data && MOCK_ECOMMERCE_ORDERS.data.find(o => o.id === orderId || o.orderNumber === orderId)) || (MOCK_ECOMMERCE_ORDERS.data && MOCK_ECOMMERCE_ORDERS.data[0]) || {};
  return mockResolve({ success: true, data: ord });
}

export function payEcommerceOrder(orderId, payload = {}) {
  const ord = MOCK_ECOMMERCE_ORDERS.data && MOCK_ECOMMERCE_ORDERS.data.find(o => o.id === orderId || o.orderNumber === orderId);
  if (ord) {
    ord.status = "PAID";
    ord.paymentStatus = "SUCCESS";
  }
  return mockResolve({
    success: true,
    message: "Pembayaran berhasil",
    data: ord || { id: orderId, status: "PAID", paymentStatus: "SUCCESS" }
  });
}

export function requestEcommerceOrderReturn(orderId, payload = {}) {
  const ord = MOCK_ECOMMERCE_ORDERS.data && MOCK_ECOMMERCE_ORDERS.data.find(o => o.id === orderId || o.orderNumber === orderId);
  if (ord) {
    ord.returnStatus = "REQUESTED";
  }
  return mockResolve({
    success: true,
    message: "Pengajuan retur berhasil dikirim",
    data: { orderId, returnStatus: "REQUESTED" }
  });
}

// 8. Financial, Limits & Bill Payment
export function accountListPost() {
  return mockResolve({
    data: {
      accountList: [
        {
          accountNumber: "0091234567",
          accountName: "Hamzah Diza",
          accountType: "TAPLUS",
          accountCurrency: "IDR",
          availableBalance: 125000000,
          isDefault: true
        },
        {
          accountNumber: "0099876543",
          accountName: "Hamzah Diza",
          accountType: "TAPLUS BISNIS",
          accountCurrency: "IDR",
          availableBalance: 450000000,
          isDefault: false
        }
      ]
    },
    statusCode: 200
  });
}

export function postBillerValidation(data, headers) {
  return mockResolve({
    data: {
      data: {
        scope: "POSTLOGIN_TRANSACTION",
        token: "eyJhbGciOiJIUzI1NiJ9.MOCK_TOKEN.RXX4dvImDl",
        tokenExpiry: "2026-12-31 23:59:59.000+07:00"
      }
    },
    status: 200,
    statusCode: 200
  });
}

export function postBillerExecution(data, headers) {
  return mockResolve({
    data: {
      transactionId: "TRX-" + Date.now(),
      referenceNumber: "BNI-" + Date.now(),
      status: "SUCCESS",
      statusCode: "00",
      message: "Transaksi Berhasil"
    },
    statusCode: 200
  });
}

export function inquiryBillPayment(data) {
  return mockResolve({
    data: {
      billerName: "Wondr Lifestyle Merchant",
      customerName: "Hamzah Diza",
      amount: (data && data.amount) || 250000,
      fee: 0,
      totalAmount: (data && data.amount) || 250000
    },
    statusCode: 200
  });
}

export function getBillPayment(data) {
  return mockResolve({
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
  });
}

export function vaTransferPreparation(data) {
  return mockResolve({
    data: {
      vaNumber: "9881234567890123",
      amount: (data && data.amount) || 250000,
      status: "SUCCESS"
    },
    statusCode: 200
  });
}

export function postVirtualAccountValidation(data) {
  return mockResolve({
    data: {
      scope: "POSTLOGIN_TRANSACTION",
      token: "eyJhbGciOiJIUzI1NiJ9.MOCK_VA_TOKEN.RXX4dvImDl",
      tokenExpiry: "2026-12-31 23:59:59.000+07:00"
    },
    statusCode: 200
  });
}

export function postVirtualAccountExecution(data) {
  return mockResolve({
    data: {
      transactionId: "VA-" + Date.now(),
      status: "SUCCESS",
      message: "Pembayaran Virtual Account Berhasil"
    },
    statusCode: 200
  });
}

export function inquiryVirtualAccountPost(data) {
  return mockResolve({
    data: {
      vaNumber: (data && data.vaNumber) || "9881234567890123",
      vaName: "Orbital Store Merchant",
      amount: (data && data.amount) || 250000,
      status: "SUCCESS"
    },
    statusCode: 200
  });
}

// 9. Miscellaneous Reference & Master Data
export function getListOfValueFilter() {
  return mockResolve(MOCK_LOV);
}

export function getTncDetail(subType) {
  return mockResolve(MOCK_TNC);
}

export function transactionLimit(data) {
  return mockResolve(MOCK_LIMIT);
}

export function getPostalCode(data) {
  return mockResolve(MOCK_POSTAL_CODES);
}

export function getOtpCountries() {
  return mockResolve({
    data: [
      { countryCode: "ID", countryName: "Indonesia", phoneCode: "62" },
      { countryCode: "SG", countryName: "Singapore", phoneCode: "65" },
      { countryCode: "MY", countryName: "Malaysia", phoneCode: "60" }
    ],
    statusCode: 200
  });
}

export function getlov(data) {
  return mockResolve({
    data: [
      { key: "ID_CARD", label: "KTP (WNI)" },
      { key: "PASSPORT", label: "Paspor (WNA)" }
    ],
    statusCode: 200
  });
}

export function addContact(data, headers) {
  return mockResolve({ success: true, message: "Kontak berhasil ditambahkan" });
}

// 10. Utilities
export function capitalizeTxt(str) {
  if (!str) return '';
  return String(str).charAt(0).toUpperCase() + String(str).slice(1).toLowerCase();
}
