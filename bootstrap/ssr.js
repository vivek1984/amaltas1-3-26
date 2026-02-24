import { createServer } from 'http'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { renderToString } from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import createServerInertia from '@inertiajs/react/server'

const port = 13714

createServerInertia(page =>
    createInertiaApp({
        page,
        render: renderToString,
        resolve: name => {
            const pages = import.meta.glob('../resources/js/Pages/**/*.jsx', { eager: true })
            return pages[`../resources/js/Pages/${name}.jsx`]
        },
        setup: ({ App, props }) => <App {...props} />,
    })
).listen(port)

console.log(`SSR server running on http://127.0.0.1:${port}`)