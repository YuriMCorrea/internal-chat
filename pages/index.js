import React,  { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useUsuarioContext } from '../context/UsuarioContext';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json';



function Titulo(props) {
    // console.log(props);
    const Tag = props.tag || 'h1';
    return(
        <>
            <Tag>{props.children}</Tag>
            <style jsx>
              {`
                ${Tag} {
                    color: ${appConfig.theme.colors.primary['050']},
                    font-size: 32px
                    font-weight: 600;
                    margin: 15px;
                }
            `}
            </style>
        </>
    );
};

function PaginaInicial() {
    const { usuario, setUsuario } = useUsuarioContext();
    const [username, setUsername] = useState('');
    const [btnCheck, setBtnCheck] = useState(true);
    const roteamento = useRouter();
  
  useEffect(() => {
    if(username.length > 1) {
      setBtnCheck(false);
    } else {
      setBtnCheck(true);
    }
  }, [username]);

    return (
      <>
      <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/07/earthrise-1536x864.jpg)',
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
      }}
      >
      <Head>
        <title>Login</title>
      </Head>
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: 'fit-content',
              borderRadius: '10px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals[700],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit={function (eventInfo) {
                eventInfo.preventDefault();
                setUsuario(username);
                roteamento.push('/chat');
                /* window.location.href = '/chat'; */
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, minWidth:'300px', textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Titulo tag="h2">Seja bem-vindo!</Titulo>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                {appConfig.name}
              </Text>
  
              <TextField
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
                placeholder='Enter your GitHub user name'
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
              />
              <Button
                type='submit'
                label='Entrar'
                disabled={btnCheck}
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["700"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            {
              username.length > 1 ? 
                <>
                  <Box
                    styleSheet={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      maxWidth: '300px',
                      padding: '16px',
                      margin: '10px',
                      backgroundColor: appConfig.theme.colors.neutrals[800],
                      border: '1px solid',
                      borderColor: appConfig.theme.colors.neutrals[999],
                      borderRadius: '10px',
                      flex: 1,
                      minHeight: '240px',
                    }}
                  >
                    <Image
                      styleSheet={{
                        borderRadius: '50%',
                        marginBottom: '16px',
                      }}
                      src={`https://github.com/${username}.png`}
                    />
                    <Text
                      variant="body4"
                      styleSheet={{
                        color: appConfig.theme.colors.neutrals[200],
                        backgroundColor: appConfig.theme.colors.neutrals[900],
                        padding: '3px 10px',
                        borderRadius: '1000px',
                        fontSize: '1.3rem',
                      }}
                    >
                      {username}
                    </Text>
                  </Box>
                </>
              
               : null
              }
              {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  };

  export default PaginaInicial;