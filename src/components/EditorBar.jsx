import {useEffect,useState} from 'react';

export default function EditorBar(){
 const [editing,setEditing]=useState(false); const [status,setStatus]=useState('');
 useEffect(()=>{document.body.classList.toggle('editing',editing); document.querySelectorAll('[data-edit-id]').forEach(el=>el.contentEditable=editing?'true':'false'); return()=>document.body.classList.remove('editing')},[editing]);
 useEffect(()=>{const f=()=>{setStatus('Saved locally');setTimeout(()=>setStatus(''),1600)};window.addEventListener('portfolio-saved',f);return()=>window.removeEventListener('portfolio-saved',f)},[]);
 const exportData=()=>{const data={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k?.startsWith('portfolio:'))data[k]=localStorage.getItem(k)};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='fahra-portfolio-content.json';a.click();URL.revokeObjectURL(a.href)};
 const reset=()=>{if(confirm('Reset all live edits in this browser?')){Object.keys(localStorage).filter(k=>k.startsWith('portfolio:')).forEach(k=>localStorage.removeItem(k));location.reload()}};
 return <div className="editor-bar"><button className={editing?'editor-active':''} onClick={()=>setEditing(v=>!v)}>{editing?'✓ Finish editing':'✎ Edit content'}</button>{editing&&<><span>Click highlighted text to edit it.</span><button onClick={exportData}>Export edits</button><button onClick={reset}>Reset</button></>}<small>{status}</small></div>
}
