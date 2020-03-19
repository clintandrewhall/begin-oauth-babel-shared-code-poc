import path from 'path';
import fs from 'fs';

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';
import resolve from 'rollup-plugin-node-resolve';

const lib = path.resolve(__dirname, 'lib/http');
const configs = [];

fs.readdirSync(lib).forEach(mod => {
  const lib = `lib/http/${mod}`;
  const src = `src/http/${mod}`;
  configs.push({
    input: `${lib}/index.ts`,
    output: {
      dir: src,
      format: 'cjs',
    },
    external: ['@architect/functions'],
    plugins: [
      resolve({ extensions: ['.js', '.ts'] }),
      commonjs(),
      babel(),
      copy({
        targets: [
          {
            src: [`${lib}/*`, `${lib}/.*`, `!${lib}/**/*.ts`],
            dest: src,
          },
        ],
        copyOnce: true,
      }),
    ],
  });
});

export default configs;
