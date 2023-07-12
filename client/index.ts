import * as alt from 'alt-client';
import * as native from 'natives';
import * as ped from './pedPreview';
import * as menu from './menus/index';
import * as presets from './presets';
import * as appearance from './appearance';
import { Appearance } from '../shared/interface';
import { hairOverlay } from './dataSet/hairOverlays';

let firstRun = true;
let interval: number;

function tick() {
    native.disableAllControlActions(0);
}

async function openMenu() {
    native.displayRadar(false);

    if (!interval) {
        interval = alt.setInterval(tick, 0);
    }

    await ped.init();

    alt.emit('crc-native-menu', {
        create: {
            header: 'Create Character',
            noExit: true,
            options: [
                {
                    type: 'selection',
                    text: 'Sex',
                    index: 0,
                    options: [
                        { text: 'Female', value: { sex: 0 } },
                        { text: 'Male', value: { sex: 1 } },
                    ],
                    eventName: 'crc-create-character-update-value',
                },
                {
                    type: 'invoke',
                    text: 'Face',
                    eventName: 'crc-create-character-open-menu',
                    value: 'face',
                },
                {
                    type: 'invoke',
                    text: 'Hair',
                    eventName: 'crc-create-character-open-menu',
                    value: 'hair',
                },
                {
                    type: 'invoke',
                    text: 'Structure',
                    eventName: 'crc-create-character-open-menu',
                    value: 'microMorphs',
                },
                {
                    type: 'invoke',
                    text: 'Details',
                    eventName: 'crc-create-character-open-menu',
                    value: 'headOverlays',
                },
                {
                    type: 'invoke',
                    text: 'Done',
                    eventName: 'crc-create-character-open-menu',
                    value: 'done',
                },
            ],
        },
    });

    if (!firstRun) {
        return;
    }

    firstRun = false;
    applyChange({ sex: 0 });
}

function applyChange(data: Partial<Appearance>) {
    native.setClockTime(8, 0, 0);
    const appearanceData = appearance.get();

    if (data && typeof data.sex === 'number') {
        data = Object.assign(appearanceData, data.sex === 0 ? presets.femalePreset : presets.malePreset);
    }

    if (data && typeof data.hair === 'number') {
        data = Object.assign(appearanceData, {
            hair: data.hair,
            hairOverlay: hairOverlay[appearanceData.sex][appearanceData.hair],
        });
    }

    appearance.apply(data);
    ped.update();
}

function applyMicroMorph(data: { index: number; value: number }) {
    native.setClockTime(8, 0, 0);

    const modifiedData = appearance.get();
    modifiedData.microMorphs[data.index] = data.value;
    appearance.apply(modifiedData);
    ped.update();
}

function applyHeadOverlay(data: { id: number; opacity?: number; color1?: number; color2?: number; value?: number }) {
    native.setClockTime(8, 0, 0);

    const modifiedData = appearance.get();
    const index = modifiedData.headOverlays.findIndex((x) => x.id === data.id);
    if (index <= -1) {
        return;
    }

    modifiedData.headOverlays[index] = Object.assign(modifiedData.headOverlays[index], data);
    appearance.apply(modifiedData);
    ped.update();
}

alt.on('crc-create-character-main-menu', openMenu);
alt.on('crc-create-character-update-value', applyChange);
alt.on('crc-create-character-micromorph-update', applyMicroMorph);
alt.on('crc-create-character-head-overlay-update', applyHeadOverlay);
alt.onServer('crc-create-character-start', openMenu);

alt.on('crc-create-character-open-menu', (value: 'face' | 'hair' | 'headOverlays' | 'microMorphs' | 'done') => {
    if (!menu[value]) {
        return;
    }

    menu[value].open();
});

alt.on('crc-create-character-done', () => {
    native.displayRadar(true);
    alt.emit('crc-native-menu', { destroy: true });

    if (interval) {
        alt.clearInterval(interval);
        interval = undefined;
    }

    const data = appearance.get();
    alt.emitServer('crc-create-character-save', data);
});
