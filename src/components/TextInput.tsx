interface TextIProps {
    keyword: string
    setKeyword: React.Dispatch<React.SetStateAction<string>>;
    label:string
}

const TextInput: React.FC<TextIProps> = ({ keyword, setKeyword , label}) => {
    const handleOnKeywordChange = (e: any) => {
        setKeyword(e.target.value)
    }

    return (
        <div className="filter-item">
            <label>{label}:</label>
            <input
                type="text"
                placeholder="Search by keyword"
                value={keyword}
                onChange={handleOnKeywordChange}
            />
        </div>
    )
}

export default TextInput