'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Hero from '../public/hero.svg';
import { npc } from '@/schemas/constants';
import { Character } from '@/ui/Character';
import getData from '../lib/ApiCall';
import Gear from '@/ui/gear';
import SettingsMenu from '@/ui/SettingsMenu';

const Page = () => {
  const [position, setPosition] = useState({ x: 150, y: 300 });
  const [answered, setAswered] = useState({
    [npc.Elliot]: false,
    [npc.Donna]: false,
    [npc.Margaret]: false,
  });
  const [dialog, setDialog] = useState(null);
  const [configuration, setConfiguration] = useState({
    topic: 'Javascript',
    language: 'English',
    difficulty: 'one',
  });
  const [openConfiguration, setOpenConfiguration] = useState(false);
  const isMountedRef = useRef(false);
  enum difficultyLevel {
    one = 'one',
    two = 'two',
    three = 'three',
    four = 'four',
    five = 'five',
  }
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return undefined;
    }
    getData(dialog);
  }, []);
  useEffect(() => {
    if (
      answered.donna === true &&
      answered.margaret === true &&
      answered.elliot === true
    ) {
      setAswered({
        [npc.Elliot]: false,
        [npc.Donna]: false,
        [npc.Margaret]: false,
      });
      if (configuration.difficulty !== difficultyLevel.five) {
        setConfiguration((prev) => ({
          ...prev,
          difficulty:
            difficultyLevel[parseInt(difficultyLevel[prev.difficulty]) + 1],
        }));
      }
    }
  }, [answered]);
  // check the position of the mouse, and modify state with this positition
  const handleMovement = (e: React.MouseEvent<HTMLDivElement>) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleDialogSet = (name: npc, response: boolean): void => {
    setAswered((prev) => ({ ...prev, [name]: response }));
  };
  const handleSettings = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenConfiguration((prev) => !prev);
  };
  const handleOption = (option, group) => {
    setOpenConfiguration(false);
    setConfiguration((prev) => ({ ...prev, [group]: option }));
  };
  return (
    <section
      onClick={handleMovement}
      className="z-10 h-screen w-screen space-y-6 border-[3rem]	 border-slate-800 p-[3rem]"
    >
      <div onClick={handleMovement} className="space-y-8 text-white">
        <h1 className="text-center text-4xl font-bold text-slate-50">
          Level {configuration.difficulty} Topic {configuration.topic}
        </h1>

        <Image
          style={{ top: position.y - 100, left: position.x - 50 }}
          src={Hero}
          alt="The only hero in this story"
          width={80}
          height={80}
          className={`absolute transition-all	`}
        />
        <div className="absolute top-10 right-20 flex h-screen  flex-col justify-between p-36 px-64">
          <Character
            dialogSet={handleDialogSet}
            configuration={configuration}
            name={npc.Elliot}
            answered={false}
          />
          <Character
            dialogSet={handleDialogSet}
            configuration={configuration}
            name={npc.Donna}
            answered={false}
          />
          <Character
            dialogSet={handleDialogSet}
            configuration={configuration}
            name={npc.Margaret}
            answered={false}
          />
        </div>
      </div>
      <div
        className={`${openConfiguration ? 'visible' : 'invisible'
          } absolute bottom-[9rem] flex flex-col rounded-2xl  border-4 border-stone-800  bg-slate-200 p-6 text-slate-700`}
      >
        <SettingsMenu
          handleOption={handleOption}
          allHidden={openConfiguration}
          configuration={configuration.topic}
          principalData="topic"
          title="Programming Language Topic"
          data={['Javascript', 'Python', 'Java', 'C#']}
        />
        <SettingsMenu
          handleOption={handleOption}
          allHidden={openConfiguration}
          configuration={configuration.difficulty}
          principalData="difficulty"
          title="Difficulty"
          data={['one', 'two', 'three', 'four', 'five']}
        />
        <SettingsMenu
          handleOption={handleOption}
          allHidden={openConfiguration}
          configuration={configuration.language}
          principalData="language"
          title="Languaje"
          data={['English', 'Spanish', 'German']}
        />
      </div>
      <button onClick={(e) => handleSettings(e)}>
        <Gear
          className={`absolute bottom-[5rem]`}
        />
      </button>
    </section>
  );
};

export default Page;
