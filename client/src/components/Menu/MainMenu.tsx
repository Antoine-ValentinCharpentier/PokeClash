import React from 'react';
import '../../assets/style/components/Menu/MainMenu.css';

import dictionnary from '../../assets/locales/translations/fr.json'

const MainMenu = () => {
  return (
    <>
        <div className="MainMenu-logo">
            <h1 className='game-title'>Poke<span>Clash</span></h1>
        </div>
        <div className="MainMenu-links">
            <div className="link active">
                {dictionnary['menu.main.play']}
            </div>
            <div className="link">
                {dictionnary['menu.main.team']}
            </div>
            <div className="link">
                {dictionnary['menu.main.history']}
            </div>
            <div className="link">
                {dictionnary['menu.main.parameter']}
            </div>
        </div>
        <div className="MainMenu-footer">
            Logout
        </div>
    </>
  );
}

export default MainMenu;