import * as alt from 'alt-client';

export async function open() {
    alt.emit('crc-native-menu', { destroy: true });
    alt.emit('crc-native-menu', {
        create: {
            header: 'All Done?',
            noExit: true,
            backEvent: 'crc-create-character-main-menu',
            options: [
                {
                    text: 'Yes',
                    type: 'invoke',
                    value: true,
                    eventName: 'crc-create-character-done',
                },
                {
                    text: 'No',
                    type: 'invoke',
                    value: false,
                    eventName: 'crc-create-character-main-menu',
                },
            ],
        },
    });
}
