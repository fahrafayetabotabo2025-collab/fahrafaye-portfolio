import {Link} from 'react-router-dom';
export default function ProjectCard({p}){return <article className={'project '+(p.featured?'feature':'')}><div className="project-body"><span className="label">{p.label}</span><h3>{p.title}</h3><p>{p.summary}</p><div className="chips">{p.chips?.map(c=><span key={c}>{c}</span>)}</div><Link to={'/work/'+p.slug}>Open project ↘</Link></div></article>}
