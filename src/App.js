import React, { useCallback, useEffect, useState } from "react";
import './App.css';
import Modal from "./components/modal/Modal";

const API_URL = 'https://boiling-refuge-66454.herokuapp.com/images';

function App() {

  const [imgs, setImgs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [imgId, setImgId] = useState('');

  const imgClickHandler = (e) => {
    e.preventDefault();
    setImgId(e.target.alt);
    setIsOpen(true);
  };

  const fetchImgs = useCallback(async () => {
    await fetch(API_URL)
      .then(res => res.json())
      .then(imgs => setImgs(imgs))
  }, [])

  useEffect(() => {
    fetchImgs()
  },[fetchImgs]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>TEST APP</h1>
      </header>
      <main>
        <div className="imgs-container">
           {imgs.map(imgItem => (
            <img src={imgItem.url} alt={imgItem.id} key={imgItem.id} onClick={imgClickHandler}></img>
           ))}
        </div>
        {isOpen && <Modal imgId={imgId} onClose={() => setIsOpen(false)}></Modal>}
        
      </main>
    </div>
  );
}

export default App;
