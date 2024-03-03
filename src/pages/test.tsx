import { type JSX } from 'react'

const Test = (): JSX.Element => (
    <div className="flex flex-col text-zinc-300 items-center">
        <span className="">PRUEBA ARRIBA</span>
        <span className="mt-[300px]">PRUEBA MEDIO</span>
        <span className="mt-[800px]">PRUEBA ABAJO</span>
    </div>
)

export default Test
