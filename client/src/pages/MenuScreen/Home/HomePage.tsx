import MainMenu from '../../../components/Menu/MainMenu';
import MainLayout from '../../../components/Layout/MainLayout';
import React from 'react';

import dictionnary from '../../../assets/locales/translations/fr.json'

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <MainLayout menu={<MainMenu/>} content={<p>Veuillez rejoindre une salle de combat</p>} title={dictionnary['menu.main.play']}/>
  );
};

export default HomePage;