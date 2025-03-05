import { Dispatch, SetStateAction } from "react"

interface DateProps {
    date: string
    setDate: Dispatch<SetStateAction<string>>
    label:string
}

const DateComponent:React.FC<DateProps> = ({date, setDate, label}) => {
    const onDateChange = (e:any) =>{
        setDate(e.target.value)
    }
    return(
        <div className="filter-item">
            <label>{label}:</label>
            <input
              type="date"
              value={date}
              onChange={e=>setDate(e.target.value)}
            />
          </div>
    )
}

export default DateComponent