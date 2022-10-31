import React, { useEffect } from 'react';

import Header from './Header';
import Filter from './Filter';
import TransactionsTable from './TransactionsTable';
import PageNumbers from './PageNumbers';
import Footer from './Footer';
import { searchTransactions } from './api/transactions.api';
import { getLastBlockNumber } from './api/block.api';

function App() {

  const pageSize = 14;

  const [transactions, setTransactions] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
  const [transactionsCount, setTransactionsCount] = React.useState(1000);
  const [searchFieldValue, setSearchFieldValue] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [dropdownValue, setDropdownValue] = React.useState('address');
  const [lastBlockNumber, setLastBlockNumber] = React.useState(0);

  const onClickSearch = async (page, pageSize, searchBy, value) => {
    const response = await searchTransactions(page, pageSize, searchBy, value);
    retrieveLastBlockNumber();
    setTransactions(response?.transactions);
    setTransactionsCount(response?.transactionsCount);
    setCurrentPage(page);
  }

  const retrieveLastBlockNumber = async () => {
    const num = await getLastBlockNumber();
    setLastBlockNumber(num);
  }

  React.useEffect(() => {
    retrieveLastBlockNumber();
    onClickSearch(1, pageSize, 'all', '');
  }, []);

  return (
    <div>
      <Header />
      <Filter
        onClickSearch={onClickSearch}
        searchFieldValue={searchFieldValue}
        setSearchFieldValue={setSearchFieldValue}
        dropdownValue={dropdownValue}
        setDropdownValue={setDropdownValue}
        pageSize={pageSize} />
      <TransactionsTable transactions={transactions} lastBlockNumber={lastBlockNumber} />
      <PageNumbers
        transactionsCount={transactionsCount}
        onClickSearch={onClickSearch}
        searchFieldValue={searchFieldValue}
        pageSize={pageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        dropdownValue={dropdownValue} />
      <Footer />
    </div>
  );
}

export default App;
