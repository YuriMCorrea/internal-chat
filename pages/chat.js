import { supabase } from '../api';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useUsuarioContext } from '../context/UsuarioContext';
import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker.js';
import appConfig from '../config.json';


export default function Chat() {
    const { usuario, setUsuario } = useUsuarioContext();
    const [msg, setMsg] = useState('');
    const [listaMsg, setListaMsg] = useState([]);
    
    useEffect(() => {
 
        supabase
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                console.log('Dados da consulta:', data);
                setListaMsg(data);
            })

    }, []);
    
    

    function handleNewMsg(newMsg){
        const mensagem = {
            // id: listaMsg.length + 1,
            from: usuario,
            text: newMsg,
        }

        supabase
            .from('mensagens')
            .insert([
                mensagem
            ])
            .then(({ data }) => {
                console.log('O que ta vindo: ', data);

                setListaMsg([
                    data[0],
                    ...listaMsg, 
                    
                ]);
            })

        setMsg('');
    }

    return (
        <>
            <Head>
                <title>Chat</title>
            </Head>
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
                            <ButtonSendSticker/>
                            <TextField
                                placeholder="Insira sua mensagem aqui..."
                                type="textarea"
                                styleSheet={{
                                    width: '100%',
                                    height: '100%',
                                    border: '0',
                                    resize: 'none',
                                    borderRadius: '5px',
                                    padding: '8px 8px',
                                    alignItems: 'center',
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
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
                            <Button 
                                iconName="arrowRight" 
                                styleSheet={{
                                    maxWidth: '35px', 
                                    maxHeight: '35px',
                                    marginBottom:'5px',
                                }}
                                onClick={() => handleNewMsg(msg)}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

function Header() {
    const { usuario, setUsuario } = useUsuarioContext();
    const roteamento = useRouter();
    // const usuarioLogado = roteamento.query.username;
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat - Welcome {usuario}
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                    onClick={roteamento.back}
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
                            <MessageLine key={msg.id} idText={msg.id} from={msg.from} textContent={msg.text} />
                        </>
                    );
                })
            }
        </Box>
    )

    function MessageLine({ idText, from, textContent }){
        const [delBtn, setDelBtn] = useState({
            margin: '0 50px',
            display: 'none',
            cursor: 'pointer',
            position:'relative',
        });

        function handleDelClick(idText) {
            supabase
                .from('mensagens')
                .delete()
                .match({ id: idText })
                .then(({ data }) => {
                    // alert(`Mensagem: ${data[0].text} apagada com sucesso.`);
                    console.log('O que ta vindo: ', data[0].text);
                    // console.log('O que ta vindo: ', data);
                })
        };
        console.log(textContent)

        return(
            <>
                <Text
                    key={idText}
                    tag="li"
                    styleSheet={{
                        borderRadius: '5px',
                        padding: '6px',
                        marginBottom: '12px',
                        hover: {
                            backgroundColor: appConfig.theme.colors.neutrals[700],
                        }
                    }}
                    onMouseEnter={() => {
                        setDelBtn({
                            ...delBtn,
                            display:'block'
                        });
                    }}
                    onMouseLeave={e => {
                        setDelBtn({
                            ...delBtn,
                            display:'none'
                        });
                    }}
                >
                    <Box
                        key={idText}
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
                            src={`https://github.com/${from}.png`}
                        />
                        <Text tag="strong">
                            {from}
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
                        <Icon
                            label="Icon Component"
                            name="FaRegTrashAlt"
                            styleSheet={delBtn}
                            onMouseEnter={() => {
                                setDelBtn({
                                    ...delBtn,
                                    color:'red'
                                });
                            }}
                            onMouseLeave={e => {
                                setDelBtn({
                                    ...delBtn,
                                    color:'white'
                                });
                            }}
                            onClick={() => {
                                handleDelClick(idText);
                            }}
                        />
                    </Box>
                    {
                        textContent?.startsWith(':sticker:') 
                        ?(
                            <Image src={textContent.replace(':sticker:', '')} />
                        )
                        : 
                        textContent
                    }
                </Text> 
            </>
        );
    }
}