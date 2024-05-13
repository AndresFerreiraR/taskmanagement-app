import "./Tag.css"
import { TagProps } from './types'

const Tag = ({ name = "default", selectTag, selectedTag }: TagProps) => {
    const TAGS_STYLE: any = {
        Front: { backgroundColor: "#15d4c8"},
        Back: { backgroundColor: "#00C60C"},
        Infrastructure: { backgroundColor: "#F03309"},
        DevOps: { backgroundColor: "#BB08C6"},
        Default: { backgroundColor: "#f9f9f9"},
    }
  return (
    <button type="button" className="tag" style={selectedTag ? TAGS_STYLE[name] : TAGS_STYLE.Default } onClick={() => selectTag(name)}>{name}</button>
  )
}

export default Tag