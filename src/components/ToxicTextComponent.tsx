import React, { useState } from 'react'
import { CogIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

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
        <div className="w-full">
            <div className="flex items-center px-2 py-2 rounded-lg bg-yellow-text bg-opacity-30 text-yellow-text ">
                <input
                    className="block mx-2 p-2.5 w-full text-2xl rounded-lg bg-transparent outline-none"
                    placeholder="Be toxic!"
                    onChange={(ev) => setCurrentInput(ev.target.value)}
                    onPaste={(ev) => ev.preventDefault()} // Prevent copy pasting things
                    onKeyUp={onEnterSubmitInput}
                    value={currentInput}
                    style={{ fontFamily: 'monogram' }}
                />
                <button
                    type="submit"
                    className="inline-flex justify-center p-2 rounded-full cursor-pointer"
                    onClick={submitCurrentInput}
                >
                    <ChevronRightIcon className="w-5 h-5 text-yellow-text" />
                </button>
            </div>
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
