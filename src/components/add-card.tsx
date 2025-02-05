import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
// import { revalidatePath } from 'next'
interface AddCardProps {
  onNoteCreated: (content: string) => void;
}
let speechRecognition: SpeechRecognition | null = null;

export function AddCard({ onNoteCreated }: AddCardProps) {
  const [shouldShowDescription, setShoulShowDescription] = useState(true);

  const [content, setContent] = useState("");

  const [isRecording, setIsRecording] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  function handleStartEditor() {
    setShoulShowDescription(false);
  }

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
    if (event.target.value === "") {
      setShoulShowDescription(true);
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault();

    if (content === "") {
      return toast.error("Não é possível criar uma nota vazia!");
    }
    onNoteCreated(content);
    
    setContent("");
    
    setShoulShowDescription(true);
    
    toast.success("Nota criada com sucesso!");
    setIsOpen(false);
  }

  function handleStartRecording() {
    const isSpeechRecognitionAPIIsAvailable =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!isSpeechRecognitionAPIIsAvailable) {
      alert(
        "Infelizmente o seu navegador não suporta a API de gravação de voz"
      );
      return;
    }

    setIsRecording(true);
    setShoulShowDescription(false);

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      // console.log(event.results);
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, "");

      setContent(transcription);
    };

    speechRecognition.onerror = (event) => {
      console.error(event);
    };

    speechRecognition.start();
  }
  function handleStopRecording() {
    setIsRecording(false);
    if (speechRecognition !== null) {
      speechRecognition.stop();
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger className="rounded-md flex flex-col bg-slate-700 p-5 gap-3 outline-none overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400"
      onClick={() => setIsOpen(true)}>
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50"></Dialog.Overlay>
        <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

          <form className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-200">
                Adicionar nota
              </span>
              {shouldShowDescription ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{" "}
                  <button
                    className="font-medium text-lime-400 hover:underline"
                    type="button"
                    onClick={handleStartRecording}
                  >
                    gravando uma nota
                  </button>{" "}
                  em áudio ou se preferir{" "}
                  <button
                    className="font-medium text-lime-400 hover:underline"
                    type="button"
                    onClick={handleStartEditor}
                  >
                    utilize apenas texto.
                  </button>
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                  onChange={handleContentChange}
                  value={content}
                />
              )}
            </div>
            {isRecording ? (
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline:none font-medium hover:slate-100"
                onClick={handleStopRecording}
              >
                <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                Gravando! (clique para interromper)
              </button>
            ) : (
                <button
                  type="button"
                  onClick={handleSaveNote}
                  className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline:none font-medium hover:bg-lime-500"
                >
                  Salvar nota
                </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
