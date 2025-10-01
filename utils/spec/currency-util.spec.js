import {
  expect,
} from 'vitest'
import {
  currencyFormat,
  findLongestSubstringWithNumericEdges,
  percentageFormat,
  unitFormat
} from '../currency-util'
import language from '../../public/language-pack.json'

const languageList = {"id":"id-ID", "en":"en-ID"}
const idLanguage = language.languagePack["id-ID"]

describe('existing test', ()=>{
  it('Format 330123 and retain 2 decimal places (on IDR)', () => {
    expect(currencyFormat({
      value: '330123'
    })).toBe('Rp330.123')
  })

  it('Format 330123.0 and retain 2 decimal places (on IDR)', () => {
    expect(currencyFormat({
      value: '330123.0'
    })).toBe('Rp330.123')
  })

  it('Format 330123.01 and retain 0 decimal places (on IDR)', () => {
    expect(currencyFormat({
      value: '330123.01',
      places: 0
    })).toBe('Rp330.123')
  })

  it('Format 330123.00 and retain 2 decimal places (on IDR)', () => {
    expect(currencyFormat({
      value: '330123.00',
    })).toBe('Rp330.123')
  })

  it('Format 330123.1 and retain 2 decimal places (on IDR)', () => {
    expect(currencyFormat({
      value: '330123.1'
    })).toBe('Rp330.123')
  })

  it('Format 330123.1 and retain 0 decimal places (on IDR)', () => {
    expect(currencyFormat({
      value: '330123.1',
      places: 0
    })).toBe('Rp330.123')
  })

  it('Format 330123.101 and retain 2 decimal places (on IDR)', () => {
    expect(currencyFormat({
      value: '330123.101'
    })).toBe('Rp330.123')
  })

  it('Format 330123.10 and retain 2 decimal places (on IDR)', () => {
    expect(currencyFormat({
      value: '330123.10'
    })).toBe('Rp330.123')
  })

  it('Format 123456789.10 and use abbreviations while retaining 2 decimal places (on IDR)', () => {
    expect(currencyFormat({
      value: '123456789.10',
      isAbbr: true
    })).toBe(`Rp123,45 ${idLanguage.millionAbbreviation}`)
  })

  it('Format 123456789.11 and use abbreviations while retaining 2 decimal places (on IDR)', () => {
    expect(currencyFormat({
      value: '123456789.11',
      isAbbr: true
    })).toBe(`Rp123,45 ${idLanguage.millionAbbreviation}`)
  })

  it('Format 123456789 and use abbreviations while retaining 2 decimal places (on IDR)', () => {
    expect(currencyFormat({
      value: '123456789',
      isAbbr: true
    })).toBe(`Rp123,45 ${idLanguage.millionAbbreviation}`)
  })

  it('Format 123456789.01 and use abbreviations while retaining 2 decimal places (on IDR)', () => {
    expect(currencyFormat({
      value: '123456789.01',
      isAbbr: true
    })).toBe(`Rp123,45 ${idLanguage.millionAbbreviation}`)
  })

  it('Format 123456789.1 and use abbreviations while retaining 2 decimal places (on IDR)', () => {
    expect(currencyFormat({
      value: '123456789.1',
      isAbbr: true
    })).toBe(`Rp123,45 ${idLanguage.millionAbbreviation}`)
  })

  it('Format 123456789.101 and use abbreviations while retaining 2 decimal places (on IDR)', () => {
    expect(currencyFormat({
      value: '123456789.101',
      isAbbr: true
    })).toBe(`Rp123,45 ${idLanguage.millionAbbreviation}`)
  })

  it('Format 123456789.00 and use abbreviations while retaining 2 decimal places (on IDR)', () => {
    expect(currencyFormat({
      value: '123456789.00',
      isAbbr: true
    })).toBe(`Rp123,45 ${idLanguage.millionAbbreviation}`)
  })

  it('Format 123456789.001 and use abbreviations while retaining 2 decimal places (on IDR)', () => {
    expect(currencyFormat({
      value: '123456789.001',
      isAbbr: true
    })).toBe(`Rp123,45 ${idLanguage.millionAbbreviation}`)
  })

  it('Format 330000000000.001 and use abbreviations while retaining 2 decimal places (on IDR)', () => {
    expect(currencyFormat({
      value: '330000000000.001',
      isAbbr: true
    })).toBe(`Rp330 ${idLanguage.billionAbbreviation}`)
  })

  it('Format 330000000000 and use abbreviations while retaining 2 decimal places (on IDR)', () => {
    expect(currencyFormat({
      value: '330000000000',
      isAbbr: true
    })).toBe(`Rp330 ${idLanguage.billionAbbreviation}`)
  })

  it('Format 3300000000000 and use abbreviations while retaining 2 decimal places (on IDR)', () => {
    expect(currencyFormat({
      value: '3300000000000',
      isAbbr: true
    })).toBe(`Rp3,30 ${idLanguage.trillionAbbreviation}`)
  })

  it('Format 330110000000 and use abbreviations while retaining 2 decimal places (on IDR)', () => {
    expect(currencyFormat({
      value: '330110000000',
      isAbbr: true
    })).toBe(`Rp330,11 ${idLanguage.billionAbbreviation}`)
  })

  it('Format 330001100000 and use abbreviations while retaining 2 decimal places (on IDR)', () => {
    expect(currencyFormat({
      value: '330001100000',
      isAbbr: true
    })).toBe(`Rp330 ${idLanguage.billionAbbreviation}`)
  })

  it('Format 330011100000 and use abbreviations while retaining 2 decimal places (on IDR)', () => {
    expect(currencyFormat({
      value: '330011100000',
      isAbbr: true
    })).toBe(`Rp330,01 ${idLanguage.billionAbbreviation}`)
  })

  it('Format 330101100000 and use abbreviations while retaining 2 decimal places (on IDR)', () => {
    expect(currencyFormat({
      value: '330101100000',
      isAbbr: true
    })).toBe(`Rp330,10 ${idLanguage.billionAbbreviation}`)
  })

  it('Format 3301011000000000 and use abbreviations while retaining 2 decimal places (on IDR)', () => {
    expect(currencyFormat({
      value: '3301011000000000',
      isAbbr: true
    })).toBe(`Rp3.301,01 ${idLanguage.trillionAbbreviation}`)
  })

  it('Format 3301011000000000 and use abbreviations while retaining 0 decimal places (on IDR)', () => {
    expect(currencyFormat({
      value: '3301011000000000',
      isAbbr: true,
      places: 0
    })).toBe(`Rp3.301,01 ${idLanguage.trillionAbbreviation}`)
  })

  it('Format 3301011000000000 and use abbreviations while retaining 0 decimal places (on IDR)', () => {
    expect(currencyFormat({
      value: '3301011000000000',
      isAbbr: true,
      places: 3
    })).toBe(`Rp3.301,01 ${idLanguage.trillionAbbreviation}`)
  })

  it('Format 1789.11 to obtain currency string object and obtain abbreviation', () => {
    expect(currencyFormat({
      value: '1789.11',
      isAbbr: true
    })).toBe('Rp1.789')
  })

  it('Format 0 to with symbol and space,use percentage format(IDR)', () => {
    expect(percentageFormat(0, true, true)).toBe('0%')
  })

  it('Format 0 to without symbol and with space,use percentage format(IDR)', () => {
    expect(percentageFormat(0, false, true)).toBe('0%')
  })

  it('Format 0 to with symbol and without space,use percentage format(IDR)', () => {
    expect(percentageFormat(0, true, false)).toBe('0%')
  })

  it('Format 0 to without symbol and space,use percentage format(IDR)', () => {
    expect(percentageFormat(0, false, false)).toBe('0%')
  })

  it('Format 1.234 to with symbol and space,use percentage format(IDR)', () => {
    expect(percentageFormat(1.234, true, true)).toBe('+ 1,23%')
  })

  it('Format 1.234 to without symbol and with space,use percentage format(IDR)', () => {
    expect(percentageFormat(1.234, false, true)).toBe('1,23%')
  })

  it('Format 1.234 to with symbol and without space,use percentage format(IDR)', () => {
    expect(percentageFormat(1.234, true, false)).toBe('+1,23%')
  })

  it('Format 1.234 to without symbol and space,use percentage format(IDR)', () => {
    expect(percentageFormat(1.234, false, false)).toBe('1,23%')
  })

  it('Format 1.234 to without symbol and space,use percentage format(IDR) with specific trim length', () => {
    expect(percentageFormat(1.234, false, false, 2)).toBe('1,23%')
  })

  it('Format -1.234 to with symbol and space,use percentage format(IDR)', () => {
    expect(percentageFormat(-1.234, true, true)).toBe('- 1,23%')
  })

  it('Format -1.234 to without symbol and with space,use percentage format(IDR)', () => {
    expect(percentageFormat(-1.234, false, true)).toBe('1,23%')
  })

  it('Format -1.234 to with symbol and without space,use percentage format(IDR)', () => {
    expect(percentageFormat(-1.234, true, false)).toBe('-1,23%')
  })

  it('Format -1.234 to without symbol and space,use percentage format(IDR)', () => {
    expect(percentageFormat(-1.234, false, false)).toBe('1,23%')
  })

  it('Format 1.200 use percentage format(IDR)', () => {
    expect(percentageFormat(1.200, true, true)).toBe('+ 1,20%')
  })

  it('Format -1.200 use percentage format(IDR)', () => {
    expect(percentageFormat(-1.200, true, true)).toBe('- 1,20%')
  })

  it('Format 0 to with symbol and space,use percentage format(USD)', () => {
    getApp().globalData.nativeData.language = 'en-ID'
    expect(percentageFormat(0, true, true)).toBe('0%')
  })

  it('Format 0 to without symbol and with space,use percentage format(USD)', () => {
    expect(percentageFormat(0, false, true)).toBe('0%')
  })

  it('Format 0 to with symbol and without space,use percentage format(USD)', () => {
    expect(percentageFormat(0, true, false)).toBe('0%')
  })

  it('Format 0 to without symbol and space,use percentage format(USD)', () => {
    expect(percentageFormat(0, false, false)).toBe('0%')
  })

  it('Format 1.234 to with symbol and space,use percentage format(USD)', () => {
    expect(percentageFormat(1.234, true, true)).toBe('+ 1.23%')
  })

  it('Format 1.234 to without symbol and with space,use percentage format(USD)', () => {
    expect(percentageFormat(1.234, false, true)).toBe('1.23%')
  })

  it('Format 1.234 to with symbol and without space,use percentage format(USD)', () => {
    expect(percentageFormat(1.234, true, false)).toBe('+1.23%')
  })

  it('Format 1.234 to without symbol and space,use percentage format(USD)', () => {
    expect(percentageFormat(1.234, false, false)).toBe('1.23%')
  })

  it('Format -1.234 to with symbol and space,use percentage format(USD)', () => {
    expect(percentageFormat(-1.234, true, true)).toBe('- 1.23%')
  })

  it('Format -1.234 to without symbol and with space,use percentage format(USD)', () => {
    expect(percentageFormat(-1.234, false, true)).toBe('1.23%')
  })

  it('Format -1.234 to with symbol and without space,use percentage format(USD)', () => {
    expect(percentageFormat(-1.234, true, false)).toBe('-1.23%')
  })

  it('Format -1.234 to without symbol and space,use percentage format(USD)', () => {
    expect(percentageFormat(-1.234, false, false)).toBe('1.23%')
  })

  it('Format -1.20 to without symbol and space,use percentage format(USD)', () => {
    expect(percentageFormat(-1.20, false, false)).toBe('1.20%')
  })

  it('Format 1.200 use percentage format(USD)', () => {
    expect(percentageFormat(1.200, true, true)).toBe('+ 1.20%')
  })

  it('Format -1.200 use percentage format(USD)', () => {
    expect(percentageFormat(-1.200, true, true)).toBe('- 1.20%')
  })

  it('Format undefined use percentage format(USD)', () => {
    expect(percentageFormat(undefined, true, true)).toBe('undefined')
  })
})

