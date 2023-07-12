import * as alt from 'alt-client';
import * as shared from './shared';
import * as appearance from '../appearance';

const overlayInfo = {
    0: { name: 'Blemishes', max: 23, noColor: true },
    3: { name: 'Aging', max: 14, noColor: true },
    4: { name: 'Makeup', max: 74 },
    5: { name: 'Blusher', max: 32 },
    6: { name: 'Damage', max: 11, noColor: true },
    7: { name: 'Sun Damage', max: 10, noColor: true },
    8: { name: 'Lipstick', max: 9 },
    9: { name: 'Freckles', max: 17, noColor: true },
};

// { opacity: 0, color1: 0, color2: 0, value: 0 }
export function getOverlaysWithMax(id: number, max: number) {
    const options = [];
    for (let i = 0; i < max; i++) {
        options.push({ text: `Style ${i}`, value: { id, value: i } });
    }

    return options;
}

export function getOverlaysOpacity(id: number) {
    const options = [];

    for (let i = 0; i < 11; i++) {
        const floatValue = i * 0.1;
        options.push({ text: `${floatValue.toFixed(1)}`, value: { id, opacity: floatValue } });
    }

    return options;
}

export async function open() {
    const data = appearance.get();
    alt.emit('crc-native-menu', { destroy: true });

    const options = [];
    const keys = Object.keys(overlayInfo);
    for (let key of keys) {
        const id = parseInt(key);

        // Values
        const dataIndex = data.headOverlays.findIndex((x) => x.id === id);
        options.push({
            text: overlayInfo[key].name,
            type: 'selection',
            index: data.headOverlays[dataIndex].value,
            options: getOverlaysWithMax(id, overlayInfo[key].max),
            eventName: 'crc-create-character-head-overlay-update',
        });

        // Opacity
        options.push({
            text: `${overlayInfo[key].name} Opacity`,
            type: 'selection',
            index: shared.opacityToIndex(data.headOverlays[dataIndex].opacity),
            options: getOverlaysOpacity(id),
            eventName: 'crc-create-character-head-overlay-update',
        });

        if (overlayInfo[key].noColor) {
            continue;
        }

        // Color 1
        options.push({
            text: `${overlayInfo[key].name} Color`,
            type: 'color',
            index: data.headOverlays[dataIndex].color1,
            options: shared.getSecondaryColorList(id, 'color1'),
            eventName: 'crc-create-character-head-overlay-update',
        });

        // Color 2
        options.push({
            text: `${overlayInfo[key].name} Highlight`,
            type: 'color',
            index: data.headOverlays[dataIndex].color2,
            options: shared.getSecondaryColorList(id, 'color2'),
            eventName: 'crc-create-character-head-overlay-update',
        });
    }

    alt.emit('crc-native-menu', {
        create: {
            header: 'Update Details',
            noExit: true,
            backEvent: 'crc-create-character-main-menu',
            options,
        },
    });
}
