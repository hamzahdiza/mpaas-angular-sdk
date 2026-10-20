import { describe, it, expect } from 'vitest';
import { getInstance } from '../../configTest/utils';
describe('Components Steps and Props Checking', function () {
  it('has data on steps', function () {
    var data = [{
      name: "Order Diterima",
      date: "21 Sep 2023",
      time: "16.20 WIB",
      status: "success",
      detail: "Lorem ipsum dolor sit amet consectetur. ",
      icon: "/pages/assets/icons/ic_common_check_outlined.svg"
    }];
    var instance = getInstance("bni-step-vertical", {
      data: data
    });
    expect(instance.getData().data.length).toBeGreaterThan(0);
    expect(instance.getData().data[0]).toBeTypeOf('object');
    expect(instance.getData().data[0]).toHaveProperty('name');
    expect(instance.getData().data[0]).toHaveProperty('date');
    expect(instance.getData().data[0]).toHaveProperty('time');
    expect(instance.getData().data[0]).toHaveProperty('status');
    expect(instance.getData().data[0]).toHaveProperty('icon');
  });
  it('data is filled with null value', function () {
    var data = null;
    var instance = getInstance('bni-step-vertical', {
      data: data
    });
    expect(instance.getData().data).toBeNull();
  });
  it('Change state', function () {
    var data = [{
      name: "Order Diterima",
      date: "21 Sep 2023",
      time: "16.20 WIB",
      status: "success",
      detail: "Lorem ipsum dolor sit amet consectetur. ",
      icon: "/pages/assets/icons/ic_common_check_outlined.svg"
    }];
    var newData = [{
      name: "Order berhasil diverifikasi",
      date: "22 Sep 2023",
      time: "15.20 WIB",
      status: "success",
      detail: "Lorem ipsum dolor sit amet consectetur. ",
      icon: "/pages/assets/icons/ic_common_checkmark.svg"
    }];
    var instance = getInstance('bni-step-vertical', {
      type: data
    });
    instance.setProps({
      data: newData
    });
    expect(instance.getData().data[0]).toHaveProperty('name');
    expect(instance.getData().data[0]).toHaveProperty('date');
    expect(instance.getData().data[0]).toHaveProperty('time');
    expect(instance.getData().data[0]).toHaveProperty('status');
    expect(instance.getData().data[0]).toHaveProperty('icon');
  });
});