describe('Test for percentageFormat update', ()=>{
  describe("ID", ()=>{
    it("test for valid input", ()=>{
      getApp().globalData.nativeData.language = languageList["id"]
      const input = 1.234567890
      const result = percentageFormat(input)
      expect(result).toBe('1,23%')
    })

    it("test for symbol (+)", ()=>{
      const input = 1.234567890
      const result = percentageFormat(input, true)
      expect(result).toBe('+1,23%')
    })

    it("test for symbol (-)", ()=>{
      const input = -1.234567890
      const result = percentageFormat(input, true)
      expect(result).toBe('-1,23%')
    })

    
    it("test for symbol (+) with space", ()=>{
      const input = 1.234567890
      const result = percentageFormat(input, true, true)
      expect(result).toBe('+ 1,23%')
    })

    it("test for symbol (-) with space", ()=>{
      const input = -1.234567890
      const result = percentageFormat(input, true, true)
      expect(result).toBe('- 1,23%')
    })

    it("test auto trim", ()=>{
      const input = 1.234567890
      const result = percentageFormat(input, true, true, 'auto')
      expect(result).toBe('+ 1,23456%')
    })

    it("test auto trim with zero tail", ()=>{
      const input = 1.23000
      const result = percentageFormat(input, true, true, 'auto')
      expect(result).toBe('+ 1,23%')
    })

    it("test specific trim", ()=>{
      const input = 1.23456
      const result = percentageFormat(input, true, true, 3)
      expect(result).toBe('+ 1,234%')
    })

    it("test specific trim", ()=>{
      const input = 1
      const result = percentageFormat(input, true, true, 3)
      expect(result).toBe('+ 1%')
    })

    it("test specific trim", ()=>{
      const input = 1
      const result = percentageFormat(input, true, true, 'auto')
      expect(result).toBe('+ 1%')
    })

    it("test for zero value", ()=>{
      const input = 0
      const result = percentageFormat(input, true, true, 3)
      expect(result).toBe('0%')
    })

    it("test invalid value", ()=>{
      expect(percentageFormat("a", true, true, 3)).toBe('undefined')
      expect(percentageFormat(null, true, true, 3)).toBe('undefined')
      expect(percentageFormat(undefined, true, true, 3)).toBe('undefined')
      expect(percentageFormat(undefined, true, true, 'errors')).toBe('undefined')
    })

    it("test invalid value", ()=>{
      expect(percentageFormat(1, false, false, 'errors')).toBe('undefined')
      expect(percentageFormat(2, false, false, -1)).toBe('undefined')
    })
      
  })

  describe("EN", ()=>{
    it("test for valid input", ()=>{
      getApp().globalData.nativeData.language = languageList["en"]
      const input = 1.234567890
      const result = percentageFormat(input)
      expect(result).toBe('1.23%')
    })

    it("test for symbol (+)", ()=>{
      const input = 1.234567890
      const result = percentageFormat(input, true)
      expect(result).toBe('+1.23%')
    })

    it("test for symbol (-)", ()=>{
      const input = -1.234567890
      const result = percentageFormat(input, true)
      expect(result).toBe('-1.23%')
    })

    
    it("test for symbol (+) with space", ()=>{
      const input = 1.234567890
      const result = percentageFormat(input, true, true)
      expect(result).toBe('+ 1.23%')
    })

    it("test for symbol (-) with space", ()=>{
      const input = -1.234567890
      const result = percentageFormat(input, true, true)
      expect(result).toBe('- 1.23%')
    })

    it("test auto trim", ()=>{
      const input = 1.234567890
      const result = percentageFormat(input, true, true, 'auto')
      expect(result).toBe('+ 1.23456%')
    })

    it("test specific trim", ()=>{
      const input = 1
      const result = percentageFormat(input, true, true, 3)
      expect(result).toBe('+ 1%')
    })

    it("test auto trim with zero tail", ()=>{
      const input = 1.23000
      const result = percentageFormat(input, true, true, 'auto')
      expect(result).toBe('+ 1.23%')
    })

    it("test specific trim", ()=>{
      const input = 1.23456
      const result = percentageFormat(input, true, true, 3)
      expect(result).toBe('+ 1.234%')
    })

    it("test specific trim", ()=>{
      const input = "123.0000000001"
      getApp().globalData.nativeData.language = 'en-ID'
      const result = percentageFormat(input, true, true, 'auto')
      expect(result).toBe('+ 123%')
      getApp().globalData.nativeData.language = 'id-ID'
    })

    it("test specific trim", ()=>{
      const result = percentageFormat("", false, false)
      expect(result).toBe('0%')
    })

    it("test for zero value", ()=>{
      const input = 0
      const result = percentageFormat(input, true, true, 3)
      expect(result).toBe('0%')
    })

    it("test invalid value", ()=>{
      expect(percentageFormat("a", true, true, 3)).toBe('undefined')
      expect(percentageFormat(null, true, true, 3)).toBe('undefined')
      expect(percentageFormat(undefined, true, true, 3)).toBe('undefined')
    })
  })
})

