import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import styles from './Menu.module.scss';
import 'tippy.js/dist/tippy.css';
import Header from './Header';
import MenuItem from './MenuItem';
import { useState } from 'react';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

const defaultFn = () => {
    alert('hello');
};

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    console.log('current', current);

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else if (item.code) {
                            item.handleOnclick(item.code);
                        } else {
                            item.handleOnclick('hello world');
                        }
                    }}
                    // onChange={() => onChange()}
                />
            );
        });
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
                <div className={cx('menu-body')}>{renderItems()}</div>
            </PopperWrapper>
        </div>
    );

    // Reset to first page
    const handleReset = () => {
        setHistory((prev) => prev.slice(0, 1));
    };
    return (
        <Tippy
            interactive
            delay={[0, 700]}
            offset={[12, 8]}
            hideOnClick={hideOnClick}
            placement="bottom-end"
            onHide={handleReset}
            render={renderResult}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
