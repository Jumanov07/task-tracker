import { useDropzone } from 'react-dropzone'

const DropzoneWithFileReader = ({ children, setFile }) => {
   const handleUpload = (acceptedFiles) => {
      const file = acceptedFiles[0]
      const reader = new FileReader()
      reader.onload = (event) => {
         setFile(event.target.result)
      }
      reader.readAsDataURL(file)
      setFile(reader.result)
   }

   const { getRootProps, getInputProps } = useDropzone({
      onDrop: handleUpload,
      accept: {
         'image/png': [],
         'image/jpeg': [],
      },
   })
   return (
      <div {...getRootProps()}>
         <input {...getInputProps()} />
         <p>{children}</p>
      </div>
   )
}
export default DropzoneWithFileReader
