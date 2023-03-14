'use client'
import Arrow from './arrow'
import { useEffect, useState } from 'react'

interface Settings {
    title: string,
    principalData: string,
    data: string[],
    configuration: "topic" | "difficulty" | "language",
    allHidden: boolean,
    handleOption
}
// a image of a old rpg game character, with a image and a text to show the dialog
export default SettingsMenu<Settings> = ({ title, principalData, data, configuration, allHidden, handleOption }) => {
    const [color, setColor] = useState('blue')
    const [openConfiguration, setOpenConfiguration] = useState(false)
    const [openConfigurationOver, setOpenConfigurationOver] = useState({
        topic: false,
        language: false,
        difficulty: false,
        javascript: false,
        python: false,
        java: false,
        c: false,
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        english: false,
        spanish: false,
        German: false
    })
    const handleSettings = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setOpenConfiguration((prev) => !prev);
    }
    const handleHover = (e: React.MouseEvent<HTMLButtonElement>, menuType: string, on: boolean) => {
        e.stopPropagation()
        const newState = Object.keys(openConfigurationOver).map(v => openConfigurationOver[v] = false);
        newState[menuType] = on;
        setOpenConfigurationOver(newState)
    }

    return (
        <button onMouseOver={(e) => handleHover(e, principalData, true)} onMouseLeave={(e) => handleHover(e, principalData, false)} className="flex flex-row my-4" onClick={(e) => handleSettings(e)}>
            <Arrow className={`${openConfigurationOver[principalData] ? "visible" : "invisible"}`} /><h1>{title}</h1>
            <div className={`${openConfiguration && allHidden ? "visible" : "invisible"}`}>
                {data.map((obj) => {
                    return (
                        <button onMouseOver={(e) => handleHover(e, obj, true)} className={`${configuration === obj ? "text-slate-900" : "text-slate-600"} flex flex-row pb-4`} onClick={() => handleOption(obj, principalData)}>
                            <Arrow className={`${openConfigurationOver[obj] ? "visible" : "invisible"}`} /><h2>{obj}</h2>
                        </button>
                    )
                })}
            </div >
        </button >
    );
}
