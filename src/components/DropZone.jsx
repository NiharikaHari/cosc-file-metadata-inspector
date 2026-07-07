import { useRef, useState } from 'react'

export default function DropZone({ onFileSelected }) {
  const inputRef = useRef(null)
  const [isActive, setIsActive] = useState(false)

  function handleDragOver(event) {
    event.preventDefault()
    setIsActive(true)
  }

  function handleDragLeave() {
    setIsActive(false)
  }

  function handleDrop(event) {
    event.preventDefault()
    setIsActive(false)
    const file = event.dataTransfer.files?.[0]
    if (file) onFileSelected(file)
  }

  function handleInputChange(event) {
    const file = event.target.files?.[0]
    if (file) onFileSelected(file)
    event.target.value = ''
  }

  return (
    <div
      className={`dropzone${isActive ? ' dropzone--active' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p>Drag and drop an image or PDF here</p>
      <button type="button" onClick={() => inputRef.current?.click()}>
        Choose file
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,application/pdf"
        onChange={handleInputChange}
        hidden
      />
    </div>
  )
}
