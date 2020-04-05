import axios from 'axios'

const instance = axios.create({
    baseURL :'https://react-49f03.firebaseio.com/'

});

export default instance;