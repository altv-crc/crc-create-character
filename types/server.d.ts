import * as alt from 'alt-server';

declare module 'alt-shared' {
    interface ICustomServerClientEvent {
        'crc-create-character-start': () => void;
        'crc-create-character-finish': () => void;
    }
}

declare module 'alt-server' {
    interface ICustomEmitEvent {
        'crc-create-character-finish': (player: alt.Player, _id: string) => void;
    }
}
