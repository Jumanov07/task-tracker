import dateFormat from 'dateformat'

const DateFormat = ({ date, isShowDate }) => {
   const formatDate = new Date(date)
   const monthDay = dateFormat(formatDate, 'd mmm, yyyy')
   const time = dateFormat(formatDate, 'HH:MM')
   const fullDate = `${monthDay} ${isShowDate ? 'at' : '/'} ${time}`
   return fullDate
}

export default DateFormat
