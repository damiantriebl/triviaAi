import { npc } from './constants';

export interface dialog {
  character: npc; // any of the listed characters, "Elliot", "Donna", "Margaret"
  dialog: string | null;
  topic: string; // programming language, default javascript
  language: string; // language of the dialogs, by default English
  difficulty: number; // difficulty of the question to ask
  answered: boolean;
}
