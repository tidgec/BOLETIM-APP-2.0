import { useState } from 'react';

interface Grade {
  nome: string;
  cpf: string;
  curso: string;
  polo: string;
  notas: {
    am: number | null;
    ami: number | null;
    vf: number | null;
    vfe: number | null;
  };
}

const grades: Grade[] = [
  {
    nome: 'AFONSO RAIOL GONZAGA NETO',
    cpf: '12345678901',
    curso: 'Curso 1',
    polo: 'Polo 1',
    notas: {
      am: 8,
      ami: 9,
      vf: 7,
      vfe: null,
    },
  },
  {
    nome: 'AGAMENON GONÇALVES PORTELA',
    cpf: '10987654321',
    curso: 'Curso 2',
    polo: 'Polo 2',
    notas: {
      am: 7,
      ami: 8,
      vf: 6,
      vfe: null,
    },
  },
];

export function RemoveNotes() {
  const [gradesData, setGradesData] = useState(grades);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPolo, setSelectedPolo] = useState('Todos');

  const handleRemoveNota = (index: number, nota: keyof Grade['notas']) => {
    setGradesData((prevGrades) => {
      const updatedGrades = [...prevGrades];
      updatedGrades[index].notas[nota] = null;
      return updatedGrades;
    });
  };

  const filteredGrades = gradesData.filter((grade) => {
    const matchesNameOrCpf = grade.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.cpf.includes(searchTerm);
    const matchesPolo = selectedPolo === 'Todos' || grade.polo === selectedPolo;
    return matchesNameOrCpf && matchesPolo;
  });

  const uniquePolos = ['Todos', ...new Set(gradesData.map(grade => grade.polo))];

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black py-4 text-xl font-semibold">
          Remover Notas
        </h2>

        <div className="py-6 flex flex-col items-center mb-4">
          <input
            type="text"
            placeholder="Pesquisar por nome ou CPF"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded-md mb-2 w-full max-w-md"
          />
          <select
            value={selectedPolo}
            onChange={(e) => setSelectedPolo(e.target.value)}
            className="px-3 py-2 border rounded-md w-full max-w-sm"
          >
            {uniquePolos.map((polo) => (
              <option key={polo} value={polo}>
                {polo}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGrades.map((grade, index) => (
            <div key={index} className="border rounded-md p-4">
              <h2 className="text-lg font-semibold mb-2">{grade.nome}</h2>
              <p className="mb-2">Curso: {grade.curso}</p>
              <p className="mb-2">Polo: {grade.polo}</p>

              <div className="grid grid-cols-4 gap-2">
                <div className="flex items-center">
                  <span className="text-black">AM:</span>
                  <button
                    className="ml-2 px-2 py-1 rounded-md bg-pmpa-blue-500 text-white"
                    onClick={() => handleRemoveNota(index, 'am')}
                  >
                    Remover
                  </button>
                </div>

                <div className="flex items-center">
                  <span className="text-black">AMI:</span>
                  <button
                    className="ml-2 px-2 py-1 rounded-md bg-pmpa-blue-500 text-white"
                    onClick={() => handleRemoveNota(index, 'ami')}
                  >
                    Remover
                  </button>
                </div>

                <div className="flex items-center">
                  <span className="text-black">VF:</span>
                  <button
                    className="ml-2 px-2 py-1 rounded-md bg-pmpa-blue-500 text-white"
                    onClick={() => handleRemoveNota(index, 'vf')}
                  >
                    Remover
                  </button>
                </div>

                <div className="flex items-center">
                  <span className="text-black">VFE:</span>
                  <button
                    className="ml-2 px-2 py-1 rounded-md bg-pmpa-blue-500 text-white"
                    onClick={() => handleRemoveNota(index, 'vfe')}
                  >
                    Remover
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}