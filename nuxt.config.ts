// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    css: 
    [
        '~/app/index.scss',
    ],
    typescript: 
    {
        strict: true
    },
    modules: [
        '@pinia/nuxt',
    ],
    vite: 
    {
        css: 
        {
            preprocessorOptions: 
            {
                scss: 
                {
                    additionalData: `@import "@/app/styles/vars.scss";`
                }
            }
        }
    }
})
