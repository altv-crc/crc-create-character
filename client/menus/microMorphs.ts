import * as alt from 'alt-client';
import * as appearance from '../appearance';

const morphNames = [
    'Nose Width',
    'Nose Height',
    'Nose Length',
    'Nose Profile',
    'Nose Tip',
    'Nose Broke',
    'Brow Height',
    'Brow Depth',
    'Cheek Height',
    'Cheek Depth',
    'Cheek Puffed',
    'Eyes Size',
    'Lips Size',
    'Jaw Width',
    'Jaw Round',
    'Chin Height',
    'Chin Depth',
    'Chin Pointed',
    'Chin Dimple',
    'Neck Size',
];

export function getRangedOpacity(dataIndex: number): Array<{ text: string; value: any }> {
    const options = [];

    for (let i = -10; i < 11; i++) {
        const floatValue = i * 0.1;
        options.push({ text: `${floatValue.toFixed(1)}`, value: { index: dataIndex, value: floatValue } });
    }

    return options;
}

export async function open() {
    const data = appearance.get();
    alt.emit('crc-native-menu', { destroy: true });

    const options = [];
    for (let i = 0; i < morphNames.length; i++) {
        options.push({
            text: morphNames[i],
            type: 'selection',
            index: data.microMorphs[i],
            options: getRangedOpacity(i),
            eventName: 'crc-create-character-micromorph-update',
        });
    }

    alt.emit('crc-native-menu', {
        create: {
            header: 'Update Structure',
            noExit: true,
            backEvent: 'crc-create-character-main-menu',
            options,
        },
    });
}
