"use client"

import { useEffect, useRef } from "react"
import { createEmoji } from "./action"
import { SubmitButton } from "./submit-button"
// @ts-expect-error
import { experimental_useFormState as useFormState } from "react-dom"

interface EmojiFormProps {
  initialPrompt?: string
}

export function EmojiForm({ initialPrompt }: EmojiFormProps) {
  const [formState, formAction] = useFormState(createEmoji)
  const submitRef = useRef<React.ElementRef<"button">>(null)

  useEffect(() => {
    if (!formState) return
    // TODO: show toast
    console.log(formState.message)
  }, [formState])

  return (
    <form action={formAction} className="bg-black rounded-xl shadow-lg h-fit flex flex-row px-1.5 items-center w-full">
      <input
        defaultValue={initialPrompt}
        type="text"
        name="prompt"
        onKeyDown={(e) => {
          // if (e.key === "Enter" && !e.shiftKey) e.preventDefault()
          if (e.key === "Enter") {
            e.preventDefault()
            submitRef.current?.click()
          }
        }}
        placeholder="cat"
        className="bg-transparent text-white placeholder:text-gray-400 ring-0 outline-none resize-none py-2.5 px-2 font-mono text-sm h-10 w-full transition-all duration-300"
      />
      <SubmitButton ref={submitRef} />
    </form>
  )
}
