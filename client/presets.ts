import { Appearance } from '../shared/interface';

export const femalePreset: Partial<Appearance> = {
    sex: 0,
    faceFather: 21,
    faceMother: 45,
    skinFather: 8,
    skinMother: 45,
    faceMix: 0.5,
    skinMix: 0.7,
    eyebrows: 12,
    eyebrowsOpacity: 0.5,
    eyebrowsColor1: 2,
    facialHair: 0,
    facialHairColor1: 2,
    facialHairOpacity: 0,
};

export const malePreset: Partial<Appearance> = {
    sex: 1,
    faceFather: 0,
    faceMother: 2,
    skinFather: 44,
    skinMother: 3,
    faceMix: 0.5,
    skinMix: 0.3,
    eyebrows: 26,
    eyebrowsOpacity: 0.5,
    eyebrowsColor1: 2,
    facialHair: 0,
    facialHairColor1: 2,
    facialHairOpacity: 0.8,
};
