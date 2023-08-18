import { useRef } from "react";
import ContentEditable from "react-contenteditable";
import "./textarea.css";

export default function Index(props) {
  const textareaRef = useRef(null);
  const handleChange = (e) => {
    props.onChange(e);
  };

  return (
    <ContentEditable
      className={props.className}
      innerRef={textareaRef}
      html={props.value || ''}
      disabled={false}
      onChange={handleChange}
      tagName="article"
    />
  );
}
