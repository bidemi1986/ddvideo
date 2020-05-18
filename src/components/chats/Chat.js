import React, { Component } from 'react'
import "./chat.css";
import sound from '../../assets/beyond-doubt.mp3'
import config from '../chats/chatConfig'
import Logo from '../../assets/tool.png'

import 'firebase/firestore';


const firebase = require('firebase')
//firebase.initializeApp(config)

var db = firebase.firestore()


let ping = new Audio(sound)
let message = []
let chatID = ''




export class Chat extends Component {
    state = {
        showChat: 'false',
        height: 45,
        iconClass: 'fas fa-angle-up',
        inputChat: '',
        class: '',
        chatID: '',
        processing: false,
        chatMessages: [],
        unread:'',
        sending: false
    }


    componentDidMount = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    }


    playSound = () => {
        ping.play()
    }


    sendChatData = async (msg) => {
        document.getElementById('container').scrollTop = 9999999;
        try {
            if (!chatID) {
                this.setState({ processing: true })
            }
            const r = await fetch("https://us-central1-afdoctordial.cloudfunctions.net/newChat", {
                method: "POST",
                //mode: "no-cors",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    //shopName: `${this.props.shopNamefromURL}`,
                    message: msg,
                    chatID: '3KcZlwakWEHwaBItHpatHphByb3p8tK8gjrBpy9p'
                })
            })
            const r2 = await r.json()
            console.log('R2 found is ', r2)
            if (r2.msg === 'SUCCESS') {
                console.log('response from chat server is:', r2, 'total response is... ', r2)
               
                    chatID = r2.data
                    this.setState({ chatID: r2.data, processing: false })

                this.retrieveChat()

            } else {
                console.log(r2.error)
                this.setState({ processing: false })
            }

        } catch (err) {
            console.log("Error from firebase is: ", err);
            this.setState({ processing: false })
        }

    }




    retrieveChat = async () => {
        db.collection("Chats").doc('3KcZlwakWEHwaBItHpatHphByb3p8tK8gjrBpy9p')
            .get().then(doc => {
                console.log("Current chat data retrieved is: ", doc.data());
                // if (doc.data().chatMessages[doc.data().chatMessages.length - 1].author == 2) {
                //     this.playSound()
                // }
                message = doc.data().chatMessages
                this.setState({ chatMessages: doc.data().chatMessages, unread: message.length })
                document.getElementById('container').scrollTop = 9999999;
                

                //this.playSound()

                console.log("message is", message)
                console.log("UnreadMessages is", this.state.unread)
                document.getElementById('container').scrollTop = 9999999;
            }
                , error => {
                    console.log("error is ", error)
                }
            );
    }

    componentDidMount() {

        //this.playSound()

    }


    openChat = () => {
        if (this.state.height == 45) {
            this.setState({ height: 450, iconClass: 'fas fa-angle-down', class: 'chat-opener' })
        }
        else {
            this.setState({ height: 45, iconClass: 'fas fa-angle-up', class: '' })
        }

    }

    handleChange = (e) => {

        this.setState({ [e.target.name]: e.target.value })
        document.getElementById('container').scrollTop = 9999999;
    }



    render() {

        const keyPress = (e) => {
            document.getElementById('container').scrollTop = 9999999;
            if (e.keyCode == 13) {

                message.push({
                    author: 1,
                    text: this.state.inputChat,
                    timeSent: '',
                    sending: true
                })
                this.setState({
                    chatMessages: message
                })
                this.sendChatData(this.state.inputChat)
                this.setState({
                    inputChat: ''
                })
                //console.log(`chatte is ${chat}`)
                //this.sendChatData(message)

            }
        }
        return (
            <div className="bg-white shadow chat" style={{
                borderRadius: '5px', position: 'fixed', right: 40, bottom: -1, zIndex: 99, height: this.state.height, WebkitTransition: 'height 0.5s',
                transition: 'height 0.5s'
            }}>
                <div
                    onClick={this.openChat}
                    style={{ borderRadius: '5px', borderBottomLeftRadius: 0, borderBottomRightRadius: 0, height: '45px', backgroundColor: this.props.backgroundColor || '#F22F46' }}>
                    <p className="pl-3" style={{ lineHeight: '45px', color: 'white' }}>Live Chat <span className="float-right mr-3"><a onClick={this.openChat} href="#" className="text-white"><i className={this.state.iconClass}></i></a></span></p>
                </div>
                <div className="bg-white p-3" style={{ height: '330px', overflow: 'scroll' }} id="container">
                    {message && this.state.chatMessages.map((msg, id) => {
                        return (
                            <div style={{ marginLeft: 5 }} className="clearfix" key={id}>
                                {msg.author == 'patient' &&
                                    <div>
                                        <div className='row'>
                                            <small style={{ paddingLeft: 10, fontWeight: 'bold', color: 'rgba(204, 0, 0, 0.51)' }}>you</small>
                                            <div className="row px-3">{msg.sending && <i className="fa fa-spinner fa-spin"
                                                style={{ lineHeight: 1.5, marginLeft: 5 }}></i>}
                                            </div>
                                        </div>

                                        <div className="text-black p-2 text-center row"
                                            style={{
                                                backgroundColor: '#f5f5f5', overflowWrap: 'inherit', borderRadius: '5px',
                                                width: '100%', maxWidth: '60%', overflowX: 'hidden', wordWrap: 'break-word',
                                                lineHeight: 1.2,
                                                paddingBottom: 5
                                            }}>
                                            <small className='text-black ml-4' style={{ textAlign: 'left' }}>{msg.text} </small>
                                        </div>
                                    </div>
                                }
                                {msg.author == 'doctor' &&
                                    <div className="w-100 mb-2 clearfix row"  >
                                        <div style={{ height: 50, width: '40%', float: 'left' }}>

                                        </div>
                                        <div style={{ width: '60%', float: 'right' }}>
                                            <div className="text-black  text-right float-right"  >
                                                <small className="text-right" style={{ fontWeight: 'bold', color: 'rgba(204, 0, 0, 0.51)', alignSelf: 'right' }}>{'Doctor'}</small>
                                            </div>

                                            <div className="text-black p-2 text-right float-right row mb-1 mt-1"
                                                style={{ backgroundColor: '#f5f5f5', borderRadius: '5px', width: '100%' }}>
                                                <div className="float-right">
                                                    <small className='text-black mr-4 text-right'>{msg.text} </small>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                }

                            </div>

                        )

                    })}
                    <div style={{ height: 30 }}> </div>

                </div>
                <div className=" px-1 pt-2" style={{ height: '55px', backgroundColor: '#f4f5f7', display: 'flex' }}>

                    <label for="inputText" class="sr-only">Type your message and press Enter to send</label>

                    <div style={{ flex: '90%' }}> <input type="text" name="inputChat" value={this.state.inputChat}
                        onChange={this.handleChange}
                        onKeyDown={keyPress} id="inputText" class="form-control" placeholder="Type your message and press Enter to send" required autofocus
                        disabled={this.state.processing}

                    />
                    </div>
                    <div style={{ flex: '10%', padding: 5 }}>
                        <img src={Logo} width='15' />
                    </div>
                </div>

            </div >

        )
    }
}

export default Chat
