import React, { useState, useEffect } from 'react';
import Product from '../Product';
import Food from '../Food';
import Book from '../Book';

import classNames from 'classnames/bind';
import styles from './ContentSlider.module.scss';

// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../../Home/components/ContentSlider/ContentSlider.scss';

const cx = classNames.bind(styles);

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style, display: 'block', background: 'red' }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style, display: 'block', background: 'green' }} onClick={onClick} />;
}
export default function ContentSlider() {
    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    console.log('set window width:', windowSize);

    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }

    console.log('set window width >>>>:', windowSize.innerWidth);

    const handleInnerWidth = () => {
        if (windowSize.innerWidth >= 740) {
            return false;
        } else {
            return true;
        }
    };

    const handleShow = () => {
        if (windowSize.innerWidth >= 980) {
            return 4;
        } else if (windowSize.innerWidth >= 520) {
            return 3;
        } else if (windowSize.innerWidth >= 345) {
            return 2;
        } else {
            return 1;
        }
    };

    var settings = {
        dots: false,
        infinite: handleInnerWidth(),
        speed: 500,
        slidesToShow: handleShow(),
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    return (
        <div className={cx('wrapper-slider')}>
            <Product settings={settings} />
            <Food settings={settings} />
            <Book settings={settings} />
        </div>
    );
}
