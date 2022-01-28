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
                /* -ms-overflow-style: none; */
            }
            /* ::-webkit-scrollbar {
                display: none;
            } */

            ::-webkit-scrollbar {
                width: 5px;
            }
            
            /* Track */
            ::-webkit-scrollbar-track {
                box-shadow: inset 0 0 5px grey; 
                border-radius: 5px;
            }
            
            /* Handle */
            ::-webkit-scrollbar-thumb {
                background: ${appConfig.theme.colors.neutrals[200]};
                border-radius: 5px;
            }

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