import logo from "./assets/logo.png";
import { NoteCard } from "./components/note-card";
import { AddCard } from "./components/add-card";
const note = {
  date: new Date(),
  content: 'Hello'
}

export function App() {
  return (
    //mx - margin do eixo x - horizontal
    //o tailwind utiliza o espaçamento multiplo de 4, então o valor 1 tem o px de 4, 2 tem px de 8 e vice versa
    //space-y-6 adiciona um espaçamento em cada elemento verticalmente dentro da div
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="logo" />
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          //w-full ocupa a largura toda, bg-transparent não tem fundo, text-3xl e tracking-tight deixa menos espaço entre as letras
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder: text-slate-500"
        />
      </form>
      {/* incluindo um separador h (horizontal) px (1 px)*/}
      <div className="h-px bg-slate-700" />

      {/* para colocarmos um valor definido por mim e não pelo tailwind, posso colocar o valor dentro de colchetes [30px] */}
      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        {/* rounded-md é equivalente a border radius */}
        <AddCard />
        <NoteCard note={note}/>
      </div>
    </div>
  );
}
