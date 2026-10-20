import { describe, it, expect } from 'vitest';
import { getInstance } from '../../configTest/utils';
var collapseItem = [{
  content: "Siapkan data-data yang diperlukan ....",
  title: "Apa yang perlu disiapin untuk mulai investasi?"
}, {
  content: "Kamu bisa memilih produk berdasarkan profil risiko kamu.",
  title: "Bagaimana memilih produk investasi?"
}, {
  content: "Tentunya sangat aman.",
  title: "Apakah investasi di wondr aman?"
}];
describe('Collapse Function and Prop Checking', function () {
  it("Has collapseItem on collapse", function () {
    var collapseStatus = [false, false, false];
    var instance = getInstance('bni-collapse', {
      collapseItem: collapseItem,
      collapseStatus: collapseStatus
    });
    expect(Array.isArray(instance.getData().collapseItem)).toBe(true);
    expect(instance.getData().collapseStatus).toStrictEqual(collapseStatus);
  });
});
it('should toggle the collapse status of the selected index', function () {
  var eventMock = {
    currentTarget: {
      dataset: {
        index: 0
      }
    }
  };
  var index = eventMock.currentTarget.dataset.index;
  var mockData = {
    collapseStatus: [false, false, false]
  };
  var instance = getInstance('bni-collapse', mockData);
  var newAccordion = instance.getData().collapseStatus.map(function (state, i) {
    if (i === index) {
      var newState = !state;
      return newState;
    }
    return state;
  });
  instance.callMethod('toggleCollapse', eventMock);
  expect(instance.getData().collapseStatus).toEqual(newAccordion);
});
it('should toggle the accordion status of the selected index', function () {
  var eventMock = {
    currentTarget: {
      dataset: {
        index: 0
      }
    }
  };
  var index = eventMock.currentTarget.dataset.index;
  var mockData = {
    collapseStatus: [false, false, false]
  };
  var instance = getInstance('bni-collapse', mockData);
  var newAccordion = instance.getData().collapseStatus.map(function (state, i) {
    if (i === index) {
      var newState = !state;
      return newState;
    }
    return false;
  });
  instance.callMethod('toggleAccordion', eventMock);
  expect(instance.getData().collapseStatus).toEqual(newAccordion);
});