/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/counter.json`.
 */
export type Counter = {
  address: "9zdwm1viRGxFcdBCBUH2TV1fXb3GN5Vjfd7rs7ZiTVbf";
  metadata: {
    name: "counter";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "decreement";
      discriminator: [103, 175, 31, 143, 93, 40, 132, 34];
      accounts: [
        {
          name: "counter";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 117, 110, 116, 101, 114];
              },
            ];
          };
        },
        {
          name: "user";
          writable: true;
          signer: true;
        },
      ];
      args: [];
    },
    {
      name: "increement";
      discriminator: [184, 186, 119, 174, 21, 253, 197, 92];
      accounts: [
        {
          name: "counter";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 117, 110, 116, 101, 114];
              },
            ];
          };
        },
        {
          name: "user";
          writable: true;
          signer: true;
        },
      ];
      args: [];
    },
    {
      name: "initialize";
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: "counter";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 117, 110, 116, 101, 114];
              },
            ];
          };
        },
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [];
    },
  ];
  accounts: [
    {
      name: "counter";
      discriminator: [255, 176, 4, 245, 188, 253, 124, 25];
    },
  ];
  types: [
    {
      name: "counter";
      type: {
        kind: "struct";
        fields: [
          {
            name: "count";
            type: "i32";
          },
          {
            name: "bump";
            type: "u8";
          },
        ];
      };
    },
  ];
};

export const IDL: Counter = {
  address: "9zdwm1viRGxFcdBCBUH2TV1fXb3GN5Vjfd7rs7ZiTVbf",
  metadata: {
    name: "counter",
    version: "0.1.0",
    spec: "0.1.0",
    description: "Created with Anchor",
  },
  instructions: [
    {
      name: "decreement",
      discriminator: [103, 175, 31, 143, 93, 40, 132, 34],
      accounts: [
        {
          name: "counter",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [99, 111, 117, 110, 116, 101, 114],
              },
            ],
          },
        },
        {
          name: "user",
          writable: true,
          signer: true,
        },
      ],
      args: [],
    },
    {
      name: "increement",
      discriminator: [184, 186, 119, 174, 21, 253, 197, 92],
      accounts: [
        {
          name: "counter",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [99, 111, 117, 110, 116, 101, 114],
              },
            ],
          },
        },
        {
          name: "user",
          writable: true,
          signer: true,
        },
      ],
      args: [],
    },
    {
      name: "initialize",
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237],
      accounts: [
        {
          name: "counter",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [99, 111, 117, 110, 116, 101, 114],
              },
            ],
          },
        },
        {
          name: "user",
          writable: true,
          signer: true,
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111",
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "Counter",
      discriminator: [255, 176, 4, 245, 188, 253, 124, 25],
    },
  ],
  types: [
    {
      name: "Counter",
      type: {
        kind: "struct",
        fields: [
          {
            name: "count",
            type: "i32",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
  ],
};
