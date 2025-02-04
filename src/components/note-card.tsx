export function NoteCard() {
  return (
    // ring-2 cria uma sombra, o que facilita pois se utilizarmos a borda, ela adiciona ao espaço e a ring não 
    <div className="rounded-md bg-slate-800 p-5 space-y-3 overflow-hidden relative hover:ring-2">
      <span className="text-sm font-medium text-slate-200">há 4 dias</span>
      <p className="text-sm leading-6 text-slate-400">
        Grave uma nota em áudio que será convertida para texto automaticamente.
      </p>
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
    </div>
  );
}
