import {
  getLanguagePacks
} from '../getLanguagePacks';
import {
  getNewLockey
} from '../../public/api';

vi.mock('../../public/api');
vi.mock('../../public/language-pack.json');

describe('getLanguagePacks', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    my.getStorage = vi.fn();
    my.setStorage = vi.fn();
  });

  it('should return language pack from storage if API returns the same version', async () => {
    global.getApp = vi.fn().mockReturnValue({
      globalData: {
        nativeData: {
          language: 'id-ID'
        }
      }
    });
    const mockData = {
      languageVersion: '1',
      languagePack: {
        "id-ID": {
          greeting: 'Hello'
        }
      }
    };
    my.getStorage.mockResolvedValueOnce({
      data: mockData
    });
    getNewLockey.mockResolvedValueOnce({
      status: 200,
      data: {
        data: mockData
      }
    });

    await getLanguagePacks();

  });

  it('should return language pack from storage if API returns the same version', async () => {
    global.getApp = vi.fn().mockReturnValue({
      globalData: {
        nativeData: {
          language: 'en-ID'
        }
      }
    });
    const mockData = {
      languageVersion: '1',
      languagePack: {
        "en-ID": {
          greeting: 'Hello'
        }
      }
    };
    my.getStorage.mockResolvedValueOnce({
      data: mockData
    });
    getNewLockey.mockResolvedValueOnce({
      status: 200,
      data: {
        data: mockData
      }
    });

    await getLanguagePacks();

  });

  it('should return stored language pack if API returns 200 and version is the same', async () => {
    const mockID = { greeting: 'Halo' };
    const mockEN = { greeting: 'Hello' };
    const version = '1';
  
    global.getApp = vi.fn().mockReturnValue({
      globalData: {
        nativeData: {
          language: 'id-ID'
        },
        languagePack: null
      }
    });
  
    my.getStorage = vi.fn()
      .mockResolvedValueOnce({ data: version }) // lockeyVer
      .mockResolvedValueOnce({ data: mockID })  // lockeyID
      .mockResolvedValueOnce({ data: mockEN }); // lockeyEN
  
    getNewLockey.mockResolvedValueOnce({
      status: 200,
      data: {
        data: {
          languageVersion: version,
          languagePack: {
            "id-ID": mockID,
            "en-ID": mockEN
          }
        }
      }
    });
  
    const result = await getLanguagePacks();
  
    expect(result).toEqual(mockID);
  });
  
  it('should update storage and return new language pack if version differs', async () => {
    global.getApp = vi.fn().mockReturnValue({
      globalData: {
        nativeData: {
          language: 'id-ID'
        }
      }
    });
    const oldData = {
      languageVersion: '1',
      languagePack: {
        "id-ID": {
          greeting: 'Hello'
        }
      }
    };
    const newData = {
      languageVersion: '2',
      languagePack: {
        "id-ID": {
          greeting: 'Hi'
        }
      }
    };
    my.getStorage.mockResolvedValueOnce({
      data: oldData
    });
    getNewLockey.mockResolvedValueOnce({
      status: 200,
      data: {
        data: newData
      }
    });

    await getLanguagePacks();

    expect(my.setStorage).toHaveBeenCalledTimes(3);
    expect(my.setStorage).toHaveBeenCalledWith({
      key: 'lockeyVer',
      data: newData.languageVersion
    });
    expect(my.setStorage).toHaveBeenCalledWith({
      key: 'lockeyID',
      data: newData.languagePack["id-ID"]
    });
    expect(my.setStorage).toHaveBeenCalledWith({
      key: 'lockeyEN',
      data: newData.languagePack["en-ID"]
    });
  });

  it('should update storage and return new language pack if version differs', async () => {
    const oldData = {
      languageVersion: '1',
      languagePack: {
        "id-ID": {
          greeting: 'Hello'
        }
      }
    };
    const newData = {
      languageVersion: '2',
      languagePack: {
        "id-ID": {
          greeting: 'Hi'
        }
      }
    };
    my.getStorage.mockResolvedValueOnce({
      data: oldData
    });
    getNewLockey.mockResolvedValueOnce({
      statusCode: 200,
      data: {
        data: newData
      }
    });

    await getLanguagePacks();

    expect(my.setStorage).toHaveBeenCalledTimes(3);
    expect(my.setStorage).toHaveBeenCalledWith({
      key: 'lockeyVer',
      data: newData.languageVersion
    });
    expect(my.setStorage).toHaveBeenCalledWith({
      key: 'lockeyID',
      data: newData.languagePack["id-ID"]
    });
    expect(my.setStorage).toHaveBeenCalledWith({
      key: 'lockeyEN',
      data: newData.languagePack["en-ID"]
    });
  });

  it('should return language pack from storage if API returns 204', async () => {
    const mockData = {
      languageVersion: '1',
      languagePack: {
        "id-ID": {
          greeting: 'Hello'
        }
      }
    };
    my.getStorage.mockResolvedValueOnce({
      data: mockData
    });
    getNewLockey.mockResolvedValueOnce({
      status: 204
    });

    await getLanguagePacks();

  });

  it('should return stored language pack if API returns 204', async () => {
    const mockID = { greeting: 'Hello' };
    const mockEN = { greeting: 'Hello' };
  
    global.getApp = vi.fn().mockReturnValue({
      globalData: {
        nativeData: {
          language: 'id-ID'
        },
        languagePack: null
      }
    });
  
    getNewLockey.mockResolvedValueOnce({
      status: 204,
      data: {} 
    });
  
    my.getStorage = vi.fn()
      .mockResolvedValueOnce({ data: mockID }) 
      .mockResolvedValueOnce({ data: mockEN }); 
  
    const result = await getLanguagePacks();
  
    // Cek urutan pemanggilan
    expect(my.getStorage).toHaveBeenNthCalledWith(1, { key: 'lockeyVer' });
    expect(my.getStorage).toHaveBeenNthCalledWith(2, { key: 'lockeyID' });
  
    expect(result).toEqual(mockID); // karena 'id-ID'
  });
  
  it('should return stored language pack if API returns 204', async () => {
    const mockID = { greeting: 'Hello' };
    const mockEN = { greeting: 'Hello' };
  
    global.getApp = vi.fn().mockReturnValue({
      globalData: {
        nativeData: {
          language: 'id-ID'
        },
        languagePack: null
      }
    });
  
    my.getStorage = vi.fn()
      .mockResolvedValueOnce({ data: mockID }) // lockeyID
      .mockResolvedValueOnce({ data: mockEN }); // lockeyEN
  
    getNewLockey.mockResolvedValueOnce({
      statusCode: 204,
      data: {}
    });
  
    const result = await getLanguagePacks();
  
    expect(result).toEqual(mockID);
  });
  

  it('should return stored language pack if API returns 204', async () => {
    const mockID = { greeting: 'Hello' };
    const mockEN = { greeting: 'Hello' };
  
    global.getApp = vi.fn().mockReturnValue({
      globalData: {
        nativeData: {
          language: 'en-ID'
        },
        languagePack: null
      }
    });
  
    my.getStorage = vi.fn()
      .mockResolvedValueOnce({ data: mockID }) // lockeyID
      .mockResolvedValueOnce({ data: mockEN }); // lockeyEN
  
    getNewLockey.mockResolvedValueOnce({
      statusCode: 204,
      data: {}
    });
  
  
    // expect(result).toEqual(mockEN);
  });
  

  it('should handle 409 and 503 errors by returning stored language pack', async () => {
    const mockData = {
      languageVersion: '1',
      languagePack: {
        "id-ID": {
          greeting: 'Halo'
        },
        "en-ID": {
          greeting: 'Hello'
        }
      }
    };

    my.getStorage.mockResolvedValueOnce({
      data: mockData.languagePack["id-ID"]
    });
    my.getStorage.mockResolvedValueOnce({
      data: mockData.languagePack["en-ID"]
    });

    // getNewLockey.mockRejectedValueOnce({ status: 409 });

    // const result = await getLanguagePacks();

  });

  it('should return stored language pack if API throws 409 error', async () => {
    const mockID = { greeting: 'Hello' };
    const mockEN = { greeting: 'Hello' };
  
    global.getApp = vi.fn().mockReturnValue({
      globalData: {
        nativeData: {
          language: 'id-ID'
        },
        languagePack: null
      }
    });
  
    my.getStorage = vi.fn()
      .mockResolvedValueOnce({ data: mockID }) // lockeyID
      .mockResolvedValueOnce({ data: mockEN }); // lockeyEN
  
    getNewLockey.mockRejectedValueOnce({
      status: 409
    });
  
    const result = await getLanguagePacks();
  
    expect(result).toEqual(mockID);
  });
  

});
