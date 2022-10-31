import React from 'react';

const TransactionsTable = (props) => {

    const transactions = props.transactions;
    const lastBlockNumber = props.lastBlockNumber;

    const removeTrailingZeros = (str) => {
        if (str.length > 1 && str[str.length - 1].match(/0|\./)) {
            return removeTrailingZeros(str.slice(0, -1));
        } else {
            return str;
        }
    }

    const getDateFromTimestamp = (timestamp) => {
        const decimalTimestamp = parseInt(timestamp || 0, 16);
        const targetTimestamp = new Date().getTime() - decimalTimestamp;
        const date = new Date(targetTimestamp);
        return `${date.toLocaleString('default', {month: 'short'})}-${date.toLocaleString('default', {day: '2-digit'})}-${date.getFullYear()}`;
    }

    const calculateTransactionFee = (transaction) => {
        const blockBaseFeePerGas = parseInt(transaction.blockBaseFeePerGas, 16);
        const maxPriorityFeePerGas = parseInt(transaction.maxPriorityFeePerGas, 16);
        const maxFeePerGas = parseInt(transaction.maxFeePerGas, 16);
        const transactionGas = parseInt(transaction.gas, 16);
        const gasUsed = parseInt(transaction.gasUsed, 16);
        const transactionFee = ((maxFeePerGas * transactionGas) / 2 / Math.pow(10, 18)).toFixed(18);
        if (transactionFee === 'NaN') {
            return removeTrailingZeros((transactionGas * blockBaseFeePerGas / Math.pow(10, 17)).toFixed(18));
        } else {
            return removeTrailingZeros(transactionFee);
        }
        // return removeTrailingZeros(((maxFeePerGas + maxPriorityFeePerGas) * transactionGas) / Math.pow(10, 18).toFixed(18));
    }

    return (
        <div className='transaction-table-container'>
            <table className='transaction-table'>
                <thead className='table-header-row'>
                    <tr>
                        <th className='col1 header-cell-text'>Block number</th>
                        <th className='col2 header-cell-text'>Transaction ID</th>
                        <th className='col3 header-cell-text'>Sender address</th>
                        <th className='col4 header-cell-text'>Recipient's address</th>
                        <th className='col5 header-cell-text'>Block confirmations</th>
                        <th className='col6 header-cell-text'>Date</th>
                        <th className='col7 header-cell-text'>Value</th>
                        <th className='col8 header-cell-text'>Transaction Fee</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions?.map((transaction, index) => (
                        <tr key={transaction.hash} className={index % 2 === 0 ? 'line line__even' : 'line line__odd'}>
                            <td className='col1 body-cell-text'>{parseInt(transaction.blockNumber, 16) || '0'}</td>
                            <td className='col2 col2-text'>{transaction.hash}</td>
                            <td className='col3 body-cell-text'>{transaction.from}</td>
                            <td className='col4 body-cell-text'>{transaction.to}</td>
                            <td className='col5 body-cell-text'>{lastBlockNumber - parseInt(transaction.blockNumber, 16) + 1}</td>
                            <td className='col6 body-cell-text'>{getDateFromTimestamp(transaction.timestamp)}</td>
                            <td className='col7 body-cell-text'>{removeTrailingZeros((parseInt(transaction.value || 0, 16)/Math.pow(10, 18)).toFixed(18))}</td>
                            <td className='col8 body-cell-text'>{calculateTransactionFee(transaction)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionsTable;
