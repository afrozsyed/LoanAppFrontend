import React, {useId} from 'react';

function InputText({
    label,
  type = 'text',
  className="",
  ...props
}, ref) {
    const id = useId()
  return (
    <div>
        {label && <label htmlFor={id}
        className='inline-block mb-1 pl-1'
        >{label}</label>}
        <input type={type} className={`px-2 py-1 border-2 rounded-lg focus:outline-none
         focus:ring-2 focus:ring-orange-500 w-full bg-white text-black mb-2
         focus:border-transparent ${className}`}
        id={id}
        ref={ref}
        {...props}
        /> 
    </div>
  )
}

export default React.forwardRef(InputText);