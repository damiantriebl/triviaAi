'use client';
import { useState, MouseEventHandler, SetStateAction, useEffect } from 'react';
import Image from 'next/image';
import { npc } from '@/schemas/constants';
import getData from '@/lib/ApiCall';
import { dialog } from '@/schemas/dialogSchema';
interface CharacterInterface {
  dialogSet: (name: npc, response: boolean) => void;
  name: npc;
  answered: boolean;
  dialog?: string | null;
  configuration: {
    topic: string;
    language: string;
    difficulty: string;
  };
}
// a image of a old rpg game character, with a image and a text to show the dialog
export const Character = (character: CharacterInterface) => {
  const [response, setResponse] = useState('');
  const [call, setCall] = useState(character.dialog);
  const [loading, setLoading] = useState(false);

  const handleDialog = async () => {
    setLoading(true);
    const caller: string = (await getData({
      character: character.name,
      dialog: response.length > 0 ? response : null,
      topic: character.configuration.topic,
      language: character.configuration.language,
      difficulty: character.configuration.difficulty,
    })) as string;
    try {
      if (caller) {
        obtainJson(caller);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setResponse(e.currentTarget.value);
  };

  const obtainJson = (caller: string) => {
    const characterName =
      character.name.charAt(0).toUpperCase() + character.name.slice(1) + ': ';
    const jsonModified = caller?.split(characterName)[0];
    const jsonCaller: dialog = JSON.parse(jsonModified) as dialog;
    setCall(jsonCaller.dialog);
    if (jsonCaller.response) {
      character.dialogSet(character.name, true);
    }
    setResponse('');
    setLoading(false);
  };
  return (
    <div
      className="flex h-[13rem] w-[30rem] place-items-center justify-end	"
      onClick={handleDialog}
    >
      <div
        className={`${!loading && 'hidden'
          } relative top-[-10rem] flex w-[30rem] flex-row rounded-2xl border-4 border-stone-800  bg-slate-200 p-6 text-slate-700`}
      >
        <p className="animate-bounce">.</p>
        <p className="delay-75 motion-safe:animate-bounce	">.</p>
        <p className="animate-bounce delay-150	">.</p>
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${!call && 'hidden'} ${loading && 'hidden'
          } relative top-[-10rem] w-[30rem] rounded-2xl border-4 border-stone-800  bg-slate-200 p-6 text-slate-700`}
      >
        <button
          onClick={() => setCall(null)}
          className="absolute top-0 right-0 bg-slate-900 p-4 text-slate-200"
        >
          X
        </button>
        <p className="text-sm">{character.name}</p>
        <p className="p-5">{call}</p>
        <div className="flex w-full flex-row">
          <input className="w-[20rem]" onChange={handleChange} />
          <button
            onClick={handleDialog}
            className="bg-slate-900 p-4 text-slate-200"
          >
            {' '}
            {'>'}{' '}
          </button>
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
};
