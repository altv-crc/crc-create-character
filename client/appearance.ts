import * as shared from 'alt-shared';

let appearance: shared.Appearance = {
    sex: 0,
    faceFather: 0,
    faceMother: 0,
    faceMix: 0.5,
    skinFather: 0,
    skinMother: 0,
    skinMix: 0.5,
    eyes: 0,
    eyebrows: 0,
    eyebrowsOpacity: 1,
    eyebrowsColor1: 0,
    chestHair: 0,
    chestHairOpacity: 0,
    chestHairColor1: 0,
    facialHair: 0,
    facialHairOpacity: 0,
    facialHairColor1: 0,
    hair: 0,
    hairColor1: 0,
    hairColor2: 0,
    headOverlays: [
        { id: 0, opacity: 0, color1: 0, color2: 0, value: 0 },
        { id: 3, opacity: 0, color1: 0, color2: 0, value: 0 },
        { id: 4, opacity: 0, color1: 0, color2: 0, value: 0 },
        { id: 5, opacity: 0, color1: 0, color2: 0, value: 0 },
        { id: 6, opacity: 0, color1: 0, color2: 0, value: 0 },
        { id: 7, opacity: 0, color1: 0, color2: 0, value: 0 },
        { id: 8, opacity: 0, color1: 0, color2: 0, value: 0 },
        { id: 9, opacity: 0, color1: 0, color2: 0, value: 0 },
        { id: 10, opacity: 0, color1: 0, color2: 0, value: 0 },
    ],
    microMorphs: new Array(20).fill(0),
    hairDlc: 0,
    hairOverlay: { collection: '', overlay: '' },
};

export function apply(data: Partial<shared.Appearance>) {
    appearance = Object.assign(appearance, data);
}

export function get(): shared.Appearance {
    return appearance;
}
