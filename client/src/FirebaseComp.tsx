import React from 'react';

const FirebaseComp: React.FC = () => {
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
                <button id='delete-token-button' className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored'>
                Delete Token
                </button>
            </div>
            <div id='permission_div' style={{display: 'flex'}}>
                <h4>Needs Permission</h4>
                <button id='request-permission-button'
                        className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored'>Request Permission
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

<script src='resUI.tsx' type='module'></script>
