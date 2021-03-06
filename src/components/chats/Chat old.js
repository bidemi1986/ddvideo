import React, { Component } from 'react'
import "./chat.css";
import sound from '../../assets/beyond-doubt.mp3'
import config from './chatConfig'
import Logo from '../../assets/tool.png'

import 'firebase/firestore';
import "firebase/storage";


const firebase = require('firebase')
//firebase.initializeApp(config)

var db = firebase.firestore()


let ping = new Audio(sound)
let message = []
let chatID = ''
let unREAD = 0


//localStorage.setItem()

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
        unRead: 0,
        read: 0,
        open: false,
        sending: false,
        progress: 0,
        error: '',
        url: '',

    }


    componentDidMount = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        //console.log("chatID recieved is: ", this.props.wcChat)

        if (this.props.wcChat) {
            console.log("chatID recieved is: ", this.props.wcChat)
            this.retrieveChat()
        }
    }


    playSound = () => {
        ping.play()
    }

    openChat = () => {
        if (this.state.height == 45) {
            this.setState({ height: 450, iconClass: 'fas fa-angle-down', class: 'chat-opener', open: true, unREAD: '' })
        }
        else {
            this.setState({ height: 45, iconClass: 'fas fa-angle-up', class: '', open: false, read: message.length, unRead: '' })
        }

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
                    chatID: this.props.wcChat || '3KcZlwakWEHwaBItHpatHphByb3p8tK8gjrBpy9p'
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
        db.collection("Chats").doc(this.props.wcChat || '3KcZlwakWEHwaBItHpatHphByb3p8tK8gjrBpy9p')
            .onSnapshot(async doc => {
                console.log("Current chat data retrieved is: ", doc.data());
                // if (doc.data().chatMessages[doc.data().chatMessages.length - 1].author == 2) {
                //     this.playSound()
                // }
                if(doc.exists){

                message = await doc.data().chatMessages
                this.setState({ chatMessages: message || [], unread: message.length })
                document.getElementById('container').scrollTop = 9999999;

                }

                if (this.state.open == false) {
                    let nOfTotal = message.length - this.state.read
                    this.setState({ unRead: nOfTotal })
                    console.log('UNREAD IS ', this.state.unRead)
                }
                else {
                    this.setState({ read: message.length })
                    console.log('UNREADOPEN IS ', this.state.read)
                }


                document.getElementById('container').scrollTop = 9999999;
            }
                , error => {
                    console.log("error is ", error)
                }
            );
    }


    /* retrieveChat = async () => {
        db.collection("Chats").doc(this.props.wcChat || '3KcZlwakWEHwaBItHpatHphByb3p8tK8gjrBpy9p')
            .get().then(doc => {
                console.log("Current chat data retrieved is: ", doc.data());
                // if (doc.data().chatMessages[doc.data().chatMessages.length - 1].author == 2) {
                //     this.playSound()
                // }
                message = doc.data().chatMessages
                this.setState({ chatMessages: doc.data().chatMessages, unread: message.length })
                document.getElementById('container').scrollTop = 9999999;
                message.forEach(element => {    
                     if(this.state.open == false && element.author == 'doctor'  ){
                        unREAD = ++unREAD
                        this.setState({unREAD})
                        
                }
                else if( this.state.open == true){
                    this.setState({unREAD: ''})
                    
                }
               });

                document.getElementById('container').scrollTop = 9999999;
            }
                , error => {
                    console.log("error is ", error)
                }
            );
    } */

    uploadFile(event) {
        const storage = firebase.storage()

        let file = event.target.files[0];

        const imageExtension = file.name.split('.')[file.name.split('.').length - 1]
        const newName = `${Math.round(Math.random() * 10000000000)}.${imageExtension}`
        console.log(file);

        if (file) {
            let data = new FormData();
            data.append('file', file);
            // axios.post('/files', data)...
            const uploadTask = storage.ref(`images/${newName}`).put(file);
            uploadTask.on(
                "state_changed",
                snapshot => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    console.log(" progress value is ", progress)
                    //this.setState({ progress });
                },
                error => {
                    // error function ....
                    console.log(error);
                    this.setState({ error });
                },
                () => {
                    // complete function ....
                    storage
                        .ref(`images/`)
                        .child(newName) // Upload the file and metadata
                        .getDownloadURL() // get download url
                        .then(url => {
                            console.log(url);
                            //this.setState({ url });
                            //props.sendingImageURL(url)
                            //setProgress(0);
                        });
                }
            )

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
                    <p className="pl-3" style={{ lineHeight: '45px', color: 'white' }}>Messages {this.state.unRead && this.state.height == 45 && <span style={{ paddingLeft: 5, paddingRight: 5, backgroundColor: 'red' }}>{this.state.unRead}</span>} <span className="float-right mr-3"><a onClick={this.openChat} href="#" className="text-white"><i className={this.state.iconClass}></i></a></span></p>
                </div>
                <div className="bg-white p-3" style={{ height: '330px', overflow: 'scroll' }} id="container">
                    {message && this.state.chatMessages.map((msg, id) => {
                        return (
                            <div style={{ marginLeft: 5 }} className="clearfix" key={id}>
                                {msg.author == 'patient' &&
                                    <div>
                                        {/* <div className='row'>
                                            <small style={{ paddingLeft: 10, fontWeight: 'bold', color: 'rgba(204, 0, 0, 0.51)' }}>you</small>
                                            <div className="row px-3">{msg.sending && <i className="fa fa-spinner fa-spin"
                                                style={{ lineHeight: 1.5, marginLeft: 5 }}></i>}
                                            </div>
                                        </div> */}

                                        <div className="text-black p-2 text-center row mt-1"
                                            style={{
                                                backgroundColor: '#f5f5f5', overflowWrap: 'inherit', borderRadius: '5px',
                                                width: '100%', maxWidth: '60%', overflowX: 'hidden', wordWrap: 'break-word',
                                                lineHeight: 1.2,
                                                paddingBottom: 5, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderTopRightRadius: 20
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
                                            {/* <div className="text-black  text-right float-right"  >
                                                <small className="text-right" style={{ fontWeight: 'bold', color: 'rgba(204, 0, 0, 0.51)', alignSelf: 'right' }}>{'Doctor'}</small>
                                            </div> */}

                                            <div className="text-black p-2 text-right float-right row mt-1"
                                                style={{ backgroundColor: '#ffdcdc', width: '100%', lineHeight: 1.2, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderTopLeftRadius: 20 }}>
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
                        <input type="file" id="fileElem" multiple accept="image/*" class="visually-hidden" onChange={this.uploadFile} />
                        <label for="fileElem"><img src={Logo} width='15' /></label>

                    </div>
                </div>

            </div >

        )
    }
}

export default Chat
