Page({
  data: {
    intelligentBranch: [{
        "id": "123",
        "date": "20 Juni 2025",
        "icon": "/../../pages/assets/icons/ic_common_transfer.svg",
        "title": "Transfer",
        "description": "KCP Bendungan Hilir",
        "status": "Kadaluarsa",
        "statusColor": "expired",

      },
      {
        "date": "25 Juni 2025",
        "icon": "/../../pages/assets/icons/ic_common_transfer.svg",
        "title": "Setor Tunai",
        "description": "KCP Bendungan Hilir",
        "status": "Selesai",
        "statusColor": "done"


      },
      {
        "date": "21 Juni 2025",
        "icon": "/../../pages/assets/icons/ic_common_transfer.svg",
        "title": "Setor Tunai",
        "description": "KCP Bendungan Hilir",
        "status": "Dibatalkan",
        "statusColor": "canceled"

      },
      {
        "date": "25 Juni 2025",
        "icon": "/../../pages/assets/icons/ic_common_transfer.svg",
        "title": "Setor Tunai",
        "description": "KCP Bendungan Hilir",
        "status": "Selesai",
        "statusColor": "done"

      }
    ],
    transactionHistoryList: [

      {
        "trxDate": "2023-05-31",
        "description": "Pembelian",
        "icon": "/../../pages/assets/images/sbr-purchase-logo.svg",
        "amount": "44028",
        "balance": "6304370",
        "dplkAccountNumber": "19128888",
        "title": "Simponi Likuid Plus",
        "status": "Berhasil",
        "statusColor": "done"
      }, {
        "trxDate": "2023-05-31",
        "description": "Pembelian",
        "icon": "/../../pages/assets/images/sbr-purchase-logo.svg",
        "amount": "44028",
        "balance": "6304370",
        "dplkAccountNumber": "19128888",
        "title": "Simponi Likuid Plus",
        "status": "Gagal",
        "statusColor": "canceled"
      }, {
        "trxDate": "2023-05-31",
        "description": "Pembelian",
        "icon": "/../../pages/assets/images/sbr-purchase-logo.svg",
        "amount": "44028",
        "balance": "6304370",
        "dplkAccountNumber": "19128888",
        "title": "Simponi Likuid Plus",
        "status": "Dalam Proses",
        "statusColor": "inprogress"
      },

    ],

    defaultContactList: [{
        "letter": "A",
        "dataContact": [{
            "beneficiaryAliasName": "Andi",
            "_id": "Qw9rT6Lm88Z0-g1",
            "beneficiaryAccountNumber": "582031",
            "beneficiaryAccountName": "Andi Santoso",
            "beneficiaryAccountProxy": "andi.santoso@example.com",
            "beneficiaryProxyType": "01",
            "beneficiaryBankCode": "008",
            "beneficiaryBankName": "Bank Sejahtera",
            "beneficiaryBankAliasName": "BSej",
            "beneficiaryUserCif": "778200334455",
            "beneficiaryBankBIC": "SEJAIDJ8",
            "accountName": "Andi",
            "initial": "A",
            "highlight": {
              "accountName": [{
                "text": "Andi",
                "hit": false
              }],
              "beneficiaryAccountNumber": [{
                "text": "582031",
                "hit": false
              }]
            },
            "start": 1000000000
          },
          {
            "beneficiaryAliasName": "Andi",
            "_id": "Qw9rT6Lm88Z0-g2",
            "beneficiaryAccountNumber": "306714",
            "beneficiaryAccountName": "Andi Mahendra",
            "beneficiaryAccountProxy": "andi.mahendra@example.com",
            "beneficiaryProxyType": "02",
            "beneficiaryBankCode": "002",
            "beneficiaryBankName": "Bank Garuda",
            "beneficiaryBankAliasName": "BGar",
            "beneficiaryUserCif": "665544332211",
            "beneficiaryBankBIC": "GARUIDJ2",
            "accountName": "Andi",
            "initial": "A",
            "highlight": {
              "accountName": [{
                "text": "Andi",
                "hit": false
              }],
              "beneficiaryAccountNumber": [{
                "text": "306714",
                "hit": false
              }]
            },
            "start": 1000000000
          }
        ]
      },
      {
        "letter": "P",
        "dataContact": [{
          "beneficiaryAliasName": "Putri",
          "_id": "tX4L9oS0cA7J-g1",
          "beneficiaryAccountNumber": "639750",
          "beneficiaryAccountName": "Putri Johnson",
          "beneficiaryAccountProxy": "putri.johnson@example.com",
          "beneficiaryProxyType": "01",
          "beneficiaryBankCode": "025",
          "beneficiaryBankName": "Bank National",
          "beneficiaryBankAliasName": "BN",
          "beneficiaryUserCif": "330077661199",
          "beneficiaryBankBIC": "NATNIDJ5",
          "accountName": "Putri",
          "initial": "P",
          "highlight": {
            "accountName": [{
              "text": "Putri",
              "hit": false
            }],
            "beneficiaryAccountNumber": [{
              "text": "639750",
              "hit": false
            }]
          },
          "start": 1000000000
        }]
      },
      {
        "letter": "R",
        "dataContact": [{
            "beneficiaryAliasName": "Rina",
            "_id": "a7XK9pQ12vB3-g1",
            "beneficiaryAccountNumber": "274519",
            "beneficiaryAccountName": "Rina Pratama",
            "beneficiaryAccountProxy": "rina.pratama@example.com",
            "beneficiaryProxyType": "01",
            "beneficiaryBankCode": "009",
            "beneficiaryBankName": "Bank Nusantara",
            "beneficiaryBankAliasName": "BNus",
            "beneficiaryUserCif": "903284756120",
            "beneficiaryBankBIC": "NUSAIDJ9",
            "accountName": "Rina",
            "initial": "R",
            "highlight": {
              "accountName": [{
                "text": "Rina",
                "hit": false
              }],
              "beneficiaryAccountNumber": [{
                "text": "274519",
                "hit": false
              }]
            },
            "start": 1000000000
          },
          {
            "beneficiaryAliasName": "Rina",
            "_id": "a7XK9pQ12vB3-g2",
            "beneficiaryAccountNumber": "941672",
            "beneficiaryAccountName": "Rina Kusuma",
            "beneficiaryAccountProxy": "rina.kusuma@example.com",
            "beneficiaryProxyType": "02",
            "beneficiaryBankCode": "014",
            "beneficiaryBankName": "Bank Samudra",
            "beneficiaryBankAliasName": "BSam",
            "beneficiaryUserCif": "120987564331",
            "beneficiaryBankBIC": "SAMUIDJ4",
            "accountName": "Rina",
            "initial": "R",
            "highlight": {
              "accountName": [{
                "text": "Rina",
                "hit": false
              }],
              "beneficiaryAccountNumber": [{
                "text": "941672",
                "hit": false
              }]
            },
            "start": 1000000000
          },
          {
            "beneficiaryAliasName": "Rina",
            "_id": "a7XK9pQ12vB3-g3",
            "beneficiaryAccountNumber": "508743",
            "beneficiaryAccountName": "Rina Halim",
            "beneficiaryAccountProxy": "rina.halim@example.com",
            "beneficiaryProxyType": "01",
            "beneficiaryBankCode": "003",
            "beneficiaryBankName": "Bank Andalas",
            "beneficiaryBankAliasName": "BAnd",
            "beneficiaryUserCif": "441203889001",
            "beneficiaryBankBIC": "ANDAIDJ3",
            "accountName": "Rina",
            "initial": "R",
            "highlight": {
              "accountName": [{
                "text": "Rina",
                "hit": false
              }],
              "beneficiaryAccountNumber": [{
                "text": "508743",
                "hit": false
              }]
            },
            "start": 1000000000
          }
        ]
      },
      {
        "letter": "S",
        "dataContact": [{
            "_id": "m1N7cD4uP5xE-g2",
            "beneficiaryAccountNumber": "204637",
            "beneficiaryAccountName": "Sari Ananda",
            "beneficiaryAccountProxy": "sari.ananda@example.com",
            "beneficiaryProxyType": "01",
            "beneficiaryBankCode": "016",
            "beneficiaryBankName": "Bank Sentosa",
            "beneficiaryBankAliasName": "BSen",
            "beneficiaryUserCif": "102233445566",
            "beneficiaryBankBIC": "SENSIDJ6",
            "accountName": "Sari Ananda",
            "initial": "SA",
            "highlight": {
              "accountName": [{
                "text": "Sari Ananda",
                "hit": false
              }],
              "beneficiaryAccountNumber": [{
                "text": "204637",
                "hit": false
              }]
            },
            "start": 1000000000
          },
          {
            "_id": "m1N7cD4uP5xE-g3",
            "beneficiaryAccountNumber": "790154",
            "beneficiaryAccountName": "Sari Halim",
            "beneficiaryAccountProxy": "sari.halim@example.com",
            "beneficiaryProxyType": "02",
            "beneficiaryBankCode": "021",
            "beneficiaryBankName": "Bank Arunika",
            "beneficiaryBankAliasName": "BARU",
            "beneficiaryUserCif": "889900776611",
            "beneficiaryBankBIC": "ARUNIDJ1",
            "accountName": "Sari Halim",
            "initial": "SH",
            "highlight": {
              "accountName": [{
                "text": "Sari Halim",
                "hit": false
              }],
              "beneficiaryAccountNumber": [{
                "text": "790154",
                "hit": false
              }]
            },
            "start": 1000000000
          },
          {
            "_id": "m1N7cD4uP5xE-g4",
            "beneficiaryAccountNumber": "118902",
            "beneficiaryAccountName": "Sari Kusuma",
            "beneficiaryAccountProxy": "sari.kusuma@example.com",
            "beneficiaryProxyType": "01",
            "beneficiaryBankCode": "027",
            "beneficiaryBankName": "Bank Mandala",
            "beneficiaryBankAliasName": "BMan",
            "beneficiaryUserCif": "550022331199",
            "beneficiaryBankBIC": "MANDIDJ5",
            "accountName": "Sari Kusuma",
            "initial": "SK",
            "highlight": {
              "accountName": [{
                "text": "Sari Kusuma",
                "hit": false
              }],
              "beneficiaryAccountNumber": [{
                "text": "118902",
                "hit": false
              }]
            },
            "start": 1000000000
          },
          {
            "_id": "m1N7cD4uP5xE-g1",
            "beneficiaryAccountNumber": "815490",
            "beneficiaryAccountName": "Sari Wijaya",
            "beneficiaryAccountProxy": "sari.wijaya@example.com",
            "beneficiaryProxyType": "01",
            "beneficiaryBankCode": "013",
            "beneficiaryBankName": "Bank Harmoni",
            "beneficiaryBankAliasName": "BHrm",
            "beneficiaryUserCif": "319975310246",
            "beneficiaryBankBIC": "HARMIDJ3",
            "accountName": "Sari Wijaya",
            "initial": "SW",
            "highlight": {
              "accountName": [{
                "text": "Sari Wijaya",
                "hit": false
              }],
              "beneficiaryAccountNumber": [{
                "text": "815490",
                "hit": false
              }]
            },
            "start": 1000000000
          }
        ]
      }
    ],

    searchContactListAccountName: [{
        "letter": "A",
        "dataContact": [{
            "beneficiaryAliasName": "Andi",
            "_id": "Qw9rT6Lm88Z0-g1",
            "beneficiaryAccountNumber": "582031",
            "beneficiaryAccountName": "Andi Santoso",
            "beneficiaryAccountProxy": "andi.santoso@example.com",
            "beneficiaryProxyType": "01",
            "beneficiaryBankCode": "008",
            "beneficiaryBankName": "Bank Sejahtera",
            "beneficiaryBankAliasName": "BSej",
            "beneficiaryUserCif": "778200334455",
            "beneficiaryBankBIC": "SEJAIDJ8",
            "accountName": "Andi",
            "initial": "A",
            "highlight": {
              "accountName": [{
                  "text": "And",
                  "hit": true
                },
                {
                  "text": "i",
                  "hit": false
                }
              ],
              "beneficiaryAccountNumber": [{
                "text": "582031",
                "hit": false
              }]
            },
            "start": 0
          },
          {
            "beneficiaryAliasName": "Andi",
            "_id": "Qw9rT6Lm88Z0-g2",
            "beneficiaryAccountNumber": "306714",
            "beneficiaryAccountName": "Andi Mahendra",
            "beneficiaryAccountProxy": "andi.mahendra@example.com",
            "beneficiaryProxyType": "02",
            "beneficiaryBankCode": "002",
            "beneficiaryBankName": "Bank Garuda",
            "beneficiaryBankAliasName": "BGar",
            "beneficiaryUserCif": "665544332211",
            "beneficiaryBankBIC": "GARUIDJ2",
            "accountName": "Andi",
            "initial": "A",
            "highlight": {
              "accountName": [{
                  "text": "And",
                  "hit": true
                },
                {
                  "text": "i",
                  "hit": false
                }
              ],
              "beneficiaryAccountNumber": [{
                "text": "306714",
                "hit": false
              }]
            },
            "start": 0
          }
        ]
      },
      {
        "letter": "S",
        "dataContact": [{
          "_id": "m1N7cD4uP5xE-g2",
          "beneficiaryAccountNumber": "204637",
          "beneficiaryAccountName": "Sari Ananda",
          "beneficiaryAccountProxy": "sari.ananda@example.com",
          "beneficiaryProxyType": "01",
          "beneficiaryBankCode": "016",
          "beneficiaryBankName": "Bank Sentosa",
          "beneficiaryBankAliasName": "BSen",
          "beneficiaryUserCif": "102233445566",
          "beneficiaryBankBIC": "SENSIDJ6",
          "accountName": "Sari Ananda",
          "initial": "SA",
          "highlight": {
            "accountName": [{
                "text": "Sari An",
                "hit": false
              },
              {
                "text": "and",
                "hit": true
              },
              {
                "text": "a",
                "hit": false
              }
            ],
            "beneficiaryAccountNumber": [{
              "text": "204637",
              "hit": false
            }]
          },
          "start": 7
        }]
      }
    ],

    defaultLastTransaction: [{
        "id": "781245",
        "beneficiaryAccountNumber": "987654321",
        "beneficiaryAccountProxy": null,
        "beneficiaryAccountName": "Jane Smith",
        "beneficiaryAliasName": "Jane",
        "beneficiaryBankCode": "014",
        "beneficiaryBankName": "Bank Central Asia",
        "beneficiaryBankAliasName": "BCA",
        "transactionTime": "2023-07-12 15:30:00",
        "isFromContact": true,
        "beneficiaryUserCif": "123123",
        "beneficiaryServiceCode": "transfer-intrabank",
        "beneficiaryBankBIC": "CENAIDJA",
        "accountName": "Jane",
        "initial": "J",
        "highlight": {
          "accountName": [{
            "text": "Jane",
            "hit": false
          }],
          "beneficiaryAccountNumber": [{
            "text": "987654321",
            "hit": false
          }]
        },
        "start": 1000000000
      },
      {
        "id": "902317",
        "beneficiaryAccountNumber": "123456789",
        "beneficiaryAccountProxy": null,
        "beneficiaryAccountName": "John Doe",
        "beneficiaryAliasName": "John",
        "beneficiaryBankCode": "008",
        "beneficiaryBankName": "Bank Mandiri",
        "beneficiaryBankAliasName": "MANDIRI",
        "transactionTime": "2023-07-11 10:45:00",
        "isFromContact": false,
        "beneficiaryUserCif": "123123",
        "beneficiaryServiceCode": "transfer-interbank",
        "beneficiaryBankBIC": "BMRIIDJA",
        "accountName": "John",
        "initial": "J",
        "highlight": {
          "accountName": [{
            "text": "John",
            "hit": false
          }],
          "beneficiaryAccountNumber": [{
            "text": "123456789",
            "hit": false
          }]
        },
        "start": 1000000000
      },
      {
        "id": "630114",
        "beneficiaryAccountNumber": "550012349",
        "beneficiaryAccountProxy": "lisa.putri@example.com",
        "beneficiaryAccountName": "Lisa Putri",
        "beneficiaryAliasName": "Lisa",
        "beneficiaryBankCode": "009",
        "beneficiaryBankName": "Bank Negara Indonesia",
        "beneficiaryBankAliasName": "BNI",
        "transactionTime": "2023-07-10 09:02:11",
        "isFromContact": true,
        "beneficiaryUserCif": "88990011",
        "beneficiaryServiceCode": "transfer-intrabank",
        "beneficiaryBankBIC": "BNINIDJA",
        "accountName": "Lisa",
        "initial": "L",
        "highlight": {
          "accountName": [{
            "text": "Lisa",
            "hit": false
          }],
          "beneficiaryAccountNumber": [{
            "text": "550012349",
            "hit": false
          }]
        },
        "start": 1000000000
      },
      {
        "id": "114508",
        "beneficiaryAccountNumber": "771234560",
        "beneficiaryAccountProxy": "081298765432",
        "beneficiaryAccountName": "Aditya Pratama",
        "beneficiaryAliasName": "Adit",
        "beneficiaryBankCode": "014",
        "beneficiaryBankName": "Bank Central Asia",
        "beneficiaryBankAliasName": "BCA",
        "transactionTime": "2023-07-09 21:18:30",
        "isFromContact": true,
        "beneficiaryUserCif": "55667788",
        "beneficiaryServiceCode": "transfer-interbank",
        "beneficiaryBankBIC": "CENAIDJA",
        "accountName": "Adit",
        "initial": "A",
        "highlight": {
          "accountName": [{
            "text": "Adit",
            "hit": false
          }],
          "beneficiaryAccountNumber": [{
            "text": "771234560",
            "hit": false
          }]
        },
        "start": 1000000000
      },
      {
        "id": "774201",
        "beneficiaryAccountNumber": "330045671",
        "beneficiaryAccountProxy": null,
        "beneficiaryAccountName": "Budi Santoso",
        "beneficiaryAliasName": "Budi",
        "beneficiaryBankCode": "002",
        "beneficiaryBankName": "Bank Rakyat Indonesia",
        "beneficiaryBankAliasName": "BRI",
        "transactionTime": "2023-07-09 14:55:02",
        "isFromContact": false,
        "beneficiaryUserCif": "99887766",
        "beneficiaryServiceCode": "transfer-interbank",
        "beneficiaryBankBIC": "BRINIDJA",
        "accountName": "Budi",
        "initial": "B",
        "highlight": {
          "accountName": [{
            "text": "Budi",
            "hit": false
          }],
          "beneficiaryAccountNumber": [{
            "text": "330045671",
            "hit": false
          }]
        },
        "start": 1000000000
      },
      {
        "id": "347822",
        "beneficiaryAccountNumber": "664401238",
        "beneficiaryAccountProxy": "sari.wijaya@example.com",
        "beneficiaryAccountName": "Sari Wijaya",
        "beneficiaryAliasName": "Sari",
        "beneficiaryBankCode": "013",
        "beneficiaryBankName": "Permata Bank",
        "beneficiaryBankAliasName": "PERMATA",
        "transactionTime": "2023-07-08 08:12:45",
        "isFromContact": true,
        "beneficiaryUserCif": "44002211",
        "beneficiaryServiceCode": "transfer-intrabank",
        "beneficiaryBankBIC": "BBBAIDJA",
        "accountName": "Sari",
        "initial": "S",
        "highlight": {
          "accountName": [{
            "text": "Sari",
            "hit": false
          }],
          "beneficiaryAccountNumber": [{
            "text": "664401238",
            "hit": false
          }]
        },
        "start": 1000000000
      },
      {
        "id": "509610",
        "beneficiaryAccountNumber": "114567802",
        "beneficiaryAccountProxy": null,
        "beneficiaryAccountName": "Fajar Saputra",
        "beneficiaryAliasName": "Fajar",
        "beneficiaryBankCode": "022",
        "beneficiaryBankName": "CIMB Niaga",
        "beneficiaryBankAliasName": "CIMB",
        "transactionTime": "2023-07-08 19:20:10",
        "isFromContact": false,
        "beneficiaryUserCif": "22001133",
        "beneficiaryServiceCode": "transfer-interbank",
        "beneficiaryBankBIC": "BNIAIDJA",
        "accountName": "Fajar",
        "initial": "F",
        "highlight": {
          "accountName": [{
            "text": "Fajar",
            "hit": false
          }],
          "beneficiaryAccountNumber": [{
            "text": "114567802",
            "hit": false
          }]
        },
        "start": 1000000000
      },
      {
        "id": "286401",
        "beneficiaryAccountNumber": "778900123",
        "beneficiaryAccountProxy": "andi.santoso@example.com",
        "beneficiaryAccountName": "Andi Santoso",
        "beneficiaryAliasName": "Andi",
        "beneficiaryBankCode": "011",
        "beneficiaryBankName": "Bank Danamon",
        "beneficiaryBankAliasName": "DANAMON",
        "transactionTime": "2023-07-07 07:30:00",
        "isFromContact": true,
        "beneficiaryUserCif": "66778899",
        "beneficiaryServiceCode": "transfer-intrabank",
        "beneficiaryBankBIC": "BDINIDJA",
        "accountName": "Andi",
        "initial": "A",
        "highlight": {
          "accountName": [{
            "text": "Andi",
            "hit": false
          }],
          "beneficiaryAccountNumber": [{
            "text": "778900123",
            "hit": false
          }]
        },
        "start": 1000000000
      },
      {
        "id": "991754",
        "beneficiaryAccountNumber": "990012345",
        "beneficiaryAccountProxy": "082212345678",
        "beneficiaryAccountName": "Dewi Lestari",
        "beneficiaryAliasName": "Dewi",
        "beneficiaryBankCode": "008",
        "beneficiaryBankName": "Bank Mandiri",
        "beneficiaryBankAliasName": "MANDIRI",
        "transactionTime": "2023-07-07 12:40:55",
        "isFromContact": false,
        "beneficiaryUserCif": "10101010",
        "beneficiaryServiceCode": "transfer-interbank",
        "beneficiaryBankBIC": "BMRIIDJA",
        "accountName": "Dewi",
        "initial": "D",
        "highlight": {
          "accountName": [{
            "text": "Dewi",
            "hit": false
          }],
          "beneficiaryAccountNumber": [{
            "text": "990012345",
            "hit": false
          }]
        },
        "start": 1000000000
      },
      {
        "id": "440120",
        "beneficiaryAccountNumber": "441122334",
        "beneficiaryAccountProxy": null,
        "beneficiaryAccountName": "Rina Kusuma",
        "beneficiaryAliasName": "Rina",
        "beneficiaryBankCode": "009",
        "beneficiaryBankName": "Bank Negara Indonesia",
        "beneficiaryBankAliasName": "BNI",
        "transactionTime": "2023-07-06 16:01:09",
        "isFromContact": true,
        "beneficiaryUserCif": "90909090",
        "beneficiaryServiceCode": "transfer-intrabank",
        "beneficiaryBankBIC": "BNINIDJA",
        "accountName": "Rina",
        "initial": "R",
        "highlight": {
          "accountName": [{
            "text": "Rina",
            "hit": false
          }],
          "beneficiaryAccountNumber": [{
            "text": "441122334",
            "hit": false
          }]
        },
        "start": 1000000000
      },
      {
        "id": "553002",
        "beneficiaryAccountNumber": "221133445",
        "beneficiaryAccountProxy": "john.jill@example.com",
        "beneficiaryAccountName": "John Jill",
        "beneficiaryAliasName": "Jill",
        "beneficiaryBankCode": "014",
        "beneficiaryBankName": "Bank Central Asia",
        "beneficiaryBankAliasName": "BCA",
        "transactionTime": "2023-07-05 18:22:33",
        "isFromContact": false,
        "beneficiaryUserCif": "80808080",
        "beneficiaryServiceCode": "transfer-interbank",
        "beneficiaryBankBIC": "CENAIDJA",
        "accountName": "Jill",
        "initial": "J",
        "highlight": {
          "accountName": [{
            "text": "Jill",
            "hit": false
          }],
          "beneficiaryAccountNumber": [{
            "text": "221133445",
            "hit": false
          }]
        },
        "start": 1000000000
      },
      {
        "id": "118940",
        "beneficiaryAccountNumber": "665544332",
        "beneficiaryAccountProxy": "080012345678",
        "beneficiaryAccountName": "Nadia Prameswari",
        "beneficiaryAliasName": "Nadia",
        "beneficiaryBankCode": "002",
        "beneficiaryBankName": "Bank Rakyat Indonesia",
        "beneficiaryBankAliasName": "BRI",
        "transactionTime": "2023-07-05 09:10:10",
        "isFromContact": true,
        "beneficiaryUserCif": "12345000",
        "beneficiaryServiceCode": "transfer-intrabank",
        "beneficiaryBankBIC": "BRINIDJA",
        "accountName": "Nadia",
        "initial": "N",
        "highlight": {
          "accountName": [{
            "text": "Nadia",
            "hit": false
          }],
          "beneficiaryAccountNumber": [{
            "text": "665544332",
            "hit": false
          }]
        },
        "start": 1000000000
      },
      {
        "id": "207315",
        "beneficiaryAccountNumber": "331122008",
        "beneficiaryAccountProxy": null,
        "beneficiaryAccountName": "Putra Mahendra",
        "beneficiaryBankCode": "013",
        "beneficiaryBankName": "Permata Bank",
        "beneficiaryBankAliasName": "PERMATA",
        "transactionTime": "2023-07-04 20:45:54",
        "isFromContact": false,
        "beneficiaryUserCif": "55556666",
        "beneficiaryServiceCode": "transfer-interbank",
        "beneficiaryBankBIC": "BBBAIDJA",
        "accountName": "Putra Mahendra",
        "initial": "PM",
        "highlight": {
          "accountName": [{
            "text": "Putra Mahendra",
            "hit": false
          }],
          "beneficiaryAccountNumber": [{
            "text": "331122008",
            "hit": false
          }]
        },
        "start": 1000000000
      },
      {
        "id": "330721",
        "beneficiaryAccountNumber": "998877661",
        "beneficiaryAccountProxy": "yoga.pranata@example.com",
        "beneficiaryAccountName": "Yoga Pranata",
        "beneficiaryBankCode": "022",
        "beneficiaryBankName": "CIMB Niaga",
        "beneficiaryBankAliasName": "CIMB",
        "transactionTime": "2023-07-04 11:11:11",
        "isFromContact": true,
        "beneficiaryUserCif": "77774444",
        "beneficiaryServiceCode": "transfer-intrabank",
        "beneficiaryBankBIC": "BNIAIDJA",
        "accountName": "Yoga Pranata",
        "initial": "YP",
        "highlight": {
          "accountName": [{
            "text": "Yoga Pranata",
            "hit": false
          }],
          "beneficiaryAccountNumber": [{
            "text": "998877661",
            "hit": false
          }]
        },
        "start": 1000000000
      },
      {
        "id": "661900",
        "beneficiaryAccountNumber": "445566778",
        "beneficiaryAccountProxy": "083812345678",
        "beneficiaryAccountName": "Kirana Anindya",
        "beneficiaryBankCode": "011",
        "beneficiaryBankName": "Bank Danamon",
        "beneficiaryBankAliasName": "DANAMON",
        "transactionTime": "2023-07-03 17:32:40",
        "isFromContact": false,
        "beneficiaryUserCif": "22223333",
        "beneficiaryServiceCode": "transfer-interbank",
        "beneficiaryBankBIC": "BDINIDJA",
        "accountName": "Kirana Anindya",
        "initial": "KA",
        "highlight": {
          "accountName": [{
            "text": "Kirana Anindya",
            "hit": false
          }],
          "beneficiaryAccountNumber": [{
            "text": "445566778",
            "hit": false
          }]
        },
        "start": 1000000000
      }
    ],

    idContact: {
      idLetter: 'idLetter',
      idInitial: 'idInitial',
      idAccountName: 'idAccountName',
      idBankName: 'idBankName',
      idAccountNumber: 'idAccountNumber'
    },
    onSearch: false

  },
  onLoad() {

  },
  goToDetail(e) {
    // console.log(e)
  },
  mockAccountName() {
    this.setData({
      onSearch: !this.data.onSearch
    })
  }
});