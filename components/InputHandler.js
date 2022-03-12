import React from 'react'
import { useField,ErrorMessage } from 'formik'
import styles from "../styles/Form.module.css"
const InputHandler = ({label,id,...props}) => {
    const [field,meta] = useField(props)
  
  return (
     
     
    <div>
    <label className={styles.label} htmlFor={id} >{label}</label>
    { id==="description"? <textarea className={styles.textarea} id={id}  {...props} {...field}></textarea>: <input className={styles.input} id={id}  {...props} {...field} />}
    
    {(meta.touched&&meta.error)&& <div  style={{color:'red'}}><ErrorMessage name={field.name} /></div> }
</div>
  )
}

export default InputHandler