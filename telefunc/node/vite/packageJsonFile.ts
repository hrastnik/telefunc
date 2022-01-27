/*
 * We create a file `dist/server/package.json` to support ESM users.
 * Explaination: https://github.com/brillout/vite-plugin-ssr/blob/7b499a94780fa33f7931d2bcd0aeb2eb2aac0274/vite-plugin-ssr/node/plugin/packageJsonFile.ts#L2-L7
 */

import type { Plugin } from 'vite'
import { assert } from '../utils'
import { isSSR_config } from './utils'

export { packageJsonFile }

function packageJsonFile(): Plugin {
  let ssr: boolean
  return {
    name: 'telefunc:packageJsonFile',
    apply: 'build',
    configResolved(config) {
      ssr = isSSR_config(config)
    },
    generateBundle() {
      assert(typeof ssr === 'boolean')
      if (!ssr) return
      this.emitFile({
        fileName: `package.json`,
        type: 'asset',
        source: getPackageJsonContent(),
      })
    },
  } as Plugin
}

function getPackageJsonContent(): string {
  return '{ "type": "commonjs" }'
}