import {React} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

export const MyCalendar = props => {
  const dayFormat = (date, culture, localizer) => localizer.format(date, 'DD MM YYYY', culture);
  
return(
  <div>
    <Calendar
      localizer={localizer}
      events={[]}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 650 }}
      length={1}
      defaultDate={new Date()}
      formats={{dayFormat}}
      views={["month","week","agenda"]}
    />
  </div>)
}