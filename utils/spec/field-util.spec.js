import { expect, test } from "vitest";
import { riskLevel, typeMap } from "../field-util";

const lang = getApp().globalData.languagePack

test("Get type for FIXD",()=>{
    expect(typeMap('FIXD')).toStrictEqual(lang.productListScreenFixedIncome)
})

test("Get type for EQTY",()=>{
    expect(typeMap('EQTY')).toStrictEqual(lang.productListScreenStocks)
})

test("Get type for MM",()=>{
    expect(typeMap('MM')).toStrictEqual(lang.productListScreenMoneyMarket)
})

test("Get type for BALN",()=>{
    expect(typeMap('BALN')).toStrictEqual(lang.productListScreenMixed)
})

test("Get type for ALL",()=>{
    expect(typeMap('ALL')).toStrictEqual(lang.productListScreenDefaultFallbackName)
})

test("An empty argument returns ALL",()=>{
    expect(typeMap('')).toStrictEqual(lang.productListScreenDefaultFallbackName)
})

test("Get risk level for VHIGH",()=>{
    expect(riskLevel('VHIGH')).toStrictEqual(lang.productDetailScreenRiskVHIGH)
})

test("Get risk level for HIGH",()=>{
    expect(riskLevel('HIGH')).toStrictEqual(lang.productDetailScreenRiskHIGH)
})

test("Get risk level for MED",()=>{
    expect(riskLevel('MED')).toStrictEqual(lang.productDetailScreenRiskMED)
})

test("Get risk level for LOW",()=>{
    expect(riskLevel('LOW')).toStrictEqual(lang.productDetailScreenRiskLOW)
})

test("An empty argument returns undefined",()=>{
    expect(riskLevel()).toStrictEqual(undefined)
})

test("Get risk level for empty string", () => {
  expect(riskLevel('')).toStrictEqual(undefined)
})