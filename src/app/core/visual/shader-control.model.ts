export interface ShaderControlState {
  timeSpeed: number;
  reactivity: number;
  energyGain: number;
  bassGain: number;
  midGain: number;
  trebleGain: number;
  fluxGain: number;
}

export const DEFAULT_SHADER_CONTROL_STATE: ShaderControlState = {
  timeSpeed: 1,
  reactivity: 1,
  energyGain: 1,
  bassGain: 1,
  midGain: 1,
  trebleGain: 1,
  fluxGain: 1,
};
