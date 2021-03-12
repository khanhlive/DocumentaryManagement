import moment from 'moment';
export default function columnFormatDate(cellData, format, formatOutput) {
    let _date = cellData.data[cellData['column']['dataField']];
    return formatDate(_date, format, formatOutput);
}

export function formatDate(value, format, formatOutput) {
    formatOutput = formatOutput ? formatOutput : "DD/MM/YYYY";
    let _date = value;
    if (_date) {
        const m = moment(_date, format ? format : 'DD/MM/YYYY');
        if (m.isValid()) {
            return m.format(formatOutput);
        }
    }
    return null;
}