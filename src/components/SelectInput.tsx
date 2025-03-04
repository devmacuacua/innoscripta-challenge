import { Dispatch, FC, SetStateAction } from "react"

interface SelectProps {
    values: string[]
    value: string
    setValue: Dispatch<SetStateAction<string>>
    label: string
}
const SelectInput: FC<SelectProps> = ({ values, value, setValue, label }) => {
    const all = label === 'Category' ? 'Categories' : label + 's';
    return (
        <div className="filter-item">
            <label>{label}:</label>
            <select value={value} onChange={(e) => setValue(e.target.value)}>
                <option value="">All {all}</option>
                {values.map(value => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </select>
        </div>
    )
}

export default SelectInput