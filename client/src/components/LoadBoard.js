import axios from 'axios';

const LoadBoard = ({ qsetID, setBoard }) => {

    const getBoard = async (qid) => {
        try {
            const response = await axios.get('/qset/' + qid);
            const responseQ = await axios.get('/qset/qs/' + qid);
            setBoard(response.data.title, response.data._id, responseQ.data);
        } catch (e) {}
    };

    // Check if board is loaded
    if(qsetID === null) {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let qid = params.get('qs');

        // If board ID is set as query, check if board exists and load it
        if (qid !== null) {
            getBoard(qid);
        }
    }

    return null;
}

export default LoadBoard;