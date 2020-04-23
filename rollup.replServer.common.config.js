import typescript from '@rollup/plugin-typescript';

export default {
  input: 'replServer/src/server.ts',
  output: {
    dir: 'replServer/dist',
    format: 'cjs'
  },
  plugins: [typescript()]
};