import logo from "./assets/logo.png";

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
      <div className="h-px bg-slate-700"/>

      {/* para colocarmos um valor definido por mim e não pelo tailwind, posso colocar o valor dentro de colchetes [30px] */}
      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        {/* rounded-md é equivalente a border radius */}
        
      <div className="rounded-md bg-slate-700 p-5 space-y-3">    
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto automaticamente.
        </p>
        {/* <div className="absolute bottom-0 left-0 rigth-0 h-1/2 bg-gradient-to-t from-black to-white"/> */}
      </div>
        {/* separando */}
      <div className="rounded-md bg-slate-800 p-5 space-y-3 overflow-hidden relative">    
        <span className="text-sm font-medium text-slate-200">
          há 2 dias
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, voluptates! Nesciunt ex voluptate atque illum alias porro rerum minus in quam, vitae adipisci cupiditate, mollitia, sit accusantium odio! Deserunt, nisi!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, voluptates! Nesciunt ex voluptate atque illum alias porro rerum minus in quam, vitae adipisci cupiditate, mollitia, sit accusantium odio! Deserunt, nisi!
        </p>
        <div className="absolute bottom-0 left-0 rigth-0 h-1 bg-gradient-to-t from-black/60 to-black/0"/>
      </div>
      {/* separando */}
      <div className="rounded-md bg-slate-800 p-5 space-y-3 overflow-hidden relative">    
        <span className="text-sm font-medium text-slate-200">
          há 4 dias
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto automaticamente.
        </p>
        <div className="absolute bottom-0 left-0 rigth-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0"/>
      </div>

      </div>
    </div>
  )
}
