import UsuarioProvider from '../context/UsuarioContext';
import appConfig from '../config.json';

function GlobalStyle() {
    return (
        <style global jsx>{`
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                list-style:none;
                -ms-overflow-style: none;
            }
            ::-webkit-scrollbar {
                display: none;
            }

            /* ::-webkit-scrollbar {
                width: 4px;
                height: 50%;
                border-radius: 15px;
            }
            
            ::-webkit-scrollbar-thumb {
                background: ${appConfig.theme.colors.primary['300']};
            }
            ::-webkit-scrollbar-track {
                background: ${appConfig.theme.colors.primary['300']};
            } */

            body {
                font-family: 'Open Sans', sans-serif;
            }

            /* App fit Height */
            html, body, #__next {
                min-height: 100vh;
                display: flex;
                flex: 1;
            }
            #__next {
                flex:1;
            }
            #__next > * {
                flex:1
            }
            /* ./App fit Height */
        `}
        </style>
    );
}

export default function MyApp({ Component, pageProps }) {
    console.log('Roda em todas as páginas');
    return (
        <>
            <GlobalStyle />
            <UsuarioProvider>
                <Component {...pageProps} />
            </UsuarioProvider>
        </>
    );
  }