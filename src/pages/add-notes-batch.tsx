import { useState } from 'react'

export function AddNotesBatch() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    setSelectedFile(file)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedFile) {
      console.error('No file selected')
      return
    }

    const formData = new FormData()
    formData.append('file', selectedFile)

    fetch('/api/notes', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        console.log(data)
        alert('File uploaded successfully')
      })
      .catch((error) => {
        console.error('Error:', error)
        alert('Error uploading file')
      })
  }

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Adicionar notas em lote
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 py-8">
            <label
              htmlFor="file"
              className="mb-2 block font-bold text-slate-700"
            >
              Selecione um arquivo
            </label>
            <input
              type="file"
              id="file"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-slate-700 shadow focus:outline-none"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="focus:shadow-outline rounded bg-pmpa-blue-500 px-4 py-2 font-bold text-white hover:bg-pmpa-blue-700 focus:outline-none"
            >
              Inserir Notas
            </button>
            <button
              className="focus:shadow-outline rounded bg-slate-500 px-4 py-2 font-bold text-white hover:bg-slate-700 focus:outline-none"
              onClick={() => window.history.back()}
            >
              Voltar
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
