'use client';
import Arrow from './arrow';
import { useState } from 'react';

interface Settings {
    title: string;
    principalData: string;
    data: string[];
    configuration: 'topic' | 'difficulty' | 'language';
    allHidden: boolean;
    handleOption;
}
// a image of a old rpg game character, with a image and a text to show the dialog
function SettingsMenu<Settings>({
    title,
    principalData,
    data,
    configuration,
    allHidden,
    handleOption,
}) {
    const [openConfiguration, setOpenConfiguration] = useState(false);
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
        German: false,
    });
    const handleSettings = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setOpenConfiguration((prev) => !prev);
    };
    const handleHover = (
        e: React.MouseEvent<HTMLDivElement>,
        menuType: string,
        on: boolean,
    ) => {
        e.stopPropagation();
        const newState = openConfigurationOver
        for (const key of Object.keys(openConfigurationOver)) {
            newState[key] = false;
        }
        newState[menuType] = on;
        setOpenConfigurationOver(newState);
        console.log('estados', newState, openConfigurationOver)
    };

    return (
        <section>
            <div
                onMouseOver={(e) => handleHover(e, principalData, true)}
                onMouseLeave={(e) => handleHover(e, principalData, false)}
                className="my-4 flex flex-row"
                onClick={(e) => handleSettings(e)}
            >
                <Arrow
                    className={`${openConfigurationOver[principalData] ? 'visible' : 'invisible'
                        }`}
                />
                <h1>{title}</h1>
                <div
                    className={`${openConfiguration && allHidden ? 'visible' : 'invisible'
                        }`}
                >
                    {data.map((obj) => {
                        // * This element is a div and not a button because the button causes hydration problems
                        return (
                            <div
                                onMouseOver={(e) => handleHover(e, obj, true)}
                                className={`${configuration === obj ? 'text-slate-900' : 'text-slate-600'
                                    } flex flex-row pb-4`}
                                onClick={() => handleOption(obj, principalData)}
                                key={obj}
                            >
                                <Arrow
                                    className={`${openConfigurationOver[obj] ? 'visible' : 'invisible'
                                        }`}
                                />
                                <h2>{obj}</h2>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
export default SettingsMenu;