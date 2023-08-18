import Dropzone from "react-dropzone";
import CloudIcon from "../../../icons/CloudIcon";
import "./FileUploader.scss";

export default function FileUploader(props) {
  return (
    <>
      <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section className="text-center file-uploader">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <CloudIcon />
              <p className="mt-1">{props.desc}</p>
            </div>
          </section>
        )}
      </Dropzone>
    </>
  );
}
