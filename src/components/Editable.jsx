import {useEffect, useRef} from 'react';

export default function Editable({id, as:Tag='span', className='', children, html=false}){
  const ref=useRef(null);
  useEffect(()=>{
    const saved=localStorage.getItem(`portfolio:${id}`);
    if(saved!==null && ref.current){
      if(html) ref.current.innerHTML=saved; else ref.current.textContent=saved;
    }
  },[id,html]);
  const save=()=>{
    if(!ref.current) return;
    localStorage.setItem(`portfolio:${id}`, html?ref.current.innerHTML:ref.current.textContent);
    window.dispatchEvent(new CustomEvent('portfolio-saved'));
  };
  return <Tag ref={ref} className={`live-edit ${className}`} data-edit-id={id} suppressContentEditableWarning onBlur={save}>{children}</Tag>
}
