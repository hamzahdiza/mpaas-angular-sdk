import {
  describe,
  expect,
  it,
  vi
} from "vitest";

import './card-product-bonds';

const currentPage = global.pageInstance;

describe('Card Product Bonds Component', () => {
  let initialProps;
  beforeEach(() => {
    initialProps = {
      dataProduct: {
        productId: "STO12-T2",
        image: "https://placehld.co/600x400xx",
        seri: "STO12-T2",
        productName: "Sukuk Tabungan",
        currency: "IDR",
        remainingQuota: "1000000000",
        couponRate: 0.05,
        remainingQuotaPercentage: 20,
        quotaUsedPercentage: "#71DBD3",
        couponType: "Floating with Floor",
        startPurchasePeriod: "2024-08-08T00:00:00.000Z",
        endPurchasePeriod: "2024-09-07T00:00:00.000Z",
        startDateFormatted: "",
        endDateFormatted: "",
      },
      lang: {
        bondsProductListRemainingQuota: "Sisa kuota nasional",
        bondsProductListCouponRate: "Imbal Hasil",
        bondsProductListPurchasePeriod: "Periode Pemesanan",
        bondsProductListCouponType: "Tipe Kupon",
      },
      onCardTap: vi.fn(), // Mock the onCardTap function
    };
    currentPage.props = initialProps
  });

  it('should handle lifecycle component correctly', () => {
    currentPage.didMount()
    currentPage.didUnmount()
    currentPage.didUpdate()
  })

  it('should handle status incoming', () => {
    const mockData = {
      dataProduct: {
        productId: "STO12-T2",
        image: "https://placehld.co/600x400xx",
        seri: "STO12-T2",
      }
    }
    currentPage.props = mockData
    
    currentPage.didMount.call(currentPage)
    expect(currentPage.data.status).toBe('incoming')
  })

  it('should handle didUpdate correctly', () => {
    currentPage.didUpdate(initialProps)
  })

  it('should handle icon broken event correctly', () => {
    const mockEvent = {
      target: {
        dataset: {
          id: "prod_ORI026"
        }
      }
    };
    const mockData = {
      dataProduct: {
        ...initialProps.dataProduct,
        id: "prod_ORI026",
        imageBroken: "../../assets/icons/ic_common_broken_image.svg"
      }
    }
    currentPage.props = mockData

    currentPage.methods.checkIconBroken.call(currentPage, mockEvent)
    expect(currentPage.data.dataProduct.image).toBe("../../assets/icons/ic_common_broken_image.svg")
  });

  it('should handle icon broken event incorrectly', () => {
    vi.spyOn(currentPage.methods, 'checkIconBroken')
    currentPage.methods.checkIconBroken.call(currentPage)
    
    expect(currentPage.methods.checkIconBroken).toHaveBeenCalled()
  });

  it('should handle card on tap function', () => {
    currentPage.methods.cardOnTap.call(currentPage);

    expect(currentPage.props.onCardTap).toHaveBeenCalledOnce()
  })

});