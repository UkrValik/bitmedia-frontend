import React from 'react';
import { IoSearch } from 'react-icons/io5';

import colors from '../colors.json';

const Filter = (props) => {

    const dropdownValue = props.dropdownValue;
    const pageSize = props.pageSize;

    return (
        <div className='filter-container'>
            <div className='filter-input__container'>
                <input
                    className='filter-input'
                    placeholder='Search...'
                    value={props.searchFieldValue}
                    onChange={(e) => props.setSearchFieldValue(e.target.value)}/>
                <div className='separator'></div>
                <select color={colors.blue} className='dropdown' onChange={(e) => props.setDropdownValue(e.target.value)}>
                    <option value='address'>Address</option>
                    <option value='transactionId'>Transaction ID</option>
                    <option value='blockNumber'>Block number</option>
                </select>
            </div>
            <div onClick={() => props.onClickSearch(1, pageSize, dropdownValue, props.searchFieldValue)} className='search-button'>
                <IoSearch
                    size={20}
                    color={colors.white}/>
            </div>
        </div>
    );
}

export default Filter;
