'use client';
import { useState } from 'react';

import Image from 'next/image';
import { npc } from '@/schemas/constants';
import { dialog } from '@/schemas/dialogSchema';

interface message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}
interface CharacterInterface {
  dialogSet: (name: npc, response: boolean) => void;
  name: npc;
  answered: boolean;
  dialog?: string | null;
  context: message[]
  configuration: {
    topic: string;
    language: string;
    difficulty: string;
  };
}


const Character = (character: CharacterInterface) => {
  const [response, setResponse] = useState('');
  const [call, setCall] = useState(character.dialog);
  const [loading, setLoading] = useState(false);

  const handleDialog = async () => {
    setLoading(true)
    const body = JSON.stringify({
      context: character.context,
      prompt: {
        character: character.name,
        dialog: response.length > 0 ? response : `ask me a question of ${character.configuration.difficulty} difficulty about ${character.configuration.topic}`,
        topic: character.configuration.topic,
        language: character.configuration.language,
        difficulty: character.configuration.difficulty,
      },
      max_tokens: 100,
      temperature: 0.9,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      role: 'user'
    })
    console.log('se envia el body', body)
    const caller = await fetch('http://localhost:5000/api/chatgpt', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body
    })

    console.log('y si algo pasa o no pasa?', caller)

    try {
      if (caller) {
        const data = await caller.json()
        obtainJson(data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setResponse(e.currentTarget.value);
  };

  const obtainJson = (caller: message) => {
    try {
      const jsonCaller: dialog = JSON.parse(caller.content) as dialog;
      setCall(jsonCaller.dialog);
      if (jsonCaller.answered) {
        character.dialogSet(character.name, true);
      }
    } catch {
      setCall(caller.content);
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
export default Character;