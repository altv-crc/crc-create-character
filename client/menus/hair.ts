import * as alt from 'alt-client';
import * as shared from './shared';
import * as appearance from '../appearance';

const hairLimit = {
    male: 76,
    female: 80,
};

export function getHairList(sex: number) {
    const options = [];
    for (let i = 0; i < (sex === 0 ? hairLimit.female : hairLimit.male); i++) {
        options.push({ text: `Style ${i + 1}`, value: { hair: i } });
    }

    return options;
}

export async function open() {
    const data = appearance.get();
    alt.emit('crc-native-menu', { destroy: true });

    alt.emit('crc-native-menu', {
        create: {
            header: 'Update Hair',
            noExit: true,
            backEvent: 'crc-create-character-main-menu',
            options: [
                {
                    text: 'Hair',
                    type: 'selection',
                    index: data.hair,
                    options: getHairList(data.sex),
                    eventName: 'crc-create-character-update-value',
                },
                {
                    text: 'Hair Color',
                    type: 'color',
                    index: data.hairColor1,
                    options: shared.getPrimaryColorList('hairColor1'),
                    eventName: 'crc-create-character-update-value',
                },
                {
                    text: 'Hair Highlight',
                    type: 'color',
                    index: data.hairColor2,
                    options: shared.getPrimaryColorList('hairColor2'),
                    eventName: 'crc-create-character-update-value',
                },
                {
                    text: 'Eyebrows',
                    type: 'selection',
                    index: data.eyebrows,
                    options: shared.getOverlays(2, 'eyebrows'),
                    eventName: 'crc-create-character-update-value',
                },
                {
                    text: 'Eyebrow Color',
                    type: 'color',
                    index: data.eyebrowsColor1,
                    options: shared.getPrimaryColorList('eyebrowsColor1'),
                    eventName: 'crc-create-character-update-value',
                },
                {
                    text: 'Eyebrow Opacity',
                    type: 'selection',
                    index: shared.opacityToIndex(data.eyebrowsOpacity),
                    options: shared.getOpacity('eyebrowsOpacity'),
                    eventName: 'crc-create-character-update-value',
                },
                {
                    text: 'Facial Hair',
                    type: 'selection',
                    index: data.facialHair,
                    options: shared.getOverlays(1, 'facialHair'),
                    eventName: 'crc-create-character-update-value',
                },
                {
                    text: 'Facial Hair Color',
                    type: 'color',
                    index: data.facialHairColor1,
                    options: shared.getPrimaryColorList('facialHairColor1'),
                    eventName: 'crc-create-character-update-value',
                },
                {
                    text: 'Facial Hair Opacity',
                    type: 'selection',
                    index: shared.opacityToIndex(data.facialHairOpacity),
                    options: shared.getOpacity('facialHairOpacity'),
                    eventName: 'crc-create-character-update-value',
                },
            ],
        },
    });
}
