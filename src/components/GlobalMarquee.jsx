import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useConfig } from '../context/ConfigContext';
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';

const GlobalMarquee = () => {
    const [config, setConfig] = useState(null);

    const { config: globalConfig, loading } = useConfig();

    useEffect(() => {
        if (!loading && globalConfig?.marquee?.enabled) {
            setConfig(globalConfig.marquee);
        }
    }, [globalConfig, loading]);

    if (!config) return null;

    const Content = () => (
        <div
            dangerouslySetInnerHTML={{ __html: config.htmlContent }}
            style={{ display: 'inline-block', marginRight: '50px' }}
        />
    );

    return (
        <div style={{
            backgroundColor: config.backgroundColor || '#111827',
            color: config.textColor || '#ffffff',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 50
        }}>
            {config.linkUrl ? (
                <Link to={config.linkUrl} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                    <Marquee gradient={false} speed={40}>
                        <Content />
                        <Content />
                        <Content />
                        <Content />
                    </Marquee>
                </Link>
            ) : (
                <Marquee gradient={false} speed={40}>
                    <Content />
                    <Content />
                    <Content />
                    <Content />
                </Marquee>
            )}
        </div>
    );
};

export default GlobalMarquee;
