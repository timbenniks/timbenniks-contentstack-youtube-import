import { defineNuxtModule, addPlugin, addImportsDir, createResolver, useLogger } from '@nuxt/kit'
import { defu } from 'defu'
import chalk from 'chalk'

export interface ModuleOptions {
  debug: boolean
}

const logger = useLogger("nuxt-contentstack-app")

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-contentstack-app',
    version: '1.0.0',
    configKey: 'nuxt-contentstack-app',
    compatibility: {
      nuxt: '^3.12.0',
      bridge: false,
    },
  },

  defaults: {
    debug: true,
  },

  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    _nuxt.options.runtimeConfig.public.contentstackApp = defu(_nuxt.options.runtimeConfig.public.contentstackApp, _options)

    if (_options.debug) {
      logger.box(`${chalk.bold('⚡️')} debug true`)
    }

    addPlugin(resolver.resolve('./runtime/contentstack-app-sdk'))
    addImportsDir(resolver.resolve('./runtime/composables'))
  },
})
