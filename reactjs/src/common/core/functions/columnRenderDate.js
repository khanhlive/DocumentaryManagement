import moment from 'moment';
export default function columnFormatDate(cellData) {
    let _date = cellData.value;
    if (_date) {
        const m = moment(_date, 'DD/MM/YYYY');
        if (m.isValid()) {
            return m.format("DD/MM/YYYY");
        }
    }
    return null;
}