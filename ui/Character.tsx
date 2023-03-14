'use client'
import { useState, MouseEventHandler, SetStateAction, useEffect } from 'react'
import Image from 'next/image';
import { npc } from '@/schemas/constants'
import ApiCall from 'conections/ApiCall';
import { dialog } from '@/schemas/dialogSchema';
interface CharacterInterface {
    dialogSet: (name: npc, response: boolean) => {},
    name: npc,
    answered: boolean,
    dialog: string | null
    configuration: {
        topic: string,
        language: string,
        difficulty: number
    }
}
// a image of a old rpg game character, with a image and a text to show the dialog
export default Character = (character: CharacterInterface) => {
    const [response, setResponse] = useState("");
    const [call, setCall] = useState(character.dialog);
    const [loading, setLoading] = useState(false)

    const handleDialog = async () => {
        setLoading(true)
        const caller: string = await ApiCall({
            character: character.name,
            dialog: response.length > 0 ? response : null,
            topic: character.configuration.topic,
            language: character.configuration.language,
            difficulty: character.configuration.difficulty
        }) as string
        try {
            if (caller) {
                obtainJson(caller)
            }
        } catch (e) {
            console.log(e)
        }
    }
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setResponse(e.currentTarget.value)
    }

    const obtainJson = (caller: string) => {
        const characterName = character.name.charAt(0).toUpperCase() + character.name.slice(1) + ": ";
        const jsonModified = caller?.split(characterName)[0]
        const jsonCaller: dialog = JSON.parse(jsonModified) as dialog
        setCall(jsonCaller.dialog);
        if (jsonCaller.response) {
            character.dialogSet(character.name, true)
        }
        setResponse("")
        setLoading(false)
    }
    return (
        <div className='w-[30rem] h-[13rem] flex place-items-center justify-end	'
            onClick={handleDialog}
        >
            <div className={`${!loading && "hidden"} flex flex-row rounded-2xl w-[30rem] relative top-[-10rem] border-stone-800 border-4  bg-slate-200 text-slate-700 p-6`}>
                <p className='animate-bounce'>.</p>
                <p className='motion-safe:animate-bounce delay-75	'>.</p>
                <p className='animate-bounce delay-150	'>.</p>
            </div>
            <div onClick={(e) => e.stopPropagation()} className={`${!call && "hidden"} ${loading && "hidden"} rounded-2xl w-[30rem] relative top-[-10rem] border-stone-800 border-4  bg-slate-200 text-slate-700 p-6`}>
                <button onClick={() => setCall(null)} className='absolute top-0 right-0 p-4 bg-slate-900 text-slate-200'>X</button>
                <p className='text-sm'>{character.name}</p>
                <p className='p-5'>{call}</p>
                <div className='flex flex-row w-full'>
                    <input className="w-[20rem]" onChange={handleChange} />
                    <button onClick={handleDialog} className='p-4 bg-slate-900 text-slate-200'> {">"} </button>
                </div>
            </div>
            <Image
                src={`${character.name}.svg`}
                alt={character.name}
                width={50}
                height={50}
            />

        </div>
    );
}
