import Pokeball from '../ui/Pokeball/Pokeball';
import React from 'react';
import '../../assets/style/components/Layout/SplitPage.css';

interface AuthLayoutProps {
  form: React.ReactNode;
}

const SplitPage: React.FC<AuthLayoutProps> = ({form}) => {
  return (
    <div className="container">
      <div className="left-side">
        <div className="left-top-square">
          <Pokeball/>
        </div>
        <div className="left-content">
          <h1 className='game-title'>Poke<span>Clash</span></h1>
        </div>
        <div className="left-bottom-square">
          <Pokeball/>
        </div>
      </div>
      <div className="right-side">
        {form}
      </div>
    </div>
  );
}

export default SplitPage;