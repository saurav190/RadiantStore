import React, { ReactNode } from 'react'
interface ButtonProps {
    classNameprops: string;
    children: string | ReactNode;
  }
const Button:React.FC<ButtonProps> = ({classNameprops,children }) => {
  return (
    <>
        <button className={`text-center ${classNameprops}`} >{children }</button>
    </>
  )
}

export default Button;