import React from 'react'

type PublicPageProps = {
    children: React.ReactNode;
};

const PublicPage = ({ children } : PublicPageProps) => {
    return <>{children}</>
}

export default PublicPage
