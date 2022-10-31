// const baseUrl = 'http://localhost:4000';
const baseUrl = 'https://macabre-witch-68463.herokuapp.com';
const lastBlockNumberUrl = '/block/last-number';

const getLastBlockNumber = async () => {
    try {
        const url = baseUrl + lastBlockNumberUrl;
        const response = await fetch(url).then(data => data.json());
        return response;
    } catch (error) {
        return 1;
    }
}

export  {
    getLastBlockNumber
};
