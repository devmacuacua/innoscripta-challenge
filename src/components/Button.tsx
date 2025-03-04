import { Dispatch, FC } from "react"

interface ActionDispatch {
    type: string;
}

interface ButtonProps {
    label: string
    handleOnClick: (dispatch: Dispatch<ActionDispatch>) => void;
}

const Button: FC<ButtonProps> = ({ label, handleOnClick }) => {
    const onClick = (e:any) => {
        handleOnClick(e)
    }
    return (
        <button onClick={onClick}>{label}</button>
    )
}
export default Button