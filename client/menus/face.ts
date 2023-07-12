import * as alt from 'alt-client';
import * as native from 'natives';
import * as appearance from '../appearance';

const faceNames = ['faceFather', 'faceMother', 'skinFather', 'skinMother'];
const faceMixes = ['faceMix', 'skinMix'];

function getEyes() {
    const options = [];
    for (let i = 0; i < 31; i++) {
        options.push({ text: `Style ${i + 1}`, value: { eyes: i } });
    }

    return options;
}

export async function open() {
    const data = appearance.get();
    alt.emit('crc-native-menu', { destroy: true });

    const options = [];

    for (let valueName of faceNames) {
        const valueOptions = {
            type: 'selection',
            text: valueName,
            index: data[valueName],
            options: [],
            eventName: 'crc-create-character-update-value',
        };

        for (let i = 0; i < 46; i++) {
            valueOptions.options.push({ text: `${i}`, value: { [valueName]: i } });
        }

        options.push(valueOptions);
    }

    for (let valueName of faceMixes) {
        const valueOptions = {
            type: 'selection',
            text: valueName,
            index: 5,
            options: [],
            eventName: 'crc-create-character-update-value',
        };

        // 0 - 1.0
        for (let i = 0; i < 11; i++) {
            const floatValue = i * 0.1;
            valueOptions.options.push({ text: `${floatValue.toFixed(1)}`, value: { [valueName]: floatValue } });

            if (floatValue.toFixed(1) === data[valueName].toFixed(1)) {
                valueOptions.index = i;
            }
        }

        options.push(valueOptions);
    }

    options.push({
        text: 'Eyes',
        type: 'selection',
        index: data.eyes,
        options: getEyes(),
        eventName: 'crc-create-character-update-value',
    });

    alt.emit('crc-native-menu', {
        create: {
            header: 'Update Face',
            noExit: true,
            backEvent: 'crc-create-character-main-menu',
            options,
        },
    });
}
