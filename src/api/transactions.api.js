// const baseUrl = 'http://localhost:4000';
const baseUrl = 'https://macabre-witch-68463.herokuapp.com';
const searchTransactionsUrl = '/transaction/search';

const searchTransactions = async (page, pageSize, searchBy, value) => {
    try {
        const url = `${baseUrl}${searchTransactionsUrl}?page=${page}&pageSize=${pageSize}&searchBy=${searchBy}&value=${value}`;
        const transactions = await fetch(url).then(data => data.json());
        return transactions;
    } catch (error) {
        return {transactions: [], transactionsCount: 0};
    }
}

export {
    searchTransactions,
};
