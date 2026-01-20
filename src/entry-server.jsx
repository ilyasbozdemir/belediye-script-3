import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'

export function render(url, context) {
    const helmetContext = {};
    const html = renderToString(
        <StrictMode>
            <HelmetProvider context={helmetContext}>
                <StaticRouter location={url} context={context}>
                    <App />
                </StaticRouter>
            </HelmetProvider>
        </StrictMode>
    );

    const { helmet } = helmetContext;

    return {
        html,
        head: `
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
    `
    };
}
