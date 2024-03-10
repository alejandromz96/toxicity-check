import React, { useState } from 'react'
import { FireIcon, CogIcon } from '@heroicons/react/24/solid'

type Props = {
    asyncSubmit: (sentence: string) => void // async function to send current input to the inference endpoint
    loading: boolean // flag to prevent user for entering inputs before the app is ready
}

const ToxicTextComponent = ({ asyncSubmit, loading = false }: Props): React.JSX.Element => {
    const [currentInput, setCurrentInput] = useState('')

    function submitCurrentInput(): void {
        if (currentInput) {
            asyncSubmit(currentInput)
            setCurrentInput('')
        }
    }

    function onEnterSubmitInput(ev: React.KeyboardEvent<HTMLInputElement>): void {
        if (ev.key === 'Enter') {
            submitCurrentInput()
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className="flex items-center w-full px-2 py-2 rounded-lg bg-white">
            <input
                className="block mx-2 p-2.5 w-full text-sm rounded-lg"
                placeholder="Be toxic!"
                onChange={(ev) => setCurrentInput(ev.target.value)}
                onPaste={(ev) => ev.preventDefault()} // Prevent copy pasting things
                onKeyUp={onEnterSubmitInput}
                value={currentInput}
            />
            <button
                type="submit"
                className="inline-flex justify-center p-2 rounded-full cursor-pointer"
                onClick={submitCurrentInput}
            >
                <FireIcon className="w-5 h-5" stroke="red" fill="purple" />
            </button>
        </div>
    )
}

function Loading(): React.JSX.Element {
    return (
        <div className="animate-spin">
            <CogIcon className="w-10 h-10" />
        </div>
    )
}

export default ToxicTextComponent
