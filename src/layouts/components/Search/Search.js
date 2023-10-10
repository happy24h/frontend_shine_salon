import { useState, useRef, useEffect } from 'react';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import axios from 'axios';

// import * as searchServices from '~/services/searchService';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { SearchIcon } from '~/components/Icons';
import AccountItem from '~/components/AccountItem';
import styles from './Search.module.scss';
import useDebounce from '~/hooks/useDebounce';
import ApiConfig from '~/service/ApiConfig';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const debouncedValue = useDebounce(searchValue, 400);

    const inputRef = useRef();
    let data = {
        name: debouncedValue,
        type_service_id: '',
        status: '',
        start: '',
        end: '',
        limit: 30,
        page: 1,
        sort: 'desc',
    };

    console.log('show----data', searchResult);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }
        const fetchApi = async () => {
            setLoading(true);
            // const result = await searchServices.search(debouncedValue);
            const res = await axios.post(ApiConfig.getAllService, data);
            setSearchResult(res.data.content);
            setLoading(false);
        };
        fetchApi();
    }, [debouncedValue]);

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    return (
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={() => (
                    <div className={cx('search-result')} tabIndex="-1">
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Dịch vụ</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result.service_id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        value={searchValue}
                        ref={inputRef}
                        placeholder="Tìm kiếm dịch vụ tại đây..."
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} onClick={handleClear} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
