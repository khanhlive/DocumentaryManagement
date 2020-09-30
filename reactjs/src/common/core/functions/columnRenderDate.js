import moment from 'moment';
export default function columnFormatDate(cellData, format) {
    let _date = cellData.value;
    return formatDate(_date, format);
}

export function formatDate(value, format) {
    let _date = value;
    if (_date) {
        const m = moment(_date, format ? format : 'DD/MM/YYYY');
        if (m.isValid()) {
            return m.format("DD/MM/YYYY");
        }
    }
    return null;
}