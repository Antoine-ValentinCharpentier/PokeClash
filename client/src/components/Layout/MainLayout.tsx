import React from 'react';
import '../../assets/style/components/Layout/MainLayout.css';

interface MainLayoutProps {
    title: string,
    menu: React.ReactNode;
    content: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({title, menu, content}) => {
  return (
    <div className='MainLayout-background'>
        <section className="MainLayout-glass">
            <div className="MainLayout-menu">
                {menu}
            </div>
            <div className="MainLayout-content">
                <div className="MainLayout-title">
                    {title}
                </div>
                {content}
            </div>
        </section>
    </div>
  );
}

export default MainLayout;