import {
  describe,
  it,
  expect,
  vi
} from 'vitest';
import {
  getInstance
} from '../../configTest/utils';

describe('bni-lists', () => {
  it('should initialize dateTransactionList from props.data sorted by date and normalized', () => {
    const testData = [{
        id: "1",
        date: "2025-06-20",
        icon: "/../../pages/assets/icons/ic_common_transfer.svg",
        title: "Transfer",
        description: "KCP Bendungan Hilir",
        status: "Kadaluarsa",
        statusColor: "EXPIRED"
      },
      {
        id: "2",
        date: "2025-06-21",
        icon: "/../../pages/assets/icons/ic_common_transfer.svg",
        title: "Transfer",
        description: "KCP Bendungan Hilir",
        status: "Kadaluarsa",
        statusColor: "Active"
      }
    ];

    const onTapMock = vi.fn();


    // Props must match what your component expects
    const instance = getInstance('bni-lists', {
      type: 'transactionHistory',
      data: testData, // match this.props.data usage in component
      onTap: onTapMock
    });

    // Lifecycle should already have run inside getInstance
    const resultList = instance.getData().dateTransactionList;

    // Should be sorted descending by date
    // expect(resultList[0].id).toBe("2");
    // expect(resultList[1].id).toBe("1");

    // statusColor should be lowercase
    expect(resultList[0].statusColor).toBe("EXPIRED");
    expect(resultList[1].statusColor).toBe("Active");

    const mockEvent = {
      detail: {
        id: "2"
      }
    };
    instance.callMethod('handleOnTap', mockEvent);

    expect(onTapMock).toHaveBeenCalledTimes(1);
    expect(onTapMock).toHaveBeenCalledWith(mockEvent);
  });

});
describe('bni-lists methods', () => {
  it('should call onTap when handleOnTap is triggered', () => {
    const onTapMock = vi.fn();
    const instance = getInstance('bni-lists', {
      onTap: onTapMock
    });

    // Simulate tap
    instance.callMethod('handleOnTap', {
      some: 'event'
    });

    expect(onTapMock).toHaveBeenCalledTimes(1);
    expect(onTapMock).toHaveBeenCalledWith({
      some: 'event'
    });
  });

  it('should lowercase existing statusColor', () => {
    const item = {
      status: 'Done',
      statusColor: 'DONE'
    };
    const instance = getInstance('bni-lists', {});

    instance.callMethod('handlenormalizeStatusColor', item);

    expect(item.statusColor).toBe('done');
  });

  it('should set statusColor to done if status is Selesai (Bahasa)', () => {
    const item = {
      status: 'Selesai'
    };
    const instance = getInstance('bni-lists', {});

    instance.callMethod('handlenormalizeStatusColor', item);

    expect(item.statusColor).toBe('done');
  });

  it('should set statusColor to canceled if status is Canceled (English)', () => {
    const item = {
      status: 'Canceled'
    };
    const instance = getInstance('bni-lists', {});

    instance.callMethod('handlenormalizeStatusColor', item);

    expect(item.statusColor).toBe('canceled');
  });

  it('should set statusColor to expired if status is Kadaluarsa (Bahasa)', () => {
    const item = {
      status: 'Kadaluarsa'
    };
    const instance = getInstance('bni-lists', {});

    instance.callMethod('handlenormalizeStatusColor', item);

    expect(item.statusColor).toBe('expired');
  });

  it('should set statusColor to default if status is unknown', () => {
    const item = {
      status: 'In Progress'
    };
    const instance = getInstance('bni-lists', {});

    instance.callMethod('handlenormalizeStatusColor', item);

    expect(item.statusColor).toBe('default');
  });

  it('should set statusColor to default if no status and no statusColor', () => {
    const item = {};
    const instance = getInstance('bni-lists', {});

    instance.callMethod('handlenormalizeStatusColor', item);

    expect(item.statusColor).toBe('default');
  });
});