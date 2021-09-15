import React from 'react'

interface IInputProps {
    value: string;
    onChange :(event:React.SyntheticEvent<HTMLInputElement>)=>void
}

export const Input: React.FunctionComponent<IInputProps> = ({value, onChange}) =>(
    <input type="text" placeholder="name" value={value} onChange={onChange}/>
);

interface IFormProps{
    onFormSubmit :(event : React.FormEvent)=>void
}
export const Form:React.FunctionComponent<IFormProps> =({children, onFormSubmit}) =>(
    <form onSubmit={onFormSubmit}>{children}</form>
)
