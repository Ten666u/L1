import moment from 'moment';

const getDate = (date) =>{
    return moment(date).format('DD-MMM-YYYY')
}

export {getDate}
