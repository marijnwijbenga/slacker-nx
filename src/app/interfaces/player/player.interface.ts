import { WeaponInterface } from "../weapon/weapon.interface";

export interface PlayerInterface {
  name: string;
  level: number;
  xp: number;
  baseXp: number;
  mana: number;
  baseMana: number;
  gold: number;
  health: number;
  baseHealth: number;
  weapon: number;
  baseCriticalHitChance: number;
  baseCriticalHitMultiplier: number;
}
