import React from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

import colors from '../colors.json';

const PageNumberButton = (props) => {

    return (
        <div onClick={props.onClick} className={props.className}>
            {props.num}
        </div>
    );
}

const PageNumbers = (props) => {

    const currentPage = props.currentPage;
    const pagesCount = Math.ceil(props.transactionsCount / props.pageSize);
    const activeBtnClassName = 'page-num-btn page-num-btn__active';
    const inactiveBtnClassName = 'page-num-btn page-num-btn__inactive';

    const onClickRightChevron = async () => {
        if (currentPage < pagesCount) {
            await props.onClickSearch(currentPage + 1, props.pageSize, props.dropdownValue, props.searchFieldValue);
        }
    }

    const onClickLeftChevron = async () => {
        if (currentPage > 1) {
            await props.onClickSearch(currentPage - 1, props.pageSize, props.dropdownValue, props.searchFieldValue);
        }
    }

    const onButtonClick = async (index) => {
        await props.onClickSearch(index, props.pageSize, props.dropdownValue, props.searchFieldValue);
    }

    return (
        <div className='pages-container'>
            <IoChevronBack
                className={currentPage > 1 ? 'arrow-btn arrow-btn__enabled' : 'arrow-btn arrow-btn__disabled'}
                size={40}
                color={currentPage > 1 ? colors.blue : colors.darkGrey}
                onClick={onClickLeftChevron}
                />
            {currentPage > 3 && <PageNumberButton
                onClick={() => onButtonClick(1)}
                num={1}
                className={inactiveBtnClassName}
                />}
            {currentPage > 4 && <div className='three-dots'>...</div>}
            {currentPage > 2 && <PageNumberButton
                onClick={() => onButtonClick(currentPage - 2)}
                num={currentPage - 2}
                className={inactiveBtnClassName}
                />}
            {currentPage > 1 && <PageNumberButton
                onClick={() => onButtonClick(currentPage - 1)}
                num={currentPage - 1}
                className={inactiveBtnClassName}
                />}
            <PageNumberButton
                num={currentPage}
                className={activeBtnClassName}
                />
            {currentPage < pagesCount && <PageNumberButton
                onClick={() => onButtonClick(currentPage + 1)}
                num={currentPage + 1}
                className={inactiveBtnClassName}
                />}
            {currentPage < pagesCount - 1 && <PageNumberButton
                onClick={() => onButtonClick(currentPage + 2)}
                num={currentPage + 2}
                className={inactiveBtnClassName}
                />}
            {currentPage < pagesCount - 3 && <div className='three-dots'>...</div>}
            {currentPage < pagesCount - 2 && <PageNumberButton
                onClick={() => onButtonClick(pagesCount)}
                num={pagesCount}
                className={inactiveBtnClassName}
                />}
            <IoChevronForward
                className={currentPage < pagesCount ? 'arrow-btn arrow-btn__enabled' : 'arrow-btn arrow-btn__disabled'}
                size={40}
                color={currentPage < pagesCount ? colors.blue : colors.darkGrey}
                onClick={onClickRightChevron}
                />
        </div>
    );
}

export default PageNumbers;