describe("findLongestSubstringWithNumericEdges",()=>{
  it("IDR - findLongestSubstringWithNumericEdges valid", ()=>{
    const s = '1234567890'
    const currency = 'IDR'
    expect(findLongestSubstringWithNumericEdges(s, currency)).toBe('1234567890')
  })
  it("IDR - findLongestSubstringWithNumericEdges valid", ()=>{
    const s = '12345678a0'
    const currency = 'USD'
    expect(findLongestSubstringWithNumericEdges(s, currency)).toBe('123456780')
  })
  it("IDR - findLongestSubstringWithNumericEdges valid", ()=>{
    const s = '123b5678a'
    const currency = 'USD'
    expect(findLongestSubstringWithNumericEdges(s, currency)).toBe('1235678')
  })
  it("IDR - findLongestSubstringWithNumericEdges valid", ()=>{
    const s = '1,23'
    const currency = 'IDR'
    expect(findLongestSubstringWithNumericEdges(s, currency)).toBe('1')
  })
  
  it('Format -1.234 and retain 2 decimal places (on USD)', () => {
    expect(currencyFormat({
      value: '-1.234',
      currency: 'USD',
      places: undefined,
      isPrefix: false,
      showNegativeSymbol:true
    })).toBe('-1.23')
  })

  it('Format -1.234 and retain 2 decimal places (on IDR)', () => {
    expect(currencyFormat({
      value: '1.234',
      currency: 'IDR',
      places: undefined,
      isPrefix: false,
      showNegativeSymbol:true
    })).toBe('+1')
  })

  it('unitFormat', () => {
    getApp().globalData.nativeData.language = 'id-ID'
    expect(unitFormat(1)).toBe('1')
    getApp().globalData.nativeData.language = 'en-ID'
    expect(unitFormat(1)).toBe('1')
  })
})