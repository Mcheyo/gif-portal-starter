import React, {useEffect, useState} from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// Constants
const TWITTER_HANDLE = 'CheyoMansour';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {

  const [walletAddress, setWalletAddress] = useState(null)
  const checkIfWalletIsConnected = async () => { 
    try{
      const {solana} = window
      
      if(solana){ 
        if(solana.isPhantom){ 
          console.log("aye we found a phantom wallet")

          const response = await solana.connect({ onlyIfTrusted: true})

          console.log(
            'Connected with Public Key:', 
            response.publicKey.toString()
          )

          setWalletAddress(response.publicKey.toString())
        }
      } else{
          alert("Solana not here! Hmm seems you need a phantom wallet 👻")
        }
      }catch(error){
        console.error(error)
      }
    }
  
  const connectWallet = async() => {
    const { solana } = window; 
    if (solana) { 
      const response = await solana.connect()
      console.log('Connected with Public Key;' , response.publicKey.toString())
      setWalletAddress(response.publicKey.toString())
    } 
  };

  const renderNotConnectedContainer = () =>( 
    <button 
    className="cta-button connect-wallet-button"
    onClick={connectWallet}
    >
      Connect To wallet
    </button>
  )

useEffect(()=> { 
  const onLoad = async() =>{ 
    await checkIfWalletIsConnected()
  }
  window.addEventListener('load', onLoad)
  return () => window.removeEventListener('load',onLoad)
}, [])

  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
