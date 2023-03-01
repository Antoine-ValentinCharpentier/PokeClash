import React from 'react';
import '../../../assets/style/components/ui/Pokeball/Pokeball.css'

interface PokeballProps {}

const Pokeball: React.FC<PokeballProps> = () => {
  return (
    <div className='pokeball'>
      <div className='pokeball-btn'/>
    </div>
  );
};

export default Pokeball;