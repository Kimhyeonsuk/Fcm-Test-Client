import React from 'react';
import { initializeApp } from 'firebase/app';
import { MessagePayload, deleteToken, getMessaging, getToken, onMessage } from 'firebase/messaging';
import { firebaseConfig, vapidKey } from './config';

initializeApp(firebaseConfig);
const messaging = getMessaging();
const token = getToken(messaging, {vapidKey});

const tokenDivId = 'token_div';
const permissionDivId = 'permission_div';


onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // Update the UI to include the received message.
});


const FirebaseComp: React.FC = () => {    
    function resetUI() {
        clearMessages();
        showToken('loading...');
        // Get registration token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        getToken(messaging, { vapidKey }).then((currentToken) => {
          if (currentToken) {
            sendTokenToServer(currentToken);
            updateUIForPushEnabled(currentToken);
          } else {
            // Show permission request.
            console.log('No registration token available. Request permission to generate one.');
            // Show permission UI.
            updateUIForPushPermissionRequired();
            setTokenSentToServer(false);
          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
          showToken('Error retrieving registration token.');
          setTokenSentToServer(false);
        });
      }
    
    function showToken(currentToken: string) {
        // Show token in console and UI.
        const tokenElement = document.querySelector('#token')!;
        tokenElement.textContent = currentToken;
    }  
    
    // Send the registration token your application server, so that it can:
    // - send messages back to this app
    // - subscribe/unsubscribe the token from topics
    function sendTokenToServer(currentToken: string) {
        if (!isTokenSentToServer()) {
          console.log('Sending token to server...', currentToken);
          // TODO(developer): Send the current token to your server.
          setTokenSentToServer(true);
        } else {
          console.log('Token already sent to server so won\'t send it again unless it changes');
        }
    }
    
    function isTokenSentToServer() {
        return window.localStorage.getItem('sentToServer') === '1';
    }
      
    function setTokenSentToServer(sent: boolean) {
        window.localStorage.setItem('sentToServer', sent ? '1' : '0');
    }
    
    function showHideDiv(divId: string, show: boolean) {
        const div = document.querySelector('#' + divId)! as HTMLDivElement;
        if (show) {
          div.style.display = 'block';
        } else {
          div.style.display = 'none';
        }
    }
    
    function requestPermission() {
        console.log('Requesting permission...');
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            console.log('Notification permission granted.');
            // TODO(developer): Retrieve a registration token for use with FCM.
            // In many cases once an app has been granted notification permission,
            // it should update its UI reflecting this.
            resetUI();
          } else {
            console.log('Unable to get permission to notify.');
          }
        });
    }
    
    function deleteTokenFromFirebase() {
        // Delete registration token.
        getToken(messaging).then((currentToken) => {
          deleteToken(messaging).then(() => {
            console.log('Token deleted.', currentToken);
            setTokenSentToServer(false);
            // Once token is deleted update UI.
            resetUI();
          }).catch((err) => {
            console.log('Unable to delete token. ', err);
          });
        }).catch((err) => {
          console.log('Error retrieving registration token. ', err);
          showToken('Error retrieving registration token.');
        });
    }
    
    // Add a message to the messages element.
    function appendMessage(payload: MessagePayload) {
        const messagesElement = document.querySelector('#messages')!;
        const dataHeaderElement = document.createElement('h5');
        const dataElement = document.createElement('pre');
        dataElement.style.overflowX = 'hidden;';
        dataHeaderElement.textContent = 'Received message:';
        dataElement.textContent = JSON.stringify(payload, null, 2);
        messagesElement.appendChild(dataHeaderElement);
        messagesElement.appendChild(dataElement);
    }
      
      // Clear the messages element of all children.
    function clearMessages() {
        const messagesElement = document.querySelector('#messages')!;
        while (messagesElement.hasChildNodes()) {
          messagesElement.removeChild(messagesElement.lastChild!);
        }
    }
    
    function updateUIForPushEnabled(currentToken: string) {
        showHideDiv(tokenDivId, true);
        showHideDiv(permissionDivId, false);
        showToken(currentToken);
      }
      
    function updateUIForPushPermissionRequired() {
      showHideDiv(tokenDivId, false);
      showHideDiv(permissionDivId, true);
    }

  return (
    <div className='demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header'>
    <header className='mdl-layout__header mdl-color-text--white mdl-color--light-blue-700'>
        <div className='mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid'>
        <div className='mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--8-col-desktop'>
            <h3>Firebase Cloud Messaging</h3>
        </div>
        </div>
    </header>

    <main className='mdl-layout__content mdl-color--grey-100'>
        <div className='mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid'>

        <div className='mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop'>
            <div className='mdl-card__supporting-text mdl-color-text--grey-600'>
                <div id='token_div' style={{display: 'none'}}>
                    <h4>Registration Token</h4>
                    <p id='token' style={{wordBreak: 'break-all'}}></p>
                    <button id='delete-token-button' className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' onClick={deleteTokenFromFirebase}>
                    Delete Token
                    </button>
                </div>
                <div>
                    <button id='init' className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' >Init
                    </button>
                </div>
                <div id='permission_div' style={{display: 'flex'}}>
                    <h4>Needs Permission</h4>
                    <button id='request-permission-button'
                            className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' onClick={requestPermission}>Request Permission
                    </button>
                </div>
                <div id='messages'></div>
            </div>
        </div>

        </div>
    </main>
    </div>

  );
};

export default FirebaseComp;
