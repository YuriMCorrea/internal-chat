import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';

export default function Chat() {
    const [msg, setMsg] = useState('');
    const [listaMsg, setListaMsg] = useState([{}]);
    // Sua lógica vai aqui

    // ./Sua lógica vai aqui

    function handleNewMsg(newMsg){
        const mensagem = {
            id: listaMsg.length + 1,
            from: 'Yuri M. Corrêa',
            text: newMsg,
        }
        setListaMsg([
            mensagem,
            ...listaMsg, 
            
        ]);
        setMsg('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/07/earthrise-1536x864.jpg)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',  
                    }}
                >
                    
                    <MessageList messages={listaMsg} />
                            
                    
                    {/* {
                        listaMsg.map(currentMsg => {
                            return(
                                <li key={currentMsg.id}>
                                    {currentMsg.from}: {currentMsg.text}
                                </li>
                            )
                        })
                    }        */}
 
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                            value={msg}
                            onChange={e => {
                                const valor = e.target.value;
                                setMsg(valor);
                            }}
                            onKeyPress={(e) => {
                                if(e.key === 'Enter'){
                                    e.preventDefault();
                                    handleNewMsg(msg);
                                }
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    const roteamento = useRouter();
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                    onclick={roteamento.push('/')}
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log('MessageList', props);
    return (
            <Box
                tag="ul"
                styleSheet={{
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    flex: 1,
                    color: appConfig.theme.colors.neutrals["000"],
                    marginBottom: '16px',
                }}
            >
                {
                    props.messages.map((msg) => {
                        return(
                            <>
                                <Text
                                    key={msg.id}
                                    tag="li"
                                    styleSheet={{
                                        borderRadius: '5px',
                                        padding: '6px',
                                        marginBottom: '12px',
                                        hover: {
                                            backgroundColor: appConfig.theme.colors.neutrals[700],
                                        }
                                    }}
                                >
                                    <Box
                                        styleSheet={{
                                            marginBottom: '8px',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Image
                                            styleSheet={{
                                                width: '20px',
                                                height: '20px',
                                                borderRadius: '50%',
                                                display: 'inline-block',
                                                marginRight: '8px',
                                            }}
                                            src={`https://github.com/yurimcorrea.png`}
                                        />
                                        <Text tag="strong">
                                            {msg.from}
                                        </Text>
                                        <Text
                                            styleSheet={{
                                                fontSize: '10px',
                                                marginLeft: '8px',
                                                color: appConfig.theme.colors.neutrals[300],
                                            }}
                                            tag="span"
                                        >
                                            {(new Date().toLocaleDateString())}
                                        </Text>
                                    </Box>
                                    {msg.text}
                                </Text>
                            </>
                        );
                    })
                }
            </Box>
    )
